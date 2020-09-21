export function StorageDecorator(value) {
  return function decorator(target) {
    target.cacheKey = true;
  };
}
