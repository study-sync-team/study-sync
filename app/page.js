"use client"
import { useState, useEffect } from 'react';
import OnboardingOneSection from './components/section/onbaordingOneSection';
import { useMediaQuery } from 'react-responsive'
import DesktopWarning from './components/section/desktopWarning';

export default function Home() {

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }

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
        <main className="" style={{ height: "100vh", alignContent: "center" }}>
          <div className="d-flex align-justify-center justify-content-center">
            <h1 className="">
              <img src="/logo2.png" alt="Logo" style={{ width: "200px" }} />
            </h1>
          </div>
        </main>
      ) : (
        <>
          <Desktop>
            <DesktopWarning />
          </Desktop>

          <Mobile>
            <OnboardingOneSection />
          </Mobile>
        </>

      )}

      {/*}
          
          {*/}


    </>


  );
}
