#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'http';
import app from '../app/app';
import { config } from '../config';
import { RabbitService } from '../service/rabbit/rabbit';
import { logger } from '../util/logger';

const { port } = config.server;

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

async function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  console.log('listening on', bind);

  const rabbit = await RabbitService.getInstance();
  await rabbit.init().then(() => {
    logger.info('rabbitmq connected');
  }).catch((err) => {
    logger.error(err, 'rabbitmq connection failed');
  });
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

process.on('SIGINT', () => {
  server.close(async () => {
    const rabbit = await RabbitService.getInstance();
    await rabbit.disconnect();

    process.exit(0);
  });
});

process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('uncaughtException', () => {
  process.exit(1);
});
