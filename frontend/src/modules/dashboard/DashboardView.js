import { Text } from 'react-native';
import ScreenWrapper from '../app/ScreenWrapper';
import { mediumHeadlineText } from '../../styles/partials';
import useFirestoreCollection from '../../hooks/firebase/use-firestore-collection';
import { useContext } from 'react';
import { AccountContext } from '../AppView';

const DashBoardView = ({ navigation, route }) => {
  const userCollection = useFirestoreCollection();
  const [accountCtx] = useContext(AccountContext);

  return (
    <ScreenWrapper>
      <Text style={[mediumHeadlineText, { textAlign: 'center' }]}>
        ZSW User Ranking
      </Text>
    </ScreenWrapper>
  );
};

export default DashBoardView;
