"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Sprout, Menu } from 'lucide-react';

export default function Appbar(){
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Sprout className="h-8 w-8 text-green-600 mr-3" />
            <span className="text-2xl font-semibold text-gray-900">Fasal</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-green-600 font-medium">About</a>
            <a href="#features" className="text-gray-700 hover:text-green-600 font-medium">Features</a>
            <a href="#farmers" className="text-gray-700 hover:text-green-600 font-medium">For Farmers</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 font-medium">Contact</a>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Try Fasal
            </Button>
          </div>
          
          <div className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </div>
        </div>
      </div>
    </nav>
  );
};
