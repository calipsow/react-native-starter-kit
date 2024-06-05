import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import getDocsFromCollection from '../../../functions/firestore/load-docs-from-collection-async';
import isPastInGermany from '../../../helpers/is-past-timestamp';
import replaceUmlauts from '../../../helpers/replace-umlaute';
import useResetScreen from '../../../hooks/screen/use-screen-reset';
import { colors, width } from '../../../styles';
import { appThemeColor, sectionTitleCreme } from '../../../styles/partials';
import { BackButton } from '../../blogs/ArticleIndex';
import FeedArticlePost from '../../blogs/UI/FeedPost';

const LocalEvent = ({ navigation, route }) => {
  const { province } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(province.province_image);

  useResetScreen(resetScreen);

  function resetScreen() {
    setImage(province.province_image);
    setData([]);
    setLoading(false);
    fetchDocs();
  }

  const fetchDocs = async () => {
    setLoading(true);
    var events = await getDocsFromCollection('Events');
    var provinceEvents = [];
    for (let event of events) {
      if (!event.approval.approved) continue;
      if (
        replaceUmlauts(event.location.province).toLowerCase().trim() !==
        replaceUmlauts(province.province).toLowerCase().trim()
      )
        continue;
      if (!event.start_time) continue;
      if (isPastInGermany(event.start_time.seconds * 1000)) continue;
      provinceEvents.push(event);
    }
    setData(provinceEvents);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <BackButton
        backbuttonTitle={`Events in ${province.province}`}
        navigation={navigation}
      />
      <ScrollView>
        <View
          style={[
            {
              padding: 5,
              gap: 8,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
            },
          ]}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: width,
              height: 190,
              borderRadius: 0,
              resizeMode: 'cover',
            }}
          />
        </View>
        {data.length ? (
          data.map((data, i) => (
            <FeedArticlePost
              key={i + data.name}
              creator_uid={data.creator_uid}
              data={data}
              description={data.description}
              title={data.name}
              type={'Event'}
              poster={data.event_poster}
              startDate={
                data.start_time?.seconds
                  ? new Date(data.start_time?.seconds * 1000).toLocaleString()
                  : data.start_time || '2024'
              }
            />
          ))
        ) : loading ? (
          <ActivityIndicator
            color={colors.bluish}
            size={'large'}
            style={{ margin: 'auto' }}
          />
        ) : (
          <Text
            style={[sectionTitleCreme, { textAlign: 'center', margin: 'auto' }]}
          >
            Keine neuen Events gefunden
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appThemeColor.darkBlue,
    flex: 1,
  },
});

export default LocalEvent;
