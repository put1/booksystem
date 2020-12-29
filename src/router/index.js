import Vue from 'vue'
import Router from 'vue-router'

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

Vue.use(Router);
//获取原型对象上的push函数
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import ('../components/Home'),
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import ('../components/home/AppIndex')
        },

        {
          path: '/library',
          name: 'Library',
          component: () => import ('../components/library/LibraryIndex')
        },

      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import ('../components/Login')
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('../components/Logout')
    },
    {
      path: '/book',
      name: 'book',
      component: () => import ('../components/library/Book')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import ('../components/Register')
    },

    {
      path: '/admin',
      name: 'Admin',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import ('../components/admin/AdminIndex'),
      children: [
        {
          path: '/admin/dashboard',
          name: 'AdminDashboard',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import ('../components/admin/admin/AdminDashboard'),
        },
        {
          path: '/admin/books',
          name: 'BookManager',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import ('../components/admin/admin/BookManager'),

        },
        {
          path: '/admin/bookEditor',
          name: 'BookEditor',
          component: () => import ('../components/admin/admin/BookEditor'),
        },
        {
          path: '/admin/users',
          name: 'UserManager',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import ('../components/admin/admin/UserManager'),
        },
        {
          path: '/admin/user',
          name: 'User',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import ('../components/admin/admin/user/UserProfile'),
          children: [
            {
              path: 'admin/user/library',
              name: 'UserLibrary',
              meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              },
              component: () => import ('../components/admin/admin/user/UserLibrary')
            }
          ],
        },
      ],
    }
  ]
})

export const createRouter = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import ('../components/Home'),
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import ('../components/home/AppIndex')
        },

        {
          path: '/library',
          name: 'Library',
          component: () => import ('../components/library/LibraryIndex')
        },

      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import ('../components/Login')
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('../components/Logout')
    },
    {
      path: '/book',
      name: 'book',
      component: () => import ('../components/library/Book')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import ('../components/Register')
    },

    {
      path: '/admin',
      name: 'Admin',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import ('../components/admin/AdminIndex'),
      children: [
        {
          path: '/admin/dashboard',
          name: 'AdminDashboard',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import ('../components/admin/admin/AdminDashboard'),
        },
        {
          path: '/admin/books',
          name: 'BookManager',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import ('../components/admin/admin/BookManager'),

        },
        {
          path: '/admin/bookEditor',
          name: 'BookEditor',
          component: () => import ('../components/admin/admin/BookEditor'),
        },
        {
          path: '/admin/users',
          name: 'UserManager',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import ('../components/admin/admin/UserManager'),
        },
        {
          path: '/admin/user',
          name: 'User',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import ('../components/admin/admin/user/UserProfile'),
          children: [
            {
              path: 'admin/user/library',
              name: 'UserLibrary',
              meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              },
              component: () => import ('../components/admin/admin/user/UserLibrary')
            }
          ],
        },
      ],
    }
  ]
});

