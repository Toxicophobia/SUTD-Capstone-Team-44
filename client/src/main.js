import Vue from 'vue';
import HighchartsVue from 'highcharts-vue';
import App from './App.vue';
import router from './router';


Vue.config.productionTip = false;
Vue.use(HighchartsVue);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
