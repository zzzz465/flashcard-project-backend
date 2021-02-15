import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // omit unwanted values based on class definition
      transform: true, // automatically try type conversion based on class definition
    }),
  )
  app.use(cookieParser())
  app.use(compression())
  await app.listen(3000)
}
bootstrap()
