import { Request } from 'express'
import { userToken } from '../jwt.interface'

export interface RequestWithUser extends Request {
  user: userToken
}
