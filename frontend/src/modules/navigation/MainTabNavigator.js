import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, width } from '../../styles';

import { hasOldHomeButton, isIOS } from '../../constants/constants';
import getFontSize from '../../functions/ui/resolve-relative-font-size';
import tabNavigationData from './tabNavigationData';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBarContainer,
      }}
    >
      {tabNavigationData.map((item, idx) => (
        <Tab.Screen
          key={`tab_item${idx + 1}`}
          name={item.name}
          component={item.component}
          options={{
            tabBarLabel: '',
            tabBarBadge: undefined,
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                {item.icon(focused)}
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: colors.primary,
    borderTopColor: colors.primaryDark,
    borderTopWidth: 1,
    paddingBottom:
      isIOS && hasOldHomeButton === false ? 15 : width > 1000 ? 15 : 0,
    height: isIOS && hasOldHomeButton === false ? 80 : 60,
  },
  tabBarItemContainer: {
    marginBottom: isIOS && hasOldHomeButton === false ? 10 : 0,
    borderWidth: 0,
    borderColor: 'white',
    borderStyle: 'solid',
    width: getFontSize(50),
    height: getFontSize(54),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
  },
});
