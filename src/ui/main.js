import Vue from "vue";
import VueMaterial from 'vue-material';
import App from "./App.vue";
import Icon from "./components/Icon.vue";
import createRouter from './router/index';
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);
Vue.component('Icon', Icon);

new Vue({
  el: '#app',
  render: (h) => h(App),
  router: createRouter(),
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}