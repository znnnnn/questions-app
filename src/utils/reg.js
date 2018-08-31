const reg = {
  checkPwd(pwd) {
    var reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[_.@]){5,13}$/
    return reg.test(pwd)
  },
  checkPhone(phone) {
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/
    return reg.test(phone)
  }
}

export default reg
