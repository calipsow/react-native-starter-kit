import React, { createContext, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  SecondarySubmitButton,
  SubmitButton,
} from '../../components/SubmitButton';

import { colors, fonts, width } from '../../styles';
import { flexBoxRow } from '../../styles/partials';
import getFontSize from '../../helpers/resolve-relative-font-size';

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
                <View
                  style={styles.modalContent}
                  className="pt-4 pb-2 bg-slate-800 light:bg-white px-3"
                >
                  <Text className="text-center font-bold text-slate-200 text-[18px]">
                    {modalContent.title}
                  </Text>
                  <Text className="text-center font-semibold text-slate-300 text-[16px]">
                    {modalContent.captionText}
                  </Text>
                  {modalContent.type === 'alert' && (
                    <SubmitButton
                      text="OK"
                      onPress={() => {
                        if (modalContent.onSubmit) modalContent.onSubmit(); // Optional
                        hideModal(); // Modal schließen
                      }}
                    />
                  )}
                  {modalContent.type === 'confirmation' && (
                    <View
                      className="w-full px-5 justify-evenly"
                      style={[flexBoxRow]}
                    >
                      <SecondarySubmitButton
                        text="Cancel"
                        onPress={() => {
                          if (modalContent.onCancel) modalContent.onCancel(); // Optional
                          hideModal(); // Modal schließen
                        }}
                      />
                      <SubmitButton
                        text="Submit"
                        onPress={() => {
                          if (modalContent.onCustomEvent)
                            modalContent.onCustomEvent(); // Optional
                          hideModal(); // Modal schließen
                        }}
                      />
                    </View>
                  )}
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
    borderRadius: 24,
    width: 350 <= width - 20 ? 350 : width * 0.8 < 600 ? width * 0.8 : 600,
    alignItems: 'center',
    justifyContent: 'center',
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
