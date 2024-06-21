import { ToastProvider } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { colors } from '../../styles';
import getFontSize from '../../helpers/resolve-relative-font-size';

const ToastProviderWrapper = ({ children }) => (
  <ToastProvider
    successColor={colors.primaryDark}
    dangerColor={colors.secondary}
    warningColor={colors.primaryDark}
    normalColor={colors.primaryDark}
    icon={<Entypo name="info-with-circle" size={24} color="white" />}
    successIcon={<AntDesign name="checkcircle" size={24} color="white" />}
    dangerIcon={<AntDesign name="exclamationcircle" size={24} color="white" />}
    warningIcon={<Entypo name="warning" size={24} color="white" />}
    textStyle={{
      fontSize: getFontSize(14),
      opacity: 1,
      color: colors.white,
      marginRight: 15,
    }}
  >
    {children}
  </ToastProvider>
);

export default ToastProviderWrapper;
