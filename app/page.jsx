"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Header from '../components/Header';
import Step1Gift from '../components/steps/Step1Gift';
import Step2Details from '../components/steps/Step2Details';
import Step3Feedback from '../components/steps/Step3Feedback';
import Step3Share from '../components/steps/Step3Share';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    gift_type: '',
    gift_design: '',
    gift_emoji: '',
    uploaded_image: '',
    theme_color: '#ff007f', // Default pink
    recipient_name: '',
    message_type: 'short',
    message: '',
    music_choice: 'none',
    donation_amount: null
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const updateForm = (key, value) => {
    if (key === 'gift_type') {
      setFormData(prev => ({ ...prev, [key]: value, gift_design: '' }));
    } else {
      setFormData(prev => ({ ...prev, [key]: value }));
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Gift
            formData={formData}
            updateForm={updateForm}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2Details
            formData={formData}
            updateForm={updateForm}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3Feedback 
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Step3Share
            formData={formData}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      padding: '0', 
      maxWidth: '100%',
      margin: '0 auto',
      minHeight: '100vh',
      background: '#fdf2f8'
    }}>
      <div className="page-container" style={{ padding: 0 }}>
        
        <Header step={step} totalSteps={4} />

        <div style={{ paddingBottom: '4rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}