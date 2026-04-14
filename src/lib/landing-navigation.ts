export function readLandingPath(initialPath?: string) {
  if (initialPath) {
    return initialPath;
  }

  if (typeof window !== 'undefined' && window.location.pathname) {
    return window.location.pathname;
  }

  return '/';
}

export function navigateToLandingPath(path: string, mode: 'push' | 'replace' = 'push') {
  if (typeof window === 'undefined') {
    return;
  }

  const historyMethod = mode === 'replace' ? 'replaceState' : 'pushState';
  window.history[historyMethod](window.history.state, '', path);
  window.scrollTo({ top: 0, left: 0 });
  const routeChangeEvent =
    typeof PopStateEvent === 'function' ? new PopStateEvent('popstate') : new Event('popstate');
  window.dispatchEvent(routeChangeEvent);
}
