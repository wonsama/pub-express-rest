// CONTROLLER 를 거치지 않고 SERVICE를 바로 호출하기 때문에
// 요청 파라미터에 대한 유효성 검증이 이뤄지지 않음
// 위 사안에 대해 유의하여 개발을 진행해야 함

import { addUser, clearUser } from "./seed/seed-user.js";

async function main() {
  // 초기화
  await clearUser();

  // 사용자 등록
  await addUser("wonsama@kakao.com", 1);
  await addUser("wonsama1@kakao.com", 2);
  await addUser("wonsama2@kakao.com", 3);
}
main();
