import axios from 'axios'
import router from '../router'
import {
    resolve
} from 'url'

// URL and endpoint constants 


export default {
    getAllApps () {
        return new Promise((resolve, reject) => {
            axios.get(APP_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.access_token
                }
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                if (error.response.status === 401) {
                    router.push('/login')
                }
            })
        })
    },

    getOneApp (appId) {
        return new Promise((resolve, reject) => {
            axios.get(APP_URL + '/' + appId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.access_token
                }
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
