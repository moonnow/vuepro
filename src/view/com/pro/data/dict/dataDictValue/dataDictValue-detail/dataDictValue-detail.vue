<style lang="less">
  @import './dataDictValue-detail.less';
</style>

<template>
  <div>
    <Card>
      <Button class="margin-bottom-12" @click="gotoList()">返回</Button>
      <Row>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>数据字典值编号：{{ dataDictValueVO.dataDictValueId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>代码：{{ dataDictValueVO.code }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>显示名称：{{ dataDictValueVO.displayName }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>数据字典编号：{{ dataDictValueVO.dataDictId }}</p>
          <Divider dashed />
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <p>数据字典名称：{{ dataDictValueVO.dataDictName }}</p>
          <Divider dashed />
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import DataDictValueVO from '@/view/com/pro/data/dict/dataDictValue/dataDictValueVO'

export default {
  name: 'DataDictValueDetail',
  props: {
  },
  data () {
    return {
      dataDictValueVO: new DataDictValueVO()
    }
  },
  computed: {
    ...mapState('dataDictValueStore', [
    ]),
    ...mapGetters('dataDictValueStore', [
    ])
  },
  methods: {
    ...mapMutations('dataDictValueStore', [
    ]),
    ...mapActions('dataDictValueStore', [
      'getDataDictValueVOByPk'
    ]),
    gotoList () {
      this.$router.push({ name: 'dataDictValue-list' })
    }
  },
  created () {
    this.dataDictValueVO.dataDictValueId = this.$route.params.dataDictValueId
    if (this.dataDictValueVO.dataDictValueId !== 'add') {
      this.getDataDictValueVOByPk(this.dataDictValueVO.dataDictValueId).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          Object.assign(this.dataDictValueVO, res.data.data[0])
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
