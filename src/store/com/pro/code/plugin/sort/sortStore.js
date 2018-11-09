import sortService from '@/api/com/pro/code/plugin/sort/sortService'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    saveSort ({ commit, state }, sort) {
      return new Promise((resolve, reject) => {
        sortService.save(sort).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchSaveSort ({ commit, state }, sortOrList) {
      return new Promise((resolve, reject) => {
        sortService.batchSave(sortOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateSort ({ commit, state }, sort) {
      return new Promise((resolve, reject) => {
        sortService.update(sort).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchUpdateSort ({ commit, state }, sortOrList) {
      return new Promise((resolve, reject) => {
        sortService.batchUpdate(sortOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    removeSort ({ commit, state }, sort) {
      return new Promise((resolve, reject) => {
        sortService.remove(sort).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchRemoveSort ({ commit, state }, sortOrList) {
      return new Promise((resolve, reject) => {
        sortService.batchRemove(sortOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getSortByPk ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        sortService.getByPk(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllSort ({ commit, state }) {
      return new Promise((resolve, reject) => {
        sortService.getAll().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingGetSort ({ commit, state }, { rows, page }) {
      return new Promise((resolve, reject) => {
        sortService.paging(rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    querySort ({ commit, state }, sortQuery) {
      return new Promise((resolve, reject) => {
        sortService.query(sortQuery).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingQuerySort ({ commit, state }, { sortQuery, rows, page }) {
      return new Promise((resolve, reject) => {
        sortService.pagingQuery(sortQuery, rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getSortVOByPk ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        sortService.getVOByPk(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllSortVO ({ commit, state }) {
      return new Promise((resolve, reject) => {
        sortService.getAllVO().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingGetSortVO ({ commit, state }, { rows, page }) {
      return new Promise((resolve, reject) => {
        sortService.pagingVO(rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    querySortVO ({ commit, state }, sortQuery) {
      return new Promise((resolve, reject) => {
        sortService.queryVO(sortQuery).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingQuerySortVO ({ commit, state }, { sortQuery, rows, page }) {
      return new Promise((resolve, reject) => {
        sortService.pagingQueryVO(sortQuery, rows, page).then(res => {
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
