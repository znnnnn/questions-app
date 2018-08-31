export default {
  updateCountAsync(store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  },
  resetTokenAsync(store, newToken) {
    setTimeout(() => {
      // console.log(this.$store)
      store.commit('resetToken', newToken)
    }, 100)
  }
}
