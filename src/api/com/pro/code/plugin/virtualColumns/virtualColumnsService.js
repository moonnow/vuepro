import axios from 'axios'
import ToolService from '@/api/com/pro/tool/toolService'
import Parameter from '@/api/com/pro/tool/Parameter'

const toolService = new ToolService()

const url = '/pro/code/plugin/virtualColumns'

const vourl = '/pro/code/plugin/virtualColumns/vo'

export default {
  save: (virtualColumns) => {
    let parameter = new Parameter()
    parameter.action = toolService.save
    return axios.post(url + toolService.getUrl(parameter), virtualColumns, toolService.getConfig())
  },
  batchSave: (virtualColumnsOrList) => {
    let parameter = new Parameter()
    parameter.action = toolService.batchSave
    if (virtualColumnsOrList instanceof Array) {
      return axios.post(url + toolService.getUrl(parameter), virtualColumnsOrList, toolService.getConfig())
    } else {
      return axios.post(url + toolService.getUrl(parameter), new Array(virtualColumnsOrList), toolService.getConfig())
    }
  },
  update: (virtualColumns) => {
    let parameter = new Parameter()
    parameter.action = toolService.update
    return axios.put(url + toolService.getUrl(parameter), virtualColumns, toolService.getConfig())
  },
  batchUpdate: (virtualColumnsOrList) => {
    let parameter = new Parameter()
    parameter.action = toolService.batchUpdate
    if (virtualColumnsOrList instanceof Array) {
      return axios.put(url + toolService.getUrl(parameter), virtualColumnsOrList, toolService.getConfig())
    } else {
      return axios.put(url + toolService.getUrl(parameter), new Array(virtualColumnsOrList), toolService.getConfig())
    }
  },
  remove: (virtualColumns) => {
    let parameter = new Parameter()
    parameter.action = toolService.remove
    return axios.delete(url + toolService.getUrl(parameter), toolService.getConfig(virtualColumns))
  },
  batchRemove: (virtualColumnsOrList) => {
    let parameter = new Parameter()
    parameter.action = toolService.batchRemove
    if (virtualColumnsOrList instanceof Array) {
      return axios.delete(url + toolService.getUrl(parameter), toolService.getConfig(virtualColumnsOrList))
    } else {
      return axios.delete(url + toolService.getUrl(parameter), toolService.getConfig(new Array(virtualColumnsOrList)))
    }
  },
  getByPk: (primaryKey) => {
    let parameter = new Parameter()
    parameter.action = toolService.getByPk
    parameter.primaryKey = primaryKey
    return axios.get(url + toolService.getUrl(parameter), toolService.getConfig())
  },
  getAll: () => {
    let parameter = new Parameter()
    parameter.action = toolService.getAll
    return axios.post(url + toolService.getUrl(parameter), toolService.getConfig())
  },
  paging: (rows, page) => {
    let parameter = new Parameter()
    parameter.action = toolService.paging
    return axios.post(url + toolService.getPagingUrl(parameter, rows, page), toolService.getConfig())
  },
  query: (virtualColumnsQuery) => {
    let parameter = new Parameter()
    parameter.action = toolService.getAll
    return axios.post(url + toolService.getUrl(parameter), virtualColumnsQuery, toolService.getConfig())
  },
  pagingQuery: (virtualColumnsQuery, rows, page) => {
    let parameter = new Parameter()
    parameter.action = toolService.paging
    return axios.post(url + toolService.getPagingUrl(parameter, rows, page), virtualColumnsQuery, toolService.getConfig())
  },
  getVOByPk: (primaryKey) => {
    let parameter = new Parameter()
    parameter.action = toolService.getVOByPk
    parameter.primaryKey = primaryKey
    return axios.get(url + toolService.getUrl(parameter), toolService.getConfig())
  },
  getAllVO: () => {
    let parameter = new Parameter()
    parameter.action = toolService.getAllVO
    return axios.post(vourl + toolService.getUrl(parameter), toolService.getConfig())
  },
  pagingVO: (rows, page) => {
    let parameter = new Parameter()
    parameter.action = toolService.pagingVO
    return axios.post(vourl + toolService.getPagingUrl(parameter, rows, page), toolService.getConfig())
  },
  queryVO: (virtualColumnsQuery) => {
    let parameter = new Parameter()
    parameter.action = toolService.getAllVO
    return axios.post(vourl + toolService.getUrl(parameter), virtualColumnsQuery, toolService.getConfig())
  },
  pagingQueryVO: (virtualColumnsQuery, rows, page) => {
    let parameter = new Parameter()
    parameter.action = toolService.pagingVO
    return axios.post(vourl + toolService.getPagingUrl(parameter, rows, page), virtualColumnsQuery, toolService.getConfig())
  }
}
