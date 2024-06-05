import {
  insertUser,
  isExistUserByEmail,
  selectUser,
  selectUserById,
  selectUserCount,
} from '../servcices/userService.js';
import { resErrJson, resJson, resListJson } from '../utils/ResponseUtil.js';

import { createPage } from '../utils/RequestUtil.js';

// 기본접두사 : get(select), create(insert), modify(update, delete)

export async function getUsers(req, res, next) {
  // 1. param
  const { id, mail, useYn, rfrsTkn } = req.query; // 검색, optional
  const { page, per } = req.query; // 페이지 1, optional
  const { skip, take } = createPage(page, per); // 페이지 2, auto

  // 2. db query
  let items = null;
  let counts = 0;
  try {
    items = await selectUser({ id, mail, useYn, rfrsTkn, skip, take });
    counts = await selectUserCount({ id, mail, useYn, rfrsTkn });
  } catch (e) {
    return next(e);
  }

  // 3. response
  resListJson(res, items, {
    take,
    skip,
    size: items.length,
    total: counts,
  });
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
  resJson(res, cmnUser);
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

  // 2. db query : insert user
  let cmnUser = null;
  try {
    cmnUser = await insertUser(req);
  } catch (e) {
    return next(e);
  }

  // 3. response
  resJson(res, cmnUser, 201);
}
