"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Sprout,
  CloudRain, 
  Droplets, 
  Calendar, 
  TrendingUp,
  Bell,
  User,
  MapPin,
  Thermometer,
  Wind,
  Eye,
  AlertTriangle,
  CheckCircle2,
  IndianRupee,
  Wheat
} from 'lucide-react';

const FasalDashboard = () => {
  const [selectedField, setSelectedField] = useState('Field A');

  // Mock data for demonstration
  const weatherData = [
    { day: 'Today', temp: '32°C', condition: 'Sunny', rain: '0%', icon: '☀️' },
    { day: 'Tomorrow', temp: '29°C', condition: 'Cloudy', rain: '20%', icon: '⛅' },
    { day: 'Thu', temp: '27°C', condition: 'Light Rain', rain: '60%', icon: '🌦️' },
    { day: 'Fri', temp: '28°C', condition: 'Rain', rain: '80%', icon: '🌧️' },
    { day: 'Sat', temp: '30°C', condition: 'Partly Cloudy', rain: '10%', icon: '⛅' },
    { day: 'Sun', temp: '31°C', condition: 'Sunny', rain: '5%', icon: '☀️' },
    { day: 'Mon', temp: '33°C', condition: 'Hot', rain: '0%', icon: '🌞' }
  ];

  const cropPrices = [
    { crop: 'Wheat', price: '₹2,450', change: '+₹50', trend: 'up' },
    { crop: 'Rice', price: '₹3,200', change: '-₹25', trend: 'down' },
    { crop: 'Tomato', price: '₹45', change: '+₹8', trend: 'up' },
    { crop: 'Onion', price: '₹28', change: '+₹3', trend: 'up' },
    { crop: 'Potato', price: '₹22', change: '-₹2', trend: 'down' }
  ];

  const alerts = [
    { type: 'warning', message: 'Heavy rain expected on Thursday - protect tomato crop', time: '2 hours ago' },
    { type: 'info', message: 'Wheat prices increased by ₹50 per quintal', time: '4 hours ago' },
    { type: 'success', message: 'Irrigation completed for Field B', time: '6 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Good Morning, Ramesh!</h1>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">Jalandhar, Punjab • 15 acres under cultivation</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">This Season</p>
                  <p className="text-2xl font-bold">₹4,25,000</p>
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
                  <p className="text-2xl font-bold text-gray-900">3 of 4</p>
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
                  <p className="text-gray-600 text-sm">Wheat Crop</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Field Selection & Irrigation */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Select Field</CardTitle>
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
                      <p className="text-xs text-blue-600 mt-1">Based on weather forecast and soil conditions</p>
                    </div>
                    
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Schedule Irrigation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Crop Cycle Prediction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Crop Cycle Prediction - {selectedField}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium">Planted</p>
                      <p className="text-xs text-gray-500">Oct 15</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium">Germination</p>
                      <p className="text-xs text-gray-500">Oct 25</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                        <Eye className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium">Growth</p>
                      <p className="text-xs text-green-600">In Progress</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium">Harvest</p>
                      <p className="text-xs text-gray-500">Mar 15</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Current Stage: Vegetative Growth</h4>
                    <p className="text-sm text-green-700">Your wheat is developing well. Consider applying nitrogen fertilizer in the next 7-10 days for optimal growth.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Weather Prediction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">7-Day Weather Forecast</CardTitle>
              </CardHeader>
              <CardContent>
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
                        <p className="text-xs text-blue-600">{day.rain}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Prices */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">MSP Prices - Top Crops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cropPrices.map((crop, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="text-sm font-medium">{crop.crop}</p>
                        <p className="text-xs text-gray-500">per quintal</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{crop.price}</p>
                        <p className={`text-xs ${crop.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {crop.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-green-600 text-green-600 hover:bg-green-50">
                  View All Prices
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex space-x-3 p-3 rounded-lg bg-gray-50">
                      {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />}
                      {alert.type === 'info' && <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />}
                      {alert.type === 'success' && <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-green-600 hover:bg-green-50">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FasalDashboard;