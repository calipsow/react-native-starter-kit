import { StyleSheet, View } from 'react-native';
import { appThemeColor } from '../../styles/partials';

const ScreenWrapper = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const ScreenWrapperDefault = ({ children, styles }) => {
  <View
    style={[
      {
        flex: 1,
        backgroundColor: appThemeColor.darkBlue,
      },
      styles && styles,
    ]}
  >
    {children}
  </View>;
};

export default ScreenWrapper;
