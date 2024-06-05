import React, { useContext } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import getFontSize from '../../../../functions/ui/resolve-relative-font-size';
import { colors } from '../../../../styles';
import { bodyTextRegular, screenPadding } from '../../../../styles/partials';
import { AccountContext } from '../../../AppView';
import EventCard from '../../partials/EventCard';

export const deleteEventIDFromAccount = (event_id, setAccountCtx) => {
  setAccountCtx(previous => ({
    ...previous,
    events_posted: previous.events_posted.filter(ev_id => ev_id !== event_id),
  }));
};

const PostedEventSection = () => {
  const [accountCtx, setAccountCtx] = useContext(AccountContext);
  // useResetScreen(() => setAccountCtx(accountCtx));

  if (!accountCtx)
    return (
      <ActivityIndicator
        size={'large'}
        color={colors.bluish}
        style={{ margin: 'auto' }}
      />
    );
  return (
    <View style={styles.container}>
      {accountCtx.events_posted.length ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={accountCtx.events_posted}
          renderItem={({ item }) => {
            // console.log(item);
            return (
              <EventCard
                event_id={item}
                onDelete={event_id =>
                  deleteEventIDFromAccount(event_id, setAccountCtx)
                }
              />
            ); // refreshing page
          }}
          keyExtractor={item => item}
          contentContainerStyle={styles.contentContainer}
          horizontal
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            ...screenPadding,
          }}
        >
          <Text
            style={[
              bodyTextRegular,
              {
                textAlign: 'center',
                fontSize: getFontSize(17),
                color: colors.bluish,
                opacity: 0.8,
              },
            ]}
          >
            Du hast keine aktiven Events mit der Community geteilt.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  image: {
    height: 300,
    resizeMode: 'cover',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    color: 'gray',
    margin: 3,
  },
  activeIndicator: {
    color: '#ffffff',
  },
  contentContainer: {
    padding: 5,
    columnGap: 1,
  },
});

export default PostedEventSection;
