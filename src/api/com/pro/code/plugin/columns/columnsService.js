import axios from 'axios'
import ToolService from '@/api/com/pro/tool/toolService'
import Parameter from '@/api/com/pro/tool/Parameter'

const toolService = new ToolService()

const url = '/pro/code/plugin/columns'

const vourl = '/pro/code/plugin/columns/vo'

export default {
  save: (columns) => {
    let parameter = new Parameter()
    parameter.action = toolService.save
    return axios.post(url + toolService.getUrl(parameter), columns, toolService.getConfig())
  },
  batchSave: (columnsOrList) => {
    let parameter = new Parameter()
    parameter.action = toolService.batchSave
    if (columnsOrList instanceof Array) {
      return axios.post(url + toolService.getUrl(parameter), columnsOrList, toolService.getConfig())
    } else {
      return axios.post(url + toolService.getUrl(parameter), new Array(columnsOrList), toolService.getConfig())
    }
  },
  update: (columns) => {
    let parameter = new Parameter()
    parameter.action = toolService.update
    return axios.put(url + toolService.getUrl(parameter), columns, toolService.getConfig())
  },
  batchUpdate: (columnsOrList) => {
    let parameter = new Parameter()
    parameter.action = toolService.batchUpdate
    if (columnsOrList instanceof Array) {
      return axios.put(url + toolService.getUrl(parameter), columnsOrList, toolService.getConfig())
    } else {
      return axios.put(url + toolService.getUrl(parameter), new Array(columnsOrList), toolService.getConfig())
    }
  },
  remove: (columns) => {
    let parameter = new Parameter()
    parameter.action = toolService.remove
    return axios.delete(url + toolService.getUrl(parameter), toolService.getConfig(columns))
  },
  batchRemove: (columnsOrList) => {
    let parameter = new Parameter()
    parameter.action = toolService.batchRemove
    if (columnsOrList instanceof Array) {
      return axios.delete(url + toolService.getUrl(parameter), toolService.getConfig(columnsOrList))
    } else {
      return axios.delete(url + toolService.getUrl(parameter), toolService.getConfig(new Array(columnsOrList)))
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
  query: (columnsQuery) => {
    let parameter = new Parameter()
    parameter.action = toolService.getAll
    return axios.post(url + toolService.getUrl(parameter), columnsQuery, toolService.getConfig())
  },
  pagingQuery: (columnsQuery, rows, page) => {
    let parameter = new Parameter()
    parameter.action = toolService.paging
    return axios.post(url + toolService.getPagingUrl(parameter, rows, page), columnsQuery, toolService.getConfig())
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
  queryVO: (columnsQuery) => {
    let parameter = new Parameter()
    parameter.action = toolService.getAllVO
    return axios.post(vourl + toolService.getUrl(parameter), columnsQuery, toolService.getConfig())
  },
  pagingQueryVO: (columnsQuery, rows, page) => {
    let parameter = new Parameter()
    parameter.action = toolService.pagingVO
    return axios.post(vourl + toolService.getPagingUrl(parameter, rows, page), columnsQuery, toolService.getConfig())
  }
}
