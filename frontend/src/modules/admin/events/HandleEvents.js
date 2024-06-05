import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
} from 'react-native';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import { resolveAdminAccessLevel } from '../../../hooks/auth/use-auth-listener';
import useGetDocumentsByFieldValue from '../../../hooks/firebase/use-doument-by-field-value';
import { colors } from '../../../styles';
import {
  bodyTextRegular,
  screenPadding,
  smallCaptionTextGray,
} from '../../../styles/partials';
import { AccountContext } from '../../AppView';
import ArticlePreviewCard from '../../blogs/UI/ArticlePreviewCard';
import SubSectionLayout from '../../home/sections/partials/SubSectionLayout';

const HandleEvents = () => {
  var windowWidth = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { documents, getDocumentsByValue, succeed, error, loading } =
    useGetDocumentsByFieldValue();
  const [adminAccess, setAdminAccess] = useState(null);
  const scrollViewRef = useRef();
  const [accountCtx, setAccountCtx] = useContext(AccountContext);

  const onScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.round(scrollPosition / windowWidth);
    setCurrentIndex(selectedIndex);
  };

  // Funktion zum Nachladen von Daten
  const fetchDocs = async () => {
    if (loading) return; // Verhindert mehrfache Ladevorgänge zur gleichen Zeit
    // Simulieren Sie einen API-Aufruf
    console.log('fetch docs..');
    await getDocumentsByValue({
      collectionPath: 'Events',
      fieldPath: 'approval.approved',
      value: false,
    });
  };

  const fetchAccessRights = async uid => {
    const access = await resolveAdminAccessLevel(uid);
    setAdminAccess(access);
  };

  useEffect(() => {
    fetchDocs(); // Initialen Datenladung beim Start der Komponente
  }, []);

  useEffect(() => {
    if (accountCtx && accountCtx?.uid) fetchAccessRights(accountCtx?.uid);
  }, [accountCtx]);

  if (adminAccess !== 'full' && adminAccess !== 'event' && adminAccess)
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 150,
        }}
      >
        <Text
          style={[
            bodyTextRegular,
            { margin: 'auto', textAlign: 'center', maxWidth: 320 },
          ]}
        >
          Du hast nicht die erforderlichen Rechte um Events zu bestätigen oder
          abzulehnen. Wende dich an den App Administrator bei Fragen.
        </Text>
      </View>
    );
  return (
    <View style={{ width: '100%' }}>
      {typeof adminAccess === 'string' ? (
        <SubSectionLayout
          title={'Events prüfen 📅'}
          subTitle={'Verwalte Events und Veranstaltungen'}
        >
          <React.Fragment>
            <FlatList
              style={{ paddingLeft: 0 }}
              horizontal
              data={documents}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              decelerationRate="fast"
              snapToInterval={windowWidth}
              ref={scrollViewRef}
              onScroll={onScroll}
              renderItem={({ item }) => (
                <ArticlePreviewCard
                  data={item}
                  contact={item.organizer.email}
                  createdAt={item?.created_at || ''}
                  description={item.description}
                  eventLocation={item.location}
                  imageLink={item.event_poster}
                  startTime={item.start_time}
                  title={item.name}
                  event_id={item.event_id}
                  user={item?.created_by || { ...item.organizer }}
                  onSubmitted={() => fetchDocs()}
                />
              )}
              contentContainerStyle={{ ...screenPadding, gap: 10 }}
              keyExtractor={(item, index) => index.toString()}
            />
            {loading && (
              <ActivityIndicator size={'small'} color={colors.bluish} />
            )}
            {!loading && documents.length === 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 70,
                }}
              >
                <Text
                  style={[
                    bodyTextRegular,
                    {
                      fontSize: getFontSize(18),
                      lineHeight: 26,
                      color: 'gray',
                    },
                  ]}
                >
                  Keine neuen Events
                </Text>
              </View>
            )}
          </React.Fragment>
        </SubSectionLayout>
      ) : (
        <ActivityIndicator
          size={'large'}
          style={{ margin: 'auto' }}
          color={colors.bluish}
        />
      )}
    </View>
  );
};

export default HandleEvents;
