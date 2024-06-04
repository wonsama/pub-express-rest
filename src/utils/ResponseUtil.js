/**
 * 오류 응답 메시지를 작성하여 응답합니다.
 * @param {*} res - 응답 객체
 * @param {*} message - 오류 메시지
 * @param {*} status - HTTP 상태 코드
 */
export function resErrJson(res, message, status = 400) {
  res.status(status).json({ ok: false, error: message });
}

export function resJson(res, data, status = 200) {
  // data : null or object
  res.status(status).json({ ok: true, data });
}

export function resListJson(res, data, options, status = 200) {
  // data : [] or [object ...]
  const { take, skip, total } = options; // take = 10, skip = 0 이 기본값

  const size = data && Array.isArray(data) ? data.length : 0; // array size

  res.status(status).json({ ok: true, data, take, skip, size, total });
}
