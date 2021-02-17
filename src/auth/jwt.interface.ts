import { Injectable } from '@nestjs/common'
import { OmitType } from '@nestjs/swagger'
import { User } from '../user/entities/user.entity'

export class userToken extends OmitType(User, ['encrypted', 'bundles']) {}
