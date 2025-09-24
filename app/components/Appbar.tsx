"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import { Menu, LogIn, LogOut } from 'lucide-react';

const AuthButton = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Local storage is only accessible on the client, so we use useEffect
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from local storage", error);
    }
    setIsLoading(false);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    router.push('/'); // Redirect to home page after signing out
  };

  if (isLoading) {
    return <Skeleton className="h-10 w-24" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          Welcome, {user.name}!
        </span>
        <Button onClick={handleSignOut} variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
      <Link href="/auth/signin">
        <LogIn className="mr-2 h-4 w-4" />
        Sign In / Sign Up
      </Link>
    </Button>
  );
};

export default function Appbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/Lg.png" 
              alt="Fasal Logo" 
              className="h-48 w-auto" 
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-green-600 font-medium">About</a>
            <a href="#features" className="text-gray-700 hover:text-green-600 font-medium">Features</a>
            <a href="#farmers" className="text-gray-700 hover:text-green-600 font-medium">For Farmers</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 font-medium">Contact</a>
            
            <AuthButton />
          </div>
          
          <div className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </div>
        </div>
      </div>
    </nav>
  );
};