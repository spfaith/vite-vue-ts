import { createRouter, createWebHistory } from 'vue-router'
import GridView from '../views/GridView.vue'
import SlideView from '../views/SlideView.vue'
import CardView from '../views/CardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.OPENAPI_BASE_URL),
  routes: [
    {
      path: '/grid',
      name: 'grid',
      component: GridView,
    },
    {
      path: '/slide',
      name: 'slide',
      component: SlideView,
    },
    {
      path: '/',
      name: 'card',
      component: CardView,
    },
  ],
})

export default router
