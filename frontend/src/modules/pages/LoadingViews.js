import { ActivityIndicator } from 'react-native-paper';
import ScreenWrapper from '../layouts/ScreenWrapper';
import { colors } from '../../styles';
import React from 'react';
import { smallCaptionTextGray } from '../../styles/partials';
import { Text } from 'react-native';

const LoadingView = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <ActivityIndicator
        size={'large'}
        color={colors.bluish}
        style={{ margin: 'auto' }}
      />
    </ScreenWrapper>
  );
};

export const LoadingFirebaseView = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <React.Fragment>
        <ActivityIndicator
          size={'large'}
          color={colors.bluish}
          style={{ margin: 'auto' }}
        />
        <Text
          style={[
            smallCaptionTextGray,
            { margin: 'auto', textAlign: 'center' },
          ]}
        >
          Einen Moment bitte..
        </Text>
      </React.Fragment>
    </ScreenWrapper>
  );
};

export default LoadingView;
