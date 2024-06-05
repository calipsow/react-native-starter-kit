import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../styles';

const Rating = ({ stars = '55555' }) => (
  <View style={{ flexDirection: 'row', gap: 5, flexWrap: 'wrap' }}>
    {Array.from(stars).map((_, i) => (
      <FontAwesome
        key={`star-${i}`}
        name="star"
        color={colors.yellow}
        size={20}
      />
    ))}
  </View>
);

export default Rating;
