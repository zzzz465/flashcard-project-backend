import 'reflect-metadata'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

declare const module: any

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

  const config = new DocumentBuilder()
    .setTitle('API Document')
    .setDescription('API description')
    .setVersion('0.1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = 3001
  await app.listen(port, () => {
    console.log(`API Server listening on port ${port}`)
  })
}

bootstrap()
