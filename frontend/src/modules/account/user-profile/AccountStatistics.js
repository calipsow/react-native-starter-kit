import React, { useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  MAX_SCORE,
  SCORE_BOARD_SUBTITLES,
  isIOS,
} from '../../../constants/constants';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import { colors, fonts } from '../../../styles';
import {
  appThemeColor,
  bodyTextRegular,
  grayCaption,
  mediumHeadlineText,
  screenPadding,
} from '../../../styles/partials';
import ScreenWrapper from '../../app/ScreenWrapper';
import { BackButton } from '../../blogs/ArticleIndex';

import useAccountStatistics from '../../../hooks/account/use-account-statistics';
import AccountMeta from './partials/AccountMeta';
import { EventCard, Menu } from './partials/MenuItems';
import { AccountContext } from '../../AppView';
import { ModalContext } from '../../provider/ModalProvider';
import CircularChart from '../../../components/CircularChart';
import { useDependencyLogger } from '../../../hooks/dev/use-effect-logger';
import getDateFromToday from '../../../helpers/date-time';

const UserStatisticsView = ({ navigation, route }) => {
  const { user_uid } = route.params;
  const [accountCtx] = useContext(AccountContext);
  const { showModalAlert } = useContext(ModalContext);
  const {
    accountData,
    accountScores,
    isProcessing,
    resolveAccountStatistics,
    statistics,
  } = useAccountStatistics();

  useDependencyLogger(false, statistics);

  useEffect(() => {
    if (!statistics && !isProcessing) {
      resolveAccountStatistics(user_uid);
    }
  }, []);

  if (!accountData || !statistics)
    return (
      <ScreenWrapper>
        <ActivityIndicator
          size={'small'}
          style={{ margin: 'auto' }}
          color={colors.bluish}
        />
      </ScreenWrapper>
    );

  return (
    <View style={styles.container}>
      {!isIOS && (
        <BackButton
          styles={{
            paddingHorizontal: screenPadding.paddingHorizontal,
          }}
          navigation={navigation}
          backbuttonTitle={`${
            accountData.username?.trim() || accountData.displayName?.trim()
          } · Statistiken`}
        />
      )}
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={accountData.events_posted}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={() =>
          accountScores ? (
            <>
              <AccountMeta userData={accountData} />
              <Menu userStatistics={statistics} />
              {Object.entries(accountScores)
                .filter(([prop, value]) => value)
                .map(([prop, value], i) => (
                  <CircularChart
                    key={i + prop}
                    DATA={[true, value < MAX_SCORE ? true : false]
                      .filter(_ => _)
                      .map((_, i) => ({
                        name: `${value > 10 ? 10 : value} von 10\n"${
                          SCORE_BOARD_SUBTITLES[prop]['short_name']
                        }"`,
                        value: {
                          '0': value > 10 ? 10 : value,
                          '1': MAX_SCORE - value,
                        }[`${i}`],
                        color: !i ? colors.green : colors.bluish + 'e0',
                      }))}
                    calculationRange={{ start: -119, end: 120 }}
                    maxValue={MAX_SCORE}
                    minValue={0}
                    givenValue={value > 10 ? 10 : value}
                    label={{
                      labelTextStyles: {
                        fontSize: getFontSize(20),
                        lineHeight: 22,
                        opacity: 1,
                      },
                      subLabelTextStyle: {
                        fontSize: getFontSize(14),
                        fontFamily: fonts.primaryRegular,
                        paddingHorizontal: 10,
                      },
                      title: `${SCORE_BOARD_SUBTITLES[prop]['readable_name']}`,
                      subLabelText:
                        `${getDateFromToday(30)} - ${new Date(
                          Date.now(),
                        ).toLocaleDateString()}\n\n` +
                        SCORE_BOARD_SUBTITLES[prop]['explain'],
                    }}
                  />
                ))}

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 30,
                }}
              >
                <Text
                  numberOfLines={2}
                  style={[
                    mediumHeadlineText,
                    {
                      fontSize: getFontSize(16),
                      margin: 'auto',
                      textAlign: 'center',
                      maxWidth: 300,
                    },
                  ]}
                >{`Von ${
                  accountData.username?.trim() ||
                  accountData.displayName?.trim() ||
                  'einem Nutzer'
                } erstellte Veranstaltungen`}</Text>
                <Text
                  style={[
                    grayCaption,
                    {
                      textAlign: 'center',
                      fontSize: getFontSize(14),
                      maxWidth: 320,
                    },
                  ]}
                >
                  {'Erstellte Beiträge insgesamt'}
                </Text>
              </View>

              {!accountData.events_posted.length && (
                <ScreenWrapper>
                  <Text
                    numberOfLines={3}
                    style={[
                      mediumHeadlineText,
                      {
                        fontSize: getFontSize(16),
                        margin: 'auto',
                        textAlign: 'center',
                        marginTop: 30,
                        maxWidth: 300,
                      },
                    ]}
                  >{`${accountData.username} hat noch keine Veranstaltungen geteilt.`}</Text>
                </ScreenWrapper>
              )}
            </>
          ) : (
            <View
              style={{
                margin: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 30,
              }}
            >
              <ActivityIndicator
                size={'large'}
                style={{ margin: 'auto' }}
                color={colors.bluish}
              />
              <Text
                style={[
                  bodyTextRegular,
                  {
                    textAlign: 'center',
                    margin: 'auto',
                    fontSize: getFontSize(17),
                  },
                ]}
              >
                Lade Statistiken
              </Text>
            </View>
          )
        }
        renderItem={({ item, index }) => (
          <View
            style={{
              gap: 8,
              paddingVertical: 8,
              paddingTop: 0,
            }}
          >
            <EventCard event_id={item} key={item + index} />
          </View>
        )}
        contentContainerStyle={{
          backgroundColor: appThemeColor.darkBlue,
          paddingTop: 0,
          paddingHorizontal: screenPadding.paddingHorizontal,
          paddingBottom: 50,
        }}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue,
    paddingTop: 0,
  },
});

export default UserStatisticsView;
