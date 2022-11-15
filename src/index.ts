import  passport  from 'passport';
import { Auth } from './middlewares/auth';
import express from 'express'
import { routes } from './routes/routes'
import { AppDataSource } from './data-source'
import flash from 'connect-flash'
import session from 'express-session'


AppDataSource.initialize().then(() => {
  Auth(passport)
  const app = express()
  app.use(session({ secret: process.env.KEY as string | string[],
                    resave: true,
                    saveUninitialized: true}));
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(express.json())
  app.use(flash());

  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
  })

  app.use(routes)

  return app.listen(3000, () => {
    console.log('running server!')
  })
}).catch((err) => {
  console.error(err)
})