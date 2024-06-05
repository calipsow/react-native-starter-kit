import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import RNSButton from '../../../components/Button';
import shuffleArray from '../../../helpers/shuffle-array';
import useFirestoreCollection from '../../../hooks/firebase/use-firestore-collection';
import { colors } from '../../../styles';
import { flexBoxRow, screenPadding } from '../../../styles/partials';
import FeedArticlePost from '../../blogs/UI/FeedPost';
import SubSectionLayout from './partials/SubSectionLayout';

const BlogSection = () => {
  const navigation = useNavigation();
  const eventsHandler = useFirestoreCollection();
  const articlesHandler = useFirestoreCollection();
  const blogsHandler = useFirestoreCollection();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('start to load content');
    eventsHandler.fetchDocuments({
      collectionPath: 'Events',
      maxItems: 15,
      pageIndex: 0,
      sortByTimeStamp: true,
      sortByTimeStampField: 'start_time',
    });
    articlesHandler.fetchDocuments({
      collectionPath: 'Newsletter',
      maxItems: 10,
      pageIndex: 0,
      sortedBy: 'public,desc',
    });
    blogsHandler.fetchDocuments({
      maxItems: 7,
      pageIndex: 0,
      sortedBy: 'public,asc',
      collectionPath: 'Blogs',
    });
  }, []);

  useEffect(() => {
    if (
      eventsHandler.documents.length &&
      articlesHandler.documents.length &&
      blogsHandler.documents.length
    ) {
      setLoading(false);
    }
  }, [eventsHandler, blogsHandler, articlesHandler]);

  return (
    <View style={{ width: '100%', paddingHorizontal: 0, paddingBottom: 20 }}>
      <SubSectionLayout
        subTitle={
          'Bleibe informiert über die neuesten deutschlandweiten Events'
        }
        title={'Aktuelle Veranstaltungen'}
      >
        {!loading && eventsHandler.documents.length ? (
          shuffleArray(
            eventsHandler.documents
              .filter(event => event.approval.approved)
              .filter((_, i) => i < 15),
          ).map((event, i) => (
            <FeedArticlePost
              creator_uid={event.creator_uid}
              key={event.event_id}
              description={event.description}
              id={event.event_id || ''}
              title={event.name}
              startDate={
                event?.start_time?.seconds
                  ? new Date(
                      event?.start_time?.seconds * 1000,
                    ).toLocaleDateString() +
                    ' ab ' +
                    new Date(event?.start_time?.seconds * 1000)
                      .toLocaleTimeString()
                      .split(':')
                      .slice(0, 2)
                      .join(':') +
                    ' Uhr'
                  : 'Website Event'
              }
              poster={event?.event_poster || ''}
              eventHost={event.organizer?.mail || event.organizer?.email}
              type={'Event'}
              data={event}
            />
          ))
        ) : (
          <ActivityIndicator size={'large'} color={colors.bluish} />
        )}
      </SubSectionLayout>

      {!loading && articlesHandler.documents.length && (
        <SubSectionLayout
          subTitle={
            'Tauche ein in die neusten Artikel von Zusammen Stehen Wir.'
          }
          title={'Neue ZSW Artikel'}
        >
          {articlesHandler.documents.map((article, i) => (
            <FeedArticlePost
              creator_uid={article.creator_uid}
              key={article.article_id}
              description={article.description}
              id={article.article_id || ''}
              title={article.article_title}
              startDate={
                article?.pub_date?.seconds
                  ? new Date(
                      article?.pub_date?.seconds * 1000,
                    ).toLocaleDateString() +
                    ' ab ' +
                    new Date(article?.pub_date?.seconds * 1000)
                      .toLocaleTimeString()
                      .split(':')
                      .slice(0, 2)
                      .join(':') +
                    ' Uhr'
                  : article?.pub_date || '2024'
              }
              poster={article?.poster}
              eventHost={article?.author || article.organizer?.email}
              type={'Article'}
              data={article}
            />
          ))}
        </SubSectionLayout>
      )}

      {/*!loading && blogsHandler.documents.length && (
        <SubSectionLayout
          subTitle={'Werde Teil einer großartigen Community.'}
          title={'Blogs und Updates'}
        >
          {blogsHandler.documents.map((blog, i) => (
            <View key={`${blog.blog_id}-${i}`} style={{ ...screenPadding }}>
              <BlogCard
                data={blog}
                blogTitle={blog.blog_title}
                blogDescription={blog.description}
                tags={blog.tags}
                publisher={blog.publisher}
                featuredImage={blog.blog_image}
                likes={blog.total_likes}
                comments={blog.total_comments}
                id={blog.blog_id}
                articles={blog.articles}
              />
            </View>
          ))}
        </SubSectionLayout>
      )*/}

      {!loading && (
        <SubSectionLayout
          title={'Entdecke mehr 🔍'}
          subTitle={'Schau auch bei unseren Event Feed vorbei.'}
        >
          <View
            style={[
              flexBoxRow,
              {
                gap: 10,
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                ...screenPadding,
              },
            ]}
          >
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
        </SubSectionLayout>
      )}
    </View>
  );
};

export default BlogSection;
