import { useState, useCallback } from 'react';

/**
 * A custom React hook for performing URL security checks using the VirusTotal API.
 * It manages the API request lifecycle, including loading state, result processing, and error handling.
 *
 * @returns {Object} An object containing states for the API call status, results, and a function to initiate the URL check.
 */
const useVirusTotalURLCheck = () => {
  const [isPending, setIsPending] = useState(false); // Tracks whether the API request is in progress
  const [isDangerous, setIsDangerous] = useState(false); // Indicates whether the checked URL is dangerous
  const [apiError, setApiError] = useState(''); // Stores any error message from the API request
  const [virusTotalResult, setVirusTotalResult] = useState(null); // Holds the detailed result from the VirusTotal API

  /**
   * Performs a security lookup for the specified URL using the VirusTotal API.
   *
   * @param {string} url - The URL to be checked for security threats.
   */
  const startURLSecurityLookup = useCallback(async url => {
    setIsPending(true);
    setIsDangerous(false);
    setApiError('');
    setVirusTotalResult(null);

    try {
      // Set up API headers and request body
      const headers = {
        'x-apikey': 'YOUR_API_KEY',
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      // First, submit the URL to be scanned
      let response = await fetch('https://www.virustotal.com/api/v3/urls', {
        method: 'POST',
        headers: headers,
        body: `url=${encodeURIComponent(url)}`,
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      let data = await response.json();
      const { links } = data.data;

      // Then, retrieve the scan results
      response = await fetch(links.self, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      data = await response.json();
      const { attributes } = data.data;
      const results = attributes.results;

      // Determine if any scanners reported the URL as dangerous
      const badDetections = Object.keys(results).filter(key => {
        const result = results[key].result;
        return result !== 'unrated' && result !== 'clean';
      });

      setVirusTotalResult(results);
      setIsDangerous(badDetections.length > 0);
    } catch (error) {
      setApiError(`Error: ${error.message}`);
    } finally {
      setIsPending(false);
    }
  }, []);

  return {
    isPending,
    isDangerous,
    apiError,
    virusTotalResult,
    startURLSecurityLookup,
  };
};

export default useVirusTotalURLCheck;
