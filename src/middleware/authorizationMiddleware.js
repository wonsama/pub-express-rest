import { addUser } from "../utils/UserUtil.js";
import { getDecode } from "../utils/RequestUtil.js";
import { resErrJson } from "../utils/ResponseUtil.js";
import { selectUser } from "../servcices/userService.js";

// authenticationMiddleware 인증 이후 사용하기 바랍니다.

export async function checkPermission(permission) {
  return async (req, res, next) => {
    const decode = await getDecode(req);

    const user = await selectUser({ id: decode.id });
    addUser(mail, user);
    next();

    // if (req.user.roles.find((role) => role == permission)) {
    //   next();
    // } else {
    //   resErrJson(res, 'Forbidden : ' + permission, 403);
    // }
  };
}
