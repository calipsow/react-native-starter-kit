import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import { colors, width } from '../styles';
import { flexBoxRow, smallCaptionTextGray } from '../styles/partials';

export const LegalText = () => {
  const navigation = useNavigation();

  return (
    <View style={[flexBoxRow, { flexWrap: 'wrap' }]}>
      <Text
        style={[
          smallCaptionTextGray,
          { fontStyle: 'italic', maxWidth: width - 20 },
        ]}
      >
        Durch das Erstellen und Teilen von Beiträgen stimmst du den geltenden
        AGB&apos;s dieser App zu.
      </Text>
      <Pressable
        onPress={() =>
          navigation.navigate('Settings', {
            screen: 'Rechtliches Dokument',
            params: {
              document_id: 'license',
            },
          })
        }
      >
        <Text style={[{ color: colors.lightBlue }]}>Geschäftsbedingungen</Text>
      </Pressable>
    </View>
  );
};
