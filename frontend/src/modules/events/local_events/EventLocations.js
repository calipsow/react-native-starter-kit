import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fbImage } from '../../../constants/constants';
import { colors } from '../../../styles';
import { appThemeColor, flexBoxRow } from '../../../styles/partials';

const LocationBadge = ({ province, navigation }) => {
  return (
    <View className="justify-center">
      <Pressable onPress={() => {}}>
        <View className="bg-slate-900 border-4 w-16 h-16">
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
      <Text numberOfLines={1} className="text-lg font-medium text-slate-200">
        {province.province}
      </Text>
    </View>
  );
};

const EventLocations = ({ navigation, route }) => {
  return (
    <View className="bg-slate-800 flex-1">
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
        <Text className="text-2xl text-center font-bold">
          More Places for Features
        </Text>

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
          {Array(3)
            .map((_, i) => ({
              province_image: fbImage,
              slug: 'image-example' + i,
              province: 'In amet culpa pariatur',
            }))
            .filter(itm => itm.province_image)
            .map((province, i) => (
              <LocationBadge
                navigation={navigation}
                key={i + province.slug}
                province={province}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  locationBadge: {
    borderRadius: 15,
    height: 150,
    width: 150,
  },
});

export default EventLocations;
