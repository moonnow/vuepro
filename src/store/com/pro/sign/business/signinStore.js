import signinService from '@/api/com/pro/sign/business/signinService'

// import signinStore from './com/pro/sign/business/signinStore'

// store.registerModule('signinStore', signinStore)

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    login ({ commit, state }, account) {
      return new Promise((resolve, reject) => {
        signinService.login(account).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {
  }
}
