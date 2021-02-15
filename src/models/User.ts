import { User } from '../entities/User'
import { injectable } from 'tsyringe'

@injectable()
export class UserModel {
    registerUser(id: string, encrypted: string) {
        throw new Error('not implemented')
    }

    findUser(id: string) {
        throw new Error('not implemented')
    }
}