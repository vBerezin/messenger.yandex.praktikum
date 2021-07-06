export function isObject(object: Object): boolean {
  return object !== null && object.constructor === Object;
}
