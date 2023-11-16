export function queryToJSON(query) {
  let params = new URLSearchParams(query);
  let result = {};

  for (const [key, value] of params) {
    if (result[key]) {
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }
      result[key].push(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}
