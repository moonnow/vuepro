import columnsService from '@/api/com/pro/code/plugin/columns/columnsService'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    saveColumns ({ commit, state }, columns) {
      return new Promise((resolve, reject) => {
        columnsService.save(columns).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchSaveColumns ({ commit, state }, columnsOrList) {
      return new Promise((resolve, reject) => {
        columnsService.batchSave(columnsOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateColumns ({ commit, state }, columns) {
      return new Promise((resolve, reject) => {
        columnsService.update(columns).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchUpdateColumns ({ commit, state }, columnsOrList) {
      return new Promise((resolve, reject) => {
        columnsService.batchUpdate(columnsOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    removeColumns ({ commit, state }, columns) {
      return new Promise((resolve, reject) => {
        columnsService.remove(columns).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchRemoveColumns ({ commit, state }, columnsOrList) {
      return new Promise((resolve, reject) => {
        columnsService.batchRemove(columnsOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getColumnsByPk ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        columnsService.getByPk(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllColumns ({ commit, state }) {
      return new Promise((resolve, reject) => {
        columnsService.getAll().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingGetColumns ({ commit, state }, { rows, page }) {
      return new Promise((resolve, reject) => {
        columnsService.paging(rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    queryColumns ({ commit, state }, columnsQuery) {
      return new Promise((resolve, reject) => {
        columnsService.query(columnsQuery).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingQueryColumns ({ commit, state }, { columnsQuery, rows, page }) {
      return new Promise((resolve, reject) => {
        columnsService.pagingQuery(columnsQuery, rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getColumnsVOByPk ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        columnsService.getVOByPk(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllColumnsVO ({ commit, state }) {
      return new Promise((resolve, reject) => {
        columnsService.getAllVO().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingGetColumnsVO ({ commit, state }, { rows, page }) {
      return new Promise((resolve, reject) => {
        columnsService.pagingVO(rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    queryColumnsVO ({ commit, state }, columnsQuery) {
      return new Promise((resolve, reject) => {
        columnsService.queryVO(columnsQuery).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingQueryColumnsVO ({ commit, state }, { columnsQuery, rows, page }) {
      return new Promise((resolve, reject) => {
        columnsService.pagingQueryVO(columnsQuery, rows, page).then(res => {
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
