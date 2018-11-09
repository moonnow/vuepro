import queryService from '@/api/com/pro/code/plugin/query/queryService'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    saveQuery ({ commit, state }, query) {
      return new Promise((resolve, reject) => {
        queryService.save(query).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchSaveQuery ({ commit, state }, queryOrList) {
      return new Promise((resolve, reject) => {
        queryService.batchSave(queryOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateQuery ({ commit, state }, query) {
      return new Promise((resolve, reject) => {
        queryService.update(query).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchUpdateQuery ({ commit, state }, queryOrList) {
      return new Promise((resolve, reject) => {
        queryService.batchUpdate(queryOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    removeQuery ({ commit, state }, query) {
      return new Promise((resolve, reject) => {
        queryService.remove(query).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchRemoveQuery ({ commit, state }, queryOrList) {
      return new Promise((resolve, reject) => {
        queryService.batchRemove(queryOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getQueryByPk ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        queryService.getByPk(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllQuery ({ commit, state }) {
      return new Promise((resolve, reject) => {
        queryService.getAll().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingGetQuery ({ commit, state }, { rows, page }) {
      return new Promise((resolve, reject) => {
        queryService.paging(rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    queryQuery ({ commit, state }, queryQuery) {
      return new Promise((resolve, reject) => {
        queryService.query(queryQuery).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingQueryQuery ({ commit, state }, { queryQuery, rows, page }) {
      return new Promise((resolve, reject) => {
        queryService.pagingQuery(queryQuery, rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getQueryVOByPk ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        queryService.getVOByPk(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllQueryVO ({ commit, state }) {
      return new Promise((resolve, reject) => {
        queryService.getAllVO().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingGetQueryVO ({ commit, state }, { rows, page }) {
      return new Promise((resolve, reject) => {
        queryService.pagingVO(rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    queryQueryVO ({ commit, state }, queryQuery) {
      return new Promise((resolve, reject) => {
        queryService.queryVO(queryQuery).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingQueryQueryVO ({ commit, state }, { queryQuery, rows, page }) {
      return new Promise((resolve, reject) => {
        queryService.pagingQueryVO(queryQuery, rows, page).then(res => {
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
