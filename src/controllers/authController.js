import { decodeJwt, generateTokens } from "../servcices/authService.js";
import { getDecode, getToken } from "../utils/RequestUtil.js";
import { resErrJson, resJson } from "../utils/ResponseUtil.js";
import {
  selectUser,
  selectUserCount,
  selectUserUnique,
  updateUser,
} from "../servcices/userService.js";

import bcrypt from "bcrypt";

// 기본접두사 : get, post, put, delete / 라우팅 정보와 동일하게 구성
// 메소드명 형식 : [메소드명][라우팅정보1][라우팅정보2]...

// O
export async function postLogin(req, res, next) {
  // 1. param
  const { mail, pswr } = req.body;
  if (mail == null || pswr == null) {
    return resErrJson(res, "mail, pswr required");
  }

  // 2. db query : find user
  let user = null;
  try {
    user = await selectUserUnique(
      { mail, useYn: "Y" },
      { id: true, hash: true }
    );
    if (user == null) {
      return resErrJson(res, "invalid user, check mail");
    }
    const isValid = bcrypt.compareSync(pswr, user.hash);
    if (!isValid) {
      return resErrJson(res, "invalid user, check pswr");
    }
  } catch (e) {
    return next(e);
  }

  // create tokens
  const { accessToken, refreshToken } = generateTokens(user.id);

  // 2. db query : update refresh token
  try {
    await updateUser({ id: user.id, rfrsTkn: refreshToken });
  } catch (e) {
    return next(e);
  }

  // 3. response
  resJson(res, { accessToken, refreshToken });
}

export async function postToken(req, res, next) {
  // 1. param
  const { rfrsTkn } = req.body;
  if (rfrsTkn == null) {
    return resErrJson(res, "rfrsTkn required"); // 리프레시 토큰 정보 확인
  }

  try {
    // 2. db query : 유효한 리프레시 토큰인지 확인
    let count = await selectUserCount({ rfrsTkn });
    if (count == 0) {
      return resErrJson(res, "invalid refresh token");
    }
  } catch (e) {
    return next(e);
  }

  // generate tokens
  const decode = await decodeJwt(rfrsTkn, true);
  const { accessToken } = generateTokens(decode.id);

  // 3. response
  resJson(res, { accessToken });
}

// O
export async function postLogout(req, res, next) {
  // 1. param
  const token = getToken(req);
  const decode = await getDecode(req);

  let count = 0;
  try {
    // 2. db query : refresh token 존재여부 확인
    count = await selectUserCount({ id: decode.id, rfrsTkn: token });
    if (count > 0) {
      // 2. db query : refresh token 이 제거 되지 않은 경우에만 제거
      await updateUserTokenRefresh(decode.id, null);
    }
  } catch (e) {
    return next(e);
  }

  // 3. response
  resJson(res, { logout: decode.mail });
}

// O
export async function getMe(req, res, next) {
  // 1. param
  const decode = await getDecode(req);

  try {
    // 2. db query : select user
    const cmnUser = await selectUser({ id: decode.id });

    // 3. response
    resJson(res, cmnUser);
  } catch (e) {
    return next(e);
  }
}
