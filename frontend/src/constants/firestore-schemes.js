/*
* This file contains default firestore document data shemes 
*/

// example for an article or blog post document scheme
export const ARTICLE_SCHEME = {
  creator_uid: 'SHYMDeKfqYpcFiqBQHmrTYEvvyzZoCBCoWoxegHnmrZwp',
  article_id: 'ec430886-f613-5637-b6a9-8ccb899d652e',
  author: 'Chester Estrada',
  category: '41209',
  tags: [],
  content_sections: [
    {
      section_image: 'http://kibi.sb/bo',
      section_headline: 'Lenora Williamson',
      section_content:
        'Consectetur sit occaecat ullamco in aute. Voluptate consequat occaecat nulla cupidatat in ad.',
    },
  ],
  description:
    'Fugiat duis sunt ipsum duis nisi exercitation commodo exercitation qui.',
  likes: [],
  comments: [],
  poster: 'http://mezaden.et/hagudade',
  pub_date: new Date(),
  article_title:
    'Ex irure ad nulla eiusmod eiusmod duis reprehenderit proident eiusmod reprehenderit sunt veniam.',
  public: true,
  allow_commentaries: true,
  allow_likes: true,
  external_links: null,
  created_by: {
    uid: 'bae7ab80-5b50-5379-83aa-f40da8c9a93e',
    username: 'David Jenkins',
    photoURL: 'http://igodsuc.km/anohes',
    email: 'aki@wibziare.de',
    joined_since: new Date().getTime(),
    last_seen: new Date().getTime(),
  },
  views: 0,
};

// Expexted object to render the settings menu
export const SETTINGS = [
  {
    sectionTitle: null, // optional section title and subtitle
    description: null,
    subSections: [
      {
        subsectionTitle: 'Account and security',
        options: [
          {
            title: 'Logout',
            id: 'logout',
            setting_type: 'action',
            value: function () {},
          },
          {
            title: 'Change Password',
            id: 'change_password',
            setting_type: 'action',
            value: function () {},
          },
          {
            title: 'Change Username',
            id: 'change_username',
            setting_type: 'action',
            value: function () {},
          },
          {
            title: 'Remove Account',
            id: 'delete_account',
            setting_type: 'action', // this type would callback to an event
            value: function () {},
          },
        ],
      },
    ],
  },
  {
    sectionTitle: null,
    description: null,
    subSections: [
      {
        subsectionTitle: 'Terms of Use',
        options: [
          {
            title: 'Privacy',
            id: 'privacy',
            setting_type: 'document', // this would redirect the user to the LegalDoc screen with the id as param to fetch the document from firestore
            value: function () {},
          },
          {
            title: 'Terms of use',
            id: 'license',
            setting_type: 'document',
            value: function () {},
          },
        ],
      },
    ],
  },
];

// expected document scheme to render legals
export const LEGAL_DOCUMENT = {
  document_id: null,
  active: true,
  version: '1',
  pub_date: new Date(),
  document_title: null,
  document_content: null,
  contact: {
    address: {
      street: null,
      province: null,
      postcode: null,
      country: null,
      city: null,
    },
    email: null,
  },
  content_sections: [{ section_title: null, section_content: null }], // used to seperate the foc into sections
};

// user data scheme
export const USER_SCHEME = {
  push_notification_token: null, // latest push notification token
  username: null,
  firebase_uid: undefined, // same as uid
  uid: undefined,
  account_activated: true,
  suspended_until: null,
  role: 'user',
};

// data scheme for the badge component on the home view
export const PROMOTION = {
  promo_title: null,
  promo_content: null,
  promo_image: null,
  external_link: null,
  promo_id: undefined,
};

// commentary data scheme example
export const COMMENT = {
  comment_id: undefined,
  comment: null,
  created_by: undefined, // expects the uid
  created_at: Date,
  replies: [], // takes comment ids as comment reference
  likes: [], // takes like ids as ref
  public: true,
  related_content_id: undefined,
  content_type: undefined, // article, event
};

// push notification document scheme
export const PUSH_NOTIFICATION_TOKEN = {
  token: null,
  device_type: null,
  created_at: new Date(new Date().getTime()),
  uid: null, // the user id the token belongs to
};
