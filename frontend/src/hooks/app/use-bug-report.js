/* eslint-disable react/display-name */
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import email from 'react-native-email';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { smallTextGray } from '../../styles/partials';
import { colors } from '../../styles';
import getFontSize from '../../functions/ui/resolve-relative-font-size';

// Kontext für den Provider
const BugReportContext = createContext({});

function useBugReport() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bugDescription, setBugDescription] = useState('');
  const [sendSuccessfully, setSendSuccessfully] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProcessStep, setCurrentProcessStep] = useState('');
  const captureRef = useRef(null); // Referenz für den Screenshot

  const createJSONSnapshot = async state => {
    setCurrentProcessStep('Writing Snapshot to a JSON file..');
    const filePath = `${RNFS.DocumentDirectoryPath}/stateSnapshot.json`;
    await RNFS.writeFile(filePath, JSON.stringify(state, null, 2), 'utf8');
    return filePath; // Rückgabe des Dateipfads
  };

  const createScreenshot = async () => {
    setCurrentProcessStep('Taking Snapshot..');
    const uri = await captureRef.current.capture();
    return uri; // Rückgabe des Screenshot-URI
  };

  const sendBugReport = useCallback(async (additionalText, state) => {
    setCurrentProcessStep('Starting Bug Report Workflow..');

    setIsProcessing(true);
    setSendSuccessfully(false);
    setError(null);

    try {
      const jsonFilePath = await createJSONSnapshot(state); // JSON-Datei erstellen
      const snapshotUri = await createScreenshot(); // Screenshot erstellen

      const to = ['development@callipson.com']; // Empfänger
      const subject = 'Bug Report';
      const body = `Fehlerbeschreibung: ${bugDescription}\nZusätzlicher Text: ${additionalText}`;

      const attachments = [
        {
          path: jsonFilePath,
          type: 'application/json',
          name: 'stateSnapshot.json',
        },
        { path: snapshotUri, type: 'image/jpeg', name: 'snapshot.jpg' },
      ];
      setCurrentProcessStep('Opening Email Program with Attachments..');

      await email(to, {
        subject,
        body,
        attachment: attachments,
      });

      setSendSuccessfully(true);
    } catch (err) {
      setError('Fehler beim Senden des Bug-Reports.');
    } finally {
      setIsProcessing(false);
      setCurrentProcessStep('');
    }
  });

  const BugReportProvider = React.memo(({ children }) => (
    <BugReportContext.Provider
      value={{ setIsModalVisible, sendBugReport, captureRef }}
    >
      <ViewShot ref={captureRef} style={{ flex: 1 }}>
        {/* Für Screenshot */}
        {children}
      </ViewShot>
    </BugReportContext.Provider>
  ));

  const BugReportButton = React.memo(
    ({ top = 10, right = 10, onPress = null }) => {
      const { setIsModalVisible } = useContext(BugReportContext);
      const handlePress = onPress || (() => setIsModalVisible(true));

      return (
        <TouchableOpacity
          style={[styles.button, { top, right }]}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Fehler melden 🐞</Text>
        </TouchableOpacity>
      );
    },
  );

  const ModalContent = React.memo(() => {
    const { sendBugReport, captureRef } = useContext(BugReportContext);

    return (
      <Modal
        style={{ zIndex: 99999 }}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={[smallTextGray, { paddingBottom: 5 }]}>
              Beschreibe den Fehler so genau wie möglich:
            </Text>
            <TextInput
              value={bugDescription}
              onChangeText={setBugDescription}
              multiline
              style={styles.textInput}
              placeholderTextColor="#9b9b9b"
              placeholder="Was ist passiert?"
            />
            <Button
              title="Senden"
              onPress={() => {
                setIsModalVisible(false);
                sendBugReport(bugDescription, captureRef?.current || {}); // Aufruf der Kernmethode
              }}
            />
          </View>
        </View>
      </Modal>
    );
  });

  return {
    sendSuccessfully,
    error,
    isProcessing,
    currentProcessStep,
    BugReportProvider, // Der Provider
    BugReportButton, // Schaltfläche für den Fehlerbericht
    ModalContent, // Formular für den Fehlerbericht
  };
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    padding: 5,
    backgroundColor: 'transparent',
    borderRadius: 25,
    zIndex: 99999,
    opacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontSize: getFontSize(16),
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 10,
  },
  textInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});

export default useBugReport;
