import Vue from 'vue';
import VueRouter from 'vue-router';

import AuthPage from '../components/views/Auth.vue';
import AnalyticsPage from '../components/views/Analytics.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'auth', component: AuthPage },
  { path: '/analytics', name: 'analytics', component: AnalyticsPage, },
];

export default new VueRouter({
  routes
});