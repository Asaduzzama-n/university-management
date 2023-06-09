import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Successfully Connected!');

    server = app.listen(config.port, () => {
      logger.info('Server is running on port ', config.port);
    });
  } catch (err) {
    errorLogger.error('Failed to connect!', err);
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection is detected, we are closing the server!');
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
