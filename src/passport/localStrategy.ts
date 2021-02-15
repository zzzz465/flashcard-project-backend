import { Strategy as LocalStrategy } from 'passport-local'
import { container } from 'tsyringe'
import { UserModel } from '../models/User'

export default new LocalStrategy({
    
}, (id, password, done) => {
    const userModel = container.resolve(UserModel)
    if (userModel.validateUser(id, password))
        return done(null, userModel.findUser(id))
    else
        return done(null, false, { message: 'unknown ' })
})