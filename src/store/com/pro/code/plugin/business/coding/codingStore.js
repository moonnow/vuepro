import codingService from '@/api/com/pro/code/plugin/business/coding/codingService'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    extract ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        codingService.extract(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getConfig ({ commit, state }, primaryKey) {
      return new Promise((resolve, reject) => {
        codingService.getConfig(primaryKey).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingProject ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingProject(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingJdbcEntity ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingJdbcEntity(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingQuery ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingQuery(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingVo ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingVo(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingException ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingException(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingIPersistent ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingIPersistent(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingIJpaPersistent ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingIJpaPersistent(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingJdbcPersistentImpl ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingJdbcPersistentImpl(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingIService ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingIService(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingServiceImpl ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingServiceImpl(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingController ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingController(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingVueEntity ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingVueEntity(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingVueQuery ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingVueQuery(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingVueVo ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingVueVo(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingVueService ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingVueService(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingVueStore ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingVueStore(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingVueList ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingVueList(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingVueListCss ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingVueListCss(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingVueEdit ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingVueEdit(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingVueEditCss ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingVueEditCss(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingVueDetail ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingVueDetail(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingVueDetailCss ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingVueDetailCss(primaryKey, config).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    codingAll ({ commit, state }, { primaryKey, config }) {
      return new Promise((resolve, reject) => {
        codingService.codingAll(primaryKey, config).then(res => {
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
