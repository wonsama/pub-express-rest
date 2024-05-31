import { Prisma } from '@prisma/client';

export function isPrismaError(e) {
  return (
    e instanceof Prisma.PrismaClientInitializationError ||
    e instanceof Prisma.PrismaClientKnownRequestError ||
    e instanceof Prisma.PrismaClientRustPanicError ||
    e instanceof Prisma.PrismaClientUnknownRequestError ||
    e instanceof Prisma.PrismaClientValidationError
  );
}

export function getPrismaError(e, isRemoveMessage = true) {
  if (
    e instanceof Prisma.PrismaClientInitializationError ||
    e instanceof Prisma.PrismaClientKnownRequestError ||
    e instanceof Prisma.PrismaClientRustPanicError ||
    e instanceof Prisma.PrismaClientUnknownRequestError ||
    e instanceof Prisma.PrismaClientValidationError
  ) {
    const res = {
      code: e.code, // optional
      errorCode: e.errorCode, // optional
      meta: e.meta, // optional
      message: e.message,
      name: e.name,
    };
    if (isRemoveMessage) {
      // 주요 정보를 포함할 수도 있어 삭제 할 수 있도록 함
      delete res.meta;
      delete res.message;
    }
    return res;
  }
}
