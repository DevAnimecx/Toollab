import { useState, useEffect } from 'react';

interface CountryDetectionResult {
  country: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useCountryDetection = (): CountryDetectionResult => {
  const [country, setCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectCountry = async () => {
      // Check session storage first to avoid repeated API calls
      const cachedCountry = sessionStorage.getItem('user-country');
      if (cachedCountry) {
        setCountry(cachedCountry);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('https://ip-api.com/json/?fields=country');
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        const data = await response.json();
        if (data.country) {
          setCountry(data.country);
          sessionStorage.setItem('user-country', data.country);
        } else {
          throw new Error('Country not found in response');
        }
      } catch (err) {
        setError((err as Error).message);
        console.error("Country detection failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    detectCountry();
  }, []);

  return { country, isLoading, error };
};