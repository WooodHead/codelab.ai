/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked'
import { GeneralExceptionFilter } from './app/GeneralExceptionFilter'
import { AppModule } from './app/app.module'

async function bootstrap() {
  initializeTransactionalContext()
  const app = await NestFactory.create(AppModule)

  const globalPrefix = ''

  app.setGlobalPrefix(globalPrefix)
  app.useGlobalFilters(new GeneralExceptionFilter())
  const port = process.env.PORT || 3333

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`)
  })
}

bootstrap()
