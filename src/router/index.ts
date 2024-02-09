import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/Login.vue')
    },
    {
      path: '/',
      component: () => import('@/views/DashboardLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('@/views/pages/Users.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'habituality',
          name: 'Habitualidade',
          component: () => import('@/views/pages/Habituality.vue'),
          meta: { requiresAuth: true },
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if(authStore.isAuthenticated){
        const token = authStore.token;
        try{
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expirationDate = new Date(payload.exp * 1000);
            if(expirationDate <= new Date()){
            authStore.logout();
            next({ name: 'Login' });
            return;
            }
        } catch (error){
            console.error("Erro ao decodificar o token", error);
        }
    }

    if(to.meta.requiresAuth && !authStore.isAuthenticated){
        next({ name: 'Login' });
        return;
    }else{
        next();
    }
});

export default router
