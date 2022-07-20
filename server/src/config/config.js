import dotenv from "dotenv";

dotenv.config();

const config = {
  port: 5000,
  secret: process.env.JWT_SECRET || "ay+5M9*85&B8W*zp",
  mongoUri:
    process.env.MONGO_URI || `mongodb://localhost:27017/usersManagement`,
};

export default config;
