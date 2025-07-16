import "@testing-library/jest-dom";

class IntersectionObserverMock {
  callback: unknown;
  options?: unknown;

  constructor(callback: unknown, options?: unknown) {
    this.callback = callback;
    this.options = options;
  }

  observe() {
    return null;
  }

  unobserve() {
    return null;
  }

  disconnect() {
    return null;
  }
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
