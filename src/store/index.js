import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

import columnsStore from './com/pro/code/plugin/columns/columnsStore'
import dtStore from './com/pro/code/plugin/dt/dtStore'
import pkStore from './com/pro/code/plugin/pk/pkStore'
import queryStore from './com/pro/code/plugin/query/queryStore'
import sortStore from './com/pro/code/plugin/sort/sortStore'
import virtualColumnsStore from './com/pro/code/plugin/virtualColumns/virtualColumnsStore'
import codingStore from './com/pro/code/plugin/business/coding/codingStore'
import dataDictStore from './com/pro/data/dict/dataDict/dataDictStore'
import dataDictValueStore from './com/pro/data/dict/dataDictValue/dataDictValueStore'
import userStore from './com/pro/sign/user/userStore'
import accountStore from './com/pro/sign/account/accountStore'
import userInfoStore from './com/pro/sign/userInfo/userInfoStore'
import groupsStore from './com/pro/sign/groups/groupsStore'
import userGroupsNexusStore from './com/pro/sign/userGroupsNexus/userGroupsNexusStore'
import loginLogStore from './com/pro/sign/loginLog/loginLogStore'
import sessionStore from './com/pro/sign/session/sessionStore'
import signinStore from './com/pro/sign/business/signinStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    app
  }
})

store.registerModule('columnsStore', columnsStore)
store.registerModule('dtStore', dtStore)
store.registerModule('pkStore', pkStore)
store.registerModule('queryStore', queryStore)
store.registerModule('sortStore', sortStore)
store.registerModule('virtualColumnsStore', virtualColumnsStore)
store.registerModule('codingStore', codingStore)
store.registerModule('dataDictStore', dataDictStore)
store.registerModule('dataDictValueStore', dataDictValueStore)
store.registerModule('userStore', userStore)
store.registerModule('accountStore', accountStore)
store.registerModule('userInfoStore', userInfoStore)
store.registerModule('groupsStore', groupsStore)
store.registerModule('userGroupsNexusStore', userGroupsNexusStore)
store.registerModule('loginLogStore', loginLogStore)
store.registerModule('sessionStore', sessionStore)
store.registerModule('signinStore', signinStore)

export default store
