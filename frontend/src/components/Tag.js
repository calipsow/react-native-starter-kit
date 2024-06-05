import { Text, View } from 'react-native';
import { tag, tagText } from '../styles/partials';

const Tag = ({ text, containerStyles, textStyles }) => (
  <View style={[tag, containerStyles && containerStyles]}>
    <Text style={[tagText, textStyles && textStyles]}>
      {text?.toLowerCase()}
    </Text>
  </View>
);

export default Tag;
