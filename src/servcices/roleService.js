import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function insertRoleGroup(params) {
  const { kywr, xpln } = params; // 키워드, 설명

  return prisma.cmnRolGrp.create({
    data: {
      kywr,
      xpln,
    },
    select: {
      id: true,
      kywr: true,
      xpln: true,
    },
  });
}

export async function selectRoleByKeyword(params) {
  const { kywr } = params;
  console.log("kywr", kywr);
  return prisma.cmnRole.findUnique({
    where: {
      kywr,
    },
    select: {
      id: true,
      kywr: true,
      xpln: true,
    },
  });
}

export async function insertRole(params) {
  const { kywr, xpln } = params;
  return prisma.cmnRole.create({
    data: {
      kywr,
      xpln,
    },
    select: {
      id: true,
      kywr: true,
      xpln: true,
    },
  });
}

export async function insertRoleRelation(params) {
  const { grpId, rolIds } = params;
  const rolIdArr = rolIds.split(",");

  // 기존 데이터 삭제
  const removed = await prisma.cmnRoleRltn.deleteMany({
    where: {
      grpId,
    },
    select: {
      grpId: true,
      rolId: true,
    },
  });

  // 신규 데이터 생성
  const created = await prisma.cmnRoleRltn.createMany({
    data: rolIdArr.map((rolId) => {
      return {
        grpId,
        rolId,
      };
    }),
    select: {
      grpId: true,
      rolId: true,
    },
  });

  return { removed, created };
}
