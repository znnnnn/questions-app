import defaultState from './state/index'
import mutations from './mutations/index'
import getters from './getters/index'
import actions from './actions/index'

const isDev = process.env.NODE_ENV === 'development'

const store = {
  strict: isDev,
  state: defaultState,
  mutations,
  getters,
  actions,
  modules: {

  }
}

export default store
