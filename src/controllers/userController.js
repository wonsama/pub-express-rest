import {
  insertUser,
  isExistUserByEmail,
  selectUserById,
  selectUserByMail,
  selectUsers,
} from '../servcices/userService.js';

import { decodeJwt } from '../servcices/authService.js';
import { getPageFromQuery } from '../utils/RequestUtil.js';
import { resErrJson } from '../utils/ResponseUtil.js';

// 기본접두사 : get(select), create(insert), modify(update, delete)

export async function getUsers(req, res, next) {
  // 1. param
  const { take, skip } = getPageFromQuery(req);

  // 1. param - validation

  // 2. db query : select user
  let cmnUsers = null;
  try {
    cmnUsers = await selectUsers(take, skip);
  } catch (e) {
    return next(e);
  }

  // 3. response
  res.json(cmnUsers);
}

/**
 * Retrieves a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the user is retrieved and sent as a response.
 */
export async function getUserById(req, res, next) {
  // 1. param
  const { id } = req.params;

  // 1. param - validation
  if (id == null) {
    return resErrJson(res, 'id required');
  }

  // 2. db query : select user
  let cmnUser = null;
  try {
    cmnUser = await selectUserById(id);
  } catch (e) {
    return next(e);
  }

  // 3. response
  res.json(cmnUser);
}

export async function getMe(req, res, next) {
  // 1. param
  // 사전에 토큰을 확인하고 들어온다.
  const authorization = req.headers.authorization; // Bearer token
  const token = authorization.split(' ')[1];
  const decode = await decodeJwt(token, false);

  console.log('req.user', req.user);

  // 1. param - validation

  // 2. db query : select user
  let cmnUser = null;
  try {
    cmnUser = await selectUserByMail(decode.mail);
  } catch (e) {
    return next(e);
  }

  // 3. response
  res.json(cmnUser);
}

/**
 * Creates a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the user is created and sent as a response.
 */
export async function createUser(req, res, next) {
  // 1. param
  const { mail, pswr } = req.body; // CmnUser, mandatory

  // 1. param : validation
  if (mail == null || pswr == null) {
    return resErrJson(res, 'mail, pswr required');
  }

  // 2. db query : find user
  let isExistUser = false;
  try {
    isExistUser = await isExistUserByEmail(mail);
  } catch (e) {
    return next(e);
  }

  // user validation
  if (isExistUser) {
    return resErrJson(res, 'mail already exists');
  }

  // 2. db query : insert cmn_user
  let cmnUser = null;
  try {
    cmnUser = await insertUser(req);
  } catch (e) {
    return next(e);
  }

  // 3. response
  res.json(cmnUser);
}
