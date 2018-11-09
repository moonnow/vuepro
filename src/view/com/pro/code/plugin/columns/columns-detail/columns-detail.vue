<style lang="less">
  @import './columns-detail.less';
</style>

<template>
  <div>
    <Card>
      <Button class="margin-bottom-12" @click="gotoList()">返回</Button>
      <Row>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>列编号：{{ columns.columnsId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>列名：{{ columns.columnName }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>列名注释：{{ columns.columnNameAnnotation }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>数据类型：{{ columns.dataType }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>是否为空：{{ columns.isNull }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>首字母大写列名：{{ columns.initialCaseColumnName }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>首字母小写列名：{{ columns.initialLowercaseColumnName }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>排序权重：{{ columns.weightOrder }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>数据库表编号：{{ columns.dtId }}</p>
          <Divider dashed />
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import Columns from '@/view/com/pro/code/plugin/columns/columns'

export default {
  name: 'ColumnsDetail',
  props: {
  },
  data () {
    return {
      columns: new Columns()
    }
  },
  computed: {
    ...mapState('columnsStore', [
    ]),
    ...mapGetters('columnsStore', [
    ])
  },
  methods: {
    ...mapMutations('columnsStore', [
    ]),
    ...mapActions('columnsStore', [
      'getColumnsByPk'
    ]),
    gotoList () {
      this.$router.push({ name: 'columns-list' })
    }
  },
  created () {
    this.columns.columnsId = this.$route.params.columnsId
    if (this.columns.columnsId !== 'add') {
      this.getColumnsByPk(this.columns.columnsId).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          Object.assign(this.columns, res.data.data[0])
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    }
  }
}
</script>
