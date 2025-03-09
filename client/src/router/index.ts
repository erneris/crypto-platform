import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { authenticate } from './guards'
import LoginView from '@/views/LoginView.vue'
import SellView from '@/views/SellView.vue'
import SignupView from '@/views/SignupView.vue'
import BrowseView from '@/views/BrowseView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import BuyView from '@/views/BuyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/profile',
      component: ProfileView,
      beforeEnter: [authenticate],
    },
    {
      path: '/browse',
      component: BrowseView,
      beforeEnter: [authenticate],
    },
    {
      path: '/transactions',
      component: TransactionsView,
      beforeEnter: [authenticate],
    },
    {
      path: '/buy',
      component: BuyView,
      beforeEnter: [authenticate],
    },
    {
      path: '/sell',
      component: SellView,
      beforeEnter: [authenticate],
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView,
    },
  ],
})

export default router
