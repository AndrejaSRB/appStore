// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import MobileDetect from 'mobile-detect'

Vue.use(VueResource)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!localStorage.access_token) {
			next({
				path: '/login'
			})
		} else {
			next()
		}
	} else {
		next() // make sure to always call next()!
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
	App
},
template: '<App/>'
})
