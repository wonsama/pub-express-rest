import passport from "../config/passport.js";
import { resErrJson } from "../utils/ResponseUtil.js";

export const authenticateAccessJWT = (req, res, next) => {
  passport.authenticate("access", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    // user => jwt payload, 인증이 정상적으로 처리되면 payload 정보가 있고 아니라면 false
    if (!user) {
      return resErrJson(res, info.message || "Authentication failed", 401);
    }

    // user 에 payload 정보를 저장
    req.user = user;
    next();
  })(req, res, next);
};

export const authenticateRefreshJWT = (req, res, next) => {
  passport.authenticate("refresh", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    // user => jwt payload, 인증이 정상적으로 처리되면 payload 정보가 있고 아니라면 false
    if (!user) {
      return resErrJson(res, info.message || "Authentication failed", 401);
    }

    // user 에 payload 정보를 저장
    req.user = user;
    next();
  })(req, res, next);
};
