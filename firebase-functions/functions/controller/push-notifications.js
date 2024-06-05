/* eslint-disable linebreak-style */
// prettier-ignore
const admin = require("firebase-admin");

const getAllDocumentsFromCollection = async (collectionID) => {
  if (!collectionID) throw Error("No Collection defined");
  const docRef = admin.firestore().collection(collectionID);
  const snapshot = await docRef.get();
  const documents = snapshot.docs.map((doc) => {
    // prettier-ignore
    return {id: doc.id, ...doc.data()};
  });
  return documents;
};

const getDocument = async (collectionID, docID) => {
  if (!collectionID || !docID) throw Error("No Collection or DocID defined");
  // eslint-disable-next-line max-len
  const docRef = await admin
      .firestore()
      .collection(collectionID)
      .doc(docID)
      .get();
  if (!docRef.exists) return null;
  else return docRef.data();
};

module.exports = {getAllDocumentsFromCollection, getDocument};
