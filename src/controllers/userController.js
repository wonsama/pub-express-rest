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
  const { id, mail, useYn, rfrsTkn } = req.query; // Search, optional
  const { page, per } = req.query; // Page 1, optional
  const { skip, take } = createPage(page, per); // Page 2, auto

  try {
    // 2. db query : 사용자 목록 조회 (페이징 처리)
    const items = await selectUser({ id, mail, useYn, rfrsTkn, skip, take });

    // 2. db query : 사용자 전체 카운트
    const counts = await selectUserCount({ id, mail, useYn, rfrsTkn });

    // 3. response
    resListJson(res, items, {
      take,
      skip,
      size: items.length,
      total: counts,
    });
  } catch (e) {
    return next(e);
  }
}

export async function postUser(req, res, next) {
  // 1. param
  const { mail, pswr } = req.body; // CmnUser, mandatory
  const { name, nickName, celPhn } = req.body; // CmnUserPrfl, optional
  if (mail == null || pswr == null) {
    return resErrJson(res, "mail, pswr required");
  }

  try {
    // 2. db query : 기등록 사용자 점검
    let count = await selectUserCount({ mail });
    if (count > 0) {
      return resErrJson(res, "mail already exists");
    }

    // 2. db query : 사용자 등록
    const cmnUser = await insertUser({ mail, pswr, name, nickName, celPhn });

    // 3. response
    resJson(res, cmnUser, 201);
  } catch (e) {
    return next(e);
  }
}
