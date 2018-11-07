<template>
  <div id="app-list">
    <!-- App list header -->
    <header class="header-app-list">
      <div class="container">
        <div id="sideNav" class="bm-menu">
          <nav class="bm-item-list">
            <h4>Categories</h4>
            <a href="#">All categories</a>
            <a href="#">Web App</a>
            <a href="#">Mobile App</a>
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
        <!-- User image and logout holder END-->
        <div class="bm-burger-button" @click="openMenu">
          <span class="bm-burger-bars line-style" :style="{top:20 * (index * 2) + '%'}" v-for="(x, index) in 3" :key="index"></span>
        </div>
        <div class="logo-company">
          <h1 v-on:click.prevent="moveToAppList()">Logo</h1>
        </div>
      </div>
    </header>
    <!-- App list header END-->
    <!-- App list holder -->
    <div class="app-holder">
      <input type="text" placeholder="Search by app title" class="search-input" v-model="search" v-on:keyup="searchUpperCase()">
      <h3>All categories</h3>
      <b-row class="app-row">
        <b-col xs="12" sm="6" md="4" lg="4" xl="4" v-for="app in filteredApps" v-bind:key="app.id" v-on:click="singleApp">
          <div class="app-item">
            <img :src="require('../assets/app.png')" class="app-img img-fluid" />
            <h4>{{ app.name }}</h4>
            <p> {{ app.description}}...</p>
          </div>
        </b-col>
      </b-row>
    </div>
    <!-- App list holder END-->
    <!-- App footer -->
    <footer id="app-footer">
      <small>Copyright © 2018 <span>All rights reserved.</span></small>
    </footer>
    <!-- App footer END -->
  </div>
</template>

<script>
  import auth from "../auth";
  import apps from "../apps";
  export default {
    data() {
      return {
        allApps: [],
        isSideBarOpen: false,
        logOut: false,
        search: "",
        searchValue: ""
      };
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
        default: "300"
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
        this.$emit("openMenu");
        this.isSideBarOpen = true;
  
        if (!this.noOverlay) {
          document.body.className += "bm-overlay";
        }
        if (this.right) {
          document.querySelector(".bm-menu").style.left = "auto";
          document.querySelector(".bm-menu").style.right = "0px";
        }
        this.$nextTick(function() {
          document.getElementById("sideNav").style.width = this.width ?
            this.width + "px" :
            "280px";
        });
      },
      moveToAppList() {
        this.$router.push('/applist')
      },
      closeMenu() {
        this.$emit("closeMenu");
        this.isSideBarOpen = false;
        document.body.className = document.body.className.replace(
          "bm-overlay",
          ""
        );
        document.getElementById("sideNav").style.width = "0px";
      },
      closeMenuOnEsc(e) {
        e = e || window.event;
        if (e.key === "Escape" || e.keyCode === 27) {
          document.getElementById("sideNav").style.width = "0px";
          document.body.style.backgroundColor = "inherit";
          this.isSideBarOpen = false;
        }
      },
      documentClick(e) {
        let element = document.querySelector(".bm-burger-button");
        let target = e.target;
        if (
          element !== target &&
          !element.contains(target) &&
          e.target.className !== "bm-menu"
        ) {
          this.closeMenu();
        }
      },
      logout() {
        auth.logout();
        this.$router.push("/login");
      },
      searchUpperCase() {
        this.searchValue = this.search.toUpperCase();
      },
      singleApp() {
        this.$router.push("/singleapp");
      }
    },
    mounted() {
      if (!this.disableEsc) {
        document.addEventListener("keyup", this.closeMenuOnEsc);
      }
      if (this.burgerIcon === false) {
        document.querySelector(".bm-burger-button").style.display = "none";
      }
      if (this.crossIcon === false) {
        document.querySelector(".bm-cross-button").style.display = "none";
      }
    },
    created: function() {
      this.getApps();
      document.addEventListener("click", this.documentClick);
    },
    destroyed: function() {
      document.removeEventListener("keyup", this.closeMenuOnEsc);
      document.removeEventListener("click", this.documentClick);
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
              document.querySelector(".bm-burger-button").style.left = "0px";
              document.querySelector(".bm-burger-button").style.right = "36px";
              document.querySelector(".bm-menu").style.left = "auto";
              document.querySelector(".bm-menu").style.right = "0px";
            });
          }
          if (newValue) {
            if (
              document.querySelector(".bm-burger-button").hasAttribute("style")
            ) {
              document
                .querySelector(".bm-burger-button")
                .removeAttribute("style");
              document.getElementById("sideNav").style.right = "auto";
            }
          }
        }
      }
    },
    computed: {
      filteredApps: function() {
        return this.allApps.filter(app => {
          return app.name.toUpperCase().match(this.searchValue);
        });
      }
    }
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Nunito:700');
  #app-list {}
  
  html {
    height: 100%;
    position: relative;
  }
  
  .header-app-list {
    width: 100%;
    height: 100px;
    background-color: #e0e0e0;
    border-bottom: 3px solid #bdc3c7;
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
  
  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
  
  .app-holder {
    padding: 0 10px;
  }
  
  .app-holder h3 {
    margin: 55px auto;
  }
  
  .app-item {
    margin: 15px 0;
    border: 1px solid #ddd;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04), 0 0px 1px rgba(28, 39, 72, 0.15), 0 6px 34px rgba(0, 0, 0, 0.09);
    padding: 10px 0;
    width: 100%;
  }
  
  .app-row {
    width: 100%;
  }
  
  .app-item:hover {
    background-color: #373a47;
    color: #eee;
    transition: all 0.5s;
    cursor: pointer;
  }
  
  .app-item h4 {
    margin: 0 auto;
    display: block;
    font-size: 22px;
    padding: 5px 0;
  }
  
  .app-item p {
    margin: 8px;
    font-size: 14px;
    display: block;
    border-top: 1px solid #ddd;
    padding-top: 8px;
  }
  
  .app-img {
    width: 15%;
    height: 30%;
  }
  
  #app-footer {
    background-color: #e0e0e0;
    border-top: 3px solid #bdc3c7;
    padding: 20px 0;
    width: 100%;
    height: 100px;
  }
  
  #app-footer span {
    display: block;
  }
  
  .app-holder {
    display: flex;
    flex-wrap: wrap;
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
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04), 0 0px 1px rgba(28, 39, 72, 0.15), 0 6px 34px rgba(0, 0, 0, 0.09);
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
  
  .search-input {
    display: block;
    width: 100%;
    height: 40px;
    margin: 70px 10px 0 10px;
  }
  
  @media (min-width: 576px) {
    .app-holder {
      min-height: 100%;
    }
    .logo-company {
      display: inline-block;
    }
  }
  
  @media (min-width: 992px) {
    .app-holder {
      width: 990px;
      margin: 0 auto;
    }
    .logo-company {
      left: 85px;
    }
    .bm-burger-button {
      left: 30px;
    }
    .user-img {
      right: 30px;
    }
  }
</style>
