import Vue from 'vue'
import Router from 'vue-router'

import Signin from './views/Signin.vue'

import Home from './views/Home.vue'
import management from './views/Management.vue'
import setting from './views/Setting.vue'
import devices from './views/Device.vue'
import deployment from './views/Deployment.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'management',
          component: management,
          children: [
            {
              path: '',
              component: devices,
            },
            {
              path: 'deployment',
              component: deployment
            },
          ]
        },

        {
          path: 'setting',
          component: setting
        },
      ]
    },
  ]
})
