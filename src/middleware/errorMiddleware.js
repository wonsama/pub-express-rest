import { getPrismaError, isPrismaError } from '../utils/prismaUtil.js';

export function errorPrismaHandler(err, req, res, next) {
  if (isPrismaError(err)) {
    return res.json(getPrismaError(err));
  }
}

export function error404Handler(req, res, next) {
  // 3 param
  // 이전 미들웨어에서 처리가 되지 않은 경우
  // 오류를 발생시킨다
  const error = new Error('Not Found');
  error.status = 404;

  // next 를 호출하면 그다음 미들웨어를 호출한다
  next(error);
}

export function errorHandler(err, req, res, next) {
  // 4 param
  // 오류코드가 정의되지 않은 경우 500으로 설정
  res.status(err.status || 500);

  // 클라이언트에게 오류 메시지를 전달
  // 필요한 경우 화면 처리를 할 수도 있다
  res.json({
    error: {
      message: err.message,
    },
  });
}
