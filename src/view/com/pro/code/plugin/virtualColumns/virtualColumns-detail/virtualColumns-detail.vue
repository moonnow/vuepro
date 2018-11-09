<style lang="less">
  @import './virtualColumns-detail.less';
</style>

<template>
  <div>
    <Card>
      <Button class="margin-bottom-12" @click="gotoList()">返回</Button>
      <Row>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>虚拟列编号：{{ virtualColumnsVO.virtualColumnsId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>源表数据库表编号：{{ virtualColumnsVO.sourceDtId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>目标表数据库表编号：{{ virtualColumnsVO.targetDtId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>源表列编号：{{ virtualColumnsVO.sourceColumnsId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>目标表列编号：{{ virtualColumnsVO.targetColumnsId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>目标表显示字段列编号：{{ virtualColumnsVO.targetDisplayColumnsId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>表名：{{ virtualColumnsVO.dtName }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>列名：{{ virtualColumnsVO.columnName }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>别名：{{ virtualColumnsVO.displayColumnsAlias }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="24">
          <p>排序权重：{{ virtualColumnsVO.weightOrder }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="24">
          <p>虚拟列sql：{{ virtualColumnsVO.virtualColumnsSql }}</p>
          <Divider dashed />
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import VirtualColumnsVO from '@/view/com/pro/code/plugin/virtualColumns/virtualColumnsVO'

export default {
  name: 'VirtualColumnsDetail',
  props: {
  },
  data () {
    return {
      virtualColumnsVO: new VirtualColumnsVO()
    }
  },
  computed: {
    ...mapState('virtualColumnsStore', [
    ]),
    ...mapGetters('virtualColumnsStore', [
    ])
  },
  methods: {
    ...mapMutations('virtualColumnsStore', [
    ]),
    ...mapActions('virtualColumnsStore', [
      'getVirtualColumnsVOByPk'
    ]),
    gotoList () {
      this.$router.push({ name: 'virtualColumns-list' })
    }
  },
  created () {
    this.virtualColumnsVO.virtualColumnsId = this.$route.params.virtualColumnsId
    if (this.virtualColumnsVO.virtualColumnsId !== 'add') {
      this.getVirtualColumnsVOByPk(this.virtualColumnsVO.virtualColumnsId).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          Object.assign(this.virtualColumnsVO, res.data.data[0])
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
