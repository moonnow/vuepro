<style lang="less">
  @import './pk-detail.less';
</style>

<template>
  <div>
    <Card>
      <Button class="margin-bottom-12" @click="gotoList()">返回</Button>
      <Row>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>主键编号：{{ pk.pkId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>数据库表编号：{{ pk.dtId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>列编号：{{ pk.columnsId }}</p>
          <Divider dashed />
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import Pk from '@/view/com/pro/code/plugin/pk/pk'

export default {
  name: 'PkDetail',
  props: {
  },
  data () {
    return {
      pk: new Pk()
    }
  },
  computed: {
    ...mapState('pkStore', [
    ]),
    ...mapGetters('pkStore', [
    ])
  },
  methods: {
    ...mapMutations('pkStore', [
    ]),
    ...mapActions('pkStore', [
      'getPkByPk'
    ]),
    gotoList () {
      this.$router.push({ name: 'pk-list' })
    }
  },
  created () {
    this.pk.pkId = this.$route.params.pkId
    if (this.pk.pkId !== 'add') {
      this.getPkByPk(this.pk.pkId).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          Object.assign(this.pk, res.data.data[0])
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
