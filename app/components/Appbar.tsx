"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, LogIn, LogOut } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

// A dedicated component for the authentication button
const AuthButton = () => {
  const { data: session, status } = useSession();

  // Show a skeleton loader while the session is being fetched
  if (status === 'loading') {
    return <Skeleton className="h-10 w-24" />;
  }

  // If the user is signed in, show a "Sign Out" button
  if (session) {
    return (
      <Button onClick={() => signOut()} variant="destructive">
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    );
  }

  // If the user is not signed in, show a "Sign In" button
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
            {/* It's better to reference images from the public folder with a leading slash */}
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
            
            {/* The old button is replaced with our new dynamic AuthButton */}
            <AuthButton />
          </div>
          
          <div className="md:hidden">
            {/* You might want to include the AuthButton in your mobile menu as well */}
            <Menu className="h-6 w-6 text-gray-700" />
          </div>
        </div>
      </div>
    </nav>
  );
};