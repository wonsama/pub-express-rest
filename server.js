import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
// const path = require('path');
import path from 'path';
dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10'); // salt 돌리는 횟수

// 👈 추가

const __dirname = fileURLToPath(new URL('.', import.meta.url)); // 👈 추가
// const __filename = fileURLToPath(import.meta.url); // 👈 추가

// v4.16 이상
// body-parser 기능이 Express 에 내장되어있어 모듈설치 및 import를 따로 하지 않아도 됩니다.

const prisma = new PrismaClient();
const app = express();
const SERVER_PORT = parseInt(process.env.SERVER_PORT || '3000');

// 정적 파일을 제공하는 미들웨어 함수를 사용하여 public 디렉토리의 파일을 제공합니다.
app.use('/public', express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
// application/x-www-form-urlencoded 형식으로 전달된 요청 파라미터를 파싱할 수 있게 합니다.
app.use(express.urlencoded({ extended: false }));

// parse application/json
// application/json 형식으로 전달된 요청 파라미터를 파싱할 수 있게 합니다.
app.use(express.json());

// 클라이언트에서 서버로 전송할 수 있는 json 데이터의 최대 크기를 50메가로 지정
app.use(
  express.json({
    limit: '100mb',
  }),
);

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

// app.put('/publish/:id', async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.update({
//     where: { id },
//     data: { published: true },
//   });
//   res.json(post);
// });

// app.delete('/user/:id', async (req, res) => {
//   const { id } = req.params;
//   const user = await prisma.user.delete({
//     where: {
//       id,
//     },
//   });
//   res.json(user);
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  // res.send('Hello World!');
});

app.listen(SERVER_PORT, () => {
  console.log(`server started at : http://localhost:${SERVER_PORT}`);
});
