import Vue from 'vue'
import vueResource from 'vue-resource';
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false;
Vue.use(vueResource);
Vue.http.options.root = process.env.VUE_APP_ENDPOINT;

new Vue({
  render: h => h(App),
}).$mount("#app");
