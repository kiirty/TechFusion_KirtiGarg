
import React, { useEffect } from 'react';
import { Leaf } from 'lucide-react';
import Header from '@/components/Header';
import DetectionSection from '@/components/DetectionSection';
import PredictionSection from '@/components/PredictionSection';
import ChatSection from '@/components/ChatSection';

const Index = () => {
  // Add a subtle fade-in effect when the page loads
  useEffect(() => {
    document.body.classList.add('animate-fade-in');
    return () => {
      document.body.classList.remove('animate-fade-in');
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sage-100/80 to-leaf-50/50 dark:from-sage-900/30 dark:to-leaf-900/20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                <Leaf className="h-8 w-8" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-6 max-w-4xl mx-auto tracking-tight animate-slide-down">
              Advanced Crop Disease Detection & Prediction
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-down" style={{ animationDelay: '100ms' }}>
              Protect your harvest with our cutting-edge AI technology. Upload images for instant disease detection
              or predict potential issues before they emerge.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-down" style={{ animationDelay: '200ms' }}>
              <button 
                onClick={() => {
                  document.getElementById('detection')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="premium-button"
              >
                Start Detection
              </button>
              
              <button 
                onClick={() => {
                  document.getElementById('prediction')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="secondary-button"
              >
                Disease Prediction
              </button>
            </div>
            
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up max-w-5xl mx-auto">
              <div className="glass-card p-6 rounded-xl">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Image-Based Detection</h3>
                <p className="text-muted-foreground">
                  Upload photos of your crops for instant AI-powered disease identification and treatment recommendations.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Predictive Analysis</h3>
                <p className="text-muted-foreground">
                  Forecast potential disease outbreaks based on environmental conditions, helping you take preventative action.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Expert AI Assistant</h3>
                <p className="text-muted-foreground">
                  Get answers to your agricultural questions with our specialized AI chatbot trained on crop disease knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <DetectionSection />
      <PredictionSection />
      <ChatSection />
      
      {/* Footer */}
      <footer className="bg-secondary/50 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-medium">CropGuard</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CropGuard. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
