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
          path: 'clubs',
          name: 'Clubs',
          component: () => import('@/views/pages/Clubs.vue'),
          meta: { requiresAuth: true, requiresRole: ['Master', 'Admin'] },
        },
        {
          path: 'club',
          name: 'Club',
          component: () => import('@/views/pages/Club.vue'),
          meta: { requiresAuth: true, requiresRole: ['Master', 'Admin', 'ClubMaster'] },
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('@/views/pages/Users.vue'),
          meta: { requiresAuth: true, requiresRole: ['Master', 'Admin', 'ClubMaster', 'ClubAdmin'] },
        },
        {
          path: 'habituality',
          name: 'Habitualidade',
          component: () => import('@/views/pages/Habituality.vue'),
          meta: { requiresAuth: true, requiresRole:['Master', 'Admin', 'ClubMaster', 'ClubAdmin', 'User'] },
        },
        {
          path: 'permissions',
          name: 'Permissions',
          component: () => import('@/views/pages/settings/Permissions.vue'),
          meta: { requiresAuth: true, requiresPermission: ['view-Permission'] },
        },
        // {
        //   path: 'settings',
        //   name: 'Settings',
        //   component: { template: '<router-view />' },
        //   meta: { requiresAuth: true, requiresRole: ['Master', 'Admin'] },
        //   children: [
        //     {
        //       path: 'permissions',
        //       name: 'Permissions',
        //       component: () => import('@/views/pages/settings/Permissions.vue'),
        //       meta: { requiresAuth: true, requiresRole: ['Master', 'Admin'] },
        //     },
            
        //   ]
        // }

      ]
    }
  ]
});

declare module 'vue-router' {
    interface RouteMeta {
      requiresAuth?: boolean;
      requiresRole?: string[];
      requiresPermission?: string[];
    }
  }

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

    if (authStore.userRoles.includes('Master')) {
        next();
        return;
    }

    if(to.meta.requiresAuth && !authStore.isAuthenticated){
        next({ name: 'Login' });
        return;
    } else if (to.meta.requiresRole && !to.meta.requiresRole.some(role => authStore.userRoles.includes(role))) {
        next({ name: 'Unauthorized' }); // redirecionar para uma página de "Não autorizado"
        return;
    } else if (to.meta.requiresPermission && !to.meta.requiresPermission.some(permission => authStore.userPermissions.includes(permission))) {
        next({ name: 'Unauthorized' }); // redirecionar para uma página de "Não autorizado"
        return;
    } else {
        next();
    }
});

export default router
