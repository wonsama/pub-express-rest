# 04-REST-API-인증

## 목표

```tree
4. REST API 인증
  1. JWT 인증 요약
  2. JWT 인증 구현
```

## 4.1. JWT 인증 요약

1. 의존성 설치 `npm i express jsonwebtoken passport passport-jwt bcryptjs`
2. 환경변수 설정
3. Passport 전략 설정 - access token, refresh token
4. 미들웨어 정의 - access token, refresh token 을 사용하여 인증
5. 사용자 인증 라우터 구현
6. express 설정 - 미들웨어 적용

## 4.2. JWT 인증 구현

### 4.2.1. 의존성 설치

```bash
npm i jsonwebtoken passport passport-jwt
```

### 4.2.2. 환경변수 설정

### 4.2.3. Passport 전략 설정

### 4.2.4. 미들웨어 정의

### 4.2.5. 사용자 인증 라우터 구현

### 4.2.6. express 설정

## 참조링크

- [passport + JWT를 활용한 로그인 구현](https://velog.io/@pixelstudio/passport-JWT%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84)
- [expressjs : routing](https://expressjs.com/en/guide/routing.html)
- [Express + Typescript 환경 구축하기](https://velog.io/@brgndy/Express-Typescript-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0)
- [`[express.js] 누구나 시작할 수 있는! typescript로 express.js 세팅하기 (+Eslint, Prettier)`](https://velog.io/@gyulhana/express.js-%EB%88%84%EA%B5%AC%EB%82%98-%EC%8B%9C%EC%9E%91%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-typescript%EB%A1%9C-express.js-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0-Eslint-Prettier)
- [Spring Security JWT Role-based Authorization Tutorial](https://www.codejava.net/frameworks/spring-boot/spring-security-jwt-role-based-authorization)
- [JWT에서 역할을 설정하는 것이 모범 사례인가요?](https://stackoverflow.com/questions/47224931/is-setting-roles-in-jwt-a-best-practice)
- [Role-based access control with JWT](https://docs.netlify.com/security/secure-access-to-sites/role-based-access-control/)
