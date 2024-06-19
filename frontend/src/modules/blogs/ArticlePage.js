import React, { useContext } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Tag from '../../components/Tag';
import getFontSize from '../../functions/ui/resolve-relative-font-size';
import { colors, fonts, height, width } from '../../styles';
import {
  appThemeColor,
  bodyTextRegular,
  flexBoxRow,
  mediumHeadlineText,
  screenPadding,
  sectionTitleCreme,
} from '../../styles/partials';
import { SubmitButton } from '../../components/SubmitButton';
import { DividerCaption } from '../../components/DividerCaption';

import LightboxView from 'react-native-lightbox-v2';
import useImageDimensions from '../../hooks/utilities/use-size-from-sourced-image';
import { ModalContext } from '../provider/ModalProvider';
import useExternalLink from '../../hooks/utilities/use-external-link';
import { AvatarComponent } from '../../components/ArticlePreviewCard';

const documentData = {
  content_sections: [
    {
      section_title: 'New Stater Kit to ship apps fast!',
      section_content:
        'Magna laboris dolor veniam occaecat magna consectetur enim nulla nulla. Anim exercitation commodo irure nostrud Lorem reprehenderit est fugiat officia exercitation. Reprehenderit proident adipisicing excepteur excepteur et ad laborum deserunt consectetur in pariatur nostrud deserunt est.Officia non aliquip sint ea reprehenderit velit tempor proident eu.',
    },
  ],
  external_links: [
    {
      url: 'https://development.callipson.com',
      linkText: 'App Development',
      nodeID: 'hypF8Nio1Y',
    },
  ],
};

const SingleArticleView = ({ navigation, route }) => {
  const { article_id, event_id } = route.params;
  const img =
    'https://private-user-images.githubusercontent.com/86490046/341034341-b75f23d6-9ddc-4723-96ad-b6537427acc9.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTg3OTM0OTEsIm5iZiI6MTcxODc5MzE5MSwicGF0aCI6Ii84NjQ5MDA0Ni8zNDEwMzQzNDEtYjc1ZjIzZDYtOWRkYy00NzIzLTk2YWQtYjY1Mzc0MjdhY2M5LmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA2MTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNjE5VDEwMzMxMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWZjYWRlMDFhOTUwZWEwY2QxZjFkNDRjNmIyOWRmMTgzYWZjODBjOTdjMWY5NzUyNzcyYTY1MGIyMjQ4Mzc4MTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.1JrIvWMBVZMIUQEDyWuMP5Basp9YTWfqJ3xXMagxC_0';
  const { relativeHeight } = useImageDimensions(img);
  const { showModalConfirmation } = useContext(ModalContext);
  const { stateLessOpenLink } = useExternalLink();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[styles.container, { paddingBottom: 10, minHeight: height }]}
      >
        <View
          style={[
            flexBoxRow,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 9,
            },
            screenPadding,
          ]}
        >
          <AvatarComponent
            createdAt={'2024'}
            createdBy={'user546'}
            imageLink={
              'https://private-user-images.githubusercontent.com/86490046/341034341-b75f23d6-9ddc-4723-96ad-b6537427acc9.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTg3OTM0OTEsIm5iZiI6MTcxODc5MzE5MSwicGF0aCI6Ii84NjQ5MDA0Ni8zNDEwMzQzNDEtYjc1ZjIzZDYtOWRkYy00NzIzLTk2YWQtYjY1Mzc0MjdhY2M5LmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA2MTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNjE5VDEwMzMxMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWZjYWRlMDFhOTUwZWEwY2QxZjFkNDRjNmIyOWRmMTgzYWZjODBjOTdjMWY5NzUyNzcyYTY1MGIyMjQ4Mzc4MTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.1JrIvWMBVZMIUQEDyWuMP5Basp9YTWfqJ3xXMagxC_0'
            }
          />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              maxHeight: 80,
            }}
          >
            <SubmitButton
              style={{ margin: 'auto', borderColor: colors.brightRed }}
              textStyle={{ color: colors.lightRed }}
              text="Artikel Löschen"
              onPress={() => {}}
            />
          </View>
        </View>
        {/* Article Title */}
        <Text style={[mediumHeadlineText, screenPadding]}>
          Fancy Article About Ship Native
        </Text>
        {/* Tags Partials */}

        <View
          style={[
            flexBoxRow,
            { gap: 8, paddingHorizontal: 12, flexWrap: 'wrap', marginTop: 3 },
          ]}
        >
          {['shipnative', 'callipson']
            .filter(t => t)
            .map((tag, i) => (
              <Tag
                key={i + '---'}
                text={tag.toLowerCase()}
                containerStyles={{
                  backgroundColor: colors.gray + '6f',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: colors.lightGray,
                }}
                textStyles={{ color: colors.white }}
              />
            ))}
        </View>

        <View style={styles.content}>
          <React.Fragment>
            <LightboxView
              navigator={navigation}
              onClose={() => {}}
              onOpen={() => {}}
            >
              <Image
                src={
                  'https://private-user-images.githubusercontent.com/86490046/341034341-b75f23d6-9ddc-4723-96ad-b6537427acc9.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTg3OTM0OTEsIm5iZiI6MTcxODc5MzE5MSwicGF0aCI6Ii84NjQ5MDA0Ni8zNDEwMzQzNDEtYjc1ZjIzZDYtOWRkYy00NzIzLTk2YWQtYjY1Mzc0MjdhY2M5LmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA2MTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNjE5VDEwMzMxMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWZjYWRlMDFhOTUwZWEwY2QxZjFkNDRjNmIyOWRmMTgzYWZjODBjOTdjMWY5NzUyNzcyYTY1MGIyMjQ4Mzc4MTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.1JrIvWMBVZMIUQEDyWuMP5Basp9YTWfqJ3xXMagxC_0'
                }
                style={[
                  styles.postImage,
                  {
                    height:
                      height > relativeHeight
                        ? relativeHeight
                        : (relativeHeight / height) * 300,
                    objectFit: 'cover',
                    resizeMode: 'center',
                  },
                ]}
              />
            </LightboxView>
            {/* Resize Icon absolute position */}
            <View
              style={{
                top: 43,
                left: 0,
                width: width,
                position: 'absolute',
                padding: 0,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <Entypo
                name="resize-full-screen"
                size={20}
                style={{
                  marginBottom: 120,
                  marginRight: 5,
                  backgroundColor: appThemeColor.darkBlue,
                  borderRadius: 360,
                  padding: 6,
                  opacity: 0.78,
                }}
                color={colors.bluish}
              />
            </View>
          </React.Fragment>
          {documentData.content_sections.map((section, i) => (
            <View key={i + '--'}>
              {section.section_title ? (
                <Text
                  style={[
                    mediumHeadlineText,
                    screenPadding,
                    { fontSize: getFontSize(19) },
                  ]}
                >
                  {section.section_title.replace(
                    section.section_title.charAt(0),
                    section.section_title[0].toUpperCase(),
                  )}
                </Text>
              ) : null}
              <Text
                style={[
                  bodyTextRegular,
                  screenPadding,
                  { fontSize: getFontSize(16) },
                  !section.section_title && { marginTop: 15 },
                ]}
              >
                {section.section_content}
              </Text>
            </View>
          ))}
        </View>
        {/* Article Links (If Given) */}
        {documentData?.external_links &&
        Array.isArray(documentData?.external_links) ? (
          <View style={[{ gap: 5, paddingHorizontal: 12 }]}>
            <Text
              style={[
                sectionTitleCreme,
                { fontSize: getFontSize(18), color: colors.lightBlue },
              ]}
            >
              Weiterführende Links
            </Text>
            <View style={[flexBoxRow, { gap: 13, flexWrap: 'wrap' }]}>
              {documentData.external_links.map((extLink, i) => (
                <TouchableOpacity
                  key={i + extLink.nodeID}
                  onPress={() => {
                    showModalConfirmation(
                      'Webseite im Browser besuchen',
                      `Möchtest du zur Webseite ${extLink.url} wechseln?`,
                      async () => await stateLessOpenLink(extLink.url),
                    );
                  }}
                >
                  <Tag
                    text={extLink.linkText}
                    containerStyles={{
                      marginVertical: 0,
                      borderRadius: 5,
                      backgroundColor: colors.primary,
                      borderColor: colors.bluish,
                      paddingVertical: 12,
                      opacity: 0.75,
                    }}
                    textStyles={{ color: colors.bluish }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : null}
        <DividerCaption caption={'Thanks for reading'} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  secTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.textCreme,
    fontSize: getFontSize(22),
    marginVertical: 10,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%', // Die Breite des Bildes entspricht der Breite des Containers
    height: Dimensions.get('window').width * width < 900 ? 1.09 : 0.9, // Setze die Höhe des Bildes
    borderRadius: 0, // Füge bei Bedarf abgerundete Ecken hinzu
    objectFit: 'cover',
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: appThemeColor.darkBlue,
    paddingBottom: 20,
  },
  header: {
    padding: 20,
  },
  headerBlogText: {
    color: colors.lightGray,
    fontSize: getFontSize(30),
    fontFamily: fonts.primaryBold,
  },
  headerText: {
    paddingLeft: 10,
    color: colors.textLight,
    fontSize: getFontSize(22),
    fontFamily: fonts.primarySemiBold,
  },
  content: {
    paddingVertical: 5,
    paddingTop: 18,
  },
  title: {
    color: colors.white,
    fontSize: getFontSize(25),
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    color: colors.lightGray,
    fontSize: getFontSize(16),
    marginBottom: 10,
  },
  postContent: {
    color: colors.textLight,
    fontSize: getFontSize(18),
    opacity: 0.95,
    fontFamily: fonts.primaryRegular,
    marginBottom: 20,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 12,
  },
  input: {
    color: colors.textLightBlue,
    borderColor: '#333333',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default SingleArticleView;
