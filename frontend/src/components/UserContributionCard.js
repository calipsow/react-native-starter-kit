import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fbImage } from '../constants/constants';
import getFontSize from '../functions/ui/resolve-relative-font-size';
import { colors, fonts, width } from '../styles';
import { captionTxtTrpYellow, mediumHeadlineText } from '../styles/partials';

const Contribution = () => {
  return (
    <Pressable onPress={() => {}}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: fbImage }} style={styles.image} />
        <View style={[styles.header, { paddingBottom: 0 }]}>
          <Text numberOfLines={1} style={styles.contributionTitle}>
            {'1555 Kakfon Glen'}
          </Text>

          <TouchableWithoutFeedback onPress={() => {}}>
            <MaterialCommunityIcons
              name="delete"
              size={25}
              color={colors.brightRed + 'fe'}
              style={styles.contribDeleteIcon}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ paddingVertical: 5 }}>
          <Text style={styles.dateText}>24/07/2024 02:35:58</Text>

          <Text
            style={[
              captionTxtTrpYellow,
              { opacity: 0.7, fontSize: getFontSize(14) },
            ]}
          >
            Hecovono
          </Text>
        </View>

        <View style={styles.details}>
          {/* Contribution Views */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{`${45} Views`}</Text>
          </View>
          {/* Contribution commitments */}

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>20 Commits</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: width * 0.8,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
    borderRadius: 5,
    margin: 5,
    maxWidth: 500,
    paddingVertical: 20,
  },
  contributionTitle: {
    ...mediumHeadlineText,
    fontSize: getFontSize(18),
    marginBottom: 0,
    lineHeight: 22,
    paddingRight: 10,
  },
  contribDeleteIcon: {
    opacity: 1,
    position: 'absolute',
    top: -109,
    right: -8,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 6,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  dateText: {
    fontSize: getFontSize(15),
    opacity: 0.8,
    color: colors.lightBlue,
    fontFamily: fonts.primarySemiBold,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: getFontSize(14),
    fontWeight: '600',
    color: colors.bluish,
    fontFamily: fonts.primarySemiBold,
  },
  contentContainer: {
    padding: 10,
  },
});
export default Contribution;
