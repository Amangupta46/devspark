export class RequestManager {
  private static controllers: Map<string, AbortController> = new Map();

  /**
   * Generates a new AbortSignal for a specific request key,
   * automatically canceling any previous request with the same key.
   */
  static getSignal(requestKey: string): AbortSignal {
    this.cancel(requestKey);
    const controller = new AbortController();
    this.controllers.set(requestKey, controller);
    return controller.signal;
  }

  static cancel(requestKey: string) {
    if (this.controllers.has(requestKey)) {
      this.controllers.get(requestKey)?.abort();
      this.controllers.delete(requestKey);
    }
  }

  static cancelAll() {
    this.controllers.forEach(controller => controller.abort());
    this.controllers.clear();
  }
}
