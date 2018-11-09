<style lang="less">
  @import './columns-list.less';
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
            <Form ref="columnsVagueQueryForm" :model="columnsVagueQuery" inline :label-width="135" class="margin-top-10">
              <FormItem label="列名：">
                <Input v-model="columnsVagueQuery.columnName" placeholder="输入列名"></Input>
              </FormItem>
              <FormItem label="列名注释：">
                <Input v-model="columnsVagueQuery.columnNameAnnotation" placeholder="输入列名注释"></Input>
              </FormItem>
              <FormItem label="数据类型：">
                <Input v-model="columnsVagueQuery.dataType" placeholder="输入数据类型"></Input>
              </FormItem>
              <FormItem label="是否为空：">
                <Input v-model="columnsVagueQuery.isNull" placeholder="输入是否为空"></Input>
              </FormItem>
              <FormItem label="首字母大写列名：">
                <Input v-model="columnsVagueQuery.initialCaseColumnName" placeholder="输入首字母大写列名"></Input>
              </FormItem>
              <FormItem label="首字母小写列名：">
                <Input v-model="columnsVagueQuery.initialLowercaseColumnName" placeholder="输入首字母小写列名"></Input>
              </FormItem>
              <FormItem label="数据库表编号：">
                <Input v-model="columnsVagueQuery.dtId" placeholder="输入数据库表编号"></Input>
              </FormItem>
              <FormItem label="排序权重：">
                <InputNumber v-model="columnsVagueQuery.weightOrder"></InputNumber>
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
import ColumnsQuery from '@/view/com/pro/code/plugin/columns/columnsQuery'

export default {
  name: 'ColumnsList',
  props: {
  },
  data () {
    return {
      columns: [
        { type: 'selection', width: 50, align: 'center', fixed: 'left' },
        { title: '列名', key: 'columnName', width: 200 },
        { title: '列名注释', key: 'columnNameAnnotation', width: 200 },
        { title: '数据类型', key: 'dataType', width: 200 },
        { title: '是否为空', key: 'isNull', width: 200 },
        { title: '首字母大写列名', key: 'initialCaseColumnName', width: 200 },
        { title: '首字母小写列名', key: 'initialLowercaseColumnName', width: 200 },
        { title: '排序权重', key: 'weightOrder', width: 200 },
        { title: '数据库表编号', key: 'dtId', width: 200 }
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
      columnsVagueQuery: new ColumnsQuery()
    }
  },
  computed: {
    ...mapState('columnsStore', [
    ]),
    ...mapGetters('columnsStore', [
    ])
  },
  methods: {
    ...mapMutations([
      'addTag'
    ]),
    ...mapMutations('columnsStore', [
    ]),
    ...mapActions('columnsStore', [
      'batchRemoveColumns',
      'pagingGetColumns',
      'queryColumns'
    ]),
    add () {
      const route = {
        name: 'columns-edit',
        params: {
          columnsId: 'add'
        },
        meta: {
          icon: 'md-trending-up',
          title: '编辑列'
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
        name: 'columns-edit',
        params: {
          columnsId: this.selectDataRow[0].columnsId
        },
        meta: {
          title: '编辑列'
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
        name: 'columns-detail',
        params: {
          columnsId: this.selectDataRow[0].columnsId
        },
        meta: {
          title: '列详情'
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
      this.pagingGetColumns({ rows: this.rows, page: this.page }).then(res => {
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
      this.batchRemoveColumns(this.selectDataRow).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: '列信息删除成功.', duration: 3 })
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
        let columnsQueryKeyLikeValue = new ColumnsQuery()
        columnsQueryKeyLikeValue.columnNameAndKeyLike = '%' + keyLikeValue + '%'
        columnsQueryKeyLikeValue.columnNameAnnotationOrKeyLike = '%' + keyLikeValue + '%'
        columnsQueryKeyLikeValue.dataTypeOrKeyLike = '%' + keyLikeValue + '%'
        columnsQueryKeyLikeValue.isNullOrKeyLike = '%' + keyLikeValue + '%'
        columnsQueryKeyLikeValue.initialCaseColumnNameOrKeyLike = '%' + keyLikeValue + '%'
        columnsQueryKeyLikeValue.initialLowercaseColumnNameOrKeyLike = '%' + keyLikeValue + '%'
        columnsQueryKeyLikeValue.dtIdOrKeyLike = '%' + keyLikeValue + '%'
        this.queryColumns(columnsQueryKeyLikeValue).then(res => {
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
      this.queryColumns(this.columnsVagueQuery).then(res => {
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
    }
  },
  mounted () {
    this.getDataSet()
  }
}
</script>
