import { decodeJwt } from "../servcices/authService.js";
import { parseN } from "./NumberUtil.js";

const DEFAULT_TAKE = parseN(process.env.DEFAULT_TAKE, 10);
const MAX_TAKE = parseN(process.env.MAX_TAKE, 10000); // 너무많이 가져오지 않도록 제한

export function addContainsWhere(where, id, params) {
  if (params != null && params[id] != null) {
    where[id] = { contains: params[id] };
  }
  return where;
}

export function dynamicWhere(ids, params) {
  // equal 만 처리한다. 위 메소드 호출 후 아래에서 정의한다 ( in, like 등 )
  // where.mail = { contains: 'naver.com'}
  // where.age = { gte: 20 }
  const where = {};
  for (const id of ids) {
    // 있는것만 설정
    if (params[id] != null) {
      where[id] = params[id];
    }
  }
  return where;
}

export function dynamicData(ids, params) {
  // equal 만 처리한다. 위 메소드 호출 후 아래에서 정의한다 ( in, like 등 )
  // where.mail = { contains: 'naver.com'}
  // where.age = { gte: 20 }
  const data = {};
  for (const id of ids) {
    // 있는것만 설정
    if (params[id] != null) {
      data[id] = params[id];
    }
  }

  // id 값 기준으로 수정자 정보 업데이트 추가
  if (params.id) {
    data["mdfrId"] = params.id;
  }

  return data;
}

export function createWhere(ids, params) {
  const where = {};
  for (const id of ids) {
    // 모든 항목은 필수임 ( 없으면 에러 )
    if (params[id] == null) {
      throw new Error(`params.${id} is required`);
    }
    where[id] = params[id];
  }
  return where;
}

export function createSelect(ids) {
  const select = {};
  for (const id of ids) {
    select[id] = true;
  }
  return select;
}

export function addSubSelect(select, target, ids) {
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

export function addSubData(data, target, ids, params, onlyExist = false) {
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
