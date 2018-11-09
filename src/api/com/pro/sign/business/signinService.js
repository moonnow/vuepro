import axios from 'axios'
import ToolService from '@/api/com/pro/tool/toolService'
import Parameter from '@/api/com/pro/tool/Parameter'

const toolService = new ToolService()

const url = '/pro/login'

export default {
  login: (account) => {
    let parameter = new Parameter()
    return axios.post(url + toolService.getUrl(parameter), account, toolService.getConfig())
  }
}
