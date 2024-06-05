import React, { createContext, useCallback, useRef, useState } from 'react';
import { Platform } from 'react-native';
import ViewShot from 'react-native-view-shot';
import sendMail from '../../functions/send-mail';

const BugReportContext = createContext({}); // Kontext erstellen

const BugReportProvider = ({ children }) => {
  const [sendSuccessfully, setSendSuccessfully] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProcessStep, setCurrentProcessStep] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bugDescription, setBugDescription] = useState(false);
  const captureRef = useRef(null);

  const sendBugReport = useCallback(
    async additionalText => {
      setIsProcessing(true);
      setSendSuccessfully(false);
      setError(null);
      setIsModalVisible(false);

      try {
        let err = await sendMail({
          body: `Füge Screenshots hinzu, wenn möglich.\n\nReport\n\nFehler Beschreibung:\n\n${additionalText}\n\nOS: ${
            Platform.OS
          }\n\nVersion: ${Platform.Version}\n\nTimestamp: ${new Date(
            new Date().getTime(),
          ).toLocaleString()}`,
          recipient: 'development@callipson.com',
          subject: 'Bug Report ZSW App',
        });

        if (err) throw Error('failed to sent email');

        setSendSuccessfully(true);
      } catch (err) {
        console.error(err);
        setError('Fehler beim Senden des Bug-Reports.');
      } finally {
        setIsProcessing(false);
      }
    },
    [bugDescription], // Memoization mit Abhängigkeit auf bugDescription
  );

  return (
    <BugReportContext.Provider
      value={{
        sendSuccessfully,
        error,
        isProcessing,
        currentProcessStep,
        sendBugReport,
        captureRef,
        isModalVisible,
        setIsModalVisible,
        setBugDescription,
      }}
    >
      <ViewShot ref={captureRef} style={{ flex: 1 }}>
        {children}
      </ViewShot>
    </BugReportContext.Provider>
  );
};

export { BugReportContext, BugReportProvider };
