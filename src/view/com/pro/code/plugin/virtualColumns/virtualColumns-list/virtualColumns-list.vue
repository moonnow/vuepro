<style lang="less">
  @import './virtualColumns-list.less';
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
            <Form ref="virtualColumnsVagueQueryForm" :model="virtualColumnsVagueQuery" inline :label-width="135" class="margin-top-10">
              <FormItem label="源表数据库表编号：">
                <Input v-model="virtualColumnsVagueQuery.sourceDtId" placeholder="输入源表数据库表编号"></Input>
              </FormItem>
              <FormItem label="目标表数据库表编号：">
                <Input v-model="virtualColumnsVagueQuery.targetDtId" placeholder="输入目标表数据库表编号"></Input>
              </FormItem>
              <FormItem label="源表列编号：">
                <Input v-model="virtualColumnsVagueQuery.sourceColumnsId" placeholder="输入源表列编号"></Input>
              </FormItem>
              <FormItem label="目标表列编号：">
                <Input v-model="virtualColumnsVagueQuery.targetColumnsId" placeholder="输入目标表列编号"></Input>
              </FormItem>
              <FormItem label="目标表显示字段列编号：">
                <Input v-model="virtualColumnsVagueQuery.targetDisplayColumnsId" placeholder="输入目标表显示字段列编号"></Input>
              </FormItem>
              <FormItem label="显示字段别名：">
                <Input v-model="virtualColumnsVagueQuery.displayColumnsAlias" placeholder="输入显示字段别名"></Input>
              </FormItem>
              <FormItem label="虚拟列sql：">
                <Input v-model="virtualColumnsVagueQuery.virtualColumnsSql" placeholder="输入虚拟列sql"></Input>
              </FormItem>
              <FormItem label="排序权重：">
                <InputNumber v-model="virtualColumnsVagueQuery.weightOrder"></InputNumber>
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
import VirtualColumnsQuery from '@/view/com/pro/code/plugin/virtualColumns/virtualColumnsQuery'

export default {
  name: 'VirtualColumnsList',
  props: {
  },
  data () {
    return {
      columns: [
        { type: 'selection', width: 50, align: 'center', fixed: 'left' },
        { title: '表名', key: 'dtName' },
        { title: '列名', key: 'columnName' },
        { title: '别名', key: 'displayColumnsAlias' },
        { title: '排序权重', key: 'weightOrder' }
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
      virtualColumnsVagueQuery: new VirtualColumnsQuery()
    }
  },
  computed: {
    ...mapState('virtualColumnsStore', [
    ]),
    ...mapGetters('virtualColumnsStore', [
    ])
  },
  methods: {
    ...mapMutations([
      'addTag'
    ]),
    ...mapMutations('virtualColumnsStore', [
    ]),
    ...mapActions('virtualColumnsStore', [
      'batchRemoveVirtualColumns',
      'queryVirtualColumns',
      'pagingGetVirtualColumnsVO'
    ]),
    add () {
      const route = {
        name: 'virtualColumns-edit',
        params: {
          virtualColumnsId: 'add'
        },
        meta: {
          icon: 'md-trending-up',
          title: '编辑虚拟列'
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
        name: 'virtualColumns-edit',
        params: {
          virtualColumnsId: this.selectDataRow[0].virtualColumnsId
        },
        meta: {
          title: '编辑虚拟列'
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
        name: 'virtualColumns-detail',
        params: {
          virtualColumnsId: this.selectDataRow[0].virtualColumnsId
        },
        meta: {
          title: '虚拟列详情'
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
      this.pagingGetVirtualColumnsVO({ rows: this.rows, page: this.page }).then(res => {
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
      this.batchRemoveVirtualColumns(this.selectDataRow).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: '虚拟列信息删除成功.', duration: 3 })
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
        let virtualColumnsQueryKeyLikeValue = new VirtualColumnsQuery()
        virtualColumnsQueryKeyLikeValue.sourceDtIdAndKeyLike = '%' + keyLikeValue + '%'
        virtualColumnsQueryKeyLikeValue.targetDtIdOrKeyLike = '%' + keyLikeValue + '%'
        virtualColumnsQueryKeyLikeValue.sourceColumnsIdOrKeyLike = '%' + keyLikeValue + '%'
        virtualColumnsQueryKeyLikeValue.targetColumnsIdOrKeyLike = '%' + keyLikeValue + '%'
        virtualColumnsQueryKeyLikeValue.targetDisplayColumnsIdOrKeyLike = '%' + keyLikeValue + '%'
        virtualColumnsQueryKeyLikeValue.displayColumnsAliasOrKeyLike = '%' + keyLikeValue + '%'
        virtualColumnsQueryKeyLikeValue.virtualColumnsSqlOrKeyLike = '%' + keyLikeValue + '%'
        this.queryVirtualColumns(virtualColumnsQueryKeyLikeValue).then(res => {
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
      this.queryVirtualColumns(this.virtualColumnsVagueQuery).then(res => {
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
