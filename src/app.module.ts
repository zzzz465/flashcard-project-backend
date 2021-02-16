import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoggerMiddleware } from './logger.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { BundleModule } from './bundle/bundle.module'
import * as path from 'path'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'flashcard',
      entities: [path.join(__dirname, '/../**/*.entity.js')],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    BundleModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('cats')
  }
}
