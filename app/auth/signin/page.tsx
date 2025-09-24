"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Lock, Loader2 } from 'lucide-react';

const SignInPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Let NextAuth handle the redirect by providing a callbackUrl.
      // On success, the user will be sent to '/dashboard'.
      // On failure, an error will be thrown and caught below.
      const result = await signIn('credentials', {
        phone,
        password,
        redirect: true, // This is the default, but can be explicit
        callbackUrl: '/dashboard',
      });
      
      // This part will only be reached if there's an error and redirect is true
      if (result?.error) {
        setError('Invalid phone number or password. Please try again.');
        setIsSubmitting(false);
      }

    } catch (err) {
      // This catch block is less likely to be hit with redirect: true,
      // but is good for catching network errors or unexpected issues.
      console.error('Sign-in failed:', err);
      setError('An unexpected error occurred. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Enter your phone and password to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3 h-4 w-4 text-gray-500" />
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="10-digit mobile number" 
                    className="pl-10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-gray-500" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="********" 
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>
              
              {error && (
                <p className="text-sm text-center font-medium text-red-600">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/auth/signup" className="font-medium text-green-600 hover:underline">
              Sign Up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;