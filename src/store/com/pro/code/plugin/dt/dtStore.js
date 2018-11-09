import dtService from '@/api/com/pro/code/plugin/dt/dtService'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    saveDt ({ commit, state }, dt) {
      return new Promise((resolve, reject) => {
        dtService.save(dt).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchSaveDt ({ commit, state }, dtOrList) {
      return new Promise((resolve, reject) => {
        dtService.batchSave(dtOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateDt ({ commit, state }, dt) {
      return new Promise((resolve, reject) => {
        dtService.update(dt).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchUpdateDt ({ commit, state }, dtOrList) {
      return new Promise((resolve, reject) => {
        dtService.batchUpdate(dtOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    removeDt ({ commit, state }, dt) {
      return new Promise((resolve, reject) => {
        dtService.remove(dt).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchRemoveDt ({ commit, state }, dtOrList) {
      return new Promise((resolve, reject) => {
        dtService.batchRemove(dtOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getDtByPk ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        dtService.getByPk(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllDt ({ commit, state }) {
      return new Promise((resolve, reject) => {
        dtService.getAll().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingGetDt ({ commit, state }, { rows, page }) {
      return new Promise((resolve, reject) => {
        dtService.paging(rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    queryDt ({ commit, state }, dtQuery) {
      return new Promise((resolve, reject) => {
        dtService.query(dtQuery).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingQueryDt ({ commit, state }, { dtQuery, rows, page }) {
      return new Promise((resolve, reject) => {
        dtService.pagingQuery(dtQuery, rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getDtVOByPk ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        dtService.getVOByPk(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllDtVO ({ commit, state }) {
      return new Promise((resolve, reject) => {
        dtService.getAllVO().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingGetDtVO ({ commit, state }, { rows, page }) {
      return new Promise((resolve, reject) => {
        dtService.pagingVO(rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    queryDtVO ({ commit, state }, dtQuery) {
      return new Promise((resolve, reject) => {
        dtService.queryVO(dtQuery).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingQueryDtVO ({ commit, state }, { dtQuery, rows, page }) {
      return new Promise((resolve, reject) => {
        dtService.pagingQueryVO(dtQuery, rows, page).then(res => {
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
