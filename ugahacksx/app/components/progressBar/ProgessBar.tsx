"use client";
import { useState, useEffect } from "react";

export default function StepTracker() {
  const [currentStep, setCurrentStep] = useState("Starting...");

  useEffect(() => {
    let eventSource = new EventSource("/api/pinata"); // Replace with your actual API route

    eventSource.onmessage = (event) => {
      const { step } = JSON.parse(event.data);
      setCurrentStep(step);
    };

    eventSource.onerror = () => {
      console.warn("🔴 Connection lost. Reconnecting...");
      
      // Retry connection after 3 seconds
      setTimeout(() => {
        eventSource = new EventSource("/api/pinata");
      }, 3000);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>Current Step:</h2>
      <p>{currentStep}</p>
    </div>
  );
}
