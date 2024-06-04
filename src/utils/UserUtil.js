export const users = [];

export function addUser(mail, user) {
  if (users.find(([m, u]) => m == mail)) {
    // 이미 존재하는 사용자
    // 기존 사용자 정보 갱신
    users.splice(
      users.findIndex(([m, u]) => m == mail),
      1,
      [mail, user],
    );
    console.log('update user', user);
  } else {
    // 신규 사용자 등록
    users.push([mail, user]);
    console.log('new user', user);
  }
}

export function removeUser(mail) {
  users.splice(
    users.findIndex(([m, u]) => m == mail),
    1,
  );
}

export function clearUsers() {
  users.splice(0, users.length);
}

export function getUser(mail) {
  let user = users.find(([m, u]) => m == mail);
  if (user) {
    return user[1];
  }
  return null;
}
