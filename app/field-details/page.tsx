"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scaling, Loader2, PlusCircle, XCircle } from 'lucide-react';

const FieldDetailsPage = () => {
  const router = useRouter();

  const [fields, setFields] = useState([{ id: 1, area: '' }]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [nextId, setNextId] = useState(2);

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      setCurrentUser(JSON.parse(userJson));
    } else {
      router.push('/auth/signup');
    }
  }, [router]);

  const handleFieldChange = (id: number, value: string) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, area: value } : field
    ));
  };

  const handleAddField = () => {
    setFields([...fields, { id: nextId, area: '' }]);
    setNextId(nextId + 1);
  };

  const handleRemoveField = (id: number) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setError("User not found. Please sign in again.");
      return;
    }

    setIsSubmitting(true);
    setError('');

    const validFields = fields.filter(field => field.area && parseInt(field.area) > 0);

    if (validFields.length === 0) {
      setError("Please add at least one field with a valid area.");
      setIsSubmitting(false);
      return;
    }

    try {
      const newFields = validFields.map(field => ({
        id: crypto.randomUUID(),
        userId: currentUser.id,
        area: parseInt(field.area, 10),
      }));

      const existingFields = JSON.parse(localStorage.getItem('fields') || '[]');
      const updatedFields = [...existingFields, ...newFields];
      localStorage.setItem('fields', JSON.stringify(updatedFields));
      
      router.push('/dashboard');

    } catch (err) {
      console.error('Failed to save field details:', err);
      setError('An error occurred while saving. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome, {currentUser.name}!</CardTitle>
          <CardDescription>Please add the land area for each of your fields.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={`area-${field.id}`}>Field {index + 1} Area (in acres)</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-grow">
                      <Scaling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input 
                        id={`area-${field.id}`}
                        name={`area-${field.id}`}
                        type="number" 
                        placeholder="e.g., 5" 
                        className="pl-10" 
                        value={field.area}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        required 
                      />
                    </div>
                    {fields.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveField(field.id)}>
                        <XCircle className="h-5 w-5 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <Button type="button" variant="outline" className="w-full" onClick={handleAddField}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Another Field
              </Button>

              {error && (
                <p className="text-sm text-center font-medium text-red-600">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving Fields...</>
                ) : ( 'Save Fields and Continue' )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldDetailsPage;