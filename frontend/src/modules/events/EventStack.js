import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { HEADER_BACKGROUND_IMAGE, isIOS } from '../../constants/constants';

import { colors, fonts } from '../../styles';
import { appThemeColor } from '../../styles/partials';
import { styles } from '../navigation/RootNavigation';
import { headerLeftComponent } from '../navigation/headerLeftComponent';
import EventLocations from './local_events/EventLocations';
import LocalEvent from './local_events/LocalEvent';
import getFontSize from '../../helpers/resolve-relative-font-size';
const EventStack = createStackNavigator();

const EventStacks = [
  {
    name: 'Geplante Veranstaltungen',
    component: EventLocations,
    headerLeft: headerLeftComponent,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerShown: false,
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
    },
  },
  {
    name: 'Lokale Veranstaltungen',
    component: LocalEvent,
    headerLeft: headerLeftComponent,
    headerBackground: { source: HEADER_BACKGROUND_IMAGE },
    headerShown: false,
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: getFontSize(18),
    },
  },
];

export function EventStackNavigator({ navigation, route }) {
  return (
    <EventStack.Navigator initialRouteName="Geplante Veranstaltungen">
      {EventStacks.map((item, idx) => (
        <EventStack.Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}
          component={item.component}
          options={{
            headerShown: item.headerShown,
            headerLeft: item.headerLeft,
            headerStyle: { backgroundColor: appThemeColor.darkBlue },
            headerBackground: !isIOS
              ? () => (
                  <Image
                    style={styles.headerImage}
                    source={item.headerBackground.source}
                  />
                )
              : undefined,
            headerTitleStyle: item.headerTitleStyle,
          }}
        />
      ))}
    </EventStack.Navigator>
  );
}

export default EventStackNavigator;
