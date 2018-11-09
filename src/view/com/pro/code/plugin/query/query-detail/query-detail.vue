<style lang="less">
  @import './query-detail.less';
</style>

<template>
  <div>
    <Card>
      <Button class="margin-bottom-12" @click="gotoList()">返回</Button>
      <Row>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>查询编号：{{ query.queryId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>查询类型：{{ query.queryType }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>数据库表编号：{{ query.dtId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>列编号：{{ query.columnsId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>排序权重：{{ query.weightOrder }}</p>
          <Divider dashed />
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import Query from '@/view/com/pro/code/plugin/query/query'

export default {
  name: 'QueryDetail',
  props: {
  },
  data () {
    return {
      query: new Query()
    }
  },
  computed: {
    ...mapState('queryStore', [
    ]),
    ...mapGetters('queryStore', [
    ])
  },
  methods: {
    ...mapMutations('queryStore', [
    ]),
    ...mapActions('queryStore', [
      'getQueryByPk'
    ]),
    gotoList () {
      this.$router.push({ name: 'query-list' })
    }
  },
  created () {
    this.query.queryId = this.$route.params.queryId
    if (this.query.queryId !== 'add') {
      this.getQueryByPk(this.query.queryId).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          Object.assign(this.query, res.data.data[0])
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
