<template>
    <div id="single-app">
        <!-- Single app header -->
        <header class="header-app-list">
            <div id="sideNav" class="bm-menu">
                <nav class="bm-item-list">
                    <h4>Categories</h4>
                    <a href="#" v-on:click.prevent="moveToAppList()">All categories</a>
                </nav>
                <span class="bm-cross-button cross-style" @click="closeMenu">
                                                    <span v-for="(x, index) in 2" :key="x" class="bm-cross" :style="{ position: 'absolute', width: '3px', height: '14px',transform: index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)'}">
                                                    </span>
                </span>
            </div>
            <!-- User image and logout holder -->
            <div class="user-holder">
                <img :src="require('../assets/user.png')" class="user-img" v-on:click="logOut = !logOut" />
                <ul class="log-out-list" v-if="logOut">
                    <li v-on:click.prevent="logout">Log out</li>
                </ul>
            </div>
            <!-- User image and logout holder END -->
            <div class="bm-burger-button" @click="openMenu">
                <span class="bm-burger-bars line-style" :style="{top:20 * (index * 2) + '%'}" v-for="(x, index) in 3" :key="index"></span>
            </div>
            <div class="logo-company">
                <h1 v-on:click.prevent="moveToAppList()">Logo</h1>
            </div>
        </header>
        <!-- Single app header END -->
        <!-- Single App holder -->
        <div class="single-app">
            <b-row class="single-app-row">
                <div class="single-app-info">
                    <img :src="require('../assets/app.png')" class="single-app-img img-fluid" />
                    <h4 class="single-app-title">App Name</h4>
                </div>
                <div class="single-app-ss">
                    <h4>iPhone Screenshots</h4>
                    <div class="scrolling-wrapper">
                        <div class="card">
                            <img :src="require('../assets/screenshot-one.png')" class="screenshot-img img-fluid" />
                        </div>
                        <div class="card">
                            <img :src="require('../assets/screenshot-two.png')" class="screenshot-img img-fluid" />
                        </div>
                        <div class="card">
                            <img :src="require('../assets/screenshot-three.png')" class="screenshot-img img-fluid" />
                        </div>
                        <div class="card">
                            <img :src="require('../assets/screenshot-four.png')" class="screenshot-img img-fluid" />
                        </div>
                        <div class="card">
                            <img :src="require('../assets/screenshot-five.png')" class="screenshot-img img-fluid" />
                        </div>
                    </div>
                </div>
                <!-- Download buttons for different devices -->
                <div class="download-buttons">
                    <img v-if="this.mobile == 'ios' || this.mobile=='web'" :src="require('../assets/download-ios.png')" class="download-img img-fluid" />
                    <img v-if="this.mobile == 'android' || this.mobile=='web'" :src="require('../assets/download-android.png')" class="download-img img-fluid" />
                </div>
                <!-- Download buttons for different devices END -->
                <div class="single-app-item">
                    <article class="single-app-article">
                        <h2 class="description-title">Description</h2>
                        <p>Instagram is a simple way to capture and share the world’s moments. Follow your friends and family to see what they’re up to, and discover accounts from all over the world that are sharing things you love. Join the community of over
                            1 billion people and express yourself by sharing all the moments of your day — the highlights and everything in between, too.</p>
                        <h3 class="version-title">What's new</h3>
                        <p id="version-app">Version 5.1 <span class="version-more" v-on:click.prevent="aboutVersion = !aboutVersion">more</span> </p>
                        <span class="about-version" v-if="aboutVersion">Bug fixes and performance improvements.</span>
                        <a href="" class="use-title" v-on:click.prevent="moreInfo = !moreInfo"> Use Borna App to</a>
                        <ul class="single-app-list" v-if="moreInfo">
                            <li>* Post photos and videos you want to keep on your profile grid. Edit them with filters and creative tools and combine multiple clips into one video.</li>
                            <li>* Browse photos and videos from people you follow in your feed. Interact with posts you care about with likes and comments.</li>
                            <li>* Share multiple photos and videos (as many as you want!) to your story. Bring them to life with text, drawing tools and other creative effects. . They disappear after 24 hours and won’t appear on your profile grid or in feed.</li>
                            <li>* Go live to connect with your friends in the moment. Try going live with a friend and sharing a replay to your story when you’re done.</li>
                            <li>* Message your friends privately in Direct. Send them photos and videos that disappear and share content you see on Instagram.</li>
                            <li>* Watch stories and live videos from the people you follow in a bar at the top of your feed.</li>
                            <li>* Discover photos, videos and stories you might like and follow new accounts on the Explore tab.</li>
                        </ul>
                        <h2 class="information-title">Information</h2>
                        <ul class="information-list">
                            <li>
                                <p>Size</p>
                                <p>140 MB</p>
                            </li>
                            <li>
                                <p>Category</p>
                                <p>Mobile App</p>
                            </li>
                            <li>
                                <p>Languages</p>
                                <p>English, Sweden</p>
                            </li>
                            <li>
                                <p>Copyright</p>
                                <p>© 2017 OpenRatio</p>
                            </li>
                        </ul>
                    </article>
                </div>
            </b-row>
        </div>
        <!-- Single App holder -->
        <footer id="app-footer">
            <small>Copyright © 2018<span>All rights reserved.</span></small>
        </footer>
    </div>
</template>

<script>
    import auth from '../auth'
    import apps from '../apps'
    import Rate from 'vue-rate';
    export default {
        component: {
            'rate': Rate,
        },
        data() {
            return {
                allApps: [],
                isSideBarOpen: false,
                logOut: false,
                search: '',
                searchValue: '',
                moreInfo: false,
                aboutVersion: '',
                mobile: false,
    
            }
        },
        props: {
            isOpen: {
                type: Boolean,
                required: false
            },
            right: {
                type: Boolean,
                required: false
            },
            width: {
                type: [String],
                required: false,
                default: '300'
            },
            disableEsc: {
                type: Boolean,
                required: false
            },
            noOverlay: {
                type: Boolean,
                required: false
            },
            onStateChange: {
                type: Function,
                required: false
            },
            burgerIcon: {
                type: Boolean,
                required: false,
                default: true
            },
            crossIcon: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        methods: {
            detectmob() {
                if (navigator.userAgent.match(/Android/i)) {
                    this.mobile = 'android';
                } else if (navigator.userAgent.match(/iPhone/i)) {
                    this.mobile = 'ios';
                } else {
                    this.mobile = 'web';
                }
    
            },
            getApps() {
                apps
                    .getAllApps()
                    .then(response => {
                        this.allApps = response;
                    })
                    .catch(error => {
                        reject(error);
                    });
            },
    
            openMenu() {
                this.$emit('openMenu');
                this.isSideBarOpen = true;
    
                if (!this.noOverlay) {
                    document.body.className += 'bm-overlay';
                }
                if (this.right) {
                    document.querySelector('.bm-menu').style.left = 'auto';
                    document.querySelector('.bm-menu').style.right = '0px';
                }
                this.$nextTick(function() {
                    document.getElementById('sideNav').style.width = this.width ?
                        this.width + 'px' :
                        '280px';
                });
            },
    
            closeMenu() {
                this.$emit('closeMenu');
                this.isSideBarOpen = false;
                document.body.className = document.body.className.replace(
                    'bm-overlay',
                    ''
                );
                document.getElementById('sideNav').style.width = '0px';
            },
            closeMenuOnEsc(e) {
                e = e || window.event;
                if (e.key === 'Escape' || e.keyCode === 27) {
                    document.getElementById('sideNav').style.width = '0px';
                    document.body.style.backgroundColor = 'inherit';
                    this.isSideBarOpen = false;
                }
            },
            documentClick(e) {
                let element = document.querySelector('.bm-burger-button');
                let target = e.target;
                if (
                    element !== target &&
                    !element.contains(target) &&
                    e.target.className !== 'bm-menu'
                ) {
                    this.closeMenu();
                }
            },
            logout() {
                auth.logout();
                this.$router.push('/login')
            },
            moveToAppList() {
                this.$router.push('/applist')
            }
        },
        mounted() {
            if (!this.disableEsc) {
                document.addEventListener('keyup', this.closeMenuOnEsc);
            }
            if (this.burgerIcon === false) {
                document.querySelector('.bm-burger-button').style.display = 'none';
            }
            if (this.crossIcon === false) {
                document.querySelector('.bm-cross-button').style.display = 'none';
            }
    
        },
        created: function() {
            this.detectmob();
            this.getApps();
            document.addEventListener('click', this.documentClick);
        },
        destroyed: function() {
            document.removeEventListener('keyup', this.closeMenuOnEsc);
            document.removeEventListener('click', this.documentClick);
        },
        watch: {
            isOpen: {
                deep: true,
                immediate: true,
                handler(oldValue) {
                    if (oldValue) {
                        this.openMenu();
                    }
                }
            },
            right: {
                deep: true,
                immediate: true,
                handler(oldValue, newValue) {
                    if (oldValue) {
                        this.$nextTick(() => {
                            document.querySelector('.bm-burger-button').style.left = '0px';
                            document.querySelector('.bm-burger-button').style.right = '36px';
                            document.querySelector('.bm-menu').style.left = 'auto';
                            document.querySelector('.bm-menu').style.right = '0px';
                        });
                    }
                    if (newValue) {
                        if (
                            document.querySelector('.bm-burger-button').hasAttribute('style')
                        ) {
                            document
                                .querySelector('.bm-burger-button')
                                .removeAttribute('style');
                            document.getElementById('sideNav').style.right = 'auto';
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Nunito:700');
    html {
        height: 100%;
    }
    
    .header-app-list {
        position: relative;
        width: 100%;
        height: 100px;
        background-color: #e0e0e0;
        border-bottom: 3px solid #bdc3c7;
    }
    
    .logo-company {
        font-family: "Nunito", Arial, "Helvetica Neue", Helvetica, serif, sans-serif;
        font-weight: 700;
        letter-spacing: 1.2px;
        position: absolute;
        left: 65px;
        top: 25px;
        display: none;
    }
    
    .logo-company h1 {
        font-size: 26px;
        margin: 0;
        cursor: pointer;
    }
    
    .bm-burger-button {
        position: absolute;
        width: 36px;
        height: 30px;
        left: 10px;
        top: 25px;
        cursor: pointer;
        margin: 0;
    }
    
    .bm-burger-bars {
        background-color: #373a47;
        width: 36px;
        height: 6px;
        position: absolute;
        margin: 0;
        cursor: pointer;
        left: 0;
    }
    
    .line-style {
        height: 20%;
        margin: 0;
    }
    
    .cross-style {
        position: absolute;
        top: 12px;
        right: 2px;
        cursor: pointer;
    }
    
    .bm-cross {
        background: #bdc3c7;
    }
    
    .bm-cross-button {
        height: 24px;
        width: 24px;
    }
    
    .bm-menu {
        height: 100%;
        width: 0px;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        background-color: rgb(63, 63, 65);
        overflow-x: hidden;
        padding-top: 60px;
        transition: 0.5s;
    }
    
    .bm-overlay {
        background: rgba(0, 0, 0, 0.3);
    }
    
    .bm-item-list {
        color: #b8b7ad;
        font-size: 20px;
    }
    
    .bm-item-list>* {
        display: flex;
        text-decoration: none;
        padding: 0.7em;
    }
    
    .bm-item-list>*>span {
        margin-left: 10px;
        font-weight: 700;
        color: white;
    }
    
    .bm-item-list h4 {
        padding-left: 10%;
    }
    
    .bm-item-list a {
        color: #b8b7ad;
        margin: 0;
        padding: 8px 14px 8px 10%;
        text-decoration: none;
        cursor: pointer;
        border: 1px solid transparent;
    }
    
    .bm-item-list a:hover {
        color: #eee;
        border: 1px solid rgba(10, 10, 10, .1);
        background-color: rgba(10, 10, 10, .1);
        transition: 0.9s;
    }
    
    #mobile-header {
        border-bottom: 3px solid #bdc3c7;
        padding-bottom: 20px;
    }
    
    .user-img {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 10px;
        top: 20px;
        cursor: pointer;
    }
    
    .log-out-list {
        list-style: none;
        position: absolute;
        right: 40px;
        top: 62px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .04), 0 0px 1px rgba(28, 39, 72, .15), 0 6px 34px rgba(0, 0, 0, .09);
        height: 40px;
        padding: 0;
        z-index: 99;
        background-color: #ededed;
        display: block;
    }
    
    .log-out-list li {
        display: block;
        margin: 0 auto;
        padding: 10px 15px 0 15px;
        cursor: pointer;
    }
    
    .log-out-list:hover {
        background-color: #ddd;
    }
    
    .row {
        margin-left: 0px;
        margin-right: 0px;
    }
    
    .single-app-article {
        text-align: left;
    }
    
    .single-app-info {
        position: relative;
        margin: 10px 5px;
        width: 100%;
        height: 100px;
        border-bottom: 1px solid rgba(0, 0, 0, .09);
    }
    
    .single-app-title {
        font-size: 24px;
        display: inline;
        position: absolute;
        left: 80px;
        bottom: 25px;
    }
    
    .single-app-img {
        width: 75px;
        height: 75px;
        display: inline;
        position: absolute;
        left: 0px;
        top: 15px;
    }
    
    .single-app-ss {
        margin: 0;
        border-bottom: 1px solid rgba(0, 0, 0, .09);
        padding-bottom: 20px;
    }
    
    .scrolling-wrapper {
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        padding: 10px;
    }
    
    .card {
        display: inline-block;
        width: 60%;
        margin: 5px;
    }
    
    .card:nth-child(1) {
        margin-left: 0px;
    }
    
    .single-app-ss h4 {
        margin-bottom: 10px;
        margin-left: 10px;
        font-size: 22px;
        width: 100%;
        text-align: left;
    }
    
    .screenshot-img:nth-child(2) {
        padding-right: 5px;
    }
    
    .screenshot-img:nth-child(3) {
        padding-left: 5px;
    }
    
    .screenshot-img:nth-child(4) {
        display: none;
    }
    
    .download-buttons {
        width: 100%;
        margin: 15px 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .download-img {
        width: 90%;
        height: 60px;
        cursor: pointer;
    }
    
    .single-app-item {
        margin: 15px 0px;
        display: block;
        padding: 10px 10px;
        width: 100%;
        font-size: 15px;
    }
    
    .description-title {
        font-size: 24px;
    }
    
    .version-title {
        font-size: 24px;
    }
    
    #version-app {
        border: 0;
        padding-bottom: 0;
    }
    
    .version-more {
        cursor: pointer;
        color: #007bff;
    }
    
    .about-version {
        margin-bottom: 15px;
        display: block;
    }
    
    .single-app-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    .single-app-article p {
        border-bottom: 1px solid rgba(0, 0, 0, .09);
        padding-bottom: 15px;
    }
    
    .use-title {
        font-size: 18px;
        cursor: pointer;
    }
    
    .information-title {
        font-size: 24px;
        margin-top: 15px;
        border-top: 1px solid rgba(0, 0, 0, .09);
        padding-top: 15px;
    }
    
    .information-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    .information-list li {
        display: flex;
        flex-wrap: wrap;
        margin: 10px 0;
    }
    
    .information-list p {
        width: 50%;
        border: 0;
        margin: 0;
        padding: 0;
    }
    
    .information-list p:nth-child(2) {
        font-size: 14px;
    }
    
    .single-app-row {
        width: 100%;
    }
    
    #app-footer {
        border-top: 3px solid #bdc3c7;
        padding: 20px 0;
        height: 0;
        background-color: #e0e0e0;
        height: 100px;
        width: 100%;
    }
    
    #app-footer span {
        display: block;
    }
    
    @media (min-width: 360px) {
        .download-img {
            width: 50%;
        }
    }
    
    @media (min-width: 576px) {
        .single-app-info {
            height: 120px;
        }
        .single-app-img {
            width: 90px;
            height: 90px;
            left: 0px;
        }
        .single-app-title {
            font-size: 28px;
            left: 90px;
            bottom: 35px;
        }
        .card {
            width: 40%;
        }
        .download-img {
            width: 40%;
        }
        #app-footer {
            position: static;
            bottom: 0;
        }
        .logo-company {
            display: inline-block;
        }
    }
    
    @media (min-width: 640px) {
        .download-buttons {
            justify-content: space-evenly;
        }
        .download-img {
            width: 35%;
        }
    }
    
    @media (min-width: 767px) {
        .single-app-info {
            height: 150px;
        }
        .single-app-img {
            width: 110px;
            height: 110px;
            left: 0px;
        }
        .single-app-title {
            font-size: 28px;
            left: 110px;
            bottom: 55px;
        }
        .card {
            width: 30%;
        }
        .download-img {
            width: 30%;
        }
    }
    
    @media (min-width: 991px) {
        .single-app {
            margin: 0 auto;
            width: 960px;
            position: relative;
        }
        .bm-burger-button {
            left: 30px;
        }
        .logo-company {
            left: 85px;
        }
        .user-img {
            right: 30px;
        }
        .single-app-info {
            height: 160px;
        }
        .single-app-img {
            width: 120px;
            height: 120px;
        }
        .single-app-title {
            font-size: 30px;
            left: 130px;
            bottom: 60px;
        }
        .card {
            width: 25%;
        }
        .download-img {
            width: 25%;
        }
        .information-list p {
            width: 30%;
        }
    }
    
    @media (min-width: 1200px) {
        .single-app {
            width: 1100px;
        }
        .download-img {
            width: 20%;
        }
    }
</style>
