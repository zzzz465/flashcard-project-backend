/// <reference types="express" />
declare module 'app.service' {
  export class AppService {
    returnOk(): string
  }
}
declare module 'user/DTO/LoginUser.dto' {
  export class LoginUserDTO {
    email: string
    password: string
  }
}
declare module 'bundle/entities/card.entity' {
  import { Bundle } from 'bundle/entities/bundle.entity'
  export class Card {
    id: number
    bundle: Bundle | number
    front: string
    back: string
  }
}
declare module 'star/entities/star.entity' {
  import { Bundle } from 'bundle/entities/bundle.entity'
  import { User } from 'user/entities/user.entity'
  export class Star {
    id: number
    userId: number
    user: User
    bundleId: number
    bundle: Bundle
  }
}
declare module 'bundle/entities/bundle.entity' {
  import { Card } from 'bundle/entities/card.entity'
  import { Star } from 'star/entities/star.entity'
  export class Bundle {
    id: number
    owner: number
    title: string
    description: string
    updatedDate: Date
    createdDate: Date
    cards: Card[]
    stars: Star[]
    isPrivate: boolean
  }
}
declare module 'user/entities/user.entity' {
  import { Bundle } from 'bundle/entities/bundle.entity'
  import { Star } from 'star/entities/star.entity'
  export class User {
    id: number
    name: string
    email: string
    encrypted: string
    bundles: Bundle[]
    stars: Star[]
  }
}
declare module 'user/user.repository' {
  import { Repository } from 'typeorm'
  import { User } from 'user/entities/user.entity'
  export class UserRepository extends Repository<User> {}
}
declare module 'user/user.service' {
  import { AuthService } from 'auth/auth.service'
  import { User } from 'user/entities/user.entity'
  import { UserRepository } from 'user/user.repository'
  export class UserService {
    private usersRepository
    private authService
    private readonly logger
    constructor(usersRepository: UserRepository, authService: AuthService)
    create(email: string, password: string): Promise<boolean>
    findAll(): Promise<User[]>
    findOne(id: string): Promise<User | undefined>
    findOneByEmail(email: string): Promise<User | undefined>
    remove(id: string): Promise<void>
  }
}
declare module 'auth/auth.service' {
  import { JwtService } from '@nestjs/jwt'
  import { User } from 'user/entities/user.entity'
  import { UserService } from 'user/user.service'
  export class AuthService {
    private userService
    private jwtService
    constructor(userService: UserService, jwtService: JwtService)
    validateUser(email: string, password: string): Promise<User | undefined>
    encryptPassword(password: string): Promise<string>
    login(
      user: User,
    ): Promise<{
      access_token: string
    }>
  }
}
declare module 'auth/guards/JWTAuth.guard' {
  const JWTAuthGuard_base: import('@nestjs/passport').Type<
    import('@nestjs/passport').IAuthGuard
  >
  export class JWTAuthGuard extends JWTAuthGuard_base {}
}
declare module 'auth/guards/local-auth.guard' {
  const LocalAuthGuard_base: import('@nestjs/passport').Type<
    import('@nestjs/passport').IAuthGuard
  >
  export class LocalAuthGuard extends LocalAuthGuard_base {}
}
declare module 'app.controller' {
  import { AppService } from 'app.service'
  export class AppController {
    private readonly appService
    constructor(appService: AppService)
    healthCheck(): string
  }
}
declare module 'logger.middleware' {
  import { NestMiddleware } from '@nestjs/common'
  import { Request, Response, NextFunction } from 'express'
  export class LoggerMiddleware implements NestMiddleware {
    private readonly logger
    use(req: Request, res: Response, next: NextFunction): void
  }
}
declare module 'auth/constants' {
  export const secret = 'secretKey'
}
declare module 'auth/strategies/jwt.strategy' {
  import { Strategy } from 'passport-jwt'
  const JWTStrategy_base: new (...args: any[]) => Strategy
  export class JWTStrategy extends JWTStrategy_base {
    constructor()
    validate(payload: any): Promise<any>
  }
}
declare module 'auth/strategies/local.strategy' {
  import { Strategy } from 'passport-local'
  import { AuthService } from 'auth/auth.service'
  const LocalStrategy_base: new (...args: any[]) => Strategy
  export class LocalStrategy extends LocalStrategy_base {
    private authService
    constructor(authService: AuthService)
    validate(email: string, password: string): Promise<any>
  }
}
declare module 'auth/auth.module' {
  export class AuthModule {}
}
declare module 'user/DTO/RegisterUser.dto' {
  export class RegisterUserDTO {
    email: string
    password: string
  }
}
declare module 'user/user.controller' {
  import { AuthService } from 'auth/auth.service'
  import { RegisterUserDTO } from 'user/DTO/RegisterUser.dto'
  import { UserService } from 'user/user.service'
  import express from 'express'
  import { LoginUserDTO } from 'user/DTO/LoginUser.dto'
  export class UserController {
    private readonly userService
    private readonly authService
    constructor(userService: UserService, authService: AuthService)
    registerUser({ email, password }: RegisterUserDTO): Promise<string>
    login(
      body: LoginUserDTO,
      req: any,
      res: express.Response,
    ): Promise<{
      access_token: string
    }>
    ping(): string
  }
}
declare module 'user/user.module' {
  export class UserModule {}
}
declare module 'auth/jwt.interface' {
  import { User } from 'user/entities/user.entity'
  const userToken_base: import('@nestjs/common').Type<
    Pick<User, 'email' | 'id' | 'stars' | 'name'>
  >
  export class userToken extends userToken_base {}
}
declare module 'bundle/bundle.repository' {
  import { Repository } from 'typeorm'
  import { Bundle } from 'bundle/entities/bundle.entity'
  export class BundleRepository extends Repository<Bundle> {}
}
declare module 'bundle/casl-ability.factory' {
  import { Ability, InferSubjects } from '@casl/ability'
  import { userToken } from 'auth/jwt.interface'
  import { User } from 'user/entities/user.entity'
  import { Bundle } from 'bundle/entities/bundle.entity'
  type Subjects = InferSubjects<typeof Bundle | typeof User>
  export enum Action {
    MANAGE = 'manage',
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete',
  }
  export type AppAbility = Ability<[Action, Subjects]>
  export class BundleAbilityFactory {
    createForUser(
      user: userToken,
    ): Ability<
      [Action, InferSubjects<typeof Bundle | typeof User, false>],
      import('@casl/ability').MongoQuery<
        Record<string | number | symbol, unknown>
      >
    >
  }
}
declare module 'bundle/dto/create-bundle.dto' {
  export class CreateBundleDto {
    title?: string
    description?: string
    cards?: any[]
    isPrivate?: boolean
  }
}
declare module 'bundle/dto/update-bundle.dto' {
  import { Card } from 'bundle/entities/card.entity'
  export class UpdateBundleDto {
    title?: string
    description?: string
    cards?: Card[]
    isPrivate?: boolean
  }
}
declare module 'bundle/bundle.service' {
  import { userToken } from 'auth/jwt.interface'
  import { BundleRepository } from 'bundle/bundle.repository'
  import { CreateBundleDto } from 'bundle/dto/create-bundle.dto'
  import { UpdateBundleDto } from 'bundle/dto/update-bundle.dto'
  import { Bundle } from 'bundle/entities/bundle.entity'
  export class BundleService {
    private readonly bundleRepository
    constructor(bundleRepository: BundleRepository)
    create(
      user: userToken,
      { cards, description, title, isPrivate }: CreateBundleDto,
    ): Promise<Bundle | false>
    findAll(userId?: number): Promise<Bundle[]>
    findOne(id: number): Promise<Bundle | undefined>
    update(
      id: number,
      user: userToken,
      { cards, description, title, isPrivate }: UpdateBundleDto,
    ): Promise<
      | false
      | ({
          id: number
          cards: import('bundle/entities/card.entity').Card[] | undefined
          description: string | undefined
          title: string | undefined
          isPrivate: boolean | undefined
        } & Bundle)
    >
    remove(
      id: number,
      user: userToken,
    ): Promise<'SUCCESS' | 'UNAUTHORIZED' | 'NOTFOUND'>
  }
}
declare module 'auth/interfaces/request.interface' {
  import { Request } from 'express'
  import { userToken } from 'auth/jwt.interface'
  export interface RequestWithUser extends Request {
    user: userToken
  }
}
declare module 'bundle/bundle.controller' {
  import { RequestWithUser } from 'auth/interfaces/request.interface'
  import { BundleService } from 'bundle/bundle.service'
  import { BundleAbilityFactory } from 'bundle/casl-ability.factory'
  import { CreateBundleDto } from 'bundle/dto/create-bundle.dto'
  import { UpdateBundleDto } from 'bundle/dto/update-bundle.dto'
  export class BundleController {
    private readonly bundleService
    private readonly abilityFactory
    constructor(
      bundleService: BundleService,
      abilityFactory: BundleAbilityFactory,
    )
    create(
      createBundleDto: CreateBundleDto,
      req: any,
    ): Promise<false | import('bundle/entities/bundle.entity').Bundle>
    findAll(
      userId?: number,
    ): Promise<import('bundle/entities/bundle.entity').Bundle[]>
    findOne(id: number): Promise<import('bundle/entities/bundle.entity').Bundle>
    update(
      id: number,
      req: RequestWithUser,
      updateBundleDto: UpdateBundleDto,
    ): Promise<
      | false
      | ({
          id: number
          cards: import('bundle/entities/card.entity').Card[] | undefined
          description: string | undefined
          title: string | undefined
          isPrivate: boolean | undefined
        } & import('bundle/entities/bundle.entity').Bundle)
    >
    remove(id: number, req: RequestWithUser): Promise<string>
  }
}
declare module 'bundle/card.repository' {
  import { Repository } from 'typeorm'
  import { Card } from 'bundle/entities/card.entity'
  export class CardRepository extends Repository<Card> {}
}
declare module 'bundle/bundle.module' {
  export class BundleModule {}
}
declare module 'star/DTO/addStar.dto' {
  export class AddStarDTO {
    bundleId: number
  }
}
declare module 'star/star.repository' {
  import { Repository } from 'typeorm'
  import { Star } from 'star/entities/star.entity'
  export class StarRepository extends Repository<Star> {}
}
declare module 'star/star.service' {
  import { BundleRepository } from 'bundle/bundle.repository'
  import { UserRepository } from 'user/user.repository'
  import { StarRepository } from 'star/star.repository'
  export class StarService {
    private readonly starRepository
    private readonly userRepository
    private readonly bundleRepository
    constructor(
      starRepository: StarRepository,
      userRepository: UserRepository,
      bundleRepository: BundleRepository,
    )
    getAllStars(
      userId: number,
    ): Promise<import('star/entities/star.entity').Star | undefined>
    addStar(
      userId: number,
      bundleId: number,
    ): Promise<
      'OK' | 'STAR_ALREADY_EXIST' | 'BUNDLE_NOT_EXIST' | 'USER_NOT_EXIST'
    >
    deleteStar(
      userId: number,
      bundleId: number,
    ): Promise<import('star/entities/star.entity').Star | 'star_not_found'>
  }
}
declare module 'star/star.controller' {
  import { BadRequestException } from '@nestjs/common'
  import { AddStarDTO } from 'star/DTO/addStar.dto'
  import { StarService } from 'star/star.service'
  export class StarController {
    private readonly starService
    constructor(starService: StarService)
    getAllStars(
      userId: number,
    ): Promise<import('star/entities/star.entity').Star>
    addStar(userId: number, addStarDTO: AddStarDTO): Promise<void>
    deleteStar(
      bundle_id: number,
      user_id: number,
    ): Promise<BadRequestException | import('star/entities/star.entity').Star>
  }
}
declare module 'star/star.module' {
  export class StarModule {}
}
declare module 'app.module' {
  import { MiddlewareConsumer, NestModule } from '@nestjs/common'
  export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void
  }
}
declare module 'http-exception.filter' {
  import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common'
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void
  }
}
declare module 'main' {
  import 'reflect-metadata'
}
