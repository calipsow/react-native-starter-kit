/* eslint-disable react/display-name */
import React, { useContext, useEffect, useState } from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import getFontSize from '../../functions/ui/resolve-relative-font-size';
import { colors, width } from '../../styles';
import { mediumHeadlineText } from '../../styles/partials';
import { SubmitButton } from '../../components/SubmitButton';
import { BugReportContext } from './BugReportProvider'; // Kontext importieren

const BugReportButton = React.memo(({ top = 5, right = 0, onPress = null }) => {
  const { setIsModalVisible } = useContext(BugReportContext);
  const handlePress =
    onPress ||
    (() => {
      setIsModalVisible(true);
    });

  return (
    <TouchableOpacity
      style={[styles.button, { top, right }]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>Bug Report</Text>
    </TouchableOpacity>
  );
});

const ModalContent = React.memo(() => {
  const {
    sendBugReport,
    isModalVisible,
    setBugDescription,
    setIsModalVisible,
  } = useContext(BugReportContext);
  const [bugDescriptionText, setBugDescriptionText] = useState('');

  const handleSubmit = () => {
    if (!bugDescriptionText) return;

    sendBugReport(bugDescriptionText);
    setBugDescription(bugDescriptionText);
  };

  useEffect(() => {
    if (!isModalVisible) {
      setBugDescriptionText('');
    }
  }, [isModalVisible]);

  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text
            style={[
              mediumHeadlineText,
              {
                textAlign: 'center',
                fontSize: getFontSize(19),
                marginBottom: 15,
                color: colors.white,
              },
            ]}
          >
            Beschreibe den Fehler
          </Text>
          <TextInput
            placeholder="Fehlerbeschreibung (min. 25 Zeichen)"
            placeholderTextColor="#9b9b9b"
            value={bugDescriptionText}
            onChangeText={text => setBugDescriptionText(text)}
            multiline
            style={styles.textInput}
          />
          <View style={[{ paddingTop: 40, gap: 8 }]}>
            <SubmitButton
              text={'Fehlerbericht senden'}
              onPress={() => bugDescriptionText.length >= 25 && handleSubmit()}
              style={[
                {
                  marginBottom: 5,
                  backgroundColor:
                    bugDescriptionText.trim().length > 10
                      ? colors.primaryDark
                      : colors.primaryDark + 'a0',
                  borderWidth: 0,
                },
              ]}
              textStyle={[
                {
                  textAlign: 'center',
                  color: colors.bluish,
                  fontWeight: 'bold',
                },
              ]}
            />
            <SubmitButton
              textStyle={[
                {
                  textAlign: 'center',
                  color: colors.bluish,
                  fontWeight: 'bold',
                },
              ]}
              style={{
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: colors.primaryDark,
              }}
              text="Schließen"
              onPress={() => {
                Keyboard.dismiss();
                setIsModalVisible(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 25,
    zIndex: 9999,
    opacity: 0.85,
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
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: colors.primary + 'ef',
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.primaryDark,
  },
  textInput: {
    minHeight: 50,
    borderColor: colors.primaryDark,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: colors.lightGray,
  },
});

export { BugReportButton, ModalContent };
