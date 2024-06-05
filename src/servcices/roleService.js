import {
  addContainsWhere,
  createData,
  createSelect,
  createWhere,
  dynamicWhere,
} from '../utils/RequestUtil.js';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function insertRoleGroup(params) {
  const data = createData(['kywr', 'xpln'], params);
  const select = createSelect(['id', 'kywr', 'xpln']);

  return prisma.cmnRolGrp.create({ data, select });
}

export async function selectRole(params) {
  const { take, skip } = params;
  const where = dynamicWhere(['id', 'kywr'], params);
  const select = createSelect(['id', 'kywr', 'xpln']);
  addContainsWhere(where, 'xpln', params);

  return prisma.cmnRole.findMany({ where, select, take, skip });
}

export async function selectRoleCount(params) {
  const where = dynamicWhere(['id', 'kywr', 'xpln'], params);

  return prisma.cmnRole.count({ where });
}

export async function insertRole(params) {
  const data = createData(['kywr', 'xpln'], params);
  const select = createSelect(['id', 'kywr', 'xpln']);

  return prisma.cmnRole.create({ data, select });
}

export async function insertRoleRelation(params) {
  const { grpId, rolIds } = params;
  const rolIdArr = rolIds.split(',');
  const where = createWhere(['grpId'], params);
  const select = createSelect(['id']);

  // 기존 데이터 삭제
  const removed = await prisma.cmnRoleRltn.deleteMany({ where, select });

  // 신규 데이터 생성
  const created = await prisma.cmnRoleRltn.createMany({
    data: rolIdArr.map((rolId) => {
      return {
        grpId,
        rolId,
      };
    }),
    select,
  });

  // 추가 삭제된 데이터 수 반환
  return { removed: removed.count, created: created.count };
}
