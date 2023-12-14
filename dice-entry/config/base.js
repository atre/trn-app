// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  server: {
    port: +(process.env.SERVER_PORT || '8080'),
  },
  auth: {
    secret: process.env.AUTH_SECRET,
  },
  rabbit: {
    user: process.env.RABBIT_USER,
    password: process.env.RABBIT_PASSWORD,
    host: process.env.RABBIT_HOST,
    port: +(process.env.RABBIT_PORT || '5672'),
  }
};
