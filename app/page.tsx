
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  CloudRain, 
  BarChart2, 
  Calendar, 
  Droplets, 
  ArrowRight,
  Sprout,
  Wheat,
} from 'lucide-react';

const FasalLanding = () => {
  return (
    <div className="bg-white">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Know When to Plant.
              <br />
              <span className="text-green-600">Know When to Harvest.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Fasal helps farmers make better decisions by combining local weather data with your field's history. 
              No more guessing – just better crops and higher profits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Start Using Fasal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3">
                See How It Works
              </Button>
            </div>
          </div>
          
          
        </div>
      </section>

      {/* What Fasal Does */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Stop Relying on Luck. Start Using Data.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every farmer knows the struggle – when's the right time to plant? How much water do my crops really need? 
                When should I harvest for the best price?
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Fasal takes the guesswork out of farming. We analyze weather patterns, soil conditions, and market trends 
                specific to your area to give you clear, actionable advice.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Learn More About Our Approach
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What You Get:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Weekly weather forecasts tailored to your crops</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Irrigation recommendations based on soil moisture</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Harvest timing alerts for best market prices</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Pest and disease early warning system</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need, Nothing You Don't
            </h2>
            <p className="text-lg text-gray-600">
              Simple tools that actually help you farm better
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CloudRain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Weather Alerts</h3>
              <p className="text-gray-600 text-sm">
                Get notified about rain, drought, or extreme weather before it affects your crops
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Yield Tracking</h3>
              <p className="text-gray-600 text-sm">
                Track your harvest data over time and see what's working best for your fields
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Irrigation</h3>
              <p className="text-gray-600 text-sm">
                Know exactly when and how much to water based on weather and soil conditions
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Crop Calendar</h3>
              <p className="text-gray-600 text-sm">
                Plan your entire season with personalized planting and harvesting schedules
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Simple CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Wheat className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Grow Smarter?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of farmers who are already using Fasal to increase their profits
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
            Get Started with Fasal
          </Button>
          <p className="text-gray-500 text-sm mt-4">
            Free for your first season • No credit card required
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Questions?</h2>
            <p className="text-gray-600">We're here to help you succeed</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">1800-123-FASAL</p>
              <p className="text-gray-500 text-sm">Mon-Sat, 9 AM - 7 PM</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">WhatsApp Support</h3>
              <p className="text-gray-600">+91-98765-43210</p>
              <p className="text-gray-500 text-sm">Get instant help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Sprout className="h-6 w-6 text-green-500 mr-2" />
              <span className="text-lg font-semibold">Fasal</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Fasal. Helping farmers grow better.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FasalLanding;