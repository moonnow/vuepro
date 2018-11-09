<style lang="less">
  @import './dt-list.less';
</style>

<template>
  <div>
    <Card>
      <Row>
        <Col :xs="12" :sm="10" :md="6" :lg="4">
          <Input search enter-button placeholder="关键字搜索" :disabled="keywordSearchSubmitting" @on-search="keywordSearch($event)" />
        </Col>
      </Row>
      <Collapse simple class="margin-top-10">
        <Panel>
          精准查询
          <div slot="content">
            <Form ref="dtVagueQueryForm" :model="dtVagueQuery" inline :label-width="135" class="margin-top-10">
              <FormItem label="表名：">
                <Input v-model="dtVagueQuery.dtName" placeholder="输入表名"></Input>
              </FormItem>
              <FormItem label="表名注释：">
                <Input v-model="dtVagueQuery.dtNameAnnotation" placeholder="输入表名注释"></Input>
              </FormItem>
              <FormItem label="数据库表前缀：">
                <Input v-model="dtVagueQuery.dtPrefix" placeholder="输入数据库表前缀"></Input>
              </FormItem>
              <FormItem label="首字母大写实体类名：">
                <Input v-model="dtVagueQuery.initialCaseEntityName" placeholder="输入首字母大写实体类名"></Input>
              </FormItem>
              <FormItem label="首字母小写实体类名：">
                <Input v-model="dtVagueQuery.initialLowercaseEntityName" placeholder="输入首字母小写实体类名"></Input>
              </FormItem>
              <FormItem label="项目路径：">
                <Input v-model="dtVagueQuery.proPath" placeholder="输入项目路径"></Input>
              </FormItem>
              <FormItem label="项目全称：">
                <Input v-model="dtVagueQuery.proAllName" placeholder="输入项目全称"></Input>
              </FormItem>
              <Button type="primary" @click="vagueQuery()" :loading="vagueQuerySubmitting">精准查询</Button>
            </Form>
          </div>
        </Panel>
      </Collapse>
      <Button class="pro-list-button" type="primary" ghost icon="ios-add-circle-outline" @click="add()">新建</Button>
      <Button class="pro-list-button" type="dashed" icon="ios-brush-outline" @click="up()" v-if="selectDataRowLength === 1">编辑</Button>
      <Poptip confirm title="确认删除？" placement="bottom" @on-ok="del()">
        <Button class="pro-list-button" type="error" ghost icon="ios-backspace-outline" v-if="selectDataRowLength > 0">删除</Button>
      </Poptip>
      <Button class="pro-list-button" icon="md-bulb" @click="detail()" v-if="selectDataRowLength === 1">详情</Button>
      <Button class="pro-list-button" ghost icon="ios-flash-outline" @click="extractData()" v-if="selectDataRowLength === 1">提取数据</Button>
      <Table :columns="columns" :data="dataSet" @on-selection-change="setSelectDataRow($event)"></Table>
      <Row type="flex" justify="center" class="margin-top-10" v-if="pageShow">
        <Page :total="count" show-total show-sizer show-elevator :page-size-opts="[10, 30, 50]" @on-change="pageIndexChange($event)" @on-page-size-change="pageSizeChange($event)" />
      </Row>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import DtQuery from '@/view/com/pro/code/plugin/dt/dtQuery'

// @/view/com/pro/code/plugin/dt/dt-list/dt-list.vue

export default {
  name: 'DtList',
  props: {
  },
  data () {
    return {
      columns: [
        { type: 'selection', width: 50, align: 'center', fixed: 'left' },
        { title: '表名', key: 'dtName', width: 230 },
        { title: '表名注释', key: 'dtNameAnnotation', width: 150 },
        { title: '数据库表前缀', key: 'dtPrefix', width: 150 },
        { title: '实体类名', key: 'initialCaseEntityName', width: 150 },
        { title: '项目全称', key: 'proAllName', width: 200 },
        { title: '项目路径', key: 'proPath' }
      ],
      dataSet: [],
      selectDataRow: [],
      selectDataRowLength: 0,
      spinShow: false,
      count: 0,
      rows: 10,
      page: 1,
      pageShow: true,
      keywordSearchClickRate: 0,
      keywordSearchSubmitting: false,
      vagueQuerySubmitting: false,
      dtVagueQuery: new DtQuery()
    }
  },
  computed: {
    ...mapState('dtStore', [
    ]),
    ...mapGetters('dtStore', [
    ])
  },
  methods: {
    ...mapMutations([
      'addTag'
    ]),
    ...mapMutations('dtStore', [
    ]),
    ...mapActions('dtStore', [
      'batchRemoveDt',
      'pagingGetDt',
      'queryDt'
    ]),
    ...mapActions('codingStore', [
      'extract'
    ]),
    add () {
      const route = {
        name: 'dt-edit',
        params: {
          dtId: 'add'
        },
        meta: {
          icon: 'md-trending-up',
          title: '编辑数据库表'
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    up () {
      const route = {
        name: 'dt-edit',
        params: {
          dtId: this.selectDataRow[0].dtId
        },
        meta: {
          title: '编辑数据库表'
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    detail () {
      const route = {
        name: 'dt-detail',
        params: {
          dtId: this.selectDataRow[0].dtId
        },
        meta: {
          title: '数据库表详情'
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    setSelectDataRow (list) {
      this.selectDataRow = list
      this.selectDataRowLength = list.length
    },
    getDataSet () {
      this.spinShow = true
      this.pageShow = true
      this.pagingGetDt({ rows: this.rows, page: this.page }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.dataSet = res.data.data
          this.count = res.data.count
          this.setSelectDataRow([])
          setTimeout(() => { this.spinShow = false }, 700)
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
          setTimeout(() => { this.spinShow = false }, 700)
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
        setTimeout(() => { this.spinShow = false }, 700)
      })
    },
    del () {
      this.spinShow = true
      this.batchRemoveDt(this.selectDataRow).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: '数据库表信息删除成功.', duration: 3 })
          this.setSelectDataRow([])
          this.getDataSet()
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
          setTimeout(() => { this.spinShow = false }, 700)
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
        setTimeout(() => { this.spinShow = false }, 700)
      })
    },
    pageIndexChange (pageIndex) {
      this.page = pageIndex
      this.getDataSet()
    },
    pageSizeChange (pageSize) {
      this.rows = pageSize
      this.page = 1
      this.getDataSet()
    },
    keywordSearch (keyLikeValue) {
      if (keyLikeValue !== '') {
        this.keywordSearchSubmitting = true
        this.pageShow = false
        this.spinShow = true
        let dtQueryKeyLikeValue = new DtQuery()
        dtQueryKeyLikeValue.dtNameAndKeyLike = '%' + keyLikeValue + '%'
        dtQueryKeyLikeValue.dtNameAnnotationOrKeyLike = '%' + keyLikeValue + '%'
        dtQueryKeyLikeValue.dtPrefixOrKeyLike = '%' + keyLikeValue + '%'
        dtQueryKeyLikeValue.initialCaseEntityNameOrKeyLike = '%' + keyLikeValue + '%'
        dtQueryKeyLikeValue.initialLowercaseEntityNameOrKeyLike = '%' + keyLikeValue + '%'
        dtQueryKeyLikeValue.proPathOrKeyLike = '%' + keyLikeValue + '%'
        dtQueryKeyLikeValue.proAllNameOrKeyLike = '%' + keyLikeValue + '%'
        this.queryDt(dtQueryKeyLikeValue).then(res => {
          if (res.data.isSuccess && res.data.statusCode === 200) {
            this.dataSet = res.data.data
            this.count = res.data.count
            this.setSelectDataRow([])
            setTimeout(() => { this.spinShow = false }, 700)
            setTimeout(() => { this.keywordSearchSubmitting = false }, 5000)
          } else {
            this.$Message.error({ content: res.data.msg, duration: 6 })
            setTimeout(() => { this.spinShow = false }, 700)
            setTimeout(() => { this.keywordSearchSubmitting = false }, 5000)
          }
        }).catch(result => {
          this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
          setTimeout(() => { this.spinShow = false }, 700)
          setTimeout(() => { this.keywordSearchSubmitting = false }, 5000)
        })
      } else {
        this.keywordSearchClickRate++
        if (this.keywordSearchClickRate > 10) {
          this.$Message.warning({ content: '兄dei，你是闲的吗？', duration: 6 })
          this.keywordSearchClickRate = 0
        }
      }
    },
    vagueQuery () {
      this.vagueQuerySubmitting = true
      this.pageShow = false
      this.spinShow = true
      this.queryDt(this.dtVagueQuery).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.dataSet = res.data.data
          this.count = res.data.count
          this.setSelectDataRow([])
          setTimeout(() => { this.spinShow = false }, 700)
          setTimeout(() => { this.vagueQuerySubmitting = false }, 5000)
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
          setTimeout(() => { this.spinShow = false }, 700)
          setTimeout(() => { this.vagueQuerySubmitting = false }, 5000)
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
        setTimeout(() => { this.spinShow = false }, 700)
        setTimeout(() => { this.vagueQuerySubmitting = false }, 5000)
      })
    },
    extractData () {
      this.spinShow = true
      this.extract(this.selectDataRow[0].dtId).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: '数据库表信息提取成功.', duration: 3 })
          this.setSelectDataRow([])
          this.getDataSet()
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
          setTimeout(() => { this.spinShow = false }, 700)
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
        setTimeout(() => { this.spinShow = false }, 700)
      })
    }
  },
  mounted () {
    this.getDataSet()
  }
}
</script>
