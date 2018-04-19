import mitt from 'mitt';
import * as Router from 'next/router';

const emitter = mitt();
export default emitter;

Router.onRouteChangeStart = (...args: string[]) => {
  emitter.emit('routeChangeStart', ...args);
};

Router.onRouteChangeComplete = (...args: string[]) => {
  emitter.emit('routeChangeComplete', ...args);
};

Router.onRouteChangeError = (...args: string[]) => {
  emitter.emit('routeChangeError', ...args)
};
