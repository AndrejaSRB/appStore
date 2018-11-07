import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/LogForm'
import AppList from '@/components/AppList'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import SingleApp from '@/components/SingleApp'


Vue.use(BootstrapVue)

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/applist',
			name: 'AppList',
			component: AppList,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/singleapp',
			name: 'SingleApp',
			component: SingleApp,
			meta: {
				requiresAuth: true
			}
		},

	],
	history: true
})
