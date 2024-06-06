import { decodeJwt } from "../servcices/authService.js";
import { parseN } from "./NumberUtil.js";

const DEFAULT_TAKE = parseN(process.env.DEFAULT_TAKE, 10);
const MAX_TAKE = parseN(process.env.MAX_TAKE, 10000); // 너무많이 가져오지 않도록 제한

// ! WHERE ========================================
export function createWhere(ids, params, onlyExist = true) {
  const where = {};
  for (const id of ids) {
    if (onlyExist) {
      if (params[id] != null) {
        where[id] = params[id];
      }
    } else {
      where[id] = params[id];
    }
  }
  return where;
}

export function containsWhere(where, id, params) {
  if (params != null && params[id] != null) {
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
export function createData(ids, params, onlyExist = false) {
  const data = {};
  for (const id of ids) {
    if (!onlyExist) {
      data[id] = params[id];
    } else {
      if (params[id] != null) {
        data[id] = params[id];
      }
    }
  }
  return data;
}

export function subData(data, target, ids, params, onlyExist = false) {
  if (target == null) {
    throw new Error(`target is null`);
  }
  data[target] = {
    create: {},
  };

  const _target = data[target].create;

  for (const id of ids) {
    // 없으면 없는데로 설정
    if (!onlyExist) {
      _target[id] = params[id];
    } else {
      if (params[id] != null) {
        _target[id] = params[id];
      }
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
export async function getToken(req) {
  // 이 메소드를 호출하기 위해서는 반드시 인증 middleware 를 통과해야 한다
  const authorization = req.headers.authorization; // Bearer token
  const token = authorization.split(" ")[1];

  return token;
}

export async function getDecode(req, isRefresh = false) {
  // 이 메소드를 호출하기 위해서는 반드시 인증 middleware 를 통과해야 한다
  const token = getToken(req);
  const decode = await decodeJwt(token, isRefresh);

  return decode;
}
