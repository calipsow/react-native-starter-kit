import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import getDocsFromCollection from '../../../functions/firestore/load-docs-from-collection-async';
import sortObjectArrayByDate from '../../../functions/firestore/timestamp-based-sort';
import isPastInGermany from '../../../helpers/is-past-timestamp';
import { colors } from '../../../styles';
import { appThemeColor } from '../../../styles/partials';
import { BackButton } from '../../blogs/ArticleIndex';
import FeedArticlePost from '../../blogs/UI/FeedPost';

const PastEvents = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [shownData, setShownData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const batchSize = 20; // Anzahl der Elemente, die pro "Batch" geladen werden sollen

  const fetchDocs = async () => {
    if (loading) return;
    setLoading(true);
    var events = await getDocsFromCollection('Events');
    const filter = new Map();
    var provinceEvents = [];
    for (let event of events) {
      if (filter.has(event.id)) continue;
      filter.set(event.id, event);
      provinceEvents.push(event);
    }
    const sortedEvents = sortObjectArrayByDate({
      property: 'start_time',
      dataset: provinceEvents
        .filter(ev => ev.start_time)
        .filter(ev => isPastInGermany(ev.start_time.seconds * 1000)),
    });
    setData(
      sortedEvents.pastEvents.concat(
        !sortedEvents.nullEvents.length
          ? provinceEvents.filter(ev => !ev.start_time)
          : sortedEvents.nullEvents,
      ),
    );
    setShownData(sortedEvents.pastEvents.slice(0, batchSize));
    setHasMore(sortedEvents.pastEvents.length > batchSize);
    setLoading(false);
  };

  const fetchMoreData = () => {
    if (!hasMore || loading) return;
    setLoading(true);
    setTimeout(() => {
      const nextItems = data.slice(
        shownData.length,
        shownData.length + batchSize,
      );
      setShownData(shownData.concat(nextItems));
      setHasMore(shownData.length + nextItems.length < data.length);
      setLoading(false);
    }, 1000 * 2);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <View style={styles.container}>
      <BackButton backbuttonTitle="Vergangene Events" navigation={navigation} />

      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        data={data.filter(doc => doc.approval.approved)}
        renderItem={({ item }) => (
          <FeedArticlePost
            creator_uid={item.creator_uid}
            data={item}
            description={item.description}
            title={item.name}
            type={'Event'}
            poster={item.event_poster}
            startDate={
              item.start_time?.seconds
                ? new Date(item.start_time?.seconds * 1000).toLocaleString()
                : item.start_time || '2024'
            }
          />
        )}
        contentContainerStyle={{}}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.25} // Lädt mehr Inhalte, wenn 50% der Liste erreicht sind
        onEndReached={hasMore && fetchMoreData}
        ListFooterComponent={() =>
          loading ? (
            <ActivityIndicator size="large" color={colors.bluish} />
          ) : (
            !hasMore && <Text>No More Event found</Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appThemeColor.darkBlue,
    flex: 1,
  },
});

export default PastEvents;
