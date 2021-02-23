import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoggerMiddleware } from './logger.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { BundleModule } from './bundle/bundle.module'
import * as path from 'path'
import { AuthModule } from './auth/auth.module'

const { DB_HOST, DB_PORT } = process.env
console.log(`DB_HOST: ${DB_HOST}, DB_PORT: ${DB_PORT}`)

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: 'postgres',
      password: 'postgres',
      database: 'flashcard',
      entities: [path.join(__dirname, '/../**/*.entity.js')],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    UserModule,
    BundleModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
