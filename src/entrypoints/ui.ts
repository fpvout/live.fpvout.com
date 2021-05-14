import Vue from "vue";
import VueMaterial from 'vue-material';
import App from "~/ui/App.vue";
import Icon from "~/ui/components/Icon.vue";
import createRouter from '~/ui/router/index';
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);
Vue.component('Icon', Icon);

new Vue({
  el: '#app',
  render: (h) => h(App),
  router: createRouter(),
});