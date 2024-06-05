import {
  addSubSelect,
  createSelect,
  dynamicData,
  dynamicWhere,
} from "../utils/RequestUtil.js";

import { PrismaClient } from "@prisma/client";
import { SALT_ROUNDS } from "../config/config.js";
import bcrypt from "bcrypt";

// 유효성 검증은 controller 에서 수행
// 기본 접두사 : insert, select, update, delete
// 추가 접두사 : isValid, isExist, count, generate

const prisma = new PrismaClient();
const USER_SELECT_FIELDS = ["id", "mail", "useYn", "rfrsTkn"];

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

export async function selectUser(params, fields) {
  const { take, skip } = params;
  const where = dynamicWhere(["id", "mail", "useYn", "rfrsTkn"], params);
  const select = createSelect(["id", "mail", "useYn", "rfrsTkn"]);
  addSubSelect(select, "cmnUserPrfl", ["name", "nickName", "celPhn"]);
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
  if (users.length > 1) {
    throw new Error("user is not unique");
  }
  return users[0];
}

export async function updateUser(params) {
  const { id } = params;
  if (id == null) {
    throw new Error("id is required");
  }
  const data = dynamicData(["mail", "useYn", "rfrsTkn"], params);

  return prisma.cmnUser.update({
    where: { id },
    data,
  });
}

export async function selectUserCount(params) {
  const where = dynamicWhere(["id", "mail", "useYn", "rfrsTkn"], params);

  return prisma.cmnUser.count({ where });
}
