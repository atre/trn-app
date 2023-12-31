// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  server: {
    port: +(process.env.SERVER_PORT || '8080'),
  },
  db: {
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  rabbit: {
    user: process.env.RABBIT_USER,
    password: process.env.RABBIT_PASSWORD,
    host: process.env.RABBIT_HOST,
    port: +(process.env.RABBIT_PORT || '5672'),
  }
};
