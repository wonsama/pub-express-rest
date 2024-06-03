# pub-express-rest

## 개요

REST API 서버를 손쉽게 구축하기 위한 TEMPLATE 프로젝트

## 목표

1. 기본설정
   1. 구성
      1. nodejs / express / postgresql / prisma / rest-api / jwt
   2. GITHUB 생성
   3. DOCKER-COMPOSE
      1. 로컬 DB 만들기 : postresql
2. 테이블 설계
   1. 구글 시트를 활용한 테이블 초안 설계
   2. PRISMA를 통한 모델링
3. EXPRESS 설정
   1. EXPRESS 구성 및 설치
   2. EXPRESS 미들웨어
   3. PRISMA 설치 및 테이블 생성
4. REST API 기본
   1. 사용자 정보 조회
5. REST API 인증
   1. JWT 인증 구현
      1. access_token
      2. 인증 처리
      3. refresh_token ??
6. REST API 글쓰기
   1. 글쓰기 테이블 설계
      1. GOOGLE SHEET
      2. PRISMA
   2. API 구현
      1. 글 읽기 : 인증 X
      2. 글 쓰기 : 인증 이후 가능
7. redoc
   1. [npm : redoc-express](https://www.npmjs.com/package/redoc-express)

## 참조링크

- [Nodejs](https://nodejs.org/ko/)
- [Express](https://expressjs.com/ko/)
- [Postgresql](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [REST API](https://restfulapi.net/)
- [JWT](https://jwt.io/)
- [Docker](https://www.docker.com/)
- [Google Sheet](https://www.google.com/sheets/about/)
- [Node Express - Swagger 연동](https://velog.io/@yongh8445/Node-Express-Swagger-%EC%97%B0%EB%8F%99)

- [ejs vs handlebars vs pug(jade)](https://medium.com/@sonky740/ejs-vs-handlebars-vs-pug-jade-1592efedae8c)
- [next의 사용법](https://velog.io/@yjs_177076/next%EC%9D%98-%EC%82%AC%EC%9A%A9%EB%B2%95)
