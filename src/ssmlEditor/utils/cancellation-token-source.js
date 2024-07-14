export class CancellationTokenSource {
  cancelled = false;
  timeoutId = null;

  constructor(timeoutMilliseconds) {}

  get token() {
    return {
      isCancellationRequested: () => this.cancelled,
      throwIfRequested: () => {
        if (this.cancelled) throw new Error("Operation canceled");
      },
    };
  }

  cancel() {
    this.cancelled = true;
    this.clearTimeout();
  }

  clearTimeout() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  startTimeout() {
    this.timeoutId = setTimeout(() => {
      this.cancel();
    }, this.timeoutMilliseconds);
  }
}
