import { Linking } from 'react-native';

const sendMail = async ({ recipient, subject, body, cc, bcc }) => {
  try {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const encodedCc = cc ? encodeURIComponent(cc) : '';
    const encodedBcc = bcc ? encodeURIComponent(bcc) : '';

    const mailtoLink = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}${
      encodedCc ? `&cc=${encodedCc}` : ''
    }${encodedBcc ? `&bcc=${encodedBcc}` : ''}`;

    await Linking.openURL(mailtoLink);
  } catch (e) {
    console.error(e);
    return e.message;
  }
};

export default sendMail;
