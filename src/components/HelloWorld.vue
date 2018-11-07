<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
       
        </a>
      </li>
    </ul>
    <div class="app-holder">
      <h3  @keydown="this.console.log(allApps)">All categories</h3>

      <b-row>
        <b-col xs="12" sm="6" md="4" lg="4" xl="4"  v-for="app in allApps" v-bind:key="app.id">
          <div class="app-item">
            <img :src="require('../assets/app.png')" class="app-img img-fluid" />
            <h4>{{ app.name }}</h4>
            <p> {{ app.description}}...</p>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>

</template>

<script>
import apps from '../apps'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      allApps: [],
    }
  },
  mounted() {
    var app = this;
  },
    created() {
        this.getApps();
    },
  methods: {
    getApps() {
       apps.getAllApps().then(response => {this.allApps = response}).catch(error => {
           reject(error)
       })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
