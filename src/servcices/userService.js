import {
  createData,
  createSelect,
  createWhere,
  subData,
  subSelect,
} from "../utils/RequestUtil.js";

import { PrismaClient } from "@prisma/client";
import { SALT_ROUNDS } from "../config/config.js";
import bcrypt from "bcrypt";

// 유효성 검증은 controller 에서 수행
// 기본 접두사 : insert, select, update, delete
// 추가 접두사 : isValid, isExist, count, generate

const prisma = new PrismaClient();

export async function insertUser(params) {
  const select = createSelect(["id", "mail", "useYn", "rfrsTkn"]);
  subSelect(select, "cmnUserPrfl", ["name", "nickName", "celPhn"]);

  // 요청 정보에 비밀번호 해시값 추가
  const { pswr } = params;
  const hash = await bcrypt.hash(pswr, SALT_ROUNDS);
  params.hash = hash;

  const data = createData(["mail", "hash"], params);
  subData(data, "cmnUserPrfl", ["name", "nickName", "celPhn"], params); // 관계가 있는 경우 별도의 아이디를 생성하지 않아도 된다. (  userId: cmnUser.id )

  return prisma.cmnUser.create({ data, select });
}

export async function selectUser(params, fields) {
  const { take, skip } = params;
  const where = createWhere(["id", "mail", "useYn", "rfrsTkn"], params);
  const select = createSelect(["id", "mail", "useYn", "rfrsTkn"]);
  subSelect(select, "cmnUserPrfl", ["name", "nickName", "celPhn"]);
  const orderBy = { rgstDate: "desc" };

  return prisma.cmnUser.findMany({
    skip,
    take,
    where,
    select: fields || select,
    orderBy,
  });
}

export async function selectUserUnique(params, fields) {
  const users = await selectUser(params, fields);

  if (users.length === 0) {
    return null;
  }
  // 1 이상은 존재하지 않음, mail 에 unique 키가 걸려 있기 떄문
  return users[0];
}

export async function updateUser(params) {
  const { id } = params;
  if (id == null) {
    throw new Error("id is required");
  }
  const data = createData(["mail", "useYn", "rfrsTkn"], params, true);

  return prisma.cmnUser.update({
    where: { id },
    data,
  });
}

export async function selectUserCount(params) {
  const where = createWhere(["id", "mail", "useYn", "rfrsTkn"], params);

  return prisma.cmnUser.count({ where });
}

export async function truncateUser() {
  const NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV == "local") {
    let removedProfile = await prisma.cmnUserPrfl.deleteMany(); // 프로필 삭제 후
    let removedUser = await prisma.cmnUser.deleteMany(); // 사용자 정보를 삭제

    return {
      removedProfile,
      removedUser,
      message: "clear all user data success",
    };
  }
  return {
    removedProfile: 0,
    removedUser: 0,
    message: "clear all user data fail, available in NODE_ENV='local' ",
  };
}
