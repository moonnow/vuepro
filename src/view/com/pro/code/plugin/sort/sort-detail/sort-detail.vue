<style lang="less">
  @import './sort-detail.less';
</style>

<template>
  <div>
    <Card>
      <Button class="margin-bottom-12" @click="gotoList()">返回</Button>
      <Row>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>排序编号：{{ sortVO.sortId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>数据库表编号：{{ sortVO.dtId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>列编号：{{ sortVO.columnsId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>表名：{{ sortVO.dtName }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>列名：{{ sortVO.columnName }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>排序规则：{{ sortVO.sortRule }}</p>
          <Divider dashed />
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import SortVO from '@/view/com/pro/code/plugin/sort/sortVO'

export default {
  name: 'SortDetail',
  props: {
  },
  data () {
    return {
      sortVO: new SortVO()
    }
  },
  computed: {
    ...mapState('sortStore', [
    ]),
    ...mapGetters('sortStore', [
    ])
  },
  methods: {
    ...mapMutations('sortStore', [
    ]),
    ...mapActions('sortStore', [
      'getSortVOByPk'
    ]),
    gotoList () {
      this.$router.push({ name: 'sort-list' })
    }
  },
  created () {
    this.sortVO.sortId = this.$route.params.sortId
    if (this.sortVO.sortId !== 'add') {
      this.getSortVOByPk(this.sortVO.sortId).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          Object.assign(this.sortVO, res.data.data[0])
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
