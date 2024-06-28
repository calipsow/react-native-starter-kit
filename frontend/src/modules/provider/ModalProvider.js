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

const ModalContext = createContext({
  isModalShown: null,
  showModalAlert: function (title, captionText, onSubmit = null) {},
  showModalConfirmation: function (
    title = '',
    captionText = '',
    onCustomEvent = null,
    onCancel = null,
  ) {},
});

const ModalProvider = ({ children }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const showModalAlert = (title, captionText, onSubmit = null) => {
    setModalContent({
      title,
      captionText,
      onSubmit,
      type: 'alert',
    });
    setIsModalShown(true);
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
      type: 'confirmation',
    });
    setIsModalShown(true);
  };

  const hideModal = () => {
    setIsModalShown(false);
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
            <View style={styles.modalBackground}>
              <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
                <View
                  style={styles.modalContent}
                  className="pt-7 pb-3.5 bg-slate-800 light:bg-white px-3 rounded-2xl"
                >
                  <Text className="text-center font-bold text-slate-200 text-[18px]">
                    {modalContent.title}
                  </Text>
                  <Text className="text-center font-semibold text-slate-300 text-[16px] mb-2.5">
                    {modalContent.captionText}
                  </Text>
                  {modalContent.type === 'alert' && (
                    <SubmitButton
                      text="OK"
                      onPress={() => {
                        if (modalContent.onSubmit) modalContent.onSubmit();
                        hideModal();
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
                          if (modalContent.onCancel) modalContent.onCancel();
                          hideModal();
                        }}
                      />
                      <SubmitButton
                        text="Submit"
                        onPress={() => {
                          if (modalContent.onCustomEvent)
                            modalContent.onCustomEvent();
                          hideModal();
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
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
