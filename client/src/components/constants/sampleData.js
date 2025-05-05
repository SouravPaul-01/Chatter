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
