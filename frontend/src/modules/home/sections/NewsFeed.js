import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import RNSButton from '../../../components/Button';
import shuffleArray from '../../../helpers/shuffle-array';
import useFirestoreCollection from '../../../hooks/firebase/use-firestore-collection';
import { colors } from '../../../styles';
import { flexBoxRow, screenPadding } from '../../../styles/partials';
import FeedArticlePost from '../../blogs/UI/FeedPost';
import SubSectionLayout from '../../../components/SubSectionLayout';
import {
  ARTICLE_SCHEME,
  EVENT_SCHEME,
} from '../../../constants/firestore-schemes';

// TODO ADD SAMPLE DATA
const NewsFeed = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SubSectionLayout
        subTitle={'Some awesome news and updates'}
        title={'Whats New Section'}
      >
        {Array(8)
          .map(() => EVENT_SCHEME)
          .map((event, i) => (
            <FeedArticlePost
              creator_uid={event.creator_uid}
              key={event.event_id + i}
              description={event.description}
              id={event.event_id + i}
              title={event.name}
              startDate={event?.start_time.toDateString()}
              poster={event?.event_poster}
              eventHost={'user123'}
              type={'Event'}
              data={event}
            />
          ))}
      </SubSectionLayout>

      <SubSectionLayout
        subTitle={'Tauche ein in die neusten Artikel von Zusammen Stehen Wir.'}
        title={'Blog and Articles'}
      >
        {Array(5)
          .map(() => ARTICLE_SCHEME)
          .map((article, i) => (
            <FeedArticlePost
              creator_uid={article.creator_uid}
              key={article.article_id + i}
              description={article.description}
              id={article.article_id}
              title={article.article_title}
              startDate={article?.pub_date?.toDateString()}
              poster={article?.poster}
              eventHost={article?.author}
              type={'Article'}
              data={article}
            />
          ))}
      </SubSectionLayout>

      <SubSectionLayout
        title={'Entdecke mehr 🔍'}
        subTitle={'Schau auch bei unseren Event Feed vorbei.'}
      >
        <SeeMoreButtons />
      </SubSectionLayout>
    </View>
  );

  function SeeMoreButtons() {
    return (
      <View style={[flexBoxRow, styles.seeMoreBtnBox]}>
        <RNSButton
          caption="Beiträge"
          bordered
          secondary
          onPress={() => navigation.navigate('Blogs')}
        />
        <RNSButton
          caption="Kommende Events"
          bgColor={colors.primaryDark}
          onPress={() =>
            navigation.navigate('Events', { screen: 'Event Feed' })
          }
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 0,
    paddingBottom: 20,
  },
  seeMoreBtnBox: {
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    ...screenPadding,
  },
});

export default NewsFeed;
