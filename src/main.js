import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
Axios.defaults.baseURL = process.env.VUE_APP_ENDPOINT;
Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
