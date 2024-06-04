import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import passport from "passport";

const accessOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

const refreshOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.REFRESH_TOKEN_SECRET,
};

passport.use(
  "access",
  new JwtStrategy(accessOpts, (jwt_payload, done) => {
    // Here, you can add logic to verify the user from the payload
    // jwt_payload : 최초 token 발급시 payload 에 담긴 정보 => user 정보
    return done(null, jwt_payload);
  })
);

passport.use(
  "refresh",
  new JwtStrategy(refreshOpts, (jwt_payload, done) => {
    // Here, you can add logic to verify the user from the payload
    // jwt_payload : 최초 token 발급시 payload 에 담긴 정보 => user 정보
    return done(null, jwt_payload);
  })
);

export default passport;
