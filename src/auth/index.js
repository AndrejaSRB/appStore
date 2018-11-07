import router from '../router'
import axios from 'axios';
import qs from 'qs';

// URL and endpoint constants



export default {

    login(context, creds, redirect) {
        axios.post(LOGIN_URL, qs.stringify(creds), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'ClientID': CLIENTID
                }
            })
            .then(function(response) {
                localStorage.setItem('access_token', response.data.access_token)

                context.$router.push('/applist')
            })
    },

    signup(context, creds, redirect) {
        context.$http.post(SIGNUP_URL, creds, (data) => {

            localStorage.setItem('id_token', data.id_token)
            localStorage.setItem('access_token', data.access_token)

            this.user.authenticated = true

            if (redirect) {
                // router.go(redirect)        
            }

        }).error((err) => {
            context.error = err
        })
    },
    // To log out, we just need to remove the token
    logout() {
        localStorage.removeItem('access_token')
    }
}