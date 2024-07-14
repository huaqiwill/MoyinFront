export class FileSelector {
  accept;
  dom;
  isDestroy = false;
  resolve;
  reject;

  constructor(accept) {
    this.accept = accept;
    this.dom = null;
    this.resolve = null;
    this.reject = null;
  }

  createInputElement() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = this.accept;
    input.hidden = true;
    return input;
  }

  change(ev) {
    if (this.dom && this.dom.files && this.dom.files.length > 0) {
      const file = this.dom.files.item(0);
      if (file) {
        this.resolve?.(file);
        this.dom.value = "";
        return;
      }
      this.dom.value = "";
    }
    return this.reject?.(ev);
  }

  cancel(ev) {
    if (this.dom) this.dom.value = "";
    return this.reject?.(ev);
  }

  open() {
    if (this.isDestroy) throw Error("对象已经销毁");
    if (!this.dom) {
      this.dom = this.createInputElement();
      this.dom.addEventListener("change", this.change.bind(this));
      this.dom.addEventListener("cancel", this.cancel.bind(this));
      document.body.appendChild(this.dom);
    }
    this.dom.click();
    const This = this;
    return new Promise((resolve, reject) => {
      This.resolve = resolve;
      This.reject = reject;
    });
  }

  destroy() {
    if (this.isDestroy) return;
    this.dom && document.body.removeChild(this.dom);
    this.dom = null;
    this.isDestroy = true;
  }
}
