import { ref, computed } from "vue";

export class AudioPlayer {
  audio;
  isPlaying = ref(false);
  isLoading = ref(false);
  canplay = ref(false);
  loadResolve;
  loadReject;
  timeout;
  _currentTime = ref(0);

  constructor() {
    this.audio = new Audio();
    this.audio.autoplay = false;

    this.audio.addEventListener("canplaythrough", () => {
      this.isLoading.value = false;
      this.loadResolve?.();
      this.resetPromise();
    });

    this.audio.addEventListener("play", () => {
      this.isPlaying.value = true;
    });

    this.audio.addEventListener("cancel", () => {
      this.canplay.value = false;
      this.isLoading.value = false;
    });

    this.audio.addEventListener("canplay", () => {
      this.canplay.value = true;
    });

    this.audio.addEventListener("pause", () => {
      this.isPlaying.value = false;
    });

    this.audio.addEventListener("error", () => {
      this.isLoading.value = false;
      this.isPlaying.value = false;
      this.canplay.value = false;
      this.loadReject?.();
      this.resetPromise();
    });

    this.audio.addEventListener("timeupdate", () => {
      this._currentTime.value = this.audio.currentTime;
    });
  }

  resetPromise() {
    clearTimeout(this.timeout);
    this.timeout = undefined;
    this.loadResolve = undefined;
    this.loadReject = undefined;
  }

  load(audioSource, timeoutMilliseconds = 10000) {
    this.pause();
    this.resetPromise();
    this.isPlaying.value = false;
    this.isLoading.value = true;
    this.canplay.value = false;
    this.audio.src = audioSource;
    this.audio.load();
    return new Promise((resolve, reject) => {
      this.loadResolve = resolve;
      this.loadReject = reject;
      this.timeout = setTimeout(() => {
        this.pause();
        this.isPlaying.value = false;
        this.isLoading.value = false;
        reject(new Error(`加载音频超时`));
        this.resetPromise();
      }, timeoutMilliseconds);
    });
  }

  play() {
    this.canplay.value && this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  cancel() {
    this.pause();
    this.audio.src = "";
  }

  togglePlayPause() {
    if (this.isPlaying.value) {
      this.pause();
    } else {
      this.play();
    }
  }

  get playState() {
    return computed(() => (this.isPlaying.value ? "playing" : "paused"));
  }

  get loadState() {
    return computed(() => (this.isLoading.value ? "loading" : "complete"));
  }

  get duration() {
    return computed(() => {
      if (this.isLoading.value) return 0;
      return Number.isNaN(this.audio.duration)
        ? 0
        : Math.ceil(this.audio.duration);
    });
  }

  get currentTime() {
    return computed({
      get: () => {
        if (this.isLoading.value) return 0;
        return Number.isNaN(this._currentTime.value)
          ? 0
          : Math.ceil(this._currentTime.value);
      },
      set: (v) => {
        if (Number.isNaN(v)) return;
        this._currentTime.value = v;
        this.audio.currentTime = v;
      },
    });
  }
}

export default AudioPlayer;
