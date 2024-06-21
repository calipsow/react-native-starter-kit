import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PaginationNumeric from '../../components/PaginationNumeric';
import SearchBar from '../../components/Searchbar';

import useGetDocumentsByFieldValue from '../../hooks/firebase/use-doument-by-field-value';
import { colors, fonts } from '../../styles';
import {
  appThemeColor,
  screenPadding,
  smallCaptionTextGray,
} from '../../styles/partials';
import BlogCard from '../../components/BlogCard';
import { STATIC_BLOG, STATIC_BLOGS } from '../../constants/constants';
import getFontSize from '../../helpers/resolve-relative-font-size';

export const BlogIndexHeader = ({ headerText = '', captionText = '' }) => {
  const [searchRes, setSearchRes] = useState([]);

  return (
    <React.Fragment>
      <View style={{ gap: 5 }}>
        <Text style={[styles.title, { maxWidth: 320 }]}>{headerText}</Text>
        <SearchBar
          onSearchResults={results => setSearchRes(results)}
          collectionID={'Users'}
          fieldPaths={['username']}
        />
        <Text style={[smallCaptionTextGray, { fontSize: getFontSize(16) }]}>
          {`Searching in Users, against the username field`}
        </Text>
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

const BlogArticlesFeed = () => {
  return (
    <View className="flex-1 bg-slate-900">
      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <BlogIndexHeader
            headerText="Search Feature"
            captionText="Dolor laboris ad eiusmod quis."
          />
          {Array(3)
            .fill()
            .map((_, i) => (
              <BlogCard
                key={i}
                blogTitle={STATIC_BLOG.title}
                blogDescription={STATIC_BLOG.description}
                tags={STATIC_BLOG.tags}
                publisher={STATIC_BLOG.publisher}
                featuredImage={STATIC_BLOG.coverImage}
                likes={STATIC_BLOG.total_likes}
                comments={STATIC_BLOG.total_comments}
                id={STATIC_BLOG.id}
              />
            ))}

          <PaginationNumeric />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue, // Tailwind class: bg-white
    // for dark mode you can toggle backgroundColor
  },
  scrollView: {
    // This is equivalent to overflow-y-auto in Tailwind CSS
  },
  content: {
    paddingVertical: 0, // Tailwind class: p-4
    paddingHorizontal: 12,
    // Here you might handle the responsive max width with conditional styles or a wrapping View
  },
  title: {
    paddingTop: 20,
    fontSize: getFontSize(28), // Tailwind class: text-2xl
    fontWeight: 'bold', // Tailwind class: font-bold
    color: colors.textLight, // Tailwind class: text-slate-800
    fontFamily: fonts.primaryBold,
    // Add dark mode styles here if needed
  },
  filtersContainer: {
    // Style for filters container
    marginBottom: 20, // Tailwind class: mb-5
  },
  meetupsCount: {
    ...smallCaptionTextGray,
    marginTop: 12,
    fontSize: getFontSize(18), // Tailwind class: text-sm
    color: colors.lightBlue, // Tailwind class: text-slate-500
    marginBottom: 3, // Tailwind class: mb-4
    fontFamily: fonts.primarySemiBold, // Tailwind class: italic
    // Add dark mode styles here if needed
  },
  // ... Rest of your styles based on the Tailwind classes
});

export default BlogArticlesFeed;
