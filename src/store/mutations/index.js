export default {
  updateCount(state, num) {
    state.count = num
  },
  changeNetwork(state, network) {
    console.log(state)
    state.network = network
  },
  resetToken(state, newToken) {
    state.token = newToken
    window.localStorage.setItem('token', newToken)
    // console.log(window.localStorage.getItem('token'))
    // console.log(state.token)
  }
}
