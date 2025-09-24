"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Droplets,
  Calendar, 
  TrendingUp,
  TrendingDown,
  Brain,
  BarChart3,
  CloudRain,
  Sun,
  Target,
  Clock,
  Activity,
  Zap,
  MapPin,
  AlertCircle,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Thermometer,
  Wind,
  Eye,
  Database,
  LineChart
} from 'lucide-react';

const IrrigationPredictionPage = () => {
  const [selectedField, setSelectedField] = useState('Field A');
  const [predictionModel, setPredictionModel] = useState('AI-Enhanced');

  // AI-driven irrigation predictions for next 7 days
  const irrigationPredictions = [
    {
      day: 'Today',
      date: 'Dec 20',
      confidence: 95,
      recommendation: 'irrigate',
      optimalTime: '5:30 AM',
      waterAmount: '45mm',
      evapotranspiration: '6.2mm',
      soilMoisture: '68%',
      weatherFactor: 'high_temp',
      yieldImpact: '+2.3%',
      reasoning: 'High temperature + low soil moisture trend',
      weather: { temp: '34°C', humidity: '45%', wind: '12 km/h', icon: '☀️' }
    },
    {
      day: 'Tomorrow',
      date: 'Dec 21',
      confidence: 88,
      recommendation: 'irrigate',
      optimalTime: '6:00 AM',
      waterAmount: '38mm',
      evapotranspiration: '5.8mm',
      soilMoisture: '72%',
      weatherFactor: 'moderate_conditions',
      yieldImpact: '+1.8%',
      reasoning: 'Maintaining optimal moisture for growth phase',
      weather: { temp: '31°C', humidity: '52%', wind: '8 km/h', icon: '⛅' }
    },
    {
      day: 'Friday',
      date: 'Dec 22',
      confidence: 92,
      recommendation: 'skip',
      optimalTime: 'N/A',
      waterAmount: '0mm (Natural: 25mm)',
      evapotranspiration: '3.4mm',
      soilMoisture: '85%',
      weatherFactor: 'natural_irrigation',
      yieldImpact: '+0.5%',
      reasoning: 'Heavy rainfall predicted - natural irrigation sufficient',
      weather: { temp: '26°C', humidity: '78%', wind: '15 km/h', icon: '🌧️' }
    },
    {
      day: 'Saturday',
      date: 'Dec 23',
      confidence: 91,
      recommendation: 'monitor',
      optimalTime: 'Evening if needed',
      waterAmount: '20mm (if triggered)',
      evapotranspiration: '4.1mm',
      soilMoisture: '78%',
      weatherFactor: 'post_rain_assessment',
      yieldImpact: '+1.2%',
      reasoning: 'Post-rain assessment needed - may require light irrigation',
      weather: { temp: '28°C', humidity: '65%', wind: '10 km/h', icon: '⛅' }
    },
    {
      day: 'Sunday',
      date: 'Dec 24',
      confidence: 87,
      recommendation: 'irrigate',
      optimalTime: '5:45 AM',
      waterAmount: '42mm',
      evapotranspiration: '5.9mm',
      soilMoisture: '71%',
      weatherFactor: 'drying_conditions',
      yieldImpact: '+2.1%',
      reasoning: 'Soil drying after rain - critical growth phase irrigation',
      weather: { temp: '32°C', humidity: '48%', wind: '11 km/h', icon: '☀️' }
    },
    {
      day: 'Monday',
      date: 'Dec 25',
      confidence: 83,
      recommendation: 'irrigate',
      optimalTime: '6:15 AM',
      waterAmount: '40mm',
      evapotranspiration: '5.7mm',
      soilMoisture: '69%',
      weatherFactor: 'steady_demand',
      yieldImpact: '+1.9%',
      reasoning: 'Consistent moisture needed for flowering stage',
      weather: { temp: '30°C', humidity: '51%', wind: '9 km/h', icon: '☀️' }
    },
    {
      day: 'Tuesday',
      date: 'Dec 26',
      confidence: 79,
      recommendation: 'light_irrigate',
      optimalTime: '6:30 AM',
      waterAmount: '30mm',
      evapotranspiration: '5.3mm',
      soilMoisture: '74%',
      weatherFactor: 'mild_conditions',
      yieldImpact: '+1.4%',
      reasoning: 'Light irrigation to maintain optimal moisture levels',
      weather: { temp: '29°C', humidity: '55%', wind: '7 km/h', icon: '⛅' }
    }
  ];

  const historicalData = {
    lastSeason: {
      totalWaterUsed: '2,450mm',
      averageYield: '4.2 tons/hectare',
      irrigationEvents: 28,
      efficiency: '78%'
    },
    currentPrediction: {
      projectedWaterUse: '2,180mm',
      projectedYield: '4.6 tons/hectare',
      projectedEvents: 24,
      projectedEfficiency: '85%'
    },
    improvement: {
      waterSaving: '11%',
      yieldIncrease: '9.5%',
      eventReduction: '14%',
      efficiencyGain: '7%'
    }
  };

  const cropCyclePrediction = {
    currentStage: 'Vegetative Growth',
    daysInStage: 15,
    nextStage: 'Flowering',
    daysToNextStage: 12,
    criticalPeriods: [
      { stage: 'Flowering', days: 27, waterCritical: true, description: 'Maximum water requirement' },
      { stage: 'Grain Filling', days: 45, waterCritical: false, description: 'Moderate water requirement' },
      { stage: 'Maturity', days: 62, waterCritical: false, description: 'Minimal water requirement' }
    ]
  };

  const getRecommendationColor = (recommendation:any) => {
    switch (recommendation) {
      case 'irrigate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'skip': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'monitor': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'light_irrigate': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRecommendationIcon = (recommendation:any) => {
    switch (recommendation) {
      case 'irrigate': return <Droplets className="h-4 w-4" />;
      case 'skip': return <CloudRain className="h-4 w-4" />;
      case 'monitor': return <Eye className="h-4 w-4" />;
      case 'light_irrigate': return <Activity className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Irrigation Prediction</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">Jalandhar, Punjab • Data-Driven Crop Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">AI Model: 94% Accuracy</span>
            </div>
          </div>
        </div>

        {/* Prediction Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Water Savings</p>
                  <p className="text-2xl font-bold">{historicalData.improvement.waterSaving}</p>
                  <p className="text-blue-100 text-sm">vs Last Season</p>
                </div>
                <TrendingDown className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Yield Increase</p>
                  <p className="text-2xl font-bold">{historicalData.improvement.yieldIncrease}</p>
                  <p className="text-green-100 text-sm">Predicted Gain</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Prediction Confidence</p>
                  <p className="text-2xl font-bold text-gray-900">89%</p>
                  <p className="text-green-600 text-sm">Average</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Data Points</p>
                  <p className="text-2xl font-bold text-gray-900">2.3K</p>
                  <p className="text-blue-600 text-sm">Last 3 Seasons</p>
                </div>
                <Database className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column - Predictions */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* 7-Day AI Irrigation Predictions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-blue-600" />
                    7-Day AI Irrigation Predictions
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">High Confidence (85%+)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {irrigationPredictions.map((prediction, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{prediction.weather.icon}</span>
                          <div>
                            <h3 className="font-medium text-gray-900 flex items-center">
                              {prediction.day}
                              <div className={`ml-2 w-2 h-2 rounded-full ${
                                prediction.confidence >= 90 ? 'bg-green-500' : 
                                prediction.confidence >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></div>
                            </h3>
                            <p className="text-sm text-gray-500">{prediction.date} • Confidence: {prediction.confidence}%</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getRecommendationColor(prediction.recommendation)}`}>
                          {getRecommendationIcon(prediction.recommendation)}
                          <span className="capitalize">{prediction.recommendation.replace('_', ' ')}</span>
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
                        <div>
                          <p className="text-gray-500 text-xs">ET₀ Rate</p>
                          <p className="font-medium">{prediction.evapotranspiration}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Soil Moisture</p>
                          <p className="font-medium">{prediction.soilMoisture}</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-blue-800">AI Reasoning</p>
                            <p className="text-xs text-blue-700">{prediction.reasoning}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Thermometer className="h-3 w-3 mr-1" />
                            <span>{prediction.weather.temp}</span>
                          </div>
                          <div className="flex items-center">
                            <Droplets className="h-3 w-3 mr-1" />
                            <span>{prediction.weather.humidity}</span>
                          </div>
                          <div className="flex items-center">
                            <Wind className="h-3 w-3 mr-1" />
                            <span>{prediction.weather.wind}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Yield Impact:</span>
                          <span className={`text-sm font-medium ${
                            prediction.yieldImpact.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {prediction.yieldImpact}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                  <LineChart className="h-4 w-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Crop Cycle Prediction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                  Crop Cycle & Water Demand Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-green-800">Current Stage: {cropCyclePrediction.currentStage}</h4>
                      <span className="text-sm text-green-600">Day {cropCyclePrediction.daysInStage}</span>
                    </div>
                    <p className="text-sm text-green-700">Next stage ({cropCyclePrediction.nextStage}) in {cropCyclePrediction.daysToNextStage} days</p>
                  </div>
                  
                  <div className="space-y-3">
                    {cropCyclePrediction.criticalPeriods.map((period, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-gray-900">{period.stage}</h5>
                          <div className="flex items-center space-x-2">
                            {period.waterCritical && (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm text-gray-500">Day {period.days}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{period.description}</p>
                        {period.waterCritical && (
                          <div className="bg-red-50 border border-red-200 rounded px-2 py-1 mt-2">
                            <span className="text-xs text-red-700 font-medium">Critical Irrigation Period</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Historical vs Predicted Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Performance Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-600 mb-1">Last Season</p>
                      <p className="text-lg font-bold text-gray-900">{historicalData.lastSeason.averageYield}</p>
                      <p className="text-xs text-gray-500">Average Yield</p>
                    </div>
                    <div className="border border-green-200 rounded-lg p-3 bg-green-50">
                      <p className="text-sm text-green-600 mb-1">Predicted</p>
                      <p className="text-lg font-bold text-green-900">{historicalData.currentPrediction.projectedYield}</p>
                      <p className="text-xs text-green-600">Expected Yield</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Water Usage</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">{historicalData.lastSeason.totalWaterUsed}</span>
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                        <span className="text-green-600 font-medium">{historicalData.currentPrediction.projectedWaterUse}</span>
                        <div className="flex items-center text-green-600">
                          <ArrowDown className="h-3 w-3" />
                          <span className="text-xs">{historicalData.improvement.waterSaving}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Irrigation Events</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">{historicalData.lastSeason.irrigationEvents}</span>
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                        <span className="text-green-600 font-medium">{historicalData.currentPrediction.projectedEvents}</span>
                        <div className="flex items-center text-green-600">
                          <ArrowDown className="h-3 w-3" />
                          <span className="text-xs">{historicalData.improvement.eventReduction}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Efficiency</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">{historicalData.lastSeason.efficiency}</span>
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                        <span className="text-green-600 font-medium">{historicalData.currentPrediction.projectedEfficiency}</span>
                        <div className="flex items-center text-green-600">
                          <ArrowUp className="h-3 w-3" />
                          <span className="text-xs">{historicalData.improvement.efficiencyGain}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Database className="h-5 w-5 mr-2 text-gray-600" />
                  Data Sources & Model Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Weather Data</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-600">Live</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Soil Sensors</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-600">15 Active</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Historical Yield</span>
                    <span className="text-gray-900">3 Seasons</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Satellite Data</span>
                    <span className="text-gray-900">NDVI + ET</span>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="font-medium text-blue-800 text-sm mb-1">Model Performance</h4>
                    <div className="text-xs text-blue-700 space-y-1">
                      <div className="flex justify-between">
                        <span>Irrigation Accuracy:</span>
                        <span className="font-medium">94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Yield Prediction:</span>
                        <span className="font-medium">91.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Updated:</span>
                        <span className="font-medium">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Field Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Field Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Field A - Wheat (8 acres)', 'Field B - Rice (5 acres)', 'Field C - Vegetables (2 acres)'].map((field, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedField(field.split(' - ')[0])}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedField === field.split(' - ')[0]
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-medium">{field.split(' - ')[0]}</div>
                      <div className="text-sm text-gray-500">{field.split(' - ')[1]}</div>
                    </button>
                  ))}
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