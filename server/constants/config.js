// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:4173",
//     process.env.CLIENT_URL,
//   ],
//   credentials: true,
// };
const allowedOrigins = ["http://localhost:5173", "http://localhost:4173"];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

const CHATTER_TOKEN = "Chatter-token";

export { corsOptions, CHATTER_TOKEN };
