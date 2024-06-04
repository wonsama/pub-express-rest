import { insertRole, selectRoleByKeyword } from "../servcices/roleService.js";
import { resErrJson, resJson } from "../utils/ResponseUtil.js";

export async function createRole(req, res, next) {
  // 1. param
  const { kywr, xpln } = req.body; // 키워드, 설명

  // 1. param : validation
  if (kywr == null || xpln == null) {
    return resErrJson(res, "kywr, xpln required");
  }

  // 2. db query : find role
  let role = null;
  try {
    role = await selectRoleByKeyword({ kywr });
  } catch (e) {
    return next(e);
  }

  // user validation
  if (role !== null) {
    return resErrJson(res, `kywr (${kywr}) already exists`);
  }

  // 2. db query : insert cmn_user
  let cmnRole = null;
  try {
    cmnRole = await insertRole({ kywr, xpln });
  } catch (e) {
    return next(e);
  }

  // 3. response
  resJson(res, cmnRole, 201);
}
