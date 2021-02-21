import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoggerMiddleware } from './logger.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { BundleModule } from './bundle/bundle.module'
import * as path from 'path'
import { AuthModule } from './auth/auth.module'
import { StarController } from './star/star.controller'
import { StarService } from './star/star.service'
import { StarModule } from './star/star.module'

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
      logging: true,
    }),
    UserModule,
    BundleModule,
    AuthModule,
    StarModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
