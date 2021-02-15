import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsController } from './cats/cats.controller'
import { CatsService } from './cats/cats.service'
import { CatsModule } from './cats/cats.module'
import { LoggerMiddleware } from './logger.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user/user.controller'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3306,
      username: 'postgres',
      password: 'password',
      database: 'flashcard',
      entities: ['./entities/**/*.ts'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats')
  }
}
