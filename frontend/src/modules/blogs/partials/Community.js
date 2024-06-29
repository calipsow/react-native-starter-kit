import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchBar from '../../../components/Searchbar';

import getFontSize from '../../../helpers/resolve-relative-font-size';
import { colors, fonts } from '../../../styles';
import { appThemeColor, smallCaptionTextGray } from '../../../styles/partials';
import MemberCard, { members } from '../../feed/partials/MemberCard';

export const SearchTopBar = ({ headerText = '', captionText = '' }) => {
  const [searchRes, setSearchRes] = useState([]);

  return (
    <React.Fragment>
      <View style={{ gap: 5 }}>
        {headerText && (
          <Text style={[styles.title, { maxWidth: 320 }]}>{headerText}</Text>
        )}
        <SearchBar
          placeholder="Search for users.."
          onSearchResults={results => setSearchRes(results)}
          collectionID={'Users'}
          fieldPaths={['username']}
        />
        {searchRes.map((result, i) => (
          <View key={i} className="w-full bg-slate-700 rounded-xl p-5">
            <Text className="text-xl font-semibold text-slate-100">
              {result['username']}
            </Text>
            <View className="flex-row w-full" style={{ gap: 5 }}>
              <Text className="text-sm font-semibold text-slate-300">
                Role: {result['role']}
              </Text>
              <Text className="text-sm font-semibold text-slate-300">
                UID: {result['uid']}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </React.Fragment>
  );
};

export const ProfileList = () => {
  return (
    <View className="p-4">
      <SearchTopBar />
      <TouchableOpacity className="bg-slate-600 p-2 rounded-lg mt-3 mb-1">
        <Text className="text-white text-center">+ Add Member</Text>
      </TouchableOpacity>
      {members.map((item, i) => (
        <MemberCard member={item} key={i} />
      ))}
    </View>
  );
};

export default function CommunityMembers() {
  return (
    <View className="flex-1 bg-slate-900">
      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <ProfileList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue,
  },
  content: {
    paddingVertical: 0,
    paddingHorizontal: 12,
  },
  title: {
    paddingTop: 20,
    fontSize: getFontSize(28),
    fontWeight: 'bold',
    color: colors.textLight,
    fontFamily: fonts.primaryBold,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  meetupsCount: {
    ...smallCaptionTextGray,
    marginTop: 12,
    fontSize: getFontSize(18),
    color: colors.lightBlue,
    marginBottom: 3,
    fontFamily: fonts.primarySemiBold,
  },
});
