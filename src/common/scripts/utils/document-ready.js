export function documentReady(callback) {
  if (document.readyState === 'loading') {
    return document.addEventListener('DOMContentLoaded', () => callback(document));
  }
  return callback(document);
}
