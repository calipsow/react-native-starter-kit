export const EVENT_SCHEME = {
  approval: {
    approved: false,
    approved_since: null,
    approved_by: null,
  },
  commitments: [],
  end_time: null,
  documents: [],
  description: '299 Kikem Boulevard DuPisYkxCyYDEKSWAAyt',
  comments: [],
  likes: [],
  event_poster: 'http://izugul.sm/ire',
  event_id: 'YF8Fjz9lnuAMQu5HesBtZNJVk',
  event_descriptions: [],
  location: {
    street: '413 Doeji Court',
    province: '5277',
    postcode: 33902,
    country: 'Burkina Faso',
    city: 'Wureprid',
  },
  name: 'Louise Black',
  organizer: {
    phone: null,
    organization: null,
    email: null,
    last_name: null,
    first_name: null,
    username: null,
  },
  creator_uid: 'kMGdUNAlTa',
  visible: true,
  start_time: new Date(Date.now() - 82590),
  created_at: new Date(),
  created_by: {
    joined_since: null,
  },
  views: 565,
};
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
export const SETTINGS = [
  {
    sectionTitle: 'Account',
    description: 'Finde hier alle Einstellungen zu deinem Account',
    subSections: [
      {
        subsectionTitle: 'Account und Sicherheit',
        options: [
          {
            title: 'Ausloggen',
            id: 'logout',
            setting_type: 'action',
            value: function () {},
          },
          {
            title: 'Account löschen',
            id: 'delete_account',
            setting_type: 'action',
            value: function () {},
          },
          {
            title: 'Passwort ändern',
            id: 'change_password',
            setting_type: 'action',
            value: function () {},
          },
          {
            title: 'Nutzernamen ändern',
            id: 'change_username',
            setting_type: 'action',
            value: function () {},
          },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Rechtliches',
    description: 'Lese hier alle rechtlich relevanten Dokumente nach.',
    subSections: [
      {
        subsectionTitle: 'Nutzungsbedingungen',
        options: [
          {
            title: 'Datenschutzerklärung',
            id: 'privacy',
            setting_type: 'document',
            value: function () {},
          },
          {
            title: 'Lizenzvereinbarung',
            id: 'license',
            setting_type: 'document',
            value: function () {},
          },
        ],
      },
    ],
  },
];
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
  content_sections: [{ section_title: null, section_content: null }],
};
export const USER_SCHEME = {
  firebase_auth_data: {},
  username: null,
  firebase_uid: undefined,
  uid: undefined,
  bookmarks: [],
  chats: [],
  event_commitments: [],
  comments: [],
  liked_content: [],
  events_posted: [],
  account_activated: true,
  suspended_until: null,
  account_follows: [],
  blocked_users: [],
  follower: [],
  restrictions: {
    event_posting: false,
    liking_content: false,
    commenting: false,
  },
  role: 'user',
};

export const PROMOTION = {
  promo_title: null,
  promo_content: null,
  promo_image: null,
  external_link: null,
  promo_id: undefined,
};

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

/**uid: firebase id
bookmarks: array[content id]
chats: array[chat id]
event_commitments: array[event id]
comments: array[comment id]
liked_content: array[content id]
events_posted: array[event id]
account_activated: Boolean
suspended_until: Timestamp || Null
account_follows: array[account id]
blocked_users: array[account id]
follower: [account id]
restrictions: {
event_posting: Boolean
liking_content: Boolean
commenting: Boolean
}
role: User || Admin */

export const Push_Notification_Token = {
  token: null,
  device_type: null,
  created_at: new Date(new Date().getTime()),
  uid: null,
  user_role: null,
  username: null,
};
