import pkService from '@/api/com/pro/code/plugin/pk/pkService'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    savePk ({ commit, state }, pk) {
      return new Promise((resolve, reject) => {
        pkService.save(pk).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchSavePk ({ commit, state }, pkOrList) {
      return new Promise((resolve, reject) => {
        pkService.batchSave(pkOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updatePk ({ commit, state }, pk) {
      return new Promise((resolve, reject) => {
        pkService.update(pk).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchUpdatePk ({ commit, state }, pkOrList) {
      return new Promise((resolve, reject) => {
        pkService.batchUpdate(pkOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    removePk ({ commit, state }, pk) {
      return new Promise((resolve, reject) => {
        pkService.remove(pk).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchRemovePk ({ commit, state }, pkOrList) {
      return new Promise((resolve, reject) => {
        pkService.batchRemove(pkOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getPkByPk ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        pkService.getByPk(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllPk ({ commit, state }) {
      return new Promise((resolve, reject) => {
        pkService.getAll().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingGetPk ({ commit, state }, { rows, page }) {
      return new Promise((resolve, reject) => {
        pkService.paging(rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    queryPk ({ commit, state }, pkQuery) {
      return new Promise((resolve, reject) => {
        pkService.query(pkQuery).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingQueryPk ({ commit, state }, { pkQuery, rows, page }) {
      return new Promise((resolve, reject) => {
        pkService.pagingQuery(pkQuery, rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getPkVOByPk ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        pkService.getVOByPk(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllPkVO ({ commit, state }) {
      return new Promise((resolve, reject) => {
        pkService.getAllVO().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingGetPkVO ({ commit, state }, { rows, page }) {
      return new Promise((resolve, reject) => {
        pkService.pagingVO(rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    queryPkVO ({ commit, state }, pkQuery) {
      return new Promise((resolve, reject) => {
        pkService.queryVO(pkQuery).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingQueryPkVO ({ commit, state }, { pkQuery, rows, page }) {
      return new Promise((resolve, reject) => {
        pkService.pagingQueryVO(pkQuery, rows, page).then(res => {
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
