<template>
  <div class="">
    {{fooCount}}
  </div>
</template>

<script>
  import fooStoreModule from '../store/modules/foo';

  export default {
    name: 'Foo',
    components: {},
    filters: {},
    asyncData({store}) {
      store.registerModule('foo', fooStoreModule);
      return store.dispatch('foo/Inc');
    },
    props: {},
    data() {
      return {};
    },
    computed: {
      fooCount() {
        return this.$store.state.foo.count;
      }
    },
    watch: {},
    created() {
    },
    mounted() {
    },
    destroyed() {
      this.$store.unregisterModule('foo');
    },
    methods: {}
  };
</script>

<style scoped lang="stylus">

</style>
