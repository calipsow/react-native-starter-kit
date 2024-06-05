export const lastUpdate = '13:45, 01.01.2024';

export const COMMENTS = [
  {
    id: '1',
    comment_type: 'MAIN',
    author: 'markcuttik',
    nested_comment_relation: [],
    content:
      'If you are a SaaS product and looking for early adopters, AppSumo seems to be a great place to list on.',
    upvotes: 27,
    replies: [
      {
        id: '2',
        comment_type: 'SUB',
        nested_comment_relation: [{ commend_id: '1' }],
        author: 'davidp1',
        content:
          'Thank you very much for all the people who are posting other alternatives!',
        upvotes: 24,
      },
      {
        id: '3',
        author: 'repido5',
        nested_comment_relation: [{ commend_id: '1' }],
        comment_type: 'SUB',
        content: 'Yes im really excited to show case my app 😊',
        upvotes: 130,
        replies: [
          {
            id: '12',
            author: 'repido5',
            nested_comment_relation: [{ commend_id: '1' }, { commend_id: '3' }],
            comment_type: 'SUB',
            content:
              'Of course that would be nice, to boost up the app promotion 👽',
            upvotes: 95955,
            replies: [
              {
                id: '1212',
                comment_type: 'SUB',
                nested_comment_relation: [
                  { commend_id: '1' },
                  { commend_id: '3' },
                  { commend_id: '12' },
                ],
                author: 'aaol1',
                content:
                  'Thank you very much for all the people who are posting other 🤖',
                upvotes: 24,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '5654',
    author: 'ripledd_official',
    nested_comment_relation: [],
    comment_type: 'MAIN',
    content: 'If you are interested in a promotion, let us know 🫡🥳🤖',
    upvotes: 1254,
  },
  // Add more comments as needed...
];

export const STATIC_BLOGS = [
  {
    title: 'Zusammen Stehen Wir - Blog',
    id: 'B#001',
    description:
      'Bleibe auf dem laufenden mit unserem Newsletter und Blogbeiträgen und bekomme einen Einblick hinter die Kulissen von Zusammen Stehen Wir.',
    coverImage:
      'https://images.unsplash.com/photo-1524601500432-1e1a4c71d692?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    total_comments: 0,
    total_likes: 0,
    articles: [],
    tags: ['ZSW', 'Blog', 'Together'],
    publisher: 'Zusammen Stehen Wir',
  },
];

export const _featuredArticles = [
  {
    title: 'Some Article Topic',
    image: 'https://picsum.photos/900',
    summary:
      'Some fancy description about the featured Some fancy description about the featuredSome fancy description about the featured Some fancy description about the featured',
    author: 'calipsow',
    publishedAt: '01.01.2024',
    comments: 45,
    likes: 150,
    tags: ['security', 'windows'],
  },
  {
    title: 'Some Article Topic',
    image: 'https://picsum.photos/900',
    summary: 'Some fancy description about the featured',
    author: 'calipsow',
    publishedAt: '01.01.2024',
    comments: 45,
    likes: 150,
    tags: ['security', 'windows'],
  },
  {
    title: 'Some Article Topic',
    image: 'https://picsum.photos/900',
    summary: 'Some fancy description about the featured',
    author: 'calipsow',
    publishedAt: '01.01.2024',
    comments: 45,
    likes: 150,
    tags: ['security', 'windows'],
  },
];
export const posts = [{}, {}, {}];

export const _topic = {
  title: 'Windows Outside The Box.',
  description:
    'Lets focus on structuring the main elements without external dependencies like PostTags or PostDate. For navigation, you can use React Navigation in a real app, but for simplicity, well leave placeholders for navigation actions.',
};
export const fallback_img =
  'https://images.unsplash.com/photo-1437419764061-2473afe69fc2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const departments = [
  {
    name: 'Acme Marketing',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    icon: 'IconURI',
  },
  {
    name: 'Acme Product',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    icon: 'IconURI',
  },
];
export const sampleProducts = [
  {
    title: 'Form Builder CP',
    price: '$39.00',
    description:
      'This night light is not only a decorative addition to your home, but it can also serve as a safe guide for you and your guests when you have to get up at night.',
    secondaryImg:
      'https://cc-west-usa.oss-accelerate.aliyuncs.com/154e40a9-42d6-415f-88a2-d8e026bc3ab5.png',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/enlarge_b00628ef-e501-4ee4-8c0d-7f5ee8a7e1cf.jpg?v=1679520835&width=493',
  },
  {
    title: 'Myrtie Howell Addie Hogan',
    price: '$39.00',
    description:
      'This night light is not only a decorative addition to your home, but it can also serve as a safe guide for you and your guests when you have to get up at night.',
    secondaryImg:
      'https://cc-west-usa.oss-accelerate.aliyuncs.com/154e40a9-42d6-415f-88a2-d8e026bc3ab5.png',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/enlarge_b00628ef-e501-4ee4-8c0d-7f5ee8a7e1cf.jpg?v=1679520835&width=493',
  },
  {
    title: 'Ora Benson Craig Wise',
    price: '$39.00',
    description:
      'This night light is not only a decorative addition to your home, but it can also serve as a safe guide for you and your guests when you have to get up at night.',
    secondaryImg:
      'https://cc-west-usa.oss-accelerate.aliyuncs.com/154e40a9-42d6-415f-88a2-d8e026bc3ab5.png',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/enlarge_b00628ef-e501-4ee4-8c0d-7f5ee8a7e1cf.jpg?v=1679520835&width=493',
  },
  {
    title: 'Bernard Baldwin Charles Fletcher',
    price: '$39.00',
    description:
      'This night light is not only a decorative addition to your home, but it can also serve as a safe guide for you and your guests when you have to get up at night.',
    secondaryImg:
      'https://cc-west-usa.oss-accelerate.aliyuncs.com/154e40a9-42d6-415f-88a2-d8e026bc3ab5.png',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/enlarge_b00628ef-e501-4ee4-8c0d-7f5ee8a7e1cf.jpg?v=1679520835&width=493',
  },
  {
    title: 'Blanche Johnston Viola Pittman',
    price: '$39.00',
    description:
      'This night light is not only a decorative addition to your home, but it can also serve as a safe guide for you and your guests when you have to get up at night.',
    secondaryImg:
      'https://cc-west-usa.oss-accelerate.aliyuncs.com/154e40a9-42d6-415f-88a2-d8e026bc3ab5.png',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/enlarge_b00628ef-e501-4ee4-8c0d-7f5ee8a7e1cf.jpg?v=1679520835&width=493',
  },
];
export const categories = [
  {
    title: 'Cases 📱',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/bd0c2658-5ca3-4c0c-a2f5-07ccdbbe298b.jpg?v=1678646740',
  },
  {
    title: 'LED Lights 💡',
    imageUrl: 'https://m.media-amazon.com/images/I/61jBX8U5moL._AC_SX522_.jpg',
  },
  {
    title: 'Keyboards ⌨️',
    imageUrl:
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'SSD Memory 💻',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/4680985737114.png?v=1659876027',
  },
  // Add more categories as needed
];

export const _imagesArray = [
  'https://images.unsplash.com/photo-1710779140606-3fefe7843ca7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1710780953043-4dc3f98d2d50?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1710779140606-3fefe7843ca7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1710780953043-4dc3f98d2d50?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1710779140606-3fefe7843ca7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1710780953043-4dc3f98d2d50?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8',
];
// Example package data, assume this could come from props or a server
export const productPackages = [
  {
    title: 'Essential',
    price: '39.00',
    description: 'Lorem ipsum dolor sit amet elit sed do eiusmod.',
  },
];

export const productImage = {
  uri: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
};
export const User07 =
  'https://images.unsplash.com/photo-1710969759253-7618348f8d11?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D';

export const productCollection = [
  {
    title: 'Mechanical Keyboard and Mouse',
    description: 'Mechanical Keyboard and Mouse Mechanical Keyboard and Mouse',
    price: 52.99,
    currency: 'EUR',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/1174880564190.jpg?v=1659695120',
    pid: 'Nx6AStcpgxCwTpTkIEi6RokIhR',
    type: 'product',
  },
  {
    title: 'Mechanical Keyboard and Mouse',
    description: 'Mechanical Keyboard and Mouse Mechanical Keyboard and Mouse',
    price: 52.99,
    currency: 'EUR',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/1174880564190.jpg?v=1659695120',
    pid: 'Nx6AStcpgxCwTpTkIEi6RokIhR',
    type: 'product',
  },
  {
    title: 'Mechanical Keyboard and Mouse',
    description: 'Mechanical Keyboard and Mouse Mechanical Keyboard and Mouse',
    price: 52.99,
    currency: 'EUR',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/1174880564190.jpg?v=1659695120',
    pid: 'Nx6AStcpgxCwTpTkIEi6RokIhR',
    type: 'product',
  },
  {
    title: 'Mechanical Keyboard and Mouse',
    description: 'Mechanical Keyboard and Mouse Mechanical Keyboard and Mouse',
    price: 52.99,
    currency: 'EUR',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/1174880564190.jpg?v=1659695120',
    pid: 'Nx6AStcpgxCwTpTkIEi6RokIhR',
    type: 'product',
  },
  {
    title: 'Mechanical Keyboard and Mouse',
    description: 'Mechanical Keyboard and Mouse Mechanical Keyboard and Mouse',
    price: 52.99,
    currency: 'EUR',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/1174880564190.jpg?v=1659695120',
    pid: 'Nx6AStcpgxCwTpTkIEi6RokIhR',
    type: 'article',
  },
  {
    title: 'Mechanical Keyboard and Mouse',
    description: 'Mechanical Keyboard and Mouse Mechanical Keyboard and Mouse',
    price: 52.99,
    currency: 'EUR',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/1174880564190.jpg?v=1659695120',
    pid: 'Nx6AStcpgxCwTpTkIEi6RokIhR',
    type: 'article',
  },
  {
    title: 'Mechanical Keyboard and Mouse',
    description: 'Mechanical Keyboard and Mouse Mechanical Keyboard and Mouse',
    price: 52.99,
    currency: 'EUR',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/1174880564190.jpg?v=1659695120',
    pid: 'Nx6AStcpgxCwTpTkIEi6RokIhR',
    type: 'article',
  },
  {
    title: 'Mechanical Keyboard and Mouse',
    description: 'Mechanical Keyboard and Mouse Mechanical Keyboard and Mouse',
    price: 52.99,
    currency: 'EUR',
    imageUrl:
      'https://ZusammenStehenWir.com/cdn/shop/products/1174880564190.jpg?v=1659695120',
    pid: 'Nx6AStcpgxCwTpTkIEi6RokIhR',
    type: 'blog',
  },
];

export const settingOptions = [
  {
    sectionTitle: 'Notifications',
    description: 'Control how you want to be notified',
    subSections: [
      {
        subsectionTitle: 'Notification Services',
        options: [
          {
            title: 'Notification Services',
            initialValue: true,
          },
        ],
      },
      {
        subsectionTitle: 'Newsletter',
        options: [
          {
            title: 'Show Updates',
            initialValue: true,
          },
          {
            title: 'Discounts',
            initialValue: true,
          },
        ],
      },
    ],
  },
];
