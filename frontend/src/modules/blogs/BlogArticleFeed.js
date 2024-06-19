import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PaginationNumeric from '../../components/PaginationNumeric';
import SearchBar from '../../components/Searchbar';
import getFontSize from '../../functions/ui/resolve-relative-font-size';
import useGetDocumentsByFieldValue from '../../hooks/firebase/use-doument-by-field-value';
import { colors, fonts } from '../../styles';
import {
  appThemeColor,
  screenPadding,
  smallCaptionTextGray,
} from '../../styles/partials';
import BlogCard from '../../components/BlogCard';
import { STATIC_BLOGS } from '../../constants/constants';

export const BlogIndexHeader = ({
  headerText = 'Entdecke Blogs',
  captionText = 'Hier findest du alles wissenswerte und bleibst Up to Date',
}) => {
  return (
    <React.Fragment>
      <View style={{ gap: 2, maxWidth: 320 }}>
        <Text style={[styles.title]}>{headerText}</Text>
        <Text style={[smallCaptionTextGray, { fontSize: getFontSize(16) }]}>
          {captionText}
        </Text>
        {/* Placeholder for Add Meetup Button */}
        {/* ... */}
      </View>
      {false && <SearchBar />}
      {/* Placeholder for Filter buttons */}
      {false && (
        <View style={styles.filtersContainer}>
          {/* Filter buttons would go here */}
          {/* ... */}
        </View>
      )}
    </React.Fragment>
  );
};

const BlogArticlesFeed = () => {
  const { documents, getDocumentsByValue, loading, error } =
    useGetDocumentsByFieldValue();
  useEffect(() => {
    getDocumentsByValue({
      collectionPath: 'Newsletter',
      fieldPath: 'public',
      value: true,
    });
  }, []);
  return (
    <View style={styles.container}>
      {/* Placeholder for Header */}
      {/* <Header /> */}

      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Placeholder for Page Header */}
          <BlogIndexHeader
            headerText="Newsletter und Blogs"
            captionText="Erfahre als erster alle wichtigen Neuigkeiten und Updates"
          />
          {/* Meetups Count */}
          <Text style={styles.meetupsCount}>
            {loading ? 'Lade Artikel...' : `${documents.length} Artikel`}
          </Text>

          {/* Error */}
          {error && (
            <Text style={styles.meetupsCount}>Etwas ist schiefgelaufen</Text>
          )}

          {/* Placeholder for MeetupsPosts */}
          {STATIC_BLOGS.map(blog => {
            const {
              coverImage,
              description,
              id,
              publisher,
              tags,
              title,
              total_comments,
              total_likes,
            } = blog;
            return (
              <BlogCard
                key={`${id}-${title}`}
                blogTitle={title}
                blogDescription={description}
                tags={tags}
                publisher={publisher}
                featuredImage={coverImage}
                likes={total_likes}
                comments={total_comments}
                id={id}
              />
            );
          })}
          {/* Placeholder for Pagination */}
          {STATIC_BLOGS.length > 10 && <PaginationNumeric />}
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
