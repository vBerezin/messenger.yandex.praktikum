export function documentReady(callback: (document: Document) => void): void {
  const { document } = window;
  if (document.readyState === 'loading') {
    return document.addEventListener('DOMContentLoaded', () =>
      callback(document),
    );
  }
  return callback(document);
}
