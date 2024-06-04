/**
 * 오류 응답 메시지를 작성하여 응답합니다.
 * @param {*} res - 응답 객체
 * @param {*} message - 오류 메시지
 * @param {*} status - HTTP 상태 코드
 */
export function resErrJson(res, message, status = 400) {
  res.status(status).json({ error: message });
}
