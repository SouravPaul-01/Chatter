export const sampleChats = [
  {
    id: 1,
    avatar: [
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
    ],
    name: "John Smith",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    id: 2,
    avatar: [
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
    ],
    name: "John Boi",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
    name: "john Doe",
    _id: "1",
  },
  {
    avatar:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
    name: "john Boi",
    _id: "2",
  },
];
export const sampleNotifications = [
  {
    sender: {
      avatar:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
      name: "john Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
      name: "john Boi",
    },
    _id: "2",
  },
];

export const sampleMessages = [
  {
    attachments: [],
    content: "Hello",
    _id: "1",
    sender: {
      _id: "user._id",
      name: "chaman",
    },
    chat: "chatId",
    createdAt: "2022-05-01T00:00:00.000Z",
  },
  {
    attachments: [
      {
        public_id: "id12",
        url: "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
      },
    ],
    content: "",
    _id: "2",
    sender: {
      _id: "kdfjdkfjd",
      name: "chaman 2",
    },
    chat: "chatId",
    createdAt: "2022-05-01T00:00:00.000Z",
  },
];

export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
      _id: "1",
      username: "john_doe",
      friends: 20,
      groups: 10,
    },
    {
      name: "John Boi",
      avatar:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
      _id: "2",
      username: "john_doe",
      friends: 20,
      groups: 10,
    },
  ],

  chats: [
    {
      name: "John Doe Group",
      avatar: [
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
      ],
      _id: "1",
      groupChat: false,
      members: [
        {
          _id: "1",
          avatar:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
        },
        {
          _id: "2",
          avatar:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
        },
      ],
      totalMembers: 2,
      totalMessages: 10,
      creator: {
        name: "John Doe",
        avatar:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
      },
    },
    {
      name: "John Boi Group",
      avatar: [
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
      ],
      _id: "2",
      groupChat: false,
      members: [
        {
          _id: "1",
          avatar:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
        },
        {
          _id: "2",
          avatar:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
        },
      ],
      totalMembers: 2,
      totalMessages: 10,
      creator: {
        name: "John Doe",
        avatar:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "Hello",
      _id: "1",
      sender: {
        avatar:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
        name: "chaman",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2022-05-01T00:00:00.000Z",
    },
    {
      attachments: [
        {
          public_id: "id12",
          url: "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
        },
      ],
      content: "",
      _id: "2",
      sender: {
        avatar:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp",
        name: "chaman 2",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2022-05-01T00:00:00.000Z",
    },
  ],
};
