import {
  insertUser,
  selectUser,
  selectUserCount,
} from "../servcices/userService.js";
import { resErrJson, resJson, resListJson } from "../utils/ResponseUtil.js";

import { createPage } from "../utils/RequestUtil.js";

// 기본접두사 : get, post, put, delete / 라우팅 정보와 동일하게 구성
// 메소드명 형식 : [메소드명][라우팅정보1][라우팅정보2]...

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

export async function postUser(req, res, next) {
  // 1. param
  const { mail, pswr } = req.body; // CmnUser, mandatory
  if (mail == null || pswr == null) {
    return resErrJson(res, "mail, pswr required");
  }

  try {
    // 2. db query : 기등록 사용자 점검
    let count = await selectUserCount({ mail });
    if (count > 0) {
      return resErrJson(res, "mail already exists");
    }
  } catch (e) {
    return next(e);
  }

  // 2. db query : insert user
  try {
    const cmnUser = await insertUser(req);
    // 3. response
    resJson(res, cmnUser, 201);
  } catch (e) {
    return next(e);
  }
}
