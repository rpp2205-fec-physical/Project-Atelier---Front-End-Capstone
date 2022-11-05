import { post } from './request-handlers';

export default function postInteraction(selector, module) {
  const body = {
    element: selector,
    widget: module,
    time: new Date(),
  };

  post('/interactions', body);
}