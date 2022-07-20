import passport from "passport";
import passportJwt from "passport-jwt";
import config from "../config/config.js";

const cookieExtractor = (req) => {
  let jwt;

  if (req && req.cookies) {
    jwt = req.cookies;
  }

  return jwt.userJwtToken;
};
const JWTStrategy = passportJwt.Strategy;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: config.secret,
    },
    (jwtPayload, done) => {
      if (jwtPayload) {
        return done(null, jwtPayload);
      }
      return done(null, false);
    }
  )
);
