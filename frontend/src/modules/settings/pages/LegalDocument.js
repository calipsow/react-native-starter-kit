import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';
import useGetDocumentsByFieldValue from '../../../hooks/firebase/use-doument-by-field-value';
import { colors } from '../../../styles';
import {
  appThemeColor,
  grayCaption,
  mediumHeadlineText,
  screenPadding,
  sectionTitleCreme,
  smallCaptionTextGray,
  smallTextGray,
} from '../../../styles/partials';
import { DividerCaption } from '../../../components/DividerCaption';
import useGetDocument from '../../../hooks/firebase/use-get-document';
import writeDocument from '../../../functions/firestore/write-document-async';

const DocumentHeader = ({ docTitle = '', document = {} }) => {
  return (
    <View style={styles.headerSection}>
      <Text style={[mediumHeadlineText, {}]}>{docTitle}</Text>
      <Text style={smallCaptionTextGray}>
        Zuletzt Aktualisiert:{' '}
        {typeof document.pub_date === 'object'
          ? new Date(document.pub_date.seconds * 1000).toDateString()
          : document.pub_date}
      </Text>
    </View>
  );
};

const DocumentBody = ({ sections = [], document = {} }) => {
  const DocSection = ({ section_title = '', section_content = '' }) => (
    <View style={{ rowGap: 5 }}>
      <Text style={[sectionTitleCreme, { fontSize: getFontSize(17) }]}>
        {section_title}
      </Text>
      <Text
        style={[
          smallTextGray,
          { fontSize: getFontSize(15), textAlign: 'left' },
        ]}
      >
        {section_content.trim()}
      </Text>
    </View>
  );
  return (
    <View style={styles.bodySection}>
      {sections.map((section, i) => (
        <DocSection
          key={i + section.section_title}
          section_content={section.section_content}
          section_title={section.section_title}
        />
      ))}
    </View>
  );
};

const DocumentFooter = ({ document = {} }) => {
  const { address } = document.contact;
  return (
    <View style={styles.footerSection}>
      <DividerCaption caption="Kontakt" />
      <Text style={grayCaption}>{document.contact.email}</Text>
      <DividerCaption caption="Adresse" />
      <Text style={grayCaption}>{address.street}</Text>
      <Text style={grayCaption}>
        {address.postcode}, {address.city}
      </Text>
      <Text style={grayCaption}>
        {address.province}, {address.country}
      </Text>
    </View>
  );
};

const LegalDocument = ({ navigation, route }) => {
  const { document_id } = route.params;

  const { documentData, getDocument, succeed, loading, error } =
    useGetDocument();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    getDocument({
      collectionPath: 'Legal',
      document_id: document_id,
    });
  }, []);

  useEffect(() => {
    if (!documentData) return;
    console.log(documentData);
    setDoc(documentData);
  }, [documentData]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: appThemeColor.darkBlue }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginTop: 13 }}>
        {/*<BackButton navigation={navigation} />*/}
        {error && <Text style={smallCaptionTextGray}>{error}</Text>}
        {loading && (
          <ActivityIndicator
            size={'large'}
            color={colors.darkGray}
            style={{ marginTop: 300 }}
          />
        )}
        {doc ? (
          <DocumentHeader docTitle={doc.document_title} document={doc} />
        ) : (
          <></>
        )}

        {doc ? (
          <DocumentBody
            docTitle={doc.document_title}
            sections={doc.content_sections}
            document={doc}
          />
        ) : (
          <></>
        )}
        {doc ? <DocumentFooter document={doc} /> : <></>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appThemeColor.darkBlue,
    flex: 1,
  },
  headerSection: {
    ...screenPadding,
  },
  bodySection: {
    ...screenPadding,
    rowGap: 5,
  },
  footerSection: {
    ...screenPadding,
    rowGap: 10,
  },
});

export default LegalDocument;
