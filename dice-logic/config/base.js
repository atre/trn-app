// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  server: {
    port: +(process.env.SERVER_PORT || '8081'),
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: +(process.env.REDIS_PORT || '6379'),
    db: +(process.env.REDIS_DB || '0'),
  },
  rabbit: {
    user: process.env.RABBIT_USER,
    password: process.env.RABBIT_PASSWORD,
    host: process.env.RABBIT_HOST,
    port: +(process.env.RABBIT_PORT || '5672'),
  }
};
