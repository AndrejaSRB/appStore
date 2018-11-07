<template>
    <div id="login-form">
        <!-- Log in form -->
        <form v-if="haveAccount">
            <img :src="require('../assets/logo.jpg')" class="logo-img" />
            <input v-model="credentials.username" type="email" placeholder="Your Email Adress" required />
            <input v-model="credentials.password" type="password" placeholder="Your Password" required />
            <button class="sing-in-btn" v-on:click.prevent="submit">Sign in</button>
            <p class="forgot-pass-log-form" v-on:click="switchFormForgot">Forgot Password</p>
        </form>
        <!-- Log in form END -->
        <!-- Forgot your password form -->
        <form v-if="forgotPassword">
            <img :src="require('../assets/logo.jpg')" class="logo-img" />
            <h3 class="forgot-form-title">Forgot your password?</h3>
            <p class="forgot-paragraph">Enter your email adress to reset your password.</p>
            <input type="email" placeholder="Your Email Adress" required />
            <button class="sing-in-btn forgot-btn">Get New Password</button>
            <p class="log-in-btn" v-on:click="switchFormLogIn">Back to Log in</p>
        </form>
        <!-- Forgot your password form END-->
    
    </div>
</template>

<script>
    import auth from '../auth'
    export default {
        data() {
            return {
                haveAccount: true,
                newAccount: false,
                forgotPassword: false,
                credentials: {
                    username: '',
                    password: ''
                },
                loginInformation: {},
                error: ''
            }
        },
        methods: {
            switchFormLogIn: function() {
                this.haveAccount = true
                this.newAccount = false
                this.forgotPassword = false
            },
            switchFormSingIn: function() {
                this.haveAccount = false
                this.newAccount = true
                this.forgotPassword = false
            },
            switchFormForgot: function() {
                this.haveAccount = false
                this.newAccount = false
                this.forgotPassword = true
            },
            submit() {
                var credentials = {
                    username: this.credentials.username,
                    password: this.credentials.password,
                    grant_type: 'password'
                }
                // We need to pass the component's this context
                // to properly make use of http in the auth service
                auth.login(this, credentials, '/app/lists')
            }
        }
    }
</script>

<style scoped>
    .logo-img {
        width: 150px;
        height: 150px;
        display: block;
        margin: 20px auto;
    }
    
    #login-form {
        display: block;
        width: 280px;
        height: 600px;
        margin: 100px auto;
        border: 1px solid #ddd;
        padding: 20px 20px;
        border-radius: 5px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .04), 0 0px 1px rgba(28, 39, 72, .15), 0 6px 34px rgba(0, 0, 0, .09)
    }
    
    form {
        width: 80%;
        margin: 0 auto;
    }
    
    button {
        display: block;
        margin: 15px auto;
        width: 100%;
        font-size: 14px;
        padding: 8px;
        cursor: pointer;
        opacity: 0.9;
    }
    
    .sing-in-btn {
        background-color: #ff5a5f;
        color: #eee;
        border: 1px solid #ff5a5f;
        border-radius: 5px;
        margin-top: 100px;
    }
    
    .sing-in-btn:hover {
        opacity: 1;
    }
    
    input {
        margin: 0 auto;
        display: block;
        width: 100%;
        padding: 10px;
        margin: 25px 0;
        font-size: 12px;
        color: #333;
    }
    
    input:focus {
        border-color: #ff5a5f;
        box-shadow: 0 0 3px #FF5A5F;
        outline: 0;
    }
    
    span {
        margin: 20px;
        text-align: center;
        display: block;
        font-size: 12px;
    }
    
    .forgot-pass-log-form {
        color: #ff5a5f;
        font-size: 13px;
        text-align: center;
        display: block;
        margin-top: 25px;
        cursor: pointer;
    }
    
    .create-log-form {
        color: #ff5a5f;
        font-size: 13px;
        text-align: center;
        display: block;
        margin: 30px 0;
        cursor: pointer;
    }
    
    .create-log-form:before {
        content: "Don't have an account?";
        color: #747474;
        font-size: 12px;
        display: block;
        margin: 5px auto;
    }
    
    .log-in-btn {
        color: #ff5a5f;
        font-size: 13px;
        text-align: center;
        display: block;
        margin: 30px 0;
        cursor: pointer;
    }
    
    .log-in-btn:before {
        content: "You have your account?";
        color: #747474;
        font-size: 12px;
        display: block;
        margin: 5px auto;
    }
    
    p {
        display: block;
        margin: 0 auto;
        font-size: 12px;
    }
    
    .forgot-form-title {
        text-align: center;
        font-size: 22px;
        margin: 50px 0;
    }
    
    .forgot-paragraph {
        text-align: center;
    }
    
    .forgot-btn,
    .create-btn {
        margin-top: 20px;
        margin-bottom: 65px;
    }
    
    @media (min-width: 400px) {
        #login-form {
            width: 350px;
        }
    }
</style>
