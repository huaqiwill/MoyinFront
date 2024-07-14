import { ref, computed } from "vue";

export class Timer {
  isStop = false;
  count = ref(0);
  timeoutId = null;

  constructor(timeoutSeconds = 60) {}

  clearTimeout() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  get state() {
    return computed(() => this.count.value);
  }

  start(timeoutSeconds) {
    if (timeoutSeconds) this.timeoutSeconds = timeoutSeconds;
    this.isStop = false;
    this.count.value = 0;
    this.clearTimeout();
    this.timeoutId = setInterval(() => {
      if (!this.isStop && this.count.value < this.timeoutSeconds) {
        this.count.value++;
      } else {
        this.clearTimeout();
      }
    }, 1000);
  }

  stop() {
    this.isStop = true;
    this.clearTimeout();
  }
}
