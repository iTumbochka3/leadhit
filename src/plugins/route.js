import Vue from 'vue';
import VueRouter from 'vue-router';

import AuthPage from '../components/views/Auth.vue';
import AnalyticsPage from '../components/views/Analytics.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: AuthPage },
  { path: '/analytics', component: AnalyticsPage },
];

export default new VueRouter({
  routes
});