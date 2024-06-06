import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh";
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || "1h";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";

// 유효성 검증은 controller 에서 수행
// 기본 접두사 : insert, select, update, delete
// 추가 접두사 : isValid, isExist, count, generate

export function generateTokens(id) {
  // jwt.sign 을 통해 기록된 값은 decode 이후 payload 에서 확인 가능
  const accessToken = jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
}

export async function decodeJwt(token, isRefresh = true) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      isRefresh ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        return resolve(decoded);
      }
    );
  });
}
