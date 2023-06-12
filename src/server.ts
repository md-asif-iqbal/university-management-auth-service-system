
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorlogger, logger } from './shared/logger'
import {Server} from 'http'

process.on('uncaughtException', error => {
 errorlogger.error(error)
  process.exit(1)
})
  let server: Server
async function bootstrap() {

  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connnect succesfull')

    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('falied connect', err)
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandle Rejection is Detected , we are closeing our server.... ');
    
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    }
    else {
      process.exit(1)
    }
  })
}

bootstrap()



process.on('SIGTERM', () => {
  logger.info('SIGTERM is Recived')
  if (server) {
    server.close()
  }
})
