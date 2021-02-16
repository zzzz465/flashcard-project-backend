import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { User } from 'src/user/entities/user.entity'
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

@Injectable()
export class BundleAbilityFactory {
  createForUser(user: User) {
    const { build, can, cannot } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    )

    can(Action.MANAGE, Bundle, { owner: user.id })

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>, // why??
    })
  }
}
