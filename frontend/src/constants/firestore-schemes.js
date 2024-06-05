export const EVENT_SCHEME = {
  approval: {
    approved: false,
    approved_since: null,
    approved_by: null,
  },
  commitments: [],
  end_time: null,
  documents: [],
  description: null,
  comments: [],
  likes: [],
  event_poster: null,
  event_id: null,
  event_descriptions: [],
  location: {
    street: null,
    province: null,
    postcode: null,
    country: null,
    city: null,
  },
  name: null,
  organizer: {
    phone: null,
    organization: null,
    email: null,
    last_name: null,
    first_name: null,
    username: null,
  },
  visible: null,
  start_time: null,
  created_at: new Date(),
  created_by: {
    joined_since: null,
  },
  views: 0,
};
export const ARTICLE_SCHEME = {
  article_id: null,
  author: null,
  category: null,
  tags: [],
  content_sections: [
    {
      section_image: null,
      section_headline: null,
      section_content: null,
    },
  ],
  description: null,
  likes: [],
  comments: [],
  poster: null,
  pub_date: new Date(),
  article_title: null,
  public: true,
  allow_commentaries: true,
  allow_likes: true,
  external_links: null,
  created_by: {
    uid: null,
    username: null,
    photoURL: null,
    email: null,
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
