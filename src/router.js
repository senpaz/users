import Users from '@/views/users'
import User from '@/views/users/user'
import { createRouter, createWebHistory } from "vue-router"
const routes = [
  {
    path : "/",
    component : Users
  },
  {
    path : "/users/:id",
    component : User,
    props: true
  },
]
const router = createRouter({
  history : createWebHistory(process.env.BASE_URL),
  routes
})
export default router;
