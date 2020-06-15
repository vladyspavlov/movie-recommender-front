import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        beforeEnter: (to, from, next) => {
            if (store.getters.token) {
                next({ name: 'profile' })
            } else {
                next()
            }
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/Profile.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/movie/:id',
        name: 'movie',
        component: () => import('@/views/Movie.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/person/:id',
        name: 'person',
        component: () => import('@/views/Person.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/popular',
        name: 'popular',
        component: () => import('@/views/Popular.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/Search.vue'),
        meta: {
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.token) {
            next({ name: 'home' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
