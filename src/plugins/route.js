import Vue from 'vue';
import VueRouter from 'vue-router';

import AuthPage from '../components/views/Auth.vue';
import AnalyticsPage from '../components/views/Analytics.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'auth', component: AuthPage },
  { path: '/analytics', name: 'analytics', component: AnalyticsPage, },
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  if (to.name !== 'auth' && !localStorage.getItem('leadhit-site-id')) {
    next({ name: 'auth' });
  } else { 
    next(); 
  }
});

export default router;