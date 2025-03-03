export default function filter_undefined_values(obj: Record<string | number, any>) {
  const result: Record<string | number, any> = {};

  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  });

  return result;
}