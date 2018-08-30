export default {
  updateCount(state, num) {
    state.count = num
  },
  changeNetwork(state, network) {
    console.log(state)
    state.network = network
  },
  resetToken(state, newToken) {
    state.token = ''
    console.log(state.token)
  }
}
