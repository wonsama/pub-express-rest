import { addUser } from '../utils/UserUtil.js';
import { decodeJwt } from '../servcices/authService.js';
import { resErrJson } from '../utils/ResponseUtil.js';
import { selectUserByMail } from '../servcices/userService.js';

// authenticationMiddleware 인증 이후 사용하기 바랍니다.

export async function checkPermission(permission) {
  return async (req, res, next) => {
    const authorization = req.headers.authorization; // Bearer token
    const token = authorization.split(' ')[1];
    const decode = await decodeJwt(token);
    const mail = decode.mail;

    const user = await selectUserByMail(mail);
    addUser(mail, user);
    next();

    // if (req.user.roles.find((role) => role == permission)) {
    //   next();
    // } else {
    //   resErrJson(res, 'Forbidden : ' + permission, 403);
    // }
  };
}
