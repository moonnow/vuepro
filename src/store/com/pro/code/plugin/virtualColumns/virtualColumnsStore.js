import virtualColumnsService from '@/api/com/pro/code/plugin/virtualColumns/virtualColumnsService'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    saveVirtualColumns ({ commit, state }, virtualColumns) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.save(virtualColumns).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchSaveVirtualColumns ({ commit, state }, virtualColumnsOrList) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.batchSave(virtualColumnsOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateVirtualColumns ({ commit, state }, virtualColumns) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.update(virtualColumns).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchUpdateVirtualColumns ({ commit, state }, virtualColumnsOrList) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.batchUpdate(virtualColumnsOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    removeVirtualColumns ({ commit, state }, virtualColumns) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.remove(virtualColumns).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    batchRemoveVirtualColumns ({ commit, state }, virtualColumnsOrList) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.batchRemove(virtualColumnsOrList).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getVirtualColumnsByPk ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.getByPk(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllVirtualColumns ({ commit, state }) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.getAll().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingGetVirtualColumns ({ commit, state }, { rows, page }) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.paging(rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    queryVirtualColumns ({ commit, state }, virtualColumnsQuery) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.query(virtualColumnsQuery).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingQueryVirtualColumns ({ commit, state }, { virtualColumnsQuery, rows, page }) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.pagingQuery(virtualColumnsQuery, rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getVirtualColumnsVOByPk ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.getVOByPk(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllVirtualColumnsVO ({ commit, state }) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.getAllVO().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingGetVirtualColumnsVO ({ commit, state }, { rows, page }) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.pagingVO(rows, page).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    queryVirtualColumnsVO ({ commit, state }, virtualColumnsQuery) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.queryVO(virtualColumnsQuery).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    pagingQueryVirtualColumnsVO ({ commit, state }, { virtualColumnsQuery, rows, page }) {
      return new Promise((resolve, reject) => {
        virtualColumnsService.pagingQueryVO(virtualColumnsQuery, rows, page).then(res => {
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
