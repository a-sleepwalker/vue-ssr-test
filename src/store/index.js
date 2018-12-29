import Vue from 'vue';
import Vuex from 'vuex';
import importModules from '../utils/import-modules';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {}
    },
    mutations: {
      SET_ITEM(state, item) {
        Vue.set(state.items, item);
      }
    },
    actions: {
      FetchItem({commit}, id, title) {
        return new Promise((resolve) => {
          commit('SET_ITEM', {id, title});
          resolve();
        });
      }
    },
    modules: {
      ...importModules(require.context('./modules', false, /\.js$/))
    }
  });
}
