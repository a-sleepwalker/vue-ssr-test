<template>
  <div class="home">
    <p>{{item.title}}</p>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '../../src/components/HelloWorld.vue';

  export default {
    name: 'home',
    components: {
      HelloWorld
    },
    computed: {
      item() {
        return {title: 1222};
      }
    }
  };
</script>
