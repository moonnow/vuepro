<style lang="less">
  @import './query-edit.less';
</style>

<template>
  <div>
    <Card>
      <Form ref="queryForm" :model="query" :rules="queryFormValidate" :label-width="120" class="margin-top-20">
        <Row type="flex" justify="center">
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="查询类型：" prop="queryType">
              <Input v-model="query.queryType" placeholder="输入查询类型"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="数据库表编号：" prop="dtId">
              <Input v-model="query.dtId" placeholder="输入数据库表编号"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="列编号：" prop="columnsId">
              <Input v-model="query.columnsId" placeholder="输入列编号"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="排序权重：" prop="weightOrder">
              <InputNumber v-model="query.weightOrder"></InputNumber>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem>
              <Button class="margin-right-8" @click="gotoList()">取消</Button>
              <Button class="margin-right-8" @click="reset()">重置</Button>
              <Button class="margin-right-8" type="primary" @click="saveAdd()" :loading="submitting">保存并继续录入</Button>
              <Button class="margin-right-8" type="primary" @click="save()" :loading="submitting">保存</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import Query from '@/view/com/pro/code/plugin/query/query'

export default {
  name: 'QueryEdit',
  props: {
  },
  data () {
    return {
      query: new Query(),
      queryFormValidate: {
        queryType: [
          { required: true, message: '查询类型不能为空', trigger: 'blur' }
        ],
        dtId: [
          { required: true, message: '数据库表编号不能为空', trigger: 'blur' }
        ],
        columnsId: [
          { required: true, message: '列编号不能为空', trigger: 'blur' }
        ]
      },
      submitting: false,
      continue: null
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
      'saveQuery',
      'updateQuery',
      'getQueryByPk'
    ]),
    gotoList () {
      this.$router.push({ name: 'query-list' })
    },
    reset () {
      this.$refs.queryForm.resetFields()
    },
    saveAdd () {
      this.continue = true
      this.submit()
    },
    save () {
      this.continue = false
      this.submit()
    },
    submit () {
      this.submitting = true
      this.$refs.queryForm.validate((valid) => {
        if (valid) {
          if (this.query.queryId !== 'add') {
            this.updateQuery(this.query).then(res => {
              if (res.data.isSuccess && res.data.statusCode === 200) {
                this.$Message.success({ content: '数据库表信息修改成功.', duration: 3 })
                this.reset()
                this.query = new Query()
                this.query.queryId = 'add'
                this.submitting = false
                if (!this.continue) {
                  this.gotoList()
                }
              } else {
                this.$Message.error({ content: res.data.msg, duration: 6 })
                this.submitting = false
              }
            }).catch(result => {
              this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
              this.submitting = false
            })
          } else {
            this.saveQuery(this.query).then(res => {
              if (res.data.isSuccess && res.data.statusCode === 200) {
                this.$Message.success({ content: '查询信息保存成功.', duration: 3 })
                this.reset()
                this.query = new Query()
                this.query.queryId = 'add'
                this.submitting = false
                if (!this.continue) {
                  this.gotoList()
                }
              } else {
                this.$Message.error({ content: res.data.msg, duration: 6 })
                this.submitting = false
              }
            }).catch(result => {
              this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
              this.submitting = false
            })
          }
        } else {
          setTimeout(() => { this.submitting = false }, 3000)
        }
      })
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
