import passport from '../config/passport.js';
import { resErrJson } from '../utils/ResponseUtil.js';

// export const authenticateAccessJWT = passport.authenticate(
//   'access',
//   {
//     session: false,
//   },
//   function (err, user, info) {
//     // if (err) {
//     //   return resErrJson(res, err.message, 500);
//     // }
//     // console.log('user', user);
//     // console.log('info', info);
//     // next();
//     // next(err);
//   },
// );
// export const authenticateAccessJWT = passport.authenticate('access', {
//   session: false,
// });
export const authenticateAccessJWT = (req, res, next) => {
  passport.authenticate('access', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    // user => jwt payload, 인증이 정상적으로 처리되면 payload 정보가 있고 아니라면 false
    if (!user) {
      return resErrJson(res, info.message || 'Authentication failed', 401);
    }

    // user 에 payload 정보를 저장
    req.user = user;
    next();
  })(req, res, next);
};

export const authenticateRefreshJWT = passport.authenticate('refresh', {
  session: false,
});

// export const authenticateAccessJWT = function (err, req, res, next) {
//   passport.authenticate(
//     'access',
//     {
//       session: false,
//     },
//     function (err1, user1, info1) {
//       console.log('err', err1);
//       console.log('user', user1);
//       console.log('info', info1);
//       // if (err) {
//       //   return res.status(500).send('Your custom exception message here'); // Change the exception message
//       // }

//       // // if (!user) {
//       // //   return res.status(401).send(info.message); // Send the default authentication failure message
//       // // }

//       // // req.user = user;

//       next();
//     },
//   )(req, res, next);
// };

export const authExceptionHandler = (err, req, res, next) => {
  console.log(111);
  if (err) {
    // Handle Passport authentication exceptions
    if (err.name === 'AuthenticationError') {
      return res
        .status(401)
        .json({ error: 'Authentication failed', message: err.message });
    }
    // Handle other exceptions
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: err.message });
  }
  next();
};
