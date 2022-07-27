import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
// import HomeView from '../views/HomeView.vue'
// import DashboardView from '../views/DashboardView.vue'
// import SettingsView from '../views/SettingsView.vue'
import Layout from '../components/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: RegisterView,
      meta: { needsAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { needsAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { needsAuth: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: { needsAuth: true }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   route level code-splitting
    //   this generates a separate chunk (About.[hash].js) for this route
    //   which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.needsAuth && localStorage.getItem('accessToken') == null) next('register')
  else next()
})

export default router
