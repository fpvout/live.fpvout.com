import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

export default function createRouter(): VueRouter {
  const router = new VueRouter({
    // mode: 'history',
    routes,
  });

  return router;
}
