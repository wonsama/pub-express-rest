# 03-EXPRESS-설정

## 목표

```tree
3. EXPRESS 설정
   1. EXPRESS 구성 및 설치
   2. EXPRESS 미들웨어
   3. PRISMA 설치 및 테이블 생성
```

## 3.1. EXPRESS 구성 및 설치

### 3.1.1. EXPRESS 설치

REST API 서버를 구축하기 위한 EXPRESS 프레임워크 설치

```bash
# 의존성 설치
npm i express bcrypt @prisma/client dotenv dotenv-cli
npm i --save-dev nodemon prisma
```

### 3.1.2. 폴더 구성

주요 폴더 정보

- public : 정적 파일을 저장하는 폴더
- views : ejs 파일을 저장하는 폴더
- src : 소스 파일을 저장하는 폴더
- src/controllers : 컨트롤러 파일을 저장하는 폴더
- src/models : 모델 파일을 저장하는 폴더
- src/routes : 라우터 파일을 저장하는 폴더
- src/middleware : 미들웨어 파일을 저장하는 폴더
- src/utils : 유틸리티 파일을 저장하는 폴더
- src/config : 설정 파일을 저장하는 폴더

```tree
my-app/
├── node_modules/
├── src/
│   ├── controllers/
│   │   ├── userController.js
│   │   └── productController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── productRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── utils/
│   │   └── utils.js
│   ├── config/
│   │   └── config.js
│   └── app.js
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── index.html
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── users/
│   │   ├── profile.ejs
│   │   └── login.ejs
│   ├── products/
│   │   ├── list.ejs
│   │   └── details.ejs
│   └── index.ejs
├── .env.local
├── package.json
```

## 3.2. EXPRESS 미들웨어

- 미들웨어 모듈
- 데이터 파싱 : body-parser 미들웨어
- 데이터 압축 : compression 미들웨어
- 쿠키 관리 : cookie-parser 미들웨어
- 쿠키 세션 : cookie-session 미들웨어
- 세션 관리 : express-session 미들웨어
- CORS 관리 : cors 미들웨어
- 로깅 관리 : morgan 미들웨어
- 파일 업로드 : multer 미들웨어
- 코드 실행 시간 측정 : response-time 미들웨어
- 타임아웃 설정 : connect-timeout 미들웨어

## 3.3. PRISMA 설치 및 테이블 생성

### 3.3.1. PRISMA 설치

Prisma는 이러한 도구들로 구성된 차세대 ORM입니다.

Prisma Client: Node.js 및 TypeScript용 자동 생성 및 유형 안전 쿼리 빌더
Prisma Migrate: 선언적 데이터 모델링 및 마이그레이션 시스템
Prisma Studio: 데이터베이스의 데이터를 보고 편집할 수 있는 GUI

```bash
# CLI 설치
npm install prisma --save-dev

# PRISMA CLIENT 설치
npm install @prisma/client

# PRISMA 초기화
# .env 파일을 생성 : DATABASE_URL 설정 필요
# prisma/schema.prisma 파일을 생성 : 데이터베이스 연결 정보를 .env 로 부터 읽어옴, model 설정 필요
npx prisma init --datasource-provider postgresql
```

### 3.3.2. PRISMA SCHEMA 생성

1. 기존 데이터베이스를 가리키도록 `.env` 파일의 `DATABASE_URL` 을 설정합니다. 데이터베이스에 아직 테이블이 없다면 [https://pris.ly/d/getting-started](https://pris.ly/d/getting-started) 를 읽어보세요.
2. `prisma db pull` 을 실행하여 데이터베이스 스키마를 Prisma 스키마로 전환합니다.
3. `prisma generate` 를 실행하여 Prisma 클라이언트를 생성하세요. 그런 다음 데이터베이스 쿼리를 시작할 수 있습니다.

````bash
# 이 명령어는 npx prisma introspect 명령어를 통해서 생성된 schema.prisma 파일을 읽어서
# node_modules/@prisma/client 폴더 안에 우리가 사용할 prisma client 코드를 생성 해 준다.```
npx prisma generate
````

### 3.3.3. PRISMA MIGRATION

> 최초 DB에 `_prisma_migrations` 테이블이 생성되고, 마이그레이션 파일이 생성됩니다.

```bash
# _prisma_migrations 테이블에 마이그레이션 이력  정보가 기록됨
# prisma/migrations 폴더에 마이그레이션 파일을 생성
# DB 반영 전 STEP 1/2
npx prisma migrate dev --create-only --preview-feature

# 생성된 migration.sql 파일을 DB에 반영
# DB 반영 STEP 2/2
npx prisma migrate deploy --preview-feature

# 마이그레이션 파일을 생성하고 DB에 반영 (STEP 1/2, 2/2 를 포함)
npx prisma migrate dev --preview-feature
```

### 3.3.4. model, view, controller, service

- model : 데이터베이스 테이블과 연결되는 모델
- view : 사용자에게 보여지는 화면
- controller : 사용자의 요청을 받아서 처리하는 컨트롤러
- service : 비즈니스 로직을 처리하는 서비스

model 은 prisma client 를 통해 제공 받는 것을 활용

## 참조링크

- [expressjs : hello-world](https://expressjs.com/ko/starter/hello-world.html)
- [prisma : express](https://www.prisma.io/express)
- [TIL #4. prisma 설치 및 node.js와 연동](https://velog.io/@jinybear/TIL-4.-prisma-%EC%84%A4%EC%B9%98-%EB%B0%8F-node.js%EC%99%80-%EC%97%B0%EB%8F%99)
- [prisma : quickstart](https://www.prisma.io/docs/getting-started/quickstart)
- [[Prisma] Prisma migrate](https://pyh.netlify.app/prisma/prisma_migrate/)
- [prisma : prisma-in-your-stack : rest](https://www.prisma.io/docs/orm/overview/prisma-in-your-stack/rest)
- [[Node.js]Express 미들웨어 모듈 정리(body-parser, cookie-parser, express-session, cors, morgan, multer)](https://m.blog.naver.com/hj_kim97/222914781861)
- [expressjs : static-files](https://expressjs.com/en/starter/static-files.html)
- [ReferenceError: \_\_dirname is not defined in ES module scope](https://velog.io/@rlwjd31/ReferenceError-dirname-is-not-defined-in-ES-module-scope)
