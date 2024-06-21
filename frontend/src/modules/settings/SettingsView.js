import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SETTINGS } from '../../constants/firestore-schemes';

import { appThemeColor } from '../../styles/partials';
import Panel from './partials/SectionPanel';
import getFontSize from '../../helpers/resolve-relative-font-size';

const Settings = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ rowGap: 0 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Text className="font-medium mt-4 mx-2 text-2xl">Settings</Text>
      {SETTINGS.map((setting, i) => {
        return (
          <Panel
            sectionDescription={setting.description}
            sectionTitle={setting.sectionTitle}
            subSections={setting.subSections}
            key={`${i}-`}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue, // Adjust the color to match your design
  },
  header: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    color: 'white', // Adjust the color to match your design
    paddingVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: 'transparent', // Adjust the color to match your design
    color: '#5b7f9d', // Adjust the color to match your design
    padding: 9,
    marginRight: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#5b7f9d', // Adjust the color to match your design
  },
  buttonPrimary: {
    backgroundColor: '#4f46e5', // Adjust the color to match your design
    color: 'white', // Adjust the color to match your design
    padding: 10,
    marginRight: 12,
    borderRadius: 4,
  },
});

export default Settings;
