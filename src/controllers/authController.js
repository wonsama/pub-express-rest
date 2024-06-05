import {
  decodeJwt,
  generateTokensByMail,
  isValidTokenRefresh,
  isValidUserLogin,
  updateUserTokenRefresh,
} from '../servcices/authService.js';
import { resErrJson, resJson } from '../utils/ResponseUtil.js';

import { selectUserByMail } from '../servcices/userService.js';

// 기본접두사 : get(select), create(insert), modify(update, delete)

export async function getLogin(req, res, next) {
  // 1. param
  const { mail, pswr } = req.body;

  // 1. param - validation
  if (mail == null || pswr == null) {
    return resErrJson(res, 'mail, pswr required');
  }

  // 2. db query : find user
  let isValidUser = false;
  try {
    isValidUser = await isValidUserLogin(mail, pswr);
  } catch (e) {
    return next(e);
  }

  if (!isValidUser) {
    return resErrJson(res, 'invalid user, check mail and pswr');
  }

  // update refresh token
  const { accessToken, refreshToken } = generateTokensByMail(mail);

  // 2. db query : update refresh token
  try {
    await updateUserTokenRefresh(mail, refreshToken);
  } catch (e) {
    return next(e);
  }

  req.user = { mail };

  // 3. response
  resJson(res, { accessToken, refreshToken });
}

export async function getToken(req, res, next) {
  // 1. param

  // 2. db query : is valid refresh token
  let isValidToken = false;
  const authorization = req.headers.authorization; // Bearer token
  const token = authorization.split(' ')[1];
  const decode = await decodeJwt(token);

  try {
    // 최초 token 발급시 사용한 mail 정보 (payload 에서 가져온다) 와 token 이 DB에 존재하는지 여부를 확인한다
    isValidToken = await isValidTokenRefresh(decode.mail, token);
  } catch (e) {
    return next(e);
  }
  if (!isValidToken) {
    return resErrJson(res, 'refresh token is removed. please login again');
  }

  // generate token
  const { accessToken } = generateTokensByMail(decode.mail);

  // 3. response
  resJson(res, { accessToken });
}

export async function getLogout(req, res, next) {
  // 1. param

  // 1. param - validation

  // 2. db query : find user
  const authorization = req.headers.authorization; // Bearer token
  const token = authorization.split(' ')[1];
  const decode = await decodeJwt(token);

  // 2. db query : is valid refresh token
  let isValidToken = false;
  try {
    isValidToken = await isValidTokenRefresh(decode.mail, token);
  } catch (e) {
    return next(e);
  }

  // 2. db query : update refresh token null
  if (isValidToken) {
    // refresh token 이 제거 되지 않은 경우에만 제거한다
    try {
      await updateUserTokenRefresh(decode.mail, null);
    } catch (e) {
      return next(e);
    }
  }

  // 3. response
  resJson(res, { logout: decode.mail });
}

export async function getMe(req, res, next) {
  // 1. param
  // 사전에 토큰을 확인하고 들어온다.
  const authorization = req.headers.authorization; // Bearer token
  const token = authorization.split(' ')[1];
  const decode = await decodeJwt(token, false);

  // 1. param - validation

  // 2. db query : select user
  let cmnUser = null;
  try {
    cmnUser = await selectUserByMail(decode.mail);
  } catch (e) {
    return next(e);
  }

  // 3. response
  resJson(res, cmnUser);
}
