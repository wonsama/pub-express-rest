import { insertUser, truncateUser } from "../../src/servcices/userService.js";

export async function clearUser() {
  // CLEAR USER, PROFILE, NOVE_ENV=local에서만 동작
  // unique 키중복 오류 발생하지 않도록 반드시 다 지운 이후 테스트를 해야 된다
  const removed = await truncateUser();
  console.log(removed);
}

export async function addUser(mail = "wonsama@kakao.com", idx = 1) {
  // INSERT USER, 2개 필수 3개 옵션
  const user = await insertUser({
    mail,
    pswr: "1234",
    name: `원사마${idx}`,
    nickName: `wonsama${idx}`,
    celPhn: `010-0000-000${idx}`,
  });
  console.log(user);
}
