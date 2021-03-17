import { selectRenderMode, isSync, isAnyOrder } from '../../lib/renderMode';
import template from './template.marko';

function dataProvider(tagname, section, name, wait) {
  const executor = (resolve, reject) => {
    const [delay, action] =
      wait > -1
        ? [wait, () => resolve({ tagname, section, name })]
        : [-wait, () => reject(new Error('Fail'))];
    setTimeout(action, delay);
  };

  return new Promise(executor);
}

function renderSync(input, res) {
  const cb = (err, result) => {
    res.type('text/html; charset=utf-8').end(!err ? result : err.toString());
  };
  template.renderToString(input, cb);
}

export default (req, res) => {
  const renderMode = selectRenderMode(req.query.renderMode);
  const reorderEnabled = isAnyOrder(renderMode);
  const input = {
    headerDataProvider: dataProvider,
    navDataProvider: dataProvider,
    mainDataProvider: dataProvider,
    footerDataProvider: dataProvider,
    reorderEnabled,
  };

  if (isSync(renderMode)) renderSync(input, res);
  else res.marko(template, input);
};
