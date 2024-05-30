# 04-REST-API-인증

## 목표

```tree
4. REST API 인증
   1. JWT 인증 구현
      1. access_token
      2. 인증 처리
      3. refresh_token ??
```

## 라이브러리 설치

```bash
npm i jsonwebtoken passport passport-jwt
```

```js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// JWT Options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_secret_key',
};

// JWT Strategy
const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  // Find the user based on the payload
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

// Use the JWT Strategy
passport.use(jwtStrategy);
```

```js
// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the database
  User.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the password
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: 'Invalid username or password' });
      }

      // Generate a JWT
      const payload = { sub: user._id };
      const token = jwt.sign(payload, jwtOptions.secretOrKey);

      return res.status(200).json({ token });
    });
  });
});

// Protected Route
app.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({ message: 'Access granted' });
  },
);
```

## 참조링크

- [passport + JWT를 활용한 로그인 구현](https://velog.io/@pixelstudio/passport-JWT%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84)
- [expressjs : routing](https://expressjs.com/en/guide/routing.html)
- [Express + Typescript 환경 구축하기](https://velog.io/@brgndy/Express-Typescript-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0)
- [`[express.js] 누구나 시작할 수 있는! typescript로 express.js 세팅하기 (+Eslint, Prettier)`](https://velog.io/@gyulhana/express.js-%EB%88%84%EA%B5%AC%EB%82%98-%EC%8B%9C%EC%9E%91%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-typescript%EB%A1%9C-express.js-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0-Eslint-Prettier)
