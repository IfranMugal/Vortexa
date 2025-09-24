"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CloudRain,
  Droplets,
  Calendar,
  TrendingUp,
  MapPin,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Wheat
} from 'lucide-react';

// Define types for our local storage data
interface User {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  city: string;
  language: string;
}

interface Field {
  id: string;
  userId: string;
  area: number;
}

const FasalDashboard = () => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userFields, setUserFields] = useState<Field[]>([]);
  const [totalArea, setTotalArea] = useState(0);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  
  // Set initial static alerts in state
  const [alerts, setAlerts] = useState([
    { type: 'info', message: 'Wheat prices increased by ₹50 per quintal', time: '4 hours ago' },
    { type: 'success', message: 'Irrigation completed for Field 1', time: '6 hours ago' }
  ]);

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
      router.push('/auth/signin');
      return;
    }

    const user: User = JSON.parse(userJson);
    setCurrentUser(user);

    const allFieldsJson = localStorage.getItem('fields') || '[]';
    const allFields: Field[] = JSON.parse(allFieldsJson);
    const fieldsForCurrentUser = allFields.filter(field => field.userId === user.id);
    setUserFields(fieldsForCurrentUser);

    if (fieldsForCurrentUser.length > 0) {
      setSelectedFieldId(fieldsForCurrentUser[0].id);
      const total = fieldsForCurrentUser.reduce((sum, field) => sum + field.area, 0);
      setTotalArea(total);
    }

    setIsLoading(false);

    // Function to generate alerts from weather data
    const generateWeatherAlerts = (forecast: any[]) => {
      const weatherBasedAlerts: any[] = [];
      forecast.forEach(day => {
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(`${day.date}T00:00:00`));

        // Alert for heavy rain (e.g., > 10mm)
        if (day.precipitation > 10) {
          weatherBasedAlerts.push({
            type: 'warning',
            message: `Heavy rain expected on ${dayName}. Ensure proper field drainage.`,
            time: 'Weather Forecast'
          });
        }
        
        // Alert for high temperature (e.g., > 35°C)
        if (day.temperature_2m > 35) {
          weatherBasedAlerts.push({
            type: 'warning',
            message: `High heat on ${dayName} (${Math.round(day.temperature_2m)}°C). Check for crop stress.`,
            time: 'Weather Forecast'
          });
        }
      });
      return weatherBasedAlerts;
    };

    const fetchWeather = async () => {
      setWeatherLoading(true);
      setWeatherError(null);

      const lat = 18.0;
      const lon = 75.0;
      const today = new Date();
      const endDate = new Date();
      endDate.setDate(today.getDate() + 6);

      const formatDate = (date: Date) => date.toISOString().split('T')[0];
      const start = formatDate(today);
      const end = formatDate(endDate);

      try {
        const response = await fetch(`https://express-weather-api.vercel.app/weather/?lat=${lat}&lon=${lon}&start=${start}&end=${end}`);
        if (!response.ok) throw new Error('Failed to fetch weather data.');
        
        const data = await response.json();
        
        if (!Array.isArray(data)) throw new Error('Unexpected API response format.');

        // Generate dynamic alerts and prepend them to the existing alerts
        const newAlerts = generateWeatherAlerts(data);
        setAlerts(currentAlerts => [...newAlerts, ...currentAlerts.filter(a => a.time !== 'Weather Forecast')]);
        
        const formattedData = data.map((item: any, index: number) => {
            const date = new Date(`${item.date}T00:00:00`);
            if (isNaN(date.getTime())) return null;

            let dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
            if (index === 0) dayName = 'Today';
            if (index === 1) dayName = 'Tomorrow';
            
            const isRainy = item.precipitation > 0.1;
            
            return {
              day: dayName,
              temp: `${Math.round(item.temperature_2m)}°C`,
              condition: isRainy ? 'Rain' : 'Clear',
              icon: isRainy ? '🌧️' : '☀️',
            };
          }).filter(Boolean); 
        
        setWeatherData(formattedData);
      } catch (error: any) {
        setWeatherError(error.message);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [router]);


  if (isLoading || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <Skeleton className="h-12 w-1/3 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Good Morning, {currentUser.name}!</h1>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{currentUser.city}, {currentUser.state} • {totalArea} acres under cultivation</span>
          </div>
        </div>

        {/* Quick Stats and other sections remain the same */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
           <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">This Season</p>
                  <p className="text-2xl font-bold">₹{ (totalArea * 53125).toLocaleString('en-IN') }</p>
                  <p className="text-green-100 text-sm">Expected Revenue</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Water Saved</p>
                  <p className="text-2xl font-bold">35%</p>
                  <p className="text-blue-100 text-sm">vs Last Season</p>
                </div>
                <Droplets className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Fields Active</p>
                  <p className="text-2xl font-bold text-gray-900">{userFields.length}</p>
                  <p className="text-green-600 text-sm">All Healthy</p>
                </div>
                <Wheat className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Days to Harvest</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                  <p className="text-gray-600 text-sm">Estimate</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
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
                      <p className="text-sm text-gray-500">You haven't added any fields yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Irrigation Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Soil Moisture</span>
                      <span className="text-sm font-medium text-green-600">Good (65%)</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-2/3"></div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center text-blue-700">
                        <Droplets className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Next irrigation: Tomorrow evening</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Link href="/irrigation">
                        View Irrigation Schedule
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Crop Cycle Prediction - Field {userFields.findIndex(f => f.id === selectedFieldId) + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2"><CheckCircle2 className="h-6 w-6" /></div>
                      <p className="text-sm font-medium">Planted</p><p className="text-xs text-gray-500">Aug 15, 2025</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2"><CheckCircle2 className="h-6 w-6" /></div>
                      <p className="text-sm font-medium">Germination</p><p className="text-xs text-gray-500">Aug 25, 2025</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2"><Eye className="h-6 w-6" /></div>
                      <p className="text-sm font-medium">Growth</p><p className="text-xs text-green-600">In Progress</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center mx-auto mb-2"><Calendar className="h-6 w-6" /></div>
                      <p className="text-sm font-medium">Harvest</p><p className="text-xs text-gray-500">Nov 15, 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">7-Day Weather Forecast</CardTitle></CardHeader>
              <CardContent>
                {weatherLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                  </div>
                ) : weatherError ? (
                  <p className="text-sm text-red-600">{weatherError}</p>
                ) : (
                  <div className="space-y-3">
                    {weatherData.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{day.icon}</span>
                          <div>
                            <p className="text-sm font-medium">{day.day}</p>
                            <p className="text-xs text-gray-500">{day.condition}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{day.temp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Recent Alerts</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.length > 0 ? alerts.map((alert, index) => (
                    <div key={index} className="flex space-x-3 p-3 rounded-lg bg-gray-50">
                      {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />}
                      {alert.type === 'info' && <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />}
                      {alert.type === 'success' && <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-sm text-gray-500 text-center py-4">No new alerts.</p>
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

export default FasalDashboard;