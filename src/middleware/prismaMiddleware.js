import { Prisma } from '@prisma/client';

/**
 * Handles Prisma errors and sends a JSON response with the error details.
 * @param {Error} err - The error object.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next function.
 */
export function errorPrismaHandler(err, req, res, next) {
  if (isPrismaError(err)) {
    res.json({
      error: getPrismaError(err),
    });
  }
}

/**
 * 프리즈마 에러인지 확인한다.
 * @param {*} e  오류
 * @returns  프리즈마 에러 여부
 */
function isPrismaError(e) {
  return (
    e instanceof Prisma.PrismaClientInitializationError ||
    e instanceof Prisma.PrismaClientKnownRequestError ||
    e instanceof Prisma.PrismaClientRustPanicError ||
    e instanceof Prisma.PrismaClientUnknownRequestError ||
    e instanceof Prisma.PrismaClientValidationError
  );
}

/**
 * 프리즈마 에러를 반환한다.
 * @param {*} e 오류
 * @param {*} isRemoveMessage 주요 메시지를 삭제할지 여부
 * @returns  프리즈마 에러
 */
function getPrismaError(e, isRemoveMessage = true) {
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
