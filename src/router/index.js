import {createRouter, createWebHistory} from "vue-router";
import tableauFichiers from "../components/TableauFichiers.vue";
import Login from "../components/Login.vue";
import TableauFichierPage from "../view/TableauFichierPage.vue";
import {useAuthStore} from "../store/AuthStore.js";

const routes = [{
    path: '/',
    component: TableauFichierPage,
}, {
    path: '/login',
    component: Login,
}
]

const router = createRouter({
        routes,
        history: createWebHistory(),
    }
)

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated && to.path !== '/login') {
        next('/login')
    } else {
        next()
    }
})
export default router