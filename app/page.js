"use client"
import { useState, useEffect } from 'react';
import OnboardingOneSection from './components/section/onbaordingOneSection';

export default function Home() {

  const [loading, setLoading] = useState(true);

  // Simulating loading with a setTimeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds (adjust as needed)
    }, 3000); // 3 seconds

    // Clean up function
    return () => clearTimeout(timeout);
  }, []); // Runs only once on component mount


  return (

    <>

      {loading ? (
        <main className="mt-5 pt-5" style={{ height: "100%" }}>
          <div className="mt-5 pt-5" style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h1 className="mt-5 pt-4">
              <img src="/logo.png" alt="Logo" />
            </h1>
          </div>
        </main>
      ) : (
        <div>
          <OnboardingOneSection />
        </div>

      )}


    </>


  );
}
