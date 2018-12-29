export default {
  namespaced: true,
  state: () => {
    return {
      count: 0
    };
  },
  mutations: {
    INC(state) {
      state.count++;
    }
  },
  action: {
    Inc({commit}) {
      commit('INC');
    }
  }
};
