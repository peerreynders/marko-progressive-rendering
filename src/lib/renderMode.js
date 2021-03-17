const SYNC_MODE = 'single-chunk';
const ORDERED_MODE = 'progressive-in-order';
const ANY_ORDER_MODE = 'progressive-out-of-order';
const DEFAULT_MODE = ANY_ORDER_MODE;

const MODES = {
  [SYNC_MODE]: 'Single Chunk',
  [ORDERED_MODE]: 'Progressive (in-order)',
  [ANY_ORDER_MODE]: 'Progressive (out-of-order)',
};

const MODE_ENTRIES = Object.entries(MODES);

const hasOwnProperty = Object.prototype.hasOwnProperty;

function selectRenderMode(renderMode) {
  return hasOwnProperty.call(MODES, renderMode) ? renderMode : DEFAULT_MODE;
}

function isSync(renderMode) {
  return renderMode === SYNC_MODE;
}

function isAnyOrder(renderMode) {
  return renderMode === ANY_ORDER_MODE;
}

export { MODE_ENTRIES, selectRenderMode, isSync, isAnyOrder };
