const DEFAULT_TAKE = parseInt(process.env.DEFAULT_TAKE || '10');
const MAX_TAKE = parseInt(process.env.MAX_TAKE || '10000'); // 너무많이 가져오지 않도록 제한

import { parseN } from './NumberUtil.js';

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

export function createData(ids, params) {
  const data = {};
  for (const id of ids) {
    // 없으면 없는데로 설정
    data[id] = params[id];
  }
  return data;
}

export function createPage(page = 0, per = DEFAULT_TAKE) {
  page = parseN(page);
  const take = parseN(per);

  console.log(page);

  if (page == 0) {
    // MAX_TAKE 많큼 가져오도록 처리한다
    return { take: MAX_TAKE, skip: 0 };
  }
  const skip = (page - 1) * per;
  return { take, skip };
}
