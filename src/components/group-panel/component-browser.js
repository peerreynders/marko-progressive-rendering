const LOADED_CLASSNAME = 'group-panel--loaded';

function makeUrl(renderMode) {
  return `/fragments?renderMode=${renderMode}`;
}

function makeRefresh(loading, message, iframe, renderMode) {
  return (url) => {
    message.textContent = 'Page Loading...';
    loading.classList.remove(LOADED_CLASSNAME);

    const t0 = performance.now();
    if (typeof url !== 'string') url = makeUrl(renderMode);
    let done = false;

    iframe.addEventListener('readystatechange', handleReadyStateChange);
    iframe.addEventListener('load', handleLoad);
    iframe.src = url;

    function handleReadyStateChange() {
      if (iframe.readyState === 'complete') handleLoad();
    }

    function handleLoad() {
      if (done) return;

      const t1 = performance.now();
      message.textContent = `Loaded in ${Math.trunc(t1 - t0)} ms`;
      loading.classList.add(LOADED_CLASSNAME);
      done = true;
      iframe.removeEventListener('readystatechange', handleReadyStateChange);
      iframe.removeEventListener('load', handleLoad);
    }
  };
}

export default class {
  onMount() {
    const loading = this.getEl('loading');
    const message = this.getEl('message');
    const iframe = this.getEl('iframe');
    this.refresh = makeRefresh(loading, message, iframe, this.input.renderMode);
    self.addEventListener('load', this.refresh, false);
  }

  refreshPage() {
    this.refresh();
  }

  openWindow() {
    self.open(makeUrl(this.input.renderMode), '_blank');
  }
}
