export function isObject(object): boolean {
  return (
    object !== null && object !== undefined && object.constructor === Object
  );
}
