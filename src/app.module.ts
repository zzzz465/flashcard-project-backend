import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoggerMiddleware } from './logger.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { BundleController } from './bundle/bundle.controller'
import { BundleModule } from './bundle/bundle.module'
import { Bundle } from './bundle'
import { BundleModule } from './bundle/bundle.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'flashcard',
      entities: ['./entities/**/*.ts'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    BundleModule,
  ],
  controllers: [BundleController],
  providers: [Bundle],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('cats')
  }
}
