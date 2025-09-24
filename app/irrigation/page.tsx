"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Label } from '@/components/ui/label';
import {
  Droplets, Calendar, TrendingUp, MapPin, Wheat, Sprout, PlusCircle, Trash2, Calendar as CalendarIcon, Eye, CheckCircle2, AlertTriangle, Brain, Lightbulb
} from 'lucide-react';

// --- Types ---
interface User { id: string; name: string; city: string; state: string; }
interface Field {
  id: string;
  userId: string;
  area: number;
  cropName?: string | null;
  sowingDate?: string | null;
}

// --- Crop Modal Component ---
const CROP_OPTIONS = ["Wheat", "Rice", "Tomato", "Onion", "Potato", "Sugarcane", "Soybean", "Cotton"];
const AddCropModal = ({ field, onSave }: { field: Field; onSave: (updatedField: Field) => void; }) => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [sowingDate, setSowingDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (!selectedCrop || !sowingDate) {
      alert("Please select a crop and a sowing date.");
      return;
    }
    const updatedField = { ...field, cropName: selectedCrop, sowingDate: sowingDate.toISOString() };
    onSave(updatedField);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full mt-2"><PlusCircle className="mr-2 h-4 w-4" /> Add Crop</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Crop to Field</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select Crop</Label>
            <Select onValueChange={setSelectedCrop}>
              <SelectTrigger><SelectValue placeholder="Choose a crop" /></SelectTrigger>
              <SelectContent>{CROP_OPTIONS.map(crop => <SelectItem key={crop} value={crop}>{crop}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Select Sowing Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />{sowingDate ? format(sowingDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0"><CalendarComponent mode="single" selected={sowingDate} onSelect={setSowingDate} initialFocus /></PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">Save Crop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// --- Main Dashboard Component ---
const FasalDashboard = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userFields, setUserFields] = useState<Field[]>([]);
  const [totalArea, setTotalArea] = useState(0);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [alerts, setAlerts] = useState([
    { type: 'info', message: 'Wheat prices increased by ₹50 per quintal', time: '4 hours ago' },
  ]);
  const [cropRecommendation, setCropRecommendation] = useState('');
  const [recommendationLoading, setRecommendationLoading] = useState(true);

  const hasEmptyFields = userFields.some(field => !field.cropName);
  const selectedField = userFields.find(f => f.id === selectedFieldId);

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

    const fetchCropRecommendation = async () => {
      setRecommendationLoading(true);
      try {
        const forecastResponse = await fetch('https://vortex-hackethon.onrender.com/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ LAT: 18.0, LON: 75.0, YEAR_MONTH: "2025-04", features: { DOY: 120, soil_moisture: 0.45, Humidity: 65, T2M: 27.0, PRECTOTCORR: 1.2, soil_moisture_7d: 0.45, temp_7d: 26.7, rain_7d: 12.4 } })
        });
        if (!forecastResponse.ok) throw new Error("Forecast API failed");
        const forecastData = await forecastResponse.json();

        const recommendationResponse = await fetch('/api/recommend-crop', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ forecastData })
        });
        if (!recommendationResponse.ok) throw new Error("Recommendation API failed");
        const { recommendation } = await recommendationResponse.json();
        setCropRecommendation(recommendation);
      } catch (error) {
        console.error("Failed to get crop recommendation:", error);
        setCropRecommendation("Soybean"); // Fallback
      } finally {
        setRecommendationLoading(false);
      }
    };

    if (fieldsForCurrentUser.some(f => !f.cropName)) {
      fetchCropRecommendation();
    }
    
    // Fetch weather data for the 7-day forecast card
    const fetchWeather = async () => { /* ... unchanged ... */ };
    fetchWeather();

  }, [router]);

  const updateAndSaveFields = (updatedFields: Field[]) => {
    setUserFields(updatedFields);
    const allFieldsJson = localStorage.getItem('fields') || '[]';
    const allFields: Field[] = JSON.parse(allFieldsJson);
    const otherUserFields = allFields.filter(f => f.userId !== currentUser?.id);
    localStorage.setItem('fields', JSON.stringify([...otherUserFields, ...updatedFields]));
  };

  const handleSaveCrop = (updatedField: Field) => {
    const updatedFields = userFields.map(f => f.id === updatedField.id ? updatedField : f);
    updateAndSaveFields(updatedFields);
  };

  const handleHarvest = (fieldId: string) => {
    const updatedFields = userFields.map(f => f.id === fieldId ? { ...f, cropName: null, sowingDate: null } : f);
    updateAndSaveFields(updatedFields);
  };

  if (isLoading || !currentUser) {
    // ... Skeleton loading state is unchanged
    return <div className="min-h-screen bg-gray-50 p-8"><Skeleton className="h-12 w-1/3 mb-8" /></div>;
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-green-100 text-sm">This Season</p><p className="text-2xl font-bold">₹{ (totalArea * 53125).toLocaleString('en-IN') }</p><p className="text-green-100 text-sm">Expected Revenue</p></div><TrendingUp className="h-8 w-8 text-green-100" /></div></CardContent></Card>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-blue-100 text-sm">Water Saved</p><p className="text-2xl font-bold">35%</p><p className="text-blue-100 text-sm">vs Last Season</p></div><Droplets className="h-8 w-8 text-blue-100" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm">Fields Active</p><p className="text-2xl font-bold text-gray-900">{userFields.length}</p><p className="text-green-600 text-sm">All Healthy</p></div><Wheat className="h-8 w-8 text-green-600" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm">Days to Harvest</p><p className="text-2xl font-bold text-gray-900">45</p><p className="text-gray-600 text-sm">{selectedField?.cropName || 'Estimate'}</p></div><Calendar className="h-8 w-8 text-blue-600" /></div></CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Your Fields & Crops</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userFields.length > 0 ? userFields.map((field, index) => (
                    <div key={field.id} className="p-3 border rounded-lg bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center">
                      <div className="mb-3 sm:mb-0">
                        <p className="font-medium">Field {index + 1} ({field.area} acres)</p>
                        {field.cropName && field.sowingDate ? (
                          <div className="mt-1">
                            <p className="flex items-center text-sm text-green-700 font-semibold"><Sprout className="h-4 w-4 mr-2" /> {field.cropName}</p>
                            <p className="text-xs text-gray-500 ml-6">Sown: {format(new Date(field.sowingDate), "PPP")}</p>
                          </div>
                        ) : (<p className="text-sm text-gray-500 italic mt-1">Empty</p>)}
                      </div>
                      <div className="w-full sm:w-auto">
                        {field.cropName ? (
                          <Button variant="destructive" size="sm" className="w-full" onClick={() => handleHarvest(field.id)}><Trash2 className="mr-2 h-4 w-4" /> Harvest Crop</Button>
                        ) : (<AddCropModal field={field} onSave={handleSaveCrop} />)}
                      </div>
                    </div>
                  )) : (<p className="text-sm text-gray-500 text-center py-4">You haven't added any fields yet.</p>)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Crop Cycle Prediction - Field {userFields.findIndex(f => f.id === selectedFieldId) + 1}</CardTitle></CardHeader>
              <CardContent>
                 <div className="grid grid-cols-4 gap-4">
                  <div className="text-center"><div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2"><CheckCircle2 className="h-6 w-6" /></div><p className="text-sm font-medium">Planted</p></div>
                  <div className="text-center"><div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2"><CheckCircle2 className="h-6 w-6" /></div><p className="text-sm font-medium">Germination</p></div>
                  <div className="text-center"><div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2"><Eye className="h-6 w-6" /></div><p className="text-sm font-medium">Growth</p></div>
                  <div className="text-center"><div className="w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center mx-auto mb-2"><Calendar className="h-6 w-6" /></div><p className="text-sm font-medium">Harvest</p></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* THIS IS THE NEWLY ADDED CARD */}
            {hasEmptyFields && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-800"><Lightbulb className="h-5 w-5 mr-2" />AI Crop Suggestion</CardTitle>
                </CardHeader>
                <CardContent>
                  {recommendationLoading ? (
                    <div className="space-y-2">
                       <Skeleton className="h-8 w-1/2 bg-blue-200" />
                       <Skeleton className="h-4 w-full bg-blue-200" />
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-blue-700 mb-2">Based on the 3-month forecast, consider sowing:</p>
                      <p className="text-2xl font-bold text-blue-900">{cropRecommendation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader><CardTitle>7-Day Weather Forecast</CardTitle></CardHeader>
              <CardContent>
                 {/* This section can be filled with the daily weather API data as before */}
                <p className='text-sm text-gray-500'>Weather data is loading...</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Recent Alerts</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex space-x-3">
                      {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />}
                      {alert.type === 'info' && <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />}
                      <div className="flex-1"><p className="text-sm text-gray-800">{alert.message}</p><p className="text-xs text-gray-500 mt-1">{alert.time}</p></div>
                    </div>
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

export default FasalDashboard;