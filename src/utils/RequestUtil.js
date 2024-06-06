import { decodeJwt } from "../servcices/authService.js";
import { parseN } from "./NumberUtil.js";

const DEFAULT_TAKE = parseN(process.env.DEFAULT_TAKE, 10);
const MAX_TAKE = parseN(process.env.MAX_TAKE, 10000); // 너무많이 가져오지 않도록 제한

// ! WHERE ========================================
export function createWhere(ids, params) {
  const where = {};
  for (const id of ids) {
    if (Object.keys(params).filter((key) => key === id).length > 0) {
      where[id] = params[id];
    }
  }
  return where;
}

export function containsWhere(where, id, params) {
  if (Object.keys(params).filter((key) => key === id).length > 0) {
    where[id] = { contains: params[id] };
  }
  return where;
}

// ! SELECT ========================================
export function createSelect(ids) {
  const select = {};
  for (const id of ids) {
    select[id] = true;
  }
  return select;
}

export function subSelect(select, target, ids) {
  if (target == null) {
    throw new Error(`target is null`);
  }
  select[target] = {
    select: {},
  };

  const _target = select[target].select;

  for (const id of ids) {
    _target[id] = true;
  }
  return select;
}

// ! DATA ========================================
export function createData(ids, params) {
  if (Array.isArray(ids)) {
    ids.push("rgstId");
    ids.push("mdfrId");
  }
  const data = {};
  for (const id of ids) {
    if (Object.keys(params).filter((key) => key === id).length > 0) {
      data[id] = params[id];
    }
  }
  return data;
}

export function subData(data, target, ids, params) {
  if (Array.isArray(ids)) {
    ids.push("rgstId");
    ids.push("mdfrId");
  }
  data[target] = {
    create: {},
  };
  const _target = data[target].create;
  for (const id of ids) {
    if (Object.keys(params).filter((key) => key === id).length > 0) {
      _target[id] = params[id];
    }
  }
  return data;
}

// ! PAGE ========================================
export function createPage(page, per) {
  page = parseN(page, 0);
  per = parseN(per, DEFAULT_TAKE);

  if (page == 0) {
    // MAX_TAKE 많큼 가져오도록 처리한다
    return { take: MAX_TAKE, skip: 0 };
  }
  const skip = (page - 1) * per;
  return { take: per, skip };
}

// ! AUTH ========================================
export function getToken(req) {
  // 이 메소드를 호출하기 위해서는 반드시 인증 middleware 를 통과해야 한다
  const authorization = req.headers.authorization; // Bearer token
  const token = authorization.split(" ")[1];

  return token;
}

export async function getDecode(req, isRefresh = false) {
  // 이 메소드를 호출하기 위해서는 반드시 인증 middleware 를 통과해야 한다
  const token = getToken(req);
  // console.log("token", token);
  const decode = await decodeJwt(token, isRefresh);
  // console.log("decode", decode);

  return decode;
}
