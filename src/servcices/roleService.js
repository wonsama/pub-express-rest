import {
  addContainsWhere,
  createData,
  createSelect,
  dynamicWhere,
} from "../utils/RequestUtil.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function selectRole(params, fields) {
  const { take, skip } = params;
  const select = createSelect(["id", "kywr", "xpln"]);
  const where = dynamicWhere(["id", "kywr"], params);
  addContainsWhere(where, "xpln", params);

  return prisma.cmnRole.findMany({
    where,
    select: fields || select,
    take,
    skip,
  });
}

export async function selectRoleCount(params) {
  const where = dynamicWhere(["id", "kywr", "xpln"], params);

  return prisma.cmnRole.count({ where });
}

export async function insertRole(params) {
  const data = createData(["kywr", "xpln"], params);
  const select = createSelect(["id", "kywr", "xpln"]);

  return prisma.cmnRole.create({ data, select });
}
