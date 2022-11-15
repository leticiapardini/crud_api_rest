import { User } from './../entities/User';
import { PassportStatic } from "passport";
import passportLocal from 'passport-local'
import { compare} from 'bcryptjs'
import { UsersRepository } from "../repositories/UsersRepository";
import { FindOperator } from 'typeorm';

export const Auth = (passport: PassportStatic) => {

  passport.use( new passportLocal.Strategy({usernameField: "email"} , (email, password, done) => {
    UsersRepository.findOne({ where: {
      email: email
    }}).then((user) => {
      if(!user) {
        return done(null, false, { message: "Usuário não encontrado"})
      }
      // compare(password, user.password, (err, response) => {
      //   if(response){
      //     return done(null, user)
      //   }

      //   return done(null, false, {message: "Senha incorreta"})
      // })

      if(user.password !== password){
        return done(null, false, {message: "Senha incorreta"})
      }

      return done(null, user)
    })
  }))

  passport.serializeUser((user, done) => {
    return done(null, user)
  })

  passport.deserializeUser(({ id }, done) => {
    UsersRepository.findOneBy({id}).then((user) => {
      return done(null, user)
    }).catch((err) => {
      return done(err)
    })
  })
} 

