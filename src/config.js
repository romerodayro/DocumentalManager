import dotenv from "dotenv";

dotenv.config();

const config = {
  API_URL: process.env.REACT_APP_CORE_API_URL,
};

export default config;
