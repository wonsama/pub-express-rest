const DEFAULT_TAKE = parseInt(process.env.DEFAULT_TAKE || '10');
const DEFAULT_SKIP = parseInt(process.env.DEFAULT_SKIP || '0');

export function getPageFromQuery(req) {
  let { take, skip } = req.query;
  take = take == null ? DEFAULT_TAKE : parseInt(take);
  skip = skip == null ? DEFAULT_SKIP : parseInt(skip);

  return { take, skip };
}
