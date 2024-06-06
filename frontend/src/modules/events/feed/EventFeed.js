import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreCollection from '../../../hooks/firebase/use-firestore-collection';
import { colors, fonts } from '../../../styles';
import {
  appThemeColor,
  flexBoxRow,
  mediumHeadlineText,
  screenPadding,
  smallCaptionTextGray,
} from '../../../styles/partials';
import { SubmitButton } from '../../../components/SubmitButton';
import FeedArticlePost from '../../blogs/UI/FeedPost';
import { setScrollPosition, triggerScrollToTop } from './feed-reducer/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ScreenWrapper from '../../app/ScreenWrapper';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';

export const useRefreshControl = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(
    ({ callbackAsync = null, callback = function () {} }) => {
      setRefreshing(true);
      if (typeof callbackAsync === 'function') {
        callbackAsync().finally(() => setRefreshing(false));
      } else {
        callback();
        setRefreshing(false);
      }
    },
    [],
  );

  return { onRefresh, refreshing };
};

export const TopBarMenu = ({
  navigation,
  title = 'Nächste Events',
  navigationRoute = 'Suche',
  navigationParams = {},
  actionButtonText = 'Suche',
  actionButtonIcon,
  hideActionButton = false,
}) => {
  return (
    <View
      style={[
        flexBoxRow,
        screenPadding,
        {
          paddingVertical: 8,
          opacity: 0.8,
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      ]}
    >
      <Text
        style={[
          mediumHeadlineText,
          { marginBottom: -2, fontSize: getFontSize(22) },
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
      {!hideActionButton ? (
        <TouchableOpacity
          onPress={() => navigation.navigate(navigationRoute, navigationParams)}
        >
          <View
            style={[
              flexBoxRow,
              {
                gap: 5,
                borderRadius: 8,
                backgroundColor: colors.primaryDark,
                paddingHorizontal: 15,
                paddingVertical: 3,
              },
            ]}
          >
            {typeof actionButtonIcon === 'function' ? (
              actionButtonIcon()
            ) : (
              <FontAwesome
                name="search"
                size={15}
                color={colors.white}
                style={{ margin: 'auto' }}
              />
            )}
            <Text
              style={[
                smallCaptionTextGray,
                {
                  fontSize: getFontSize(18),
                  color: '#fff',
                  fontFamily: fonts.primaryBold,
                },
              ]}
            >
              {actionButtonText}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ height: 27 }}></View>
      )}
    </View>
  );
};

const EventFeed = () => {
  const { scrollToTopTriggered } = useSelector(state => state.feed);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const flatListRef = useRef();
  const {
    fetchDocuments,
    loading,
    documents,
    hasMore,
    error,
    resetLoadedProgress,
  } = useFirestoreCollection();
  const dispatch = useDispatch();
  const { onRefresh, refreshing } = useRefreshControl();
  const navigation = useNavigation();

  // Funktion zum Nachladen von Daten
  const fetchMoreData = async ({ forceFetch = false }) => {
    if (loading && !forceFetch) return; // Verhindert mehrfache Ladevorgänge zur gleichen Zeit

    const feedContentMap = new Map();

    await fetchDocuments({
      collectionPath: 'Events',
      maxItems: 20,
      pageIndex: page,
      sortByTimeStamp: true,
      sortByTimeStampField: 'start_time',
    });

    let docs = [...data, ...documents];

    setData(
      docs.filter(doc => {
        if (!doc.approval.approved) return false;
        if (!feedContentMap.has(doc.id)) {
          feedContentMap.set(doc.id, doc);
          return true;
        } else return false;
      }),
    );
    setPage(page + 1);
  };

  //* Redux states and methods *//

  //* auto scroll to top if bottom gets pressed
  // Method to scroll to top if user presses on the event feed tab at bottom root bar
  const handleScroll = event => {
    const currentScrollPosition = event.nativeEvent.contentOffset.y;
    dispatch(setScrollPosition(currentScrollPosition));
  };

  const resetAndFetchFeed = () => {
    setData([]);
    setPage(0);
    resetLoadedProgress();
    fetchMoreData({ forceFetch: true }); // forces the refresh unless something is still loading
  };

  const runFeedRefresh = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    dispatch(triggerScrollToTop(false)); // Reset des Triggers
    onRefresh({
      callback: resetAndFetchFeed,
    });
  };
  // listener to scroll to top if the redux is triggered
  useEffect(() => {
    if (scrollToTopTriggered && flatListRef?.current) {
      runFeedRefresh();
    }
  }, [scrollToTopTriggered]);

  //* Redux states and methods ends *//

  useEffect(() => {
    if (data.length) return;
    if (!data.length && documents.length) {
      fetchMoreData({ forceFetch: true });
    } else if (!data.length && !documents.length && hasMore && !loading) {
      fetchMoreData({ forceFetch: true });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error(error);
      resetAndFetchFeed({ forceFetch: true });
    }
  }, [error]);

  return (
    <View style={{ flex: 1, backgroundColor: appThemeColor.darkBlue }}>
      <TopBarMenu navigation={navigation} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={runFeedRefresh} />
        }
        data={data.filter(doc => doc.article_id || doc.approval.approved)}
        renderItem={({ item }) => (
          <FeedArticlePost
            description={item.description}
            id={item.event_id || item.article_id || ''}
            title={item.name || item.title}
            startDate={
              item?.start_time?.seconds
                ? new Date(
                    item?.start_time?.seconds * 1000,
                  ).toLocaleDateString() +
                  ' - ' +
                  new Date(item?.start_time?.seconds * 1000)
                    .toLocaleTimeString()
                    .split(':')
                    .slice(0, 2)
                    .join(':') +
                  ' Uhr'
                : item.pub_date?.toString() || 'Website Event'
            }
            poster={item?.event_poster || item?.poster || ''}
            eventHost={
              item.organizer?.mail || item.organizer?.email || item.author
            }
            type={item.event_id ? 'Event' : item.article_id ? 'Article' : 'New'}
            creator_uid={item.creator_uid}
            data={item}
          />
        )}
        contentContainerStyle={{}}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.25} // Lädt mehr Inhalte, wenn 50% der Liste erreicht sind
        onEndReached={hasMore && fetchMoreData}
        ListFooterComponent={() =>
          hasMore && loading && !refreshing ? (
            <ScreenWrapper>
              <ActivityIndicator
                style={{ padding: 20, margin: 'auto' }}
                size="large"
                color={colors.bluish}
              />
            </ScreenWrapper>
          ) : (
            !hasMore &&
            !loading && (
              <React.Fragment>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    marginTop: 5,
                  }}
                >
                  <SubmitButton
                    onPress={resetAndFetchFeed}
                    text="Feed Aktualisieren"
                  />
                </View>
              </React.Fragment>
            )
          )
        }
      />
    </View>
  );
};

export default EventFeed;
