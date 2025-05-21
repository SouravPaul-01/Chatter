// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:4173",
//     process.env.CLIENT_URL,
//   ],
//   credentials: true,
// };
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://chatter-phi-livid.vercel.app", // ✅ YOUR VERCEL FRONTEND
  ],
  credentials: true,
};

const CHATTER_TOKEN = "Chatter-token";

export { corsOptions, CHATTER_TOKEN };
