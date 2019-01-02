import Vue from 'vue';
import App from './App.vue';
import {createRouter} from './router';
import {createStore} from './store';
import {sync} from 'vuex-router-sync';
import Element from 'element-ui';
import 'element-ui/packages/theme-chalk/lib/index.css';

Vue.use(Element);

export function createApp() {
  const router = createRouter();
  const store = createStore();
  sync(store, router);
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return {app, store, router};
}
