declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}
declare module 'vue-material' {

  import _Vue from "vue"; // <-- notice the changed import
  
  type Options =
  { install: Vue.PluginFunction<never>} &
  { [key in Component]: Vue.PluginFunction<never> };

  declare const options: Options;
  export default options;
}