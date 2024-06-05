import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RNSButton from '../../../components/Button';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import useAuthState from '../../../hooks/auth/use-auth-state';
import useDeleteDocumentIfAdmin from '../../../hooks/firebase/use-delete-document';
import useFetchPublicUserData from '../../../hooks/firebase/use-fetch-public-user-data';
import useUpdateDocumentField from '../../../hooks/firebase/use-update-document-field';
import useTryToExtractCreatedBy from '../../../hooks/helper/use-extract-created-by';
import useBroadcastPushNotification from '../../../hooks/notifications/use-send-notification';
import { colors, fonts } from '../../../styles';
import {
  bodyTextRegular,
  flexBoxRow,
  grayCaption,
  smallCaptionTextGray,
  smallTextGray,
} from '../../../styles/partials';
import useDeleteEvent from '../../../hooks/workflows/use-delete-event';

export const AvatarComponent = ({
  createdBy = {},
  imageLink = '',
  createdAt = '',
  data = {},
}) => {
  const [imageUri, setImageUri] = useState(createdBy?.photoURL || imageLink);
  const fallbackUri =
    'https://firebasestorage.googleapis.com/v0/b/zusammen-stehen-wir.appspot.com/o/public%2Fapp%2Fimages%2Fprofile-user_64572.png?alt=media&token=93ad588a-cd33-461a-b75c-bd0b6d067f0d';

  const handleError = () => {
    setImageUri(fallbackUri);
  };

  useEffect(() => {
    console.log(createdBy);
  }, []);
  return (
    <View style={styles.avatars}>
      {
        <Image
          source={{ uri: createdBy?.photoURL || imageUri }}
          style={styles.avatar}
          onError={handleError}
        />
      }
      <View style={[{ flexWrap: 'wrap', marginLeft: -3 }]}>
        <Text style={styles.more}>
          {createdBy?.displayName ||
            createdBy?.username ||
            data?.created_by?.username ||
            'Zusammen Stehen Wir · Nutzer'}
        </Text>
        {createdAt && (
          <Text style={styles.more}>
            {createdAt.toString() || new Date().toLocaleDateString().toString()}
          </Text>
        )}
      </View>
    </View>
  );
};

const ArticlePreviewCard = ({
  title = '',
  description = '',
  imageLink = '',
  user = {},
  createdAt = '',
  contact = '',
  eventLocation = {},
  startTime = '',
  event_id,
  data = {},
  onSubmitted = function () {},
}) => {
  const notification = useBroadcastPushNotification();

  const { updateField, updatedDoc, succeeded, error } =
    useUpdateDocumentField();
  const { fetchUserData, userData } = useFetchPublicUserData();
  const { deleteDocument, success } = useDeleteDocumentIfAdmin();
  const delEvent = useDeleteEvent();
  const createdBy = useTryToExtractCreatedBy(data);
  const auth = useAuthState();
  const [processing, setProcessing] = useState(false);

  // handle admin disapprove and approve
  const handleSubmit = async ({ approved }) => {
    setProcessing(true);
    if (approved) {
      await updateField('Events', event_id, 'approval.approved', approved);
      await updateField(
        'Events',
        event_id,
        'approval.approved_by',
        auth.user.email,
      );
      await updateField(
        'Events',
        event_id,
        'approval.approved_since',
        new Date().toLocaleDateString(),
      );
      console.log('sending push notification..');
      notification.broadcastNotification({
        title: `${
          data?.created_by?.username || 'Ein Nutzer'
        } hat ein neues Event erstellt ${
          eventLocation.province ? `in ${eventLocation.province}` : ''
        }`,
        body: `Veranstaltung: ${title}\nStart: ${
          new Date(startTime.seconds * 1000)?.toLocaleString() || ''
        }`,
        imageUrl: imageLink,
        data: {
          type: 'event',
          params: {
            event_id: event_id,
          },
          targetScreen: 'Single Event',
        },
      });
    } else {
      await delEvent.deleteEvent({ event_id });
    }
    setProcessing(false);
  };

  // callback for parent to refresh the component list
  useEffect(() => {
    if (
      (succeeded && updatedDoc) /* states for updating event approval*/ ||
      delEvent.succeeded /* success state for deleting doc */
    ) {
      onSubmitted();
    }
  }, [succeeded, updatedDoc, delEvent.succeeded]);

  useEffect(() => {
    if (notification.error) {
      console.error(notification.error);
    }
    if (notification.succeed) {
      console.error('Notification sent!!!');
    }
  }, [notification.succeed, notification.error]);

  useEffect(() => {
    if (error) console.warn(error);
  }, [error]);

  useEffect(() => {
    if (data?.creator_uid) {
      fetchUserData(data.creator_uid);
    }
  }, []);

  // console.log(user);
  return (
    <View style={styles.article}>
      {/* Image */}
      <View style={styles.imageLink}>
        <Image src={imageLink} style={styles.coverImage} />
      </View>

      {/* Card Content */}
      <View style={styles.content}>
        {/* Author */}
        {userData ? (
          <AvatarComponent
            createdAt={createdAt}
            createdBy={userData}
            data={data}
            imageLink={imageLink}
          />
        ) : (
          <ActivityIndicator
            size={'small'}
            style={{ margin: 'auto' }}
            color={colors.bluish}
          />
        )}
        {createdBy.joined_since && (
          <View style={[flexBoxRow, { gap: 8, paddingBottom: 8 }]}>
            <Text
              style={[
                smallTextGray,
                { color: colors.bluish, fontStyle: 'italic' },
              ]}
            >
              Mitglied seit ·{' '}
            </Text>
            <Text style={[smallTextGray, { fontStyle: 'italic' }]}>
              {new Date(parseInt(createdBy.joined_since)).toDateString()}
            </Text>
          </View>
        )}
        {/* Title */}

        <Text style={styles.title}>{title}</Text>
        {/* Startzeit */}

        <Text
          style={[
            grayCaption,
            {
              fontSize: getFontSize(16),
              color: colors.lightBlue,
              marginBottom: 0,
            },
          ]}
        >
          {(
            new Date(startTime.seconds * 1000)?.toLocaleString() + ' Uhr'
          ).replace(',', ' -') || 'Nicht verfügbar.'}
        </Text>
        {/* Description */}

        <Text
          style={[
            smallCaptionTextGray,
            { color: colors.bluish, fontSize: getFontSize(16), marginTop: 11 },
          ]}
        >
          {description}
        </Text>
        {/* Location */}

        <Text
          style={[
            smallCaptionTextGray,
            { color: colors.bluish, fontSize: getFontSize(16), opacity: 0.7 },
          ]}
        >
          {Object.keys(eventLocation).map((locationInfo, i) =>
            `${eventLocation[locationInfo]}${i % 2 === 0 ? '\n' : ' '}`.replace(
              '  ',
              ' ',
            ),
          )}
        </Text>

        {/* Buttons */}
        {!processing ? (
          <View
            style={[
              flexBoxRow,
              {
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginHorizontal: 0,
              },
            ]}
          >
            <RNSButton
              onPress={() => handleSubmit({ approved: true })}
              bgColor={colors.primaryDark}
              textColor={colors.primaryDark}
              caption="Bestätigen"
            />
            <RNSButton
              onPress={() => handleSubmit({ approved: false })}
              bgColor={colors.primaryDark}
              textColor={colors.primaryDark}
              caption="Ablehnen"
              secondary
              bordered
            />
          </View>
        ) : (
          <ActivityIndicator
            size={'small'}
            style={{ margin: 'auto' }}
            color={colors.bluish}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  article: {
    backgroundColor: '#1A222E',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#8EA6C0',
    overflow: 'hidden',
    width: Dimensions.get('window').width - 16,
    justifyContent: 'space-between',
  },
  imageLink: {
    width: '100%', // Adjust width according to your layout
    height: 250, // Adjust height according to your layout
    paddingBottom: 16,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  likeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    // Add your styles
  },
  content: {
    padding: 12,
    paddingTop: 0,
  },
  date: {
    fontSize: getFontSize(12),
    fontWeight: '500',
    color: 'lightgray',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: getFontSize(24),
    fontWeight: '700',
    color: '#f1f1f1',
    marginBottom: 0,
    fontFamily: fonts.primaryBold,
  },
  excerpt: {
    fontSize: getFontSize(15),
    color: colors.textCreme,
    fontFamily: fonts.primaryRegular,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#f1f5f9',
    borderRadius: 9999, // rounded-full equivalent
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: getFontSize(12),
    fontWeight: '500',
    color: '#475569',
  },
  avatars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: -5,
  },
  avatar: {
    width: 39,
    height: 39,
    borderRadius: 39,
    borderWidth: 2,
    backgroundColor: colors.bluish,
    borderColor: '#ffffff',
    marginRight: -5, // Adjust for overlap
  },
  more: {
    paddingLeft: 15,
    fontSize: getFontSize(16),
    color: '#9ca3af',
    fontStyle: 'italic',
    ...bodyTextRegular,
    fontWeight: 'bold',
    opacity: 0.9,
  },
});

export default ArticlePreviewCard;
