import Vue from 'vue';
import Vuex from 'vuex';

import food from './modules/food';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: 'wsxsyswbxbyb',
    foo: 'asdasdd',
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    food,
  },
});
