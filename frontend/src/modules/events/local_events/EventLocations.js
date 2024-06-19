import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DEUTSCHLAND_BNDL } from '../../../constants/constants';
import { colors } from '../../../styles';
import {
  appThemeColor,
  flexBoxRow,
  screenPadding,
  sectionTitleCreme,
  smallCaptionTextGray,
} from '../../../styles/partials';
import { SubmitButton } from '../../../components/SubmitButton';
import { DividerCaption } from '../../../components/DividerCaption';

const LocationBadge = ({ province, navigation }) => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <Pressable
        onPress={() =>
          navigation.navigate('Lokale Veranstaltungen', {
            province: province,
          })
        }
      >
        <View style={styles.locationBadge}>
          <View style={{ justifyContent: 'center' }}>
            <View style={{ position: 'absolute', zIndex: -1, top: 0, left: 0 }}>
              <Image
                src={province.province_image}
                style={{
                  resizeMode: 'cover',
                  width: 150,
                  height: 150,
                  borderRadius: 15,
                }}
              />
            </View>
          </View>
        </View>
      </Pressable>
      <Text
        numberOfLines={1}
        style={[smallCaptionTextGray, { textAlign: 'center', maxWidth: 150 }]}
      >
        {province.province}
      </Text>
    </View>
  );
};

const EventLocations = ({ navigation, route }) => {
  return (
    <View style={{ backgroundColor: appThemeColor.darkBlue, flex: 1 }}>
      {/*<BackButton backbuttonTitle="Event Feed" navigation={navigation} />*/}

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: appThemeColor.darkBlue }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 12,
        }}
      >
        <Text
          style={[sectionTitleCreme, { textAlign: 'center', marginBottom: 0 }]}
        >
          Regionale Veranstaltungen
        </Text>
        <DividerCaption caption="Finde das nächste Event direkt vor deiner Haustür." />

        <View
          style={[
            flexBoxRow,
            {
              gap: 30,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 20,
              paddingTop: 19,
            },
          ]}
        >
          {DEUTSCHLAND_BNDL.filter(itm => itm.province_image).map(
            (province, i) => (
              <LocationBadge
                navigation={navigation}
                key={i + province.slug}
                province={province}
              />
            ),
          )}
        </View>
        <SubmitButton
          style={{ marginBottom: 20 }}
          onPress={() => navigation.navigate('Vergangene Veranstaltungen')}
          text="Vergangene Events anzeigen"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appThemeColor.darkBlue,
  },
  locationBadge: {
    borderRadius: 15,
    backgroundColor: colors.primary,
    height: 150,
    width: 150,
  },
});

export default EventLocations;
