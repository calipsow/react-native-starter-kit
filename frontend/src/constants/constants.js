/* eslint-disable no-undef */
import { Platform } from 'react-native';
import { colors, width } from '../styles';
import DeviceInfo from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ZusammenStehenWir_LOGO_SRC =
  'https://cdn.shopify.com/s/files/1/0655/5087/6900/files/ZusammenStehenWir-social-sharing-bild.png?v=1678807401';

export const ZusammenStehenWir_META_DATA = {
  company_name: '© ZusammenStehenWir 2024',
  address: {
    street: 'Mechthildstrasse 43',
    postcode: 39128,
    country: 'Germany',
    province: 'Saxony-Anhalt',
  },
  owner: {
    name: 'Dennis Wilke',
    telephone: '+(49) 176 40495488',
    email: 'development@ZusammenStehenWir.com',
    address: {
      street: 'Mechthildstrasse 43',
      postcode: 39128,
      country: 'Germany',
      province: 'Saxony-Anhalt',
    },
  },
  online_shop: {
    website: 'https://ZusammenStehenWir.com',
    domain: 'ZusammenStehenWir.com',
    imprint: 'https://ZusammenStehenWir.com/pages/imprint-ZusammenStehenWir',
    privacy: 'https://ZusammenStehenWir.com/policies/privacy-policy',
    policies: [
      'https://ZusammenStehenWir.com/policies/terms-of-service',
      'https://ZusammenStehenWir.com/policies/shipping-policy',
      'https://ZusammenStehenWir.com/policies/refund-policy',
      'https://ZusammenStehenWir.com/policies/privacy-policy',
    ],
    return: 'https://account.ZusammenStehenWir.com/',
    tracking: 'https://ZusammenStehenWir.com/apps/track123/',
    blogs: [
      {
        index: 'https://ZusammenStehenWir.com/blogs/windows-tech-blog',
        blog_name: 'Windows Tech Blog',
      },
      {
        index: 'https://ZusammenStehenWir.com/blogs/apple-tech',
        blog_name: 'Apple Tech Blog',
      },
    ],
  },
};

export const HEADER_BACKGROUND_IMAGE = require('../../assets/images/topBarBg.png');
export const iconHome = require('../../assets/images/tabbar/home.png');
export const iconCalendar = require('../../assets/images/tabbar/calendar.png');
export const iconGrids = require('../../assets/images/tabbar/grids.png');
export const iconPages = require('../../assets/images/tabbar/pages.png');
export const iconComponents = require('../../assets/images/tabbar/components.png');
export const iconBlog = require('../../assets/images/drawer/blog.png');
export const iconSettings = require('../../assets/images/drawer/settings.png');
export const galleryIcon = require('../../assets/images/pages/gallery.png');
export const profileIcon = require('../../assets/images/pages/profile.png');
export const chartIcon = require('../../assets/images/pages/chart.png');
export const calendarIcon = require('../../assets/images/pages/calendar.png');
export const chatIcon = require('../../assets/images/pages/chat.png');
export const loginIcon = require('../../assets/images/pages/login.png');
export const blogIcon = require('../../assets/images/pages/blog.png');
export const ZSW_LOGO_SOURCE =
  'https://firebasestorage.googleapis.com/v0/b/fir-zsw.appspot.com/o/public%2Fapp%2Fimages%2F120.jpg?alt=media&token=aec1cab3-84ff-44c9-9499-173858abda95';

export const fbImage =
  'https://firebasestorage.googleapis.com/v0/b/fir-zsw.appspot.com/o/public%2Fapp%2Fimages%2Fimage-error-fallback.png?alt=media&token=4274571f-c47e-4a4f-ab0f-9fc225d9383b';

export const pbImage =
  'https://firebasestorage.googleapis.com/v0/b/fir-zsw.appspot.com/o/public%2Fapp%2Fimages%2Fdefault-avatar.png?alt=media&token=44a5f0a9-6a04-45fa-83d1-f0a95e49f7b5';

export const DEEP_LINKING_CONFIG = {
  prefixes: ['https://zusammen-stehen-wir.de/app', 'zsw://'],
  config: {
    screens: {
      Homes: {
        initialRouteName: 'Home',
        screens: {
          'Loading Screen': 'loading',
          'Loading Backend': 'loading_app',
          'Update App Screen': 'update_app',
          Home: 'home',
          Events: 'events',
          Auth: {
            // Fallback Router if the client is unauthenticated
            path: 'auth',
            initialRouteName: 'Sign In',
          },
          Settings: {
            path: 'settings',
            initialRouteName: 'Einstellungen',
          },
          'Single Event': 'event/:event_id',
          'Single Article': 'article/:article_id',
        },
      },
    },
  },
};

export const sharingConfig = [
  {
    title: 'Whatsapp',
    action_id: 'whatsapp',
    icon: () => (
      <Ionicons
        name="logo-whatsapp"
        color={colors.primary}
        style={{ margin: 'auto' }}
        size={20}
      />
    ),
    icon_name: '',
  },
  {
    title: 'Messenger',
    action_id: 'messenger',
    icon: () => (
      <MaterialCommunityIcons
        name="facebook-messenger"
        color={colors.primary}
        style={{ margin: 'auto' }}
        size={20}
      />
    ),
    icon_name: '',
  },
  {
    title: 'SMS',
    action_id: 'sms',
    icon: () => (
      <MaterialIcons
        name="sms"
        color={colors.primary}
        style={{ margin: 'auto' }}
        size={20}
      />
    ),
    icon_name: '',
  },
  {
    title: 'Teilen via',
    action_id: 'share',
    icon: () => (
      <FontAwesome
        name="share-square"
        color={colors.primary}
        style={{ margin: 'auto' }}
        size={20}
      />
    ),
    icon_name: '',
  },
];

export const appUriSchemes = {
  whatsapp: {
    pkgName: 'com.whatsapp',
    urlScheme: 'whatsapp',
    urlParams: 'app',
  }, // fa
  facebook: {
    pkgName: 'com.facebook.katana',
    urlScheme: 'fb',
    urlParams: 'requests',
  }, // fa: facebook-official
  'facebook messenger': {
    pkgName: 'com.facebook.orca',
    urlScheme: 'fb-messenger',
    urlParams: 'user-thread/{user-id}',
  }, // fa: facebook
  skype: {
    pkgName: 'com.skype.raider',
    urlScheme: 'skype',
    urlParams: 'echo123?call',
  }, // fa
  wechat: {
    pkgName: 'com.tencent.mm',
    urlScheme: 'weixin',
    urlParams: 'dl/chat',
  }, // fa
  snapchat: {
    pkgName: 'com.snapchat.android',
    urlScheme: 'snapchat',
    urlParams: '?u=foo',
  }, // fa
  twitter: {
    pkgName: 'com.twitter.android',
    urlScheme: 'twitter',
    urlParams: 'messages',
  }, // fa
  youtube: {
    pkgName: 'com.google.android.youtube',
    urlScheme: 'youtube',
    urlParams: 'watch?v=dQw4w9WgXcQ',
  }, // fa
  netflix: {
    pkgName: 'com.netflix.mediaclient',
    urlScheme: 'nflx',
    urlParams: '',
  },
  instagram: {
    pkgName: 'com.instagram.android',
    urlScheme: 'instagram',
    urlParams: 'app',
  }, // fa
  spotify: {
    pkgName: 'com.spotify.mobile.android.ui',
    urlScheme: 'spotify',
    urlParams: 'http://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI',
  }, // fa
  slack: { pkgName: 'com.Slack', urlScheme: 'slack', urlParams: 'open' }, // fa
  //"hipchat": {pkgName: "com.hipchat", urlScheme: "hipchat", urlParams: "companyname/lobby"},
  pinterest: {
    pkgName: 'com.pinterest',
    urlScheme: 'pinterest',
    urlParams: 'pin/285063851385287883/',
  }, // fa
  uber: { pkgName: 'com.ubercab', urlScheme: 'uber', urlParams: '' },
  amazon: {
    pkgName: 'com.amazon.mShop.android.shopping',
    urlScheme: 'amazon',
    urlParams: 'content/item?id=B007Q4OVHQ',
  }, // fa
  soundcloud: {
    pkgName: 'com.soundcloud.android',
    urlScheme: 'soundcloud',
    urlParams: 'tracks/63085864',
  }, // fa
  'google maps': {
    pkgName: 'com.google.android.apps.maps',
    urlScheme: 'comgooglemaps',
    urlParams: '?center=40.765819,-73.975866&zoom=14&views=traffic',
  }, // fa: map-marker
  chrome: {
    pkgName: 'com.android.chrome',
    urlScheme: 'googlechrome',
    urlParams: 'github.com',
  }, // fa
  gmail: {
    pkgName: 'com.google.android.gm',
    urlScheme: 'googlegmail',
    urlParams: 'co?subject=foo&body=bar',
  }, // fa: envelope-open
  'google drive': {
    pkgName: 'com.google.android.apps.docs',
    urlScheme: 'googledrive',
    urlParams: '',
  }, // fa: database
  dropbox: { pkgName: 'com.dropbox.android', urlScheme: 'xxx', urlParams: '' }, // fa
  'google hangouts': {
    pkgName: 'com.google.android.talk',
    urlScheme: 'com.google.hangouts',
    urlParams: '',
  }, // fa: phone
  evernote: {
    pkgName: 'com.evernote',
    urlScheme: 'evernote',
    urlParams: 'root',
  },
  // "threema": {pkgName: "ch.threema.app", urlScheme: "threema", urlParams: "add?id=ECHOECHO"}, // fa: lock
  vlc: { pkgName: 'org.videolan.vlc', urlScheme: 'vlc', urlParams: '' },
  tumblr: {
    pkgName: 'com.tumblr',
    urlScheme: 'tumblr',
    urlParams: 'x-callback-url/dashboard',
  }, // fa
  flickr: {
    pkgName: 'com.yahoo.mobile.client.android.flickr',
    urlScheme: 'flickr',
    urlParams: '',
  }, // fa
  linkedin: {
    pkgName: 'com.linkedin.android',
    urlScheme: 'linkedin',
    urlParams: '',
  },
  google: {
    pkgName: 'com.google.android.googlequicksearchbox',
    urlScheme: 'google',
    urlParams: '',
  },
};
export const bundeslaenderDeutschland = [
  'Baden-Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein-Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thüringen',
];
export const DEUTSCHLAND_LOCATIONS = [
  'Deutschlandweit',
  'Baden-Wuerttemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein-Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thueringen',
];

export const DEUTSCHLAND_BNDL = [
  { province: 'Deutschlandweit', slug: 'deutschlandweit', province_image: '' },
  {
    province: 'Baden-Wuerttemberg',
    slug: 'Baden_Wuerttemberg',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/04/Flag_of_Baden-Wuerttemberg__state__lesser_arms_.png',
  },
  {
    province: 'Bayern',
    slug: 'Bayern',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/02/bayern_bayerische_fahne_hissflagge_flagge_mit_wappen_4.jpg',
  },
  {
    province: 'Berlin',
    slug: 'Berlin',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/04/Flag_of_Berlin.svg.png',
  },
  {
    province: 'Brandenburg',
    slug: 'Brandenburg',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/02/Download.png',
  },
  {
    province: 'Bremen',
    slug: 'Bremen',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/02/bremen-flag-region-germany-600nw-2341990821.webp',
  },
  {
    province: 'Hamburg',
    slug: 'Hamburg',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/02/1200px-Flag_of_Hamburg.svg.png',
  },
  {
    province: 'Hessen',
    slug: 'Hessen',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/02/Flag_of_Hesse_state.svg.png',
  },
  {
    province: 'Mecklenburg-Vorpommern',
    slug: 'Mecklenburg_Vorpommern',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/03/Flag_of_Mecklenburg-Western_Pomerania_state.svg.png',
  },
  {
    province: 'Niedersachsen',
    slug: 'Niedersachsen',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/02/niedersachsen-219010.png',
  },
  {
    province: 'Nordrhein-Westfalen',
    slug: 'Nordrhein_Westfalen',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/04/1200px-Flag_of_North_Rhine-Westphalia_state.svg.png',
  },
  {
    province: 'Rheinland-Pfalz',
    slug: 'Rheinland_Pfalz',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/02/rheinland-pfalz-Coat_of_arms_of_Rhineland-Palatinate.svg.png',
  },
  {
    province: 'Saarland',
    slug: 'Saarland',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/02/Flag_of_Saarland.svg.png',
  },
  {
    province: 'Sachsen',
    slug: 'Sachsen',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/03/Flag_of_Saxony_state.svg.png',
  },
  {
    province: 'Sachsen-Anhalt',
    slug: 'Sachsen_Anhalt',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/04/sachen-anhalt.png',
  },
  {
    province: 'Schleswig-Holstein',
    slug: 'Schleswig_Holstein',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/02/1280px-Flag_of_Schleswig-Holstein_state.svg.png',
  },
  {
    province: 'Thueringen',
    slug: 'thueringen',
    province_image:
      'https://zusammen-stehen-wir.de/wp-content/uploads/2024/03/landesflagge-thueringen-png.png',
  },
];
export const FIREBASE_ERRORS = {};

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const deviceModel = DeviceInfo.getDeviceId();
export const systemVersion = DeviceInfo.getSystemVersion();
export const hasNotch = isIOS ? DeviceInfo.hasNotch() : null;
export const hasDynamicIsland = isIOS ? DeviceInfo.hasDynamicIsland() : null;
export const hasOldHomeButton = !isIOS ? null : !hasNotch && !hasDynamicIsland;
console.log(`
deviceModel: ${deviceModel}
systemVersion: ${systemVersion}
hasNotch: ${hasNotch}
hasDynamicIsland: ${hasDynamicIsland}
hasOldHomeButton: ${hasOldHomeButton}
`);
export const MAX_SCORE = 10;
export const SCORE_BOARD_SUBTITLES = {
  ACTIVITY_SCORE: {
    readable_name: 'Nutzeraktivität',
    short_name: 'Nutzeraktivität - 30 Tage',
    explain:
      'Der Score zeigt die Nutzeraktivität an, indem die Anzahl der geteilten Veranstaltungen innerhalb von 30 Tagen ausgewertet werden.',
    tip: 'Je mehr Veranstaltungen du mit der Community teilst, umso rasanter steigt dein Score',
    congrats: 'Tolles Ergebnis, weiter so!',
  },
  COMMITMENT_SCORE: {
    readable_name: 'Teilnahmen pro Event',
    short_name: 'Teilnahmen pro Beitrag',
    explain:
      'Der Score zeigt wie viele Zusagen innerhalb von 30 Tagen es auf die Veranstaltungen gab.',
    tip: 'Teile Veranstaltungen, die für die Community ansprechend sind. Mit jeder Zusage wächst dieser Score',
    congrats: 'Tolles Ergebnis, weiter so!',
  },
  COMMITMENTS_PER_CLICK_SCORE: {
    readable_name: 'Zusagen pro Aufruf',
    short_name: 'Teilnahmen pro Aufruf - (BETA)',
    explain:
      'Repräsentiert wird die Effizienz der Posts innerhalb von 30 Tagen. Je mehr Zusagen es pro Aufruf gab desto höher der Score.',
    tip: 'Optimiere die Beschreibungen deiner Veranstaltungen, um die Aufmerksamkeit und das Engagement der Nutzer zu erhöhen',
    congrats: 'Ausgezeichnete Arbeit bei der Erstellung ansprechender Inhalte!',
  },
};
