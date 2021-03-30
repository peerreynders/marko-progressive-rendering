const cssRe = /\.css$/;

export function findEntryChunk(name, output) {
  return output.find((chunk) => chunk.name === name);
}

export function findCssAsset(output) {
  return output.find((asset) => cssRe.test(asset.fileName));
}
