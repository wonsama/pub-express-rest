export function parseN(value, defaultValue = 0) {
  if (value == null) {
    return defaultValue;
  }
  const parsed = parseInt(value);
  return isNaN(parsed) ? defaultValue : parsed;
}
