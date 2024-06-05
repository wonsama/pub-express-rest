import {
  insertRole,
  selectRole,
  selectRoleCount,
} from '../servcices/roleService.js';
import { resErrJson, resJson, resListJson } from '../utils/ResponseUtil.js';

import { createPage } from '../utils/RequestUtil.js';

export async function createRole(req, res, next) {
  // 1. param
  const { kywr, xpln } = req.body; // 등록, mandantory
  if (kywr == null || xpln == null) {
    return resErrJson(res, 'kywr, xpln required');
  }

  // 2. db query
  let count = 0;
  let item = null;
  try {
    count = await selectRoleCount({ kywr });
    if (count > 0) {
      return resErrJson(res, `kywr (${kywr}) already exists`);
    }
    item = await insertRole({ kywr, xpln });
  } catch (e) {
    return next(e);
  }

  // 3. response
  resJson(res, item, 201);
}

export async function getRoles(req, res, next) {
  // 1. param
  const { id, kywr, xpln } = req.query; // 검색, optional
  const { page, per } = req.query; // 페이지 1, optional
  const { skip, take } = createPage(page, per); // 페이지 2, auto

  // 2. db query
  let items = null;
  let counts = 0;
  try {
    items = await selectRole({ id, kywr, xpln, skip, take });
    counts = await selectRoleCount({ id, kywr, xpln });
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
