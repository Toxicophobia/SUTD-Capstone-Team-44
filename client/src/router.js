import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import UserProfile from './views/UserProfile.vue';
import Insight from './views/Insights.vue';
import ReportBuilder from './views/ReportBuilder.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user-profile',
      name: 'UserProfile',
      component: UserProfile,
    },
    {
      path: '/insight',
      name: 'Insight',
      component: Insight,
    },
    {
      path: '/report',
      name: 'ReportBuiler',
      component: ReportBuilder,
    },

  ],
});
