import Cookies from 'js-cookie'

export default class Parameter {
  constructor () {
    this.pro = +new Date()
    this.action = null
    this.primaryKey = null
    this.rows = 10
    this.page = 1
    this.token = Cookies.get('pro-token')
  }
}
