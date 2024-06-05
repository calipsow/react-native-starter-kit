import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNSButton from '../../../components/Button';
import { colors } from '../../../styles';
import {
  appThemeColor,
  flexBoxRow,
  mediumHeadlineText,
} from '../../../styles/partials';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';

const articles = [
  {
    id: 1,
    date: 'Nov 27, 2024',
    title: 'Weekly Update: Stellar X',
    imageUrl: 'https://i.ytimg.com/vi/efT8Tds7jOY/maxresdefault.jpg',
    icon: () => (
      <Entypo
        name="globe"
        size={55}
        color={colors.bluish}
        style={{ backgroundColor: colors.primaryLight, borderRadius: 360 }}
      />
    ),
  },
  {
    id: 2,
    date: 'Nov 22, 2024',
    title: 'Refreshed main menu navigation',
    imageUrl: 'https://i.ytimg.com/vi/efT8Tds7jOY/maxresdefault.jpg',
    icon: () => (
      <FontAwesome
        name="users"
        size={55}
        color={colors.bluish}
        style={{ backgroundColor: colors.primaryLight, borderRadius: 360 }}
      />
    ),
  },
  {
    id: 3,
    date: 'Nov 4, 2024',
    title: 'New cloud architecture',
    imageUrl: 'https://i.ytimg.com/vi/efT8Tds7jOY/maxresdefault.jpg',
    icon: () => (
      <FontAwesome5
        name="cart-plus"
        size={55}
        color={colors.bluish}
        style={{ backgroundColor: colors.primaryLight, borderRadius: 360 }}
      />
    ),
  },
  {
    id: 43,
    date: 'Nov 4, 2024',
    title: 'New cloud architecture',
    imageUrl: 'https://i.ytimg.com/vi/efT8Tds7jOY/maxresdefault.jpg',
    icon: () => (
      <FontAwesome5
        name="newspaper"
        size={55}
        color={colors.bluish}
        style={{ backgroundColor: colors.primaryLight, borderRadius: 360 }}
      />
    ),
  },
  {
    id: 453,
    date: 'Nov 4, 2024',
    title: 'New cloud architecture',
    imageUrl: 'https://i.ytimg.com/vi/efT8Tds7jOY/maxresdefault.jpg',
    icon: () => (
      <FontAwesome5
        name="tools"
        size={55}
        color={colors.bluish}
        style={{ backgroundColor: colors.primaryLight, borderRadius: 360 }}
      />
    ),
  },
  {
    id: 43,
    date: 'Nov 4, 2024',
    title: 'New cloud architecture',
    imageUrl: 'https://i.ytimg.com/vi/efT8Tds7jOY/maxresdefault.jpg',
    icon: () => (
      <FontAwesome5
        name="truck"
        size={55}
        color={colors.bluish}
        style={{ backgroundColor: colors.primaryLight, borderRadius: 360 }}
      />
    ),
  },
  {
    id: 4,
    date: 'Oct 31, 2024',
    title: 'Updates to the Filtering API',
    imageUrl: 'https://i.ytimg.com/vi/efT8Tds7jOY/maxresdefault.jpg',
    icon: () => (
      <Entypo
        name="windows-store"
        size={55}
        color={colors.bluish}
        style={{ backgroundColor: colors.primaryLight, borderRadius: 360 }}
      />
    ),
  },
  {
    id: 4,
    date: 'Oct 31, 2024',
    title: 'Updates to the Filtering API',
    imageUrl: 'https://i.ytimg.com/vi/efT8Tds7jOY/maxresdefault.jpg',
    icon: () => (
      <AntDesign
        name="apple1"
        size={55}
        color={colors.bluish}
        style={{
          backgroundColor: colors.primaryLight,
          borderRadius: 360,
          paddingBottom: 5,
          paddingHorizontal: 2,
        }}
      />
    ),
  },
];

const ContentCard = ({ index, article, cardAmount }) => {
  return (
    <View key={index} style={styles.article}>
      {/* Icon Absolute */}
      <View
        style={{
          ...styles.firstVertIcon,
          top: !index ? '-8%' : '-8%',
        }}
      >
        {article.icon()}
      </View>
      {cardAmount - 1 === index && (
        <View style={styles.verticalLinedIcon}>
          <Entypo
            name="shop"
            size={55}
            color={colors.white}
            style={{
              backgroundColor: appThemeColor.darkBlue,
              borderRadius: 360,
            }}
          />
        </View>
      )}
      <View style={styles.cardContent}>
        {/* Date */}
        <View style={styles.dateBadge}>
          {/*<Text style={styles.dateText}>{article.date}</Text>*/}
        </View>
        {/* Title */}
        <Text style={styles.title}>{article.title}</Text>

        <View style={styles.imageContainer}>
          <Image source={{ uri: article.imageUrl }} style={styles.image} />
        </View>
      </View>
      {/* Article text content here */}
    </View>
  );
};

const FooterSection = () => {
  return (
    <View style={styles.secondarySection}>
      <Text style={styles.welcomeText}>In one App 🎉</Text>
      <View style={styles.buttons}>
        <RNSButton
          caption="Blogs"
          primary
          bgColor={colors.primary}
          textColor={'white'}
        />
        <RNSButton caption="Shop" secondary bordered />
      </View>
    </View>
  );
};

const TestSection = () => {
  // Example data structure
  return (
    <ScrollView
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.headline}>
        Discover our Awesome{'\n'}Customer App 💫
      </Text>
      <View style={{ paddingLeft: '4%', paddingTop: 20 }}>
        <View style={styles.container}>
          {articles.map((article, index) => (
            <ContentCard
              article={article}
              index={index}
              cardAmount={articles.length}
              key={`${index}-`}
            />
          ))}
        </View>
        {/* Welcome subhaeder section */}
        <FooterSection />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  firstVertIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-8%',
    top: '-1%',
    zIndex: 999999,
  },
  verticalLinedIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-8%',
    zIndex: 999999,
    top: '135%',
  },
  cardContent: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: appThemeColor.darkBlue, // Approximate background color
  },
  headline: {
    ...mediumHeadlineText,
    padding: '4%',
    fontSize: getFontSize(32),
    marginTop: 50,
  },
  buttons: {
    ...flexBoxRow,

    marginVertical: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 60,
  },
  welcomeText: {
    ...mediumHeadlineText,
    fontSize: getFontSize(40),
    paddingLeft: 5,
    maxWidth: '75%',
  },
  secondarySection: {
    width: '100%',
    marginTop: '-23.4%',
    marginLeft: '12%',
  },
  container: {
    rowGap: 100,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 150,
    marginLeft: '4%',
    marginRight: '-4%',
    borderLeftWidth: 5,
    borderLeftColor: colors.secondary,
    borderStyle: 'solid',
    marginBottom: 50,
    maxWidth: '100%',
  },
  article: {
    backgroundColor: colors.primary, // Approximate color from the screenshots
    borderRadius: 15,
    borderColor: colors.primaryLight,
    borderWidth: 3,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderRightWidth: 1,
    borderLeftWidth: 0.4,
    width: '97%',
    marginLeft: '-15%',
  },
  dateBadge: {
    alignSelf: 'flex-start',
    borderRadius: 15,
    paddingHorizontal: 0,
    marginVertical: 5,
  },
  dateText: {
    color: colors.lightGray,
  },
  title: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    color: colors.bluish,
    marginVertical: 5,
    width: '82%',
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: 200, // Choose a fixed height or make it responsive
    resizeMode: 'cover',
  },
  // Add additional styles for the article text content
});

export default TestSection;
