/* eslint-disable max-len */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// prettier-ignore
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {logger} = require("firebase-functions/v2");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");
const admin = require("firebase-admin");
// eslint-disable-next-line max-len
const {getAllDocumentsFromCollection, getDocument} = require("./controller/push-notifications");

const app = initializeApp();
const LOGO = "https://firebasestorage.googleapis.com/v0/b/fir-zsw.appspot.com/o/public%2Fapp%2Flogo%2F120.jpg?alt=media&token=5e5d114d-f6a6-49ef-abfe-61424b919495";

exports.sendPushNotificationToAllAppUsers = onCall(async (request) => {
  const {data} = request;

  if (!data) {
    throw new HttpsError(
        // eslint-disable-next-line max-len
        "To send push Notifications you have to set data object with title, body, imageUrl all as strings",
    );
  }
  const tokenFilter = new Map();

  logger.info("resolve all push tokens from the user accounts..");

  const docs = await getAllDocumentsFromCollection("Notification_Tokens");

  logger.info("filter duplicate tokens..");

  const tokens = docs.map((doc) => doc.token).filter((token) => token).filter((token, i) => {
    if (tokenFilter.has(token)) return false;
    tokenFilter.set(token, i);
    return true;
  });
  if (!tokens.length) throw new HttpsError("No tokens found!");

  logger.info("prepare push notification..");


  const messagePayload = {
    tokens: tokens, // ['token_1', 'token_2', ...]
    notification: {
      title: data.title || "Notification",
      body: data.body || "This is a basic notification sent from the server!",
      imageUrl: LOGO,
    },
    data: {data: JSON.stringify(data.data)},
    android: {
      priority: "high", // Setzt die Nachrichtenpriorität auf "high"
      notification: {
        imageUrl: data.imageUrl || LOGO, // Optional: Bild für die Android Benachrichtigung
        sound: "default", // Optional: Setzt den Standardbenachrichtigungston
      },
    },
    apns: {
      headers: {
        "apns-priority": "10", // Setzt die APNS-Priorität für iOS Geräte
      },
      payload: {
        aps: {
          alert: {
            "title": data.title || "Notification",
            // eslint-disable-next-line max-len
            "body": data.body || "This is a basic notification sent from the server!",
            "launch-image": LOGO, // Optional: Bild beim Start der App aus der Benachrichtigung
          },
          sound: "default", // Optional: Benachrichtigungston für iOS
        },
      },
    },
  };

  try {
    logger.info("sending push to all users..");

    const result = await admin.messaging().sendEachForMulticast(messagePayload);
    if (result.failureCount === tokens.length) throw new HttpsError(`All Sent Push Notifications Failed! Failed Total ${result.failureCount} Failures of ${tokens.length} Tokens`);
  } catch (e) {
    logger.error("failed to send push notification. "+e.message);

    throw new HttpsError(e);
  }
});

exports.sendPushToUser = onCall(async (request) => {
  const {data} = request;

  if (!data.token || !data.data) {
    logger.error("The data payload has missing properties!");
    throw new HttpsError("no valid data found in request, can not send push to user");
  }

  let token = data.token;

  if (data.sendToUserUID) {
    const user = await getDocument("Notification_Tokens", data.sendToUserUID);
    if (user) {
      logger.info("found sendToUserUID param; resolving push token from db..");
      token = user.token;
    }
  }

  logger.info(`sending push notification to user with token: ${token}`);

  const messagePayload = {
    tokens: [token],
    notification: {
      title: data.title || "Benachrichtigung von ZSW",
      body: data.body || "Das ist eine Push Benachrichtigung",
    },
    data: {data: JSON.stringify(data.data)},
    android: {
      priority: "high",
      notification: {
        icon: "ic_notification",
        color: "#FBC02D",
      },
    },
    apns: {
      headers: {
        "apns-priority": "10", // Setzt die Priorität auf hoch für iOS
      },
      payload: {
        aps: {
          alert: {
            title: data.title || "Benachrichtigung ZSW",
            body: data.body ||"Es wurde ein neues Event eingereicht. Bitte prüfe dieses im Admin Panel",
          },
          sound: "default",
        },
      },
    },
  };
  try {
    const result = await admin.messaging().sendEachForMulticast(messagePayload);
    if (result.failureCount) throw new HttpsError(`All Sent Push Notifications Failed!`);
  } catch (e) {
    logger.error("Error sending admin notifications", e);
    throw new HttpsError("internal", "Failed to send admin push notifications", e);
  }
});