# 03-REST-API-기본

## 목표

```tree
3. REST API 기본
   1. EXPRESS 설치
   2. PRISMA 설치
   3. 사용자 정보 조회
```

## EXPRESS 설치

```bash
npm install express
```

## EXPRESS MIDDLEWARE

Express 미들웨어 모듈

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

## PRISMA 설치

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

### PRISMA SCHEMA 생성

1. 기존 데이터베이스를 가리키도록 `.env` 파일의 `DATABASE_URL` 을 설정합니다. 데이터베이스에 아직 테이블이 없다면 [https://pris.ly/d/getting-started](https://pris.ly/d/getting-started) 를 읽어보세요.
2. `prisma db pull` 을 실행하여 데이터베이스 스키마를 Prisma 스키마로 전환합니다.
3. `prisma generate` 를 실행하여 Prisma 클라이언트를 생성하세요. 그런 다음 데이터베이스 쿼리를 시작할 수 있습니다.

````bash
# 이 명령어는 npx prisma introspect 명령어를 통해서 생성된 schema.prisma 파일을 읽어서
# node_modules/@prisma/client 폴더 안에 우리가 사용할 prisma client 코드를 생성 해 준다.```
npx prisma generate
````

### PRISMA MIGRATE 생성

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

## schema.prisma

> [gsheet](https://docs.google.com/spreadsheets/d/1WGvfLKJqnhiqzotDG_pZtTsafIikOlcWGp0XOdLn8Ao/edit?usp=sharing) 에서 작성한 사용자 정보를 참조하여 model 생성

```prisma
model CmnUser {
  id    String  @id @default(uuid())  @db.VarChar(32) // 아이디
  name String  @db.VarChar(64) // 이름
  mail String  @unique @db.VarChar(64) // 이메일
  nckn  String? @db.VarChar(64) // 닉네임
  celPhn  String? @db.VarChar(16) @map("cel_phn") // 휴대전화
  pswr  String @db.VarChar(64) // 패스워드
  useYn  String @db.Char(1) @default("Y") @map("use_yn")// 사용여부
  rgstId  String @db.VarChar(32) @default("SYSTEM") @map("rgst_id")// 등록자아이디
  rgstDate DateTime  @default(now()) @db.Timestamptz(3) @map("rgst_date") // 등록일
  mdfrId  String @db.VarChar(32) @map("mdfr_id") // 수정자아이디
  mdfcDate  DateTime  @updatedAt @db.Timestamptz(3) @map("mdfc_date")// 수정일

  @@map("cmn_user") // 공통 사용자
}
```

## HASH 암호화

> 패스워드는 bcrypt 라이브러리를 사용하여 암호화 처리, 사용자 조회시 해당 필드는 제외

```js
import bcrypt from 'bcrypt';
...
const hash = await bcrypt.hash(pswr, SALT_ROUNDS); // 비밀번호 암호화
...
// 비공개 정보를 제거한 후 반환
if (cmnUser) {
  delete cmnUser.pswr;
}
```

## 사용자 정보 등록 및 조회

> 사용자 정보를 등록하고 조회하는 API를 작성

```js
// 사용자 정보 등록
app.post('/user', async (req, res) => {
  const { name, mail, nckn, celPhn, pswr } = req.body;

  if (!name || !mail || !pswr) {
    return res.status(400).json({ error: 'name, mail, pswr required' }); // 400 Bad Request
  }

  const cmnFind = await prisma.cmnUser.findUnique({
    where: { mail },
  });
  if (!cmnFind) {
    return res.status(400).json({ error: 'mail already exists' }); // 400 Bad Request
  }

  const hash = await bcrypt.hash(pswr, SALT_ROUNDS); // 비밀번호 암호화
  const cmnUser = await prisma.cmnUser.create({
    data: {
      name,
      mail,
      nckn,
      celPhn,
      pswr: hash,
    },
  });
  res.json(cmnUser);
});

// 사용자 정보 조회
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'user id required' }); // 400 Bad Request
  }

  const cmnUser = await prisma.cmnUser.findUnique({
    where: { id },
  });

  // 비공개 정보를 제거한 후 반환
  if (cmnUser) {
    delete cmnUser.pswr;
  }

  res.json(cmnUser);
});
```

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
