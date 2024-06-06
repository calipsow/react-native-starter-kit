import React, { createContext, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import getFontSize from '../../functions/ui/resolve-relative-font-size';
import { colors, fonts, width } from '../../styles';
import {
  bodyTextRegular,
  flexBoxRow,
  mediumHeadlineText,
} from '../../styles/partials';
import { SubmitButton } from '../../components/SubmitButton';

// create documentation
const ModalContext = createContext({
  isModalShown: null,
  showModalAlert: function (title, captionText, onSubmit = null) {},
  showModalConfirmation: function (
    title = '',
    captionText = '',
    onCustomEvent = null,
    onCancel = null,
  ) {},
}); // Kontext erstellen

const ModalProvider = ({ children }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const showModalAlert = (title, captionText, onSubmit = null) => {
    setModalContent({
      title,
      captionText,
      onSubmit,
      type: 'alert', // Modal-Typ bestimmen
    });
    setIsModalShown(true); // Modal anzeigen
  };

  const showModalConfirmation = (
    title = '',
    captionText = '',
    onCustomEvent,
    onCancel = null,
  ) => {
    setModalContent({
      title,
      captionText,
      onCustomEvent,
      onCancel,
      type: 'confirmation', // Modal-Typ bestimmen
    });
    setIsModalShown(true); // Modal anzeigen
  };

  const hideModal = () => {
    setIsModalShown(false); // Modal ausblenden
  };

  return (
    <ModalContext.Provider
      value={{ isModalShown, showModalAlert, showModalConfirmation }}
    >
      {children}
      {isModalShown && (
        <Modal
          transparent={true}
          visible={isModalShown}
          onRequestClose={hideModal}
        >
          <TouchableWithoutFeedback onPress={hideModal}>
            {/* Hintergrund-Klick */}
            <View style={styles.modalBackground}>
              <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
                {/* Modal nicht schließen */}
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>{modalContent.title}</Text>

                  <Text style={[bodyTextRegular, { textAlign: 'center' }]}>
                    {modalContent.captionText}
                  </Text>
                  {modalContent.type === 'alert' ? (
                    <SubmitButton
                      text="OK"
                      onPress={() => {
                        if (modalContent.onSubmit) modalContent.onSubmit(); // Optional
                        hideModal(); // Modal schließen
                      }}
                      style={{
                        width: 121,
                        marginTop: 12,
                        backgroundColor: colors.primaryDark,
                      }}
                      textStyle={{
                        ...mediumHeadlineText,
                        fontSize: getFontSize(15),
                        marginBottom: 0,
                      }}
                    />
                  ) : null}
                  {modalContent.type === 'confirmation' ? (
                    <View
                      style={[
                        flexBoxRow,
                        {
                          gap: 8,
                          marginTop: 12,
                          justifyContent: 'space-between',
                        },
                      ]}
                    >
                      <SubmitButton
                        text="Abbrechen"
                        onPress={() => {
                          if (modalContent.onCancel) modalContent.onCancel(); // Optional
                          hideModal(); // Modal schließen
                        }}
                        style={{ width: 121 }}
                      />
                      <SubmitButton
                        text="Bestätigen"
                        onPress={() => {
                          if (modalContent.onCustomEvent)
                            modalContent.onCustomEvent(); // Optional
                          hideModal(); // Modal schließen
                        }}
                        style={{
                          width: 121,
                          backgroundColor: colors.primaryDark,
                        }}
                        textStyle={{
                          ...mediumHeadlineText,
                          fontSize: getFontSize(15),
                          marginBottom: 0,
                        }}
                      />
                    </View>
                  ) : null}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparenter Hintergrund
  },
  modalContent: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    width: 350 <= width - 20 ? 350 : width * 0.8 < 600 ? width * 0.8 : 600,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.primaryDark,
    gap: 8,
  },
  modalTitle: {
    fontSize: getFontSize(18),
    textAlign: 'center',
    color: colors.bluish,
    fontFamily: fonts.primaryBold,
  },
});

export { ModalContext, ModalProvider };
