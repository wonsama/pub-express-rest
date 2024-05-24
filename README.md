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
   2. 사용자 정보 추가
3. REST API 기본
   1. EXPRESS 설치
   2. PRISMA 설치
   3. 사용자 정보 조회
4. REST API 인증
   1. JWT 인증 구현
      1. access_token
      2. 인증 처리
      3. refresh_token ??
5. REST API 글쓰기
   1. 글쓰기 테이블 설계
      1. GOOGLE SHEET
      2. PRISMA
   2. API 구현
      1. 글 읽기 : 인증 X
      2. 글 쓰기 : 인증 이후 가능
6. redoc
   1. [npm : redoc-express](https://www.npmjs.com/package/redoc-express)

## 참조링크

1. [Nodejs](https://nodejs.org/ko/)
2. [Express](https://expressjs.com/ko/)
3. [Postgresql](https://www.postgresql.org/)
4. [Prisma](https://www.prisma.io/)
5. [REST API](https://restfulapi.net/)
6. [JWT](https://jwt.io/)
7. [Docker](https://www.docker.com/)
8. [Google Sheet](https://www.google.com/sheets/about/)
9. [Node Express - Swagger 연동](https://velog.io/@yongh8445/Node-Express-Swagger-%EC%97%B0%EB%8F%99)
