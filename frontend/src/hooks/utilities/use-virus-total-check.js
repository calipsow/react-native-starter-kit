import { useState, useCallback } from 'react';

const useVirusTotal = () => {
  const [isPending, setIsPending] = useState(false);
  const [isDangerous, setIsDangerous] = useState(false);
  const [apiError, setApiError] = useState('');
  const [virusTotalResult, setVirusTotalResult] = useState(null);

  const startURLSecurityLookup = useCallback(async url => {
    setIsPending(true);
    setIsDangerous(false);
    setApiError('');
    setVirusTotalResult(null);

    try {
      const headers = {
        'x-apikey':
          '3777165175e39d7086ff82f2c504ac699b7f150dd50d42d4c2ae1b988b0e06e5', // Ersetze 'YOUR_API_KEY' durch deinen echten API-Schlüssel
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      var response = await fetch('https://www.virustotal.com/api/v3/urls', {
        method: 'POST',
        headers: headers,
        body: `url=${encodeURIComponent(url)}`,
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      var data = await response.json();
      const { links } = data.data;
      response = await fetch(links.self, {
        method: 'GET',
        headers: headers,
      });
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      data = await response.json();
      const { attributes } = data.data;
      const attr = attributes.results;
      var badDetections = Object.keys(attr).filter(k => {
        let { result } = attr[k];
        return result !== 'unrated' && result !== 'clean';
      });
      /*console.log(
        attributes.results,
        badDetections.length ? `bad url` : 'clean',
      );*/

      // Die folgende Logik hängt davon ab, wie die Daten von VirusTotal strukturiert sind.
      // Dieses Beispiel geht davon aus, dass die API eine Eigenschaft liefert, die Gefährlichkeit angibt.
      // Du musst dies entsprechend der tatsächlichen API-Antwort anpassen.
      setVirusTotalResult(attributes.results);
      setIsDangerous(badDetections.length > 0);
    } catch (error) {
      setApiError(error.message);
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

export default useVirusTotal;
