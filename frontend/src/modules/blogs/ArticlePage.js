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

import { colors, fonts, height, width } from '../../styles';
import {
  appThemeColor,
  bodyTextRegular,
  flexBoxRow,
  mediumHeadlineText,
  screenPadding,
  sectionTitleCreme,
} from '../../styles/partials';
import {
  DangerButton,
  SecondarySubmitButton,
  SubmitButton,
} from '../../components/SubmitButton';
import { DividerCaption } from '../../components/DividerCaption';

import LightboxView from 'react-native-lightbox-v2';
import useImageDimensions from '../../hooks/utilities/use-size-from-sourced-image';
import { ModalContext } from '../provider/ModalProvider';
import useExternalLink from '../../hooks/utilities/use-external-link';
import { AvatarComponent } from '../../components/ArticlePreviewCard';
import { fbImage } from '../../constants/constants';
import {
  CaptionWithLink,
  LinkText,
  SmallCaptionLink,
  TextCaptionWarning,
} from '../../components/TextCaptions';
import SingleTag from '../../components/SingleTag';
import getFontSize from '../../helpers/resolve-relative-font-size';

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
  const { article_id, event_id } = route.params; // pass id via route params to fetch actual content
  const { showModalConfirmation } = useContext(ModalContext);
  const { stateLessOpenLink } = useExternalLink();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full bg-slate-900 h-screen">
        <AvatarComponent
          createdAt={'2024'}
          createdBy={'user546'}
          imageLink={fbImage}
        />
        {/* Article Title */}
        <Text className="text-2xl text-slate-200 px-3 font-bold">
          Why Ship Native?
        </Text>
        {/* Tags Partials */}

        <View
          style={{
            columnGap: 8,
          }}
          className="px-3 py-1 flex-row"
        >
          {['shipnative', 'callipson']
            .filter(t => t)
            .map((tag, i) => (
              <SingleTag key={i} txt={tag.toUpperCase()} />
            ))}
        </View>

        <View className="px-3 py-2">
          <Image
            src={fbImage}
            className="rounded-xl w-full object-cover h-48"
          />
        </View>
        {documentData.content_sections.map((section, i) => (
          <View key={i + '--'}>
            {section.section_title && (
              <Text className="text-[18px] text-slate-200 px-3 font-semibold">
                {section.section_title.replace(
                  section.section_title.charAt(0),
                  section.section_title[0].toUpperCase(),
                )}
              </Text>
            )}
            <Text className="text-lg text-slate-400 px-3 font-normal">
              {section.section_content}
            </Text>
          </View>
        ))}
        {/* Article Links (If Given) */}
        {documentData?.external_links &&
          Array.isArray(documentData?.external_links) && (
            <View
              style={[flexBoxRow, { gap: 13, flexWrap: 'wrap' }]}
              className="pl-3"
            >
              {documentData.external_links.map((extLink, i) => (
                <SecondarySubmitButton
                  key={i + extLink.nodeID}
                  text={'Website · ' + extLink.linkText}
                  disabled={false}
                  onPress={() => {
                    showModalConfirmation(
                      'Visit website in browser',
                      `Go to this website?\n\n${extLink.url}`,
                      async () => await stateLessOpenLink(extLink.url),
                    );
                  }}
                />
              ))}
            </View>
          )}
      </View>
    </ScrollView>
  );
};

export default SingleArticleView;
