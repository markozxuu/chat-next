import mitt from 'mitt';
import Router from 'next/router';

const emitter = mitt();
export default emitter;

Router.onRouteChangeStart = (...args: string[]): void => {
  emitter.emit('routeChangeStart', ...args);
};

Router.onRouteChangeComplete = (...args: string[]): void => {
  emitter.emit('routeChangeComplete', ...args);
};

Router.onRouteChangeError = (...args: string[]): void => {
  emitter.emit('routeChangeError', ...args);
};
