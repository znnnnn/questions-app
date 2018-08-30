import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import defaultState from './state/index'
import mutations from './mutations/index'
import getters from './getters/index'
import actions from './actions/index'

const isDev = process.env.NODE_ENV === 'development'

const store = new Vuex.Store({
  strict: isDev,
  state: defaultState,
  mutations,
  getters,
  actions,
  modules: {
  }
})

export default store
