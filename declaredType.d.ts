/// <reference types="express" />
declare module "app.service" {
    export class AppService {
        returnOk(): string;
    }
}
declare module "user/DTO/LoginUser.dto" {
    export class LoginUserDTO {
        email: string;
        password: string;
    }
}
declare module "bundle/entities/card.entity" {
    import { BaseEntity } from 'typeorm';
    import { Bundle } from "bundle/entities/bundle.entity";
    export class Card extends BaseEntity {
        id: number;
        bundleId: number;
        bundle: Bundle;
        front: string;
        back: string;
    }
}
declare module "bundle/entities/bundle.entity" {
    import { BaseEntity } from 'typeorm';
    import { Card } from "bundle/entities/card.entity";
    export class Bundle extends BaseEntity {
        id: number;
        owner: number;
        title: string;
        description: string;
        updatedDate: Date;
        createdDate: Date;
        cards: Card[];
        isPrivate: boolean;
    }
}
declare module "user/entities/user.entity" {
    import { Bundle } from "bundle/entities/bundle.entity";
    export class User {
        id: number;
        name: string;
        email: string;
        encrypted: string;
        bundles: Bundle[];
    }
}
declare module "user/user.repository" {
    import { Repository } from 'typeorm';
    import { User } from "user/entities/user.entity";
    export class UserRepository extends Repository<User> {
    }
}
declare module "user/user.service" {
    import { AuthService } from "auth/auth.service";
    import { User } from "user/entities/user.entity";
    import { UserRepository } from "user/user.repository";
    export class UserService {
        private usersRepository;
        private authService;
        private readonly logger;
        constructor(usersRepository: UserRepository, authService: AuthService);
        create(email: string, password: string): Promise<boolean>;
        findAll(): Promise<User[]>;
        findOne(id: string): Promise<User | undefined>;
        findOneByEmail(email: string): Promise<User | undefined>;
        remove(id: string): Promise<void>;
    }
}
declare module "auth/auth.service" {
    import { JwtService } from '@nestjs/jwt';
    import { User } from "user/entities/user.entity";
    import { UserService } from "user/user.service";
    export class AuthService {
        private userService;
        private jwtService;
        constructor(userService: UserService, jwtService: JwtService);
        validateUser(email: string, password: string): Promise<User | undefined>;
        encryptPassword(password: string): Promise<string>;
        login(user: User): Promise<{
            access_token: string;
            id: number;
            name: string;
            email: string;
            encrypted: string;
            bundles: import("bundle/entities/bundle.entity").Bundle[];
        }>;
    }
}
declare module "auth/guards/JWTAuth.guard" {
    const JWTAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
    export class JWTAuthGuard extends JWTAuthGuard_base {
    }
}
declare module "auth/guards/local-auth.guard" {
    const LocalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
    export class LocalAuthGuard extends LocalAuthGuard_base {
    }
}
declare module "app.controller" {
    import { AppService } from "app.service";
    export class AppController {
        private readonly appService;
        constructor(appService: AppService);
        healthCheck(): string;
    }
}
declare module "logger.middleware" {
    import { NestMiddleware } from '@nestjs/common';
    import { Request, Response, NextFunction } from 'express';
    export class LoggerMiddleware implements NestMiddleware {
        private readonly logger;
        use(req: Request, res: Response, next: NextFunction): void;
    }
}
declare module "auth/constants" {
    export const secret = "secretKey";
}
declare module "auth/strategies/jwt.strategy" {
    import { Strategy } from 'passport-jwt';
    const JWTStrategy_base: new (...args: any[]) => Strategy;
    export class JWTStrategy extends JWTStrategy_base {
        constructor();
        validate(payload: any): Promise<any>;
    }
}
declare module "auth/strategies/local.strategy" {
    import { Strategy } from 'passport-local';
    import { AuthService } from "auth/auth.service";
    const LocalStrategy_base: new (...args: any[]) => Strategy;
    export class LocalStrategy extends LocalStrategy_base {
        private authService;
        constructor(authService: AuthService);
        validate(email: string, password: string): Promise<any>;
    }
}
declare module "auth/auth.module" {
    export class AuthModule {
    }
}
declare module "user/DTO/RegisterUser.dto" {
    export class RegisterUserDTO {
        email: string;
        password: string;
    }
}
declare module "user/user.controller" {
    import { AuthService } from "auth/auth.service";
    import { RegisterUserDTO } from "user/DTO/RegisterUser.dto";
    import { User } from "user/entities/user.entity";
    import { UserService } from "user/user.service";
    import express from 'express';
    import { LoginUserDTO } from "user/DTO/LoginUser.dto";
    export class UserController {
        private readonly userService;
        private readonly authService;
        constructor(userService: UserService, authService: AuthService);
        registerUser({ email, password }: RegisterUserDTO): Promise<string>;
        login(body: LoginUserDTO, req: any, res: express.Response): Promise<Partial<User>>;
        ping(): string;
    }
}
declare module "user/user.module" {
    export class UserModule {
    }
}
declare module "auth/jwt.interface" {
    import { User } from "user/entities/user.entity";
    const UserToken_base: import("@nestjs/common").Type<Pick<User, "email" | "id" | "name">>;
    export class UserToken extends UserToken_base {
    }
}
declare module "bundle/bundle.repository" {
    import { Repository, UpdateResult } from 'typeorm';
    import { Bundle } from "bundle/entities/bundle.entity";
    import { Card } from "bundle/entities/card.entity";
    interface UpdateBundle extends Omit<Partial<Bundle> & {
        id: number;
    }, 'cards'> {
        cards: Partial<Card>[];
    }
    export class BundleRepository extends Repository<Bundle> {
        update(): Promise<UpdateResult>;
        updateBundle(updateBundle: UpdateBundle): Promise<Bundle>;
    }
}
declare module "bundle/casl-ability.factory" {
    import { Ability, InferSubjects } from '@casl/ability';
    import { UserToken } from "auth/jwt.interface";
    import { User } from "user/entities/user.entity";
    import { Bundle } from "bundle/entities/bundle.entity";
    type Subjects = InferSubjects<typeof Bundle | typeof User>;
    export enum Action {
        MANAGE = "manage",
        CREATE = "create",
        READ = "read",
        UPDATE = "update",
        DELETE = "delete"
    }
    export type AppAbility = Ability<[Action, Subjects]>;
    export class BundleAbilityFactory {
        createForUser(user: UserToken): Ability<[Action, InferSubjects<typeof Bundle | typeof User, false>], import("@casl/ability").MongoQuery<Record<string | number | symbol, unknown>>>;
    }
}
declare module "bundle/dto/create-bundle.dto" {
    export class CreateBundleDto {
        title?: string;
        description?: string;
        cards?: any[];
        isPrivate?: boolean;
    }
}
declare module "bundle/dto/update-bundle.dto" {
    import { Bundle } from "bundle/entities/bundle.entity";
    import { Card } from "bundle/entities/card.entity";
    export class UpdateBundleDto {
        title?: string;
        description?: string;
        cards: Card[];
        isPrivate?: boolean;
    }
    export class UpdateBundleResponseDTO extends Bundle {
    }
}
declare module "bundle/bundle.service" {
    import { UserToken } from "auth/jwt.interface";
    import { BundleRepository } from "bundle/bundle.repository";
    import { CreateBundleDto } from "bundle/dto/create-bundle.dto";
    import { UpdateBundleDto } from "bundle/dto/update-bundle.dto";
    import { Bundle } from "bundle/entities/bundle.entity";
    export class BundleService {
        private readonly bundleRepository;
        constructor(bundleRepository: BundleRepository);
        create(user: UserToken, { cards, description, title, isPrivate }: CreateBundleDto): Promise<Bundle | false>;
        findAll(userId?: number): Promise<Bundle[]>;
        findOne(id: number): Promise<Bundle | undefined>;
        update(bundleId: number, user: UserToken, { cards, description, title, isPrivate }: UpdateBundleDto): Promise<false | Bundle>;
        remove(id: number, user: UserToken): Promise<"SUCCESS" | "UNAUTHORIZED" | "NOTFOUND">;
    }
}
declare module "auth/interfaces/request.interface" {
    import { Request } from 'express';
    import { UserToken } from "auth/jwt.interface";
    export interface RequestWithUser extends Request {
        user: UserToken;
    }
}
declare module "bundle/bundle.controller" {
    import { RequestWithUser } from "auth/interfaces/request.interface";
    import { BundleService } from "bundle/bundle.service";
    import { BundleAbilityFactory } from "bundle/casl-ability.factory";
    import { CreateBundleDto } from "bundle/dto/create-bundle.dto";
    import { UpdateBundleDto, UpdateBundleResponseDTO } from "bundle/dto/update-bundle.dto";
    import { Bundle } from "bundle/entities/bundle.entity";
    export class BundleController {
        private readonly bundleService;
        private readonly abilityFactory;
        constructor(bundleService: BundleService, abilityFactory: BundleAbilityFactory);
        create(createBundleDto: CreateBundleDto, req: any): Promise<false | Bundle>;
        findAll(userId?: number): Promise<Bundle[]>;
        findOne(id: number): Promise<Bundle>;
        update(id: number, req: RequestWithUser, updateBundleDto: UpdateBundleDto): Promise<UpdateBundleResponseDTO>;
        remove(id: number, req: RequestWithUser): Promise<string>;
    }
}
declare module "bundle/card.repository" {
    import { Repository } from 'typeorm';
    import { Card } from "bundle/entities/card.entity";
    export class CardRepository extends Repository<Card> {
    }
}
declare module "bundle/bundle.module" {
    export class BundleModule {
    }
}
declare module "app.module" {
    import { MiddlewareConsumer, NestModule } from '@nestjs/common';
    export class AppModule implements NestModule {
        configure(consumer: MiddlewareConsumer): void;
    }
}
declare module "http-exception.filter" {
    import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
    export class HttpExceptionFilter implements ExceptionFilter {
        catch(exception: HttpException, host: ArgumentsHost): void;
    }
}
declare module "main" {
    import 'reflect-metadata';
}
