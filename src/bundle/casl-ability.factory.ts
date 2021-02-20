import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { UserToken } from '../auth/jwt.interface'
import { User } from '../user/entities/user.entity'
import { Bundle } from './entities/bundle.entity'

type Subjects = InferSubjects<typeof Bundle | typeof User>

export enum Action {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type AppAbility = Ability<[Action, Subjects]>

// 이거 굳이 해야하나? 일단 보류해보고 나중에 사용 가능해지면 쓰자
@Injectable()
export class BundleAbilityFactory {
  createForUser(user: UserToken) {
    const { build, can, cannot } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>)
    can(Action.MANAGE, Bundle, { owner: user.id })

    const res = build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>, // why??
    })

    return res
  }
}
