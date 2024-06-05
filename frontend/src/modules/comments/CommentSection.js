import React, { useRef } from 'react';

import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { height } from '../../styles';
const data = [
  {
    label: 'Facebook',
    icon: 'facebook',
    color: '#3b5998',
  },
  {
    label: 'Twitter',
    icon: 'twitter',
    color: '#38A1F3',
  },
  {
    label: 'Google+',
    icon: 'google-plus-official',
    color: '#DD4B39',
  },
  {
    label: 'Linkedin',
    icon: 'linkedin',
    color: '#0077B5',
  },
  {
    label: 'Dropbox',
    icon: 'dropbox',
    color: '#3d9ae8',
  },
  {
    label: 'Reddit',
    icon: 'reddit-alien',
    color: '#FF4301',
  },
  {
    label: 'Skype',
    icon: 'skype',
    color: '#00aff0',
  },
  {
    label: 'Pinterest',
    icon: 'pinterest',
    color: '#c8232c',
  },
  {
    label: 'Flickr',
    icon: 'flickr',
    color: '#ff0084',
  },
  {
    label: 'VK',
    icon: 'vk',
    color: '#4c75a3',
  },
  {
    label: 'Dribbble',
    icon: 'dribbble',
    color: '#ea4c89',
  },
  {
    label: 'Telegram',
    icon: 'send',
    color: '#0088cc',
  },
];
const CommentSection = () => {
  const refScrollable = useRef();
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => refScrollable.current.open()}
        style={styles.button}
      >
        <Text style={styles.buttonTitle}>TEXT INPUT</Text>
      </TouchableOpacity>
      <RBSheet
        ref={refScrollable}
        height={height * 0.7}
        openDuration={1000}
        draggable
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customStyles={{
          wrapper: { backgroundColor: 'transparent' },
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          draggableIcon: {
            width: 80,
          },
        }}
      >
        <View>
          <ScrollView>
            <View style={styles.gridContainer}>
              {data.map(grid => (
                <TouchableOpacity
                  key={grid.icon}
                  onPress={() => refScrollable.current.close()}
                  style={styles.gridButtonContainer}
                >
                  <View
                    style={[styles.gridButton, { backgroundColor: grid.color }]}
                  >
                    <FontAwesome name={grid.icon} style={styles.gridIcon} />
                  </View>
                  <Text style={styles.gridLabel}>{grid.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.inputContainer}>
            <MaterialIcons name="photo-camera" style={styles.inputIcon} />
            <MaterialIcons name="tag-faces" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              autoFocus
              placeholder="Write a comment..."
            />
            <MaterialIcons
              name="send"
              style={[styles.inputIcon, styles.inputIconSend]}
              onPress={() => {
                Keyboard.dismiss();
              }}
            />
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    marginBottom: 20,
  },
  gridButtonContainer: {
    flexBasis: '25%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridIcon: {
    fontSize: 30,
    color: 'white',
  },
  gridLabel: {
    fontSize: 14,
    paddingTop: 10,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    width: 150,
    backgroundColor: '#4EB151',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 3,
    margin: 10,
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    borderTopWidth: 1.5,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  inputIcon: {
    fontSize: 24,
    color: '#666',
    marginHorizontal: 5,
  },
  inputIconSend: {
    color: '#006BFF',
  },
  input: {
    flex: 1,
    height: 36,
    borderRadius: 36,
    paddingHorizontal: 10,
    backgroundColor: '#f1f1f1',
    marginHorizontal: 10,
  },
  messageContainer: {
    flex: 1,
    padding: 25,
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  message: {
    fontSize: 17,
    lineHeight: 24,
    marginVertical: 20,
  },
  messageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messageButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#3385ff',
    marginLeft: 10,
  },
  messageButtonText: {
    color: '#3385ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageButtonRight: {
    backgroundColor: '#3385ff',
  },
  messageButtonTextRight: {
    color: '#fff',
  },
});

export default CommentSection;
