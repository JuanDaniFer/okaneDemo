const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function  initialize(passport, getUserByEmail, getUserById)  {
  const authenticateUser = async (email, password, done) => {
    
    const user = await getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
    try {
      if (user.password == password) {
        console.log(user)
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => {done(null, user.id)})
  passport.deserializeUser((id, done) => {
    getUserById(id).then(user => done(null,user))
  })
}

module.exports = initialize