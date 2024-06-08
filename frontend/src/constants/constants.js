/* eslint-disable no-undef */
import { Platform } from 'react-native';
import { colors } from '../styles';
import DeviceInfo from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const DEEP_LINKING_CONFIG = {
  prefixes: ['https://shipnative.app/', 'shipnative://'],
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

export const fbImage =
  'https://firebasestorage.googleapis.com/v0/b/fir-zsw.appspot.com/o/public%2Fapp%2Fimages%2Fimage-error-fallback.png?alt=media&token=4274571f-c47e-4a4f-ab0f-9fc225d9383b';

export const pbImage =
  'https://firebasestorage.googleapis.com/v0/b/fir-zsw.appspot.com/o/public%2Fapp%2Fimages%2Fdefault-avatar.png?alt=media&token=44a5f0a9-6a04-45fa-83d1-f0a95e49f7b5';

export { MaterialIcons, FontAwesome, MaterialCommunityIcons, Ionicons };
