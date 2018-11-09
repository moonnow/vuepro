import axios from 'axios'
import ToolService from '@/api/com/pro/tool/toolService'
import Parameter from '@/api/com/pro/tool/Parameter'

const toolService = new ToolService()

const url = '/pro/code/plugin'

export default {
  extract: (primaryKey) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.get(url + '/extract' + toolService.getUrl(parameter), toolService.getConfig())
  },
  getConfig: (primaryKey) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.get(url + '/get_config' + toolService.getUrl(parameter), toolService.getConfig())
  },
  codingProject: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_project' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingJdbcEntity: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_jdbc_entity' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingQuery: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_query' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingVo: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_vo' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingException: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_exception' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingIPersistent: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_i_persistent' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingIJpaPersistent: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_i_jpa_persistent' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingJdbcPersistentImpl: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_jdbc_persistent_impl' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingIService: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_i_service' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingServiceImpl: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_service_impl' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingController: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_controller' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingVueEntity: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_vue_entity' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingVueQuery: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_vue_query' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingVueVo: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_vue_vo' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingVueService: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_vue_service' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingVueStore: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_vue_store' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingVueList: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_vue_list' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingVueListCss: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_vue_list_css' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingVueEdit: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_vue_edit' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingVueEditCss: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_vue_edit_css' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingVueDetail: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_vue_detail' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingVueDetailCss: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_vue_detail_css' + toolService.getUrl(parameter), config, toolService.getConfig())
  },
  codingAll: (primaryKey, config) => {
    let parameter = new Parameter()
    parameter.primaryKey = primaryKey
    return axios.post(url + '/coding_all' + toolService.getUrl(parameter), config, toolService.getConfig())
  }
}
