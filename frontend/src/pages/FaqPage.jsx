// src/pages/FaqPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import reactLogo from '../assets/react.svg';

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 pt-20 flex flex-col items-center">
      <div className="mb-4 self-start">
        <Link to="/" className="text-blue-500 hover:underline">← Back to Home</Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="flex flex-col items-center justify-center py-10">
        <img 
          src={reactLogo} 
          className="w-60 h-60 animate-spin-slow" 
          alt="React Logo" 
        />
        
        <p className="mt-8 text-xl text-center max-w-lg">
          All your questions will be answered by staring at the spinning React logo...
        </p>
        
        <p className="mt-4 text-gray-500 text-center">
          (That's how we solve all our problems too!)
        </p>
        <img src="/2Z0A3330.JPG" alt="MARTIN" className='mt-192'/>
      </div>
    </div>
  );
}