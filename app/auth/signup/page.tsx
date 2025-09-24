"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// ✅ FIX: Import useFormState and useFormStatus from 'react-dom'
import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Phone, Lock, Map, MapPin, Loader2, Languages } from 'lucide-react';
import { signUpUser, FormState } from '@/lib/action/signup';

const locations: { Maharashtra: string[] } = {
  "Maharashtra": [ "Ahmednagar", "Akola", "Amravati", "Aurangabad (Chhatrapati Sambhajinagar)", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad (Dharashiv)", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal" ]
};
const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'hn', label: 'Hindi (हिंदी)' },
  { value: 'mr', label: 'Marathi (मराठी)' },
];

const initialState: FormState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={pending}>
      {pending ? (
        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing Up...</>
      ) : ( 'Sign Up' )}
    </Button>
  );
}

const SignUpPage = () => {
  const router = useRouter();
  // ✅ FIX: Revert to useFormState
  const [state, formAction] = useFormState(signUpUser, initialState);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
          <CardDescription>Join our platform for AI-driven farm insights in Maharashtra.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 h-4 w-4 text-gray-500" />
                  <Input id="name" name="name" type="text" placeholder="e.g., Suresh Patil" className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3 h-4 w-4 text-gray-500" />
                  <Input id="phone" name="phone" type="tel" placeholder="Enter your 10-digit mobile number" className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-gray-500" />
                  <Input id="password" name="password" type="password" placeholder="Create a strong password" className="pl-10" required />
                </div>
              </div>

              <input type="hidden" name="state" value="Maharashtra" />

              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Select name="district" onValueChange={setSelectedDistrict} value={selectedDistrict} required>
                  <SelectTrigger id="district" className="w-full">
                    <div className="flex items-center">
                       <Map className="mr-2 h-4 w-4 text-gray-500" />
                       <SelectValue placeholder="Select your district" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {locations["Maharashtra"].map((district) => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City / Town / Village</Label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3 h-4 w-4 text-gray-500" />
                  <Input id="city" name="city" type="text" placeholder="e.g., Baramati" className="pl-10" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select name="language" onValueChange={setSelectedLanguage} value={selectedLanguage} required>
                  <SelectTrigger id="language" className="w-full">
                    <div className="flex items-center">
                       <Languages className="mr-2 h-4 w-4 text-gray-500" />
                       <SelectValue placeholder="Select a language" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {state.message && (
                <p className={`text-sm text-center font-medium ${state.success ? 'text-green-600' : 'text-red-600'}`}>
                  {state.message}
                </p>
              )}
              <SubmitButton />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/auth/signin" className="font-medium text-green-600 hover:underline">
              Sign In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;