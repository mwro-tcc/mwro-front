export default async <T extends (...args: any[]) => Promise<any>>(
  call: T,
  args: Parameters<T>
): Promise<[Awaited<ReturnType<T>> | null, Error | null]> =>
  call(...args)
    .then((res): [Awaited<ReturnType<T>>, null] => [res, null])
    .catch((err) => [null, err]);
