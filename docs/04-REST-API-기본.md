# 04-REST-API-기본

## 목표

```tree
4. REST API 기본
  1. Prisma를 통한 모델링
  2. 사용자 정보 등록
  3. 사용자 정보 조회
```

## 4.1. Prisma를 통한 모델링

`prisma/schema.prisma` 파일을 변경 후 아래 커맨드를 실행한다. 개발서버, 운영서버 반영시에도 migrate를 통해 DB를 업데이트 하는 것이 중요.

```bash
# LOCAL DB 초기화 ( RM - UP - SLEEP - MIGRATE - GENERATE )
# DB를 완전 초기화 시키고 싶은 경우 실행
npm run db:reset

# LOCAL DB 마이그레이션 ( MIGRATE - GENERATE )
# prisma.schema 파일이 업데이트 된 경우 실행
npm run db:update

# LOCAL DB 기준 실행
npm run local
```

### 4.1.1. pacakge.json 변경

```json
{
  "scripts": {
    "db:rm": "docker compose rm db-local-dev -s -f -v",
    "db:up": "docker compose up db-local-dev -d",
    "db:migrate": "dotenv -e .env.local -- prisma migrate dev --name local-dev",
    "db:generate": "dotenv -e .env.local -- prisma generate",
    "db:reset": "npm run db:rm && npm run db:up && sleep 1 && npm run db:migrate && npm run db:generate",
    "db:update": "npm run db:migrate && npm run db:generate",
    "local": "dotenv -e .env.local -- nodemon ./src/app.js"
  }
}
```

## 4.2. 사용자 정보 등록

```js
// ./src/routes/userRouter.js
router.post('/', createUser);
```

```js
// ./src/controllers/userController.js
export async function createUser(req, res, next) {
  // 1. param
  const { mail, pswr } = req.body; // CmnUser
  const { name, nickName, celPhn } = req.body; // CmnUserPrfl, optional

  // 1. param : validation
  if (mail == null || pswr == null) {
    return res.status(400).json({ error: 'mail, pswr required' }); // 400 Bad Request
  }

  // 2. db query : find user
  let cmnFind = 0;
  try {
    cmnFind = await prisma.cmnUser.count({
      where: { mail },
    });
  } catch (e) {
    return next(e);
  }

  // user validation
  if (cmnFind > 0) {
    return res.status(400).json({ error: 'mail already exists' }); // 400 Bad Request
  }

  // 2. db query : create cmn_user
  const hash = await bcrypt.hash(pswr, SALT_ROUNDS); // 비밀번호 암호화
  let cmnUser;
  try {
    cmnUser = await prisma.cmnUser.create({
      data: {
        mail,
        hash,
        // 관계가 있는 경우 별도의 아이디를 생성하지 않아도 된다. (  userId: cmnUser.id )
        cmnUserPrfl: {
          create: { name, nickName, celPhn },
        },
      },
    });
  } catch (e) {
    return next(e);
  }

  // 3. response
  return getUserById({ params: { id: cmnUser.id } }, res, next);
}
```

## 4.3. 사용자 정보 조회

```js
// ./src/routes/userRouter.js
router.get('/:id', getUserById);
```

```js
// ./src/controllers/userController.js
export async function getUserById(req, res, next) {
  // 1. param
  const { id } = req.params;

  // 1. param - validation
  if (id == null) {
    return res.status(400).json({ error: 'user id required' }); // 400 Bad Request
  }

  // 2. db query : find user
  let cmnUser = null;
  try {
    // include 와 select 는 동시에 사용할 수 없다.
    cmnUser = await prisma.cmnUser.findUnique({
      where: { id },
      select: {
        mail: true,
        useYn: true,
        rfrsTkn: true,
        cmnUserPrfl: {
          select: { name: true, nickName: true, celPhn: true },
        },
      },
    });
  } catch (e) {
    return next(e);
  }
}
```

## 참조링크

- [prisma : Relation queries](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries)
