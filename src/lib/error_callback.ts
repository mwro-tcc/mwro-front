export default <T extends any>(
  [ok, err]: [T, any],
  error_callback: (...args: any) => any
): T | null => {
  if (err) error_callback(err.message);
  return ok ?? null;
};
