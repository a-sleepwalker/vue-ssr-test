<template>
  <div class="home">
    <p>{{item.title}}</p>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    asyncData({store, route}) {
      return store.dispatch('FetchItem', 78, 'hi');
    },
    name: 'home',
    components: {
      HelloWorld
    },
    computed: {
      item() {
        return this.$store.state.items['78'];
      }
    }
  };
</script>
