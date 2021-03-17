import { selectRenderMode } from '../../lib/renderMode';
import template from './template.marko';

export default function (req, res) {
  const renderMode = selectRenderMode(req.query.renderMode);
  res.marko(template, { renderMode });
}
