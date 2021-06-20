export function documentReady(callback: Function): void {
  if (document.readyState === 'loading') {
    return document.addEventListener('DOMContentLoaded', () => callback(document));
  }
  return callback(document);
}
