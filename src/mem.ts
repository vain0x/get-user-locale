// The interface is compatible with [memoize](https://github.com/sindresorhus/memoize).
/** Create a memoized function. */
// biome-ignore lint/suspicious/noExplicitAny: type bounds
export default function mem<F extends (arg: any) => any>(
  fn: F,
  options: {
    cacheKey: (arg: Parameters<F>[0]) => unknown;
  },
): F {
  const cache = new Map<unknown, ReturnType<F>>();
  const cacheKey = options.cacheKey;
  return ((arg: Parameters<F>[0]): ReturnType<F> => {
    const key = cacheKey(arg);
    let value: ReturnType<F>;
    if (cache.has(key)) {
      value = cache.get(key) as ReturnType<F>;
    } else {
      value = fn(arg) as ReturnType<F>;
      cache.set(key, value);
    }
    return value;
  }) as F;
}
