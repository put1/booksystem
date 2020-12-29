// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8443/api';
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;


Vue.use(ElementUI);
Vue.use(mavonEditor);

router.beforeEach((to, from, next) => {
  if (store.state.username && to.path.startsWith('/admin') || to.path.startsWith('/user')) {
    initAdminMenu(router, store)
  }
  //登陸狀態下訪問login頁面直接跳轉後臺
  // if (store.state.username && to.path.startsWith('/login')) {
  //   next({
  //     path: '/index'
  //   })
  // }
  if (to.meta.requireAuth) {
    if (store.state.username) {
      axios.get('/authentication').then(resp => {
        if (resp) {
          next({})
        }
      })
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
});

const initAdminMenu = (router, store) => {
  //防止重复出发加载菜单
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios.get('/menu').then(resp => {
    if (resp && resp.status === 200) {
      let fmtRoutes = formatRoutes(resp.data)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
};

const formatRoutes = (routes) => {
  let fmtRoutes = [];
  console.log(routes)
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }
    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      children: route.children
    };
    fmtRoutes.push(fmtRoute)
  });
  return fmtRoutes
};


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
});
