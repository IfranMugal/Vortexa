"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Droplets,
  Brain,
  CloudRain,
  Clock,
  MapPin,
  AlertCircle,
  Thermometer,
  Loader2,
  Activity
} from 'lucide-react';

// --- Helper Function ---
const getDayOfYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// --- Types and Dummy Data ---
interface User { id: string; name: string; city: string; state: string; }
interface Field { id: string; userId: string; area: number; }
interface Prediction {
  day: string;
  date: string;
  recommendation: 'irrigate' | 'skip' | 'monitor';
  weather: { temp: string; humidity: string; icon: string; };
  reasoning: string;
  waterAmount: string;
  optimalTime: string;
}

const DUMMY_PREDICTIONS: Prediction[] = [
  { day: 'Today', date: 'Sep 24', recommendation: 'irrigate', weather: { temp: '28°C', humidity: '75%', icon: '☀️' }, reasoning: 'High evapotranspiration and low soil moisture detected.', waterAmount: '40mm', optimalTime: '6:00 AM' },
  { day: 'Tomorrow', date: 'Sep 25', recommendation: 'skip', weather: { temp: '26°C', humidity: '85%', icon: '🌧️' }, reasoning: 'Significant rainfall predicted, natural irrigation will be sufficient.', waterAmount: '0mm', optimalTime: 'N/A' },
  { day: 'Fri', date: 'Sep 26', recommendation: 'monitor', weather: { temp: '27°C', humidity: '80%', icon: '⛅' }, reasoning: 'Assess soil moisture post-rain; irrigate only if necessary.', waterAmount: '15mm (if needed)', optimalTime: 'Evening' },
  { day: 'Sat', date: 'Sep 27', recommendation: 'irrigate', weather: { temp: '29°C', humidity: '70%', icon: '☀️' }, reasoning: 'Soil drying expected, irrigate to maintain crop health.', waterAmount: '35mm', optimalTime: '5:45 AM' },
  { day: 'Sun', date: 'Sep 28', recommendation: 'skip', weather: { temp: '30°C', humidity: '68%', icon: '⛅' }, reasoning: 'Sufficient residual moisture from previous irrigation.', waterAmount: '0mm', optimalTime: 'N/A' },
  { day: 'Mon', date: 'Sep 29', recommendation: 'irrigate', weather: { temp: '31°C', humidity: '65%', icon: '☀️' }, reasoning: 'Critical growth stage requires consistent watering.', waterAmount: '40mm', optimalTime: '6:15 AM' },
  { day: 'Tue', date: 'Sep 30', recommendation: 'monitor', weather: { temp: '29°C', humidity: '72%', icon: '⛅' }, reasoning: 'Conditions are stable, monitor crop for signs of stress.', waterAmount: '20mm (if needed)', optimalTime: 'Evening' },
];

const IrrigationPredictionPage = () => {
  const router = useRouter();
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userFields, setUserFields] = useState<Field[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  
  const [irrigationPredictions, setIrrigationPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
      router.push('/auth/signin');
      return;
    }
    const user: User = JSON.parse(userJson);
    setCurrentUser(user);

    const fieldsJson = localStorage.getItem('fields') || '[]';
    const allFields: Field[] = JSON.parse(fieldsJson);
    const currentUserFields = allFields.filter(f => f.userId === user.id);
    setUserFields(currentUserFields);
    if (currentUserFields.length > 0) {
      setSelectedFieldId(currentUserFields[0].id);
    }
    
    const fetchPredictions = async () => {
      setIsLoading(true);

      const lat = 18.0;
      const lon = 75.0;
      const today = new Date();
      const endDate = new Date();
      endDate.setDate(today.getDate() + 6);
      const formatDate = (date: Date) => date.toISOString().split('T')[0];
      const start = formatDate(today);
      const end = formatDate(endDate);

      try {
        const weatherResponse = await fetch(`https://express-weather-api.vercel.app/weather/?lat=${lat}&lon=${lon}&start=${start}&end=${end}`);
        if (!weatherResponse.ok) throw new Error("Weather API failed");
        
        const weatherData = await weatherResponse.json();
        if (!Array.isArray(weatherData) || weatherData.length === 0) throw new Error("Weather data invalid");

        const avgTemp7d = weatherData.reduce((sum, d) => sum + d.temperature_2m, 0) / weatherData.length;
        const totalRain7d = weatherData.reduce((sum, d) => sum + d.precipitation, 0);

        const predictionPromises = weatherData.map(async (dayWeather) => {
          const date = new Date(`${dayWeather.date}T00:00:00`);
          const doy = getDayOfYear(date);

          const predictionBody = {
            LAT: lat, LON: lon, YEAR_MONTH: dayWeather.date.substring(0, 7),
            features: {
              DOY: doy, soil_moisture: 0.45, Humidity: dayWeather.relative_humidity_2m, T2M: dayWeather.temperature_2m,
              PRECTOTCORR: dayWeather.precipitation, soil_moisture_7d: 0.45, temp_7d: avgTemp7d, rain_7d: totalRain7d,
            }
          };

          const predictionResponse = await fetch('https://vortex-hackethon.onrender.com/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(predictionBody)
          });

          if (!predictionResponse.ok) throw new Error("Prediction API failed");
          const result = await predictionResponse.json();
          return { ...dayWeather, prediction: result.prediction };
        });

        const results = await Promise.all(predictionPromises);

        const finalPredictions = results.map((item, index) => {
          const date = new Date(`${item.date}T00:00:00`);
          let dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
          if (index === 0) dayName = 'Today';
          if (index === 1) dayName = 'Tomorrow';

          const recommendation = (item.prediction === 1 ? 'irrigate' : 'skip') as Prediction['recommendation'];
          
          return {
            day: dayName,
            date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date),
            recommendation,
            weather: {
              temp: `${Math.round(item.temperature_2m)}°C`,
              humidity: `${Math.round(item.relative_humidity_2m)}%`,
              icon: item.precipitation > 0.1 ? '🌧️' : '☀️',
            },
            reasoning: recommendation === 'irrigate' ? 'AI model predicts crop water stress.' : 'Sufficient moisture predicted.',
            waterAmount: recommendation === 'irrigate' ? '35mm' : '0mm',
            optimalTime: recommendation === 'irrigate' ? '5:30 AM' : 'N/A'
          };
        });
        setIrrigationPredictions(finalPredictions);
      } catch (err) {
        console.error("API fetch failed, falling back to dummy data:", err);
        setIrrigationPredictions(DUMMY_PREDICTIONS);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPredictions();

  }, [router]);

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'irrigate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'skip': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'irrigate': return <Droplets className="h-4 w-4" />;
      case 'skip': return <CloudRain className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };
  
  if (!currentUser) {
    return (
       <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
         <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Irrigation Prediction</h1>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{currentUser.city}, {currentUser.state} • Data-Driven Crop Management</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Your Fields</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{userFields.length}</div>
                    <p className="text-xs text-muted-foreground">fields currently being monitored</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-blue-600" />
                  7-Day AI Irrigation Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-40 w-full rounded-lg" />)}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {irrigationPredictions.map((prediction, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{prediction.weather.icon}</span>
                            <div>
                              <h3 className="font-medium text-gray-900 flex items-center">{prediction.day}</h3>
                              <p className="text-sm text-gray-500">{prediction.date}</p>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getRecommendationColor(prediction.recommendation)}`}>
                            {getRecommendationIcon(prediction.recommendation)}
                            <span className="capitalize">{prediction.recommendation}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-500 text-xs">Optimal Time</p>
                            <p className="font-medium">{prediction.optimalTime}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Water Amount</p>
                            <p className="font-medium">{prediction.waterAmount}</p>
                          </div>
                          <div className="flex items-center">
                            <Thermometer className="h-4 w-4 mr-1 text-gray-400" />
                            <span>{prediction.weather.temp}</span>
                          </div>
                          <div className="flex items-center">
                            <Droplets className="h-4 w-4 mr-1 text-gray-400" />
                            <span>{prediction.weather.humidity}</span>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-blue-800">AI Reasoning</p>
                              <p className="text-xs text-blue-700">{prediction.reasoning}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Fields</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-3">
                    {userFields.length > 0 ? userFields.map((field, index) => (
                      <button
                        key={field.id}
                        onClick={() => setSelectedFieldId(field.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedFieldId === field.id
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="font-medium">Field {index + 1}</div>
                        <div className="text-sm text-gray-500">{field.area} acres</div>
                      </button>
                    )) : (
                      <p className="text-sm text-gray-500">No fields added yet.</p>
                    )}
                  </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationPredictionPage;