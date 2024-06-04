import { PrismaClient } from '@prisma/client';
import { SALT_ROUNDS } from '../config/config.js';
import bcrypt from 'bcrypt';

// 유효성 검증은 controller 에서 수행
// 기본 접두사 : insert, select, update, delete
// 추가 접두사 : isValid, isExist, count, generate

const prisma = new PrismaClient();

export async function insertUser(req) {
  const { mail, pswr } = req.body; // CmnUser, mandatory
  const { name, nickName, celPhn } = req.body; // CmnUserPrfl, optional

  const hash = await bcrypt.hash(pswr, SALT_ROUNDS); // 비밀번호 암호화

  return prisma.cmnUser.create({
    data: {
      mail,
      hash,
      // 관계가 있는 경우 별도의 아이디를 생성하지 않아도 된다. (  userId: cmnUser.id )
      cmnUserPrfl: {
        create: { name, nickName, celPhn },
      },
    },
    // create 를 한 경우에는 refresh token 값은 존재하지 않는다
    select: {
      mail: true,
      useYn: true,
      // rfrsTkn: true,
      cmnUserPrfl: {
        select: { name: true, nickName: true, celPhn: true },
      },
    },
  });
}

export async function isExistUserByEmail(mail) {
  let count = await prisma.cmnUser.count({
    where: { mail },
  });

  return count > 0;
}

export async function selectUserById(id) {
  // include 와 select 는 동시에 사용할 수 없다.
  return prisma.cmnUser.findUnique({
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
}

export async function selectUserMe(req) {
  // include 와 select 는 동시에 사용할 수 없다.
  return prisma.cmnUser.findUnique({
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
}

export async function selectUserByMail(mail) {
  // include 와 select 는 동시에 사용할 수 없다.
  return prisma.cmnUser.findUnique({
    where: { mail },
    select: {
      mail: true,
      useYn: true,
      rfrsTkn: true,
      cmnUserPrfl: {
        select: { name: true, nickName: true, celPhn: true },
      },
    },
  });
}

export async function selectUsers(take, skip) {
  // include 와 select 는 동시에 사용할 수 없다.
  return prisma.cmnUser.findMany({
    skip,
    take,
    select: {
      id: true,
      mail: true,
      useYn: true,
      rfrsTkn: true,
      cmnUserPrfl: {
        select: { name: true, nickName: true, celPhn: true },
      },
    },
    orderBy: { rgstDate: 'desc' },
  });
}
