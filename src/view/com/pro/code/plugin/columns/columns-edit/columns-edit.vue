<style lang="less">
  @import './columns-edit.less';
</style>

<template>
  <div>
    <Card>
      <Form ref="columnsForm" :model="columns" :rules="columnsFormValidate" :label-width="120" class="margin-top-20">
        <Row type="flex" justify="center">
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="列名：" prop="columnName">
              <Input v-model="columns.columnName" placeholder="输入列名"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="列名注释：" prop="columnNameAnnotation">
              <Input v-model="columns.columnNameAnnotation" placeholder="输入列名注释"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="数据类型：" prop="dataType">
              <Input v-model="columns.dataType" placeholder="输入数据类型"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="是否为空：" prop="isNull">
              <Input v-model="columns.isNull" placeholder="输入是否为空"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="首字母大写列名：" prop="initialCaseColumnName">
              <Input v-model="columns.initialCaseColumnName" placeholder="输入首字母大写列名"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="首字母小写列名：" prop="initialLowercaseColumnName">
              <Input v-model="columns.initialLowercaseColumnName" placeholder="输入首字母小写列名"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="排序权重：" prop="weightOrder">
              <InputNumber v-model="columns.weightOrder"></InputNumber>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="数据库表编号：" prop="dtId">
              <Input v-model="columns.dtId" placeholder="输入数据库表编号"></Input>
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
import Columns from '@/view/com/pro/code/plugin/columns/columns'

export default {
  name: 'ColumnsEdit',
  props: {
  },
  data () {
    return {
      columns: new Columns(),
      columnsFormValidate: {
        dtId: [
          { required: true, message: '数据库表编号不能为空', trigger: 'blur' }
        ]
      },
      submitting: false,
      continue: null
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
      'saveColumns',
      'updateColumns',
      'getColumnsByPk'
    ]),
    gotoList () {
      this.$router.push({ name: 'columns-list' })
    },
    reset () {
      this.$refs.columnsForm.resetFields()
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
      this.$refs.columnsForm.validate((valid) => {
        if (valid) {
          if (this.columns.columnsId !== 'add') {
            this.updateColumns(this.columns).then(res => {
              if (res.data.isSuccess && res.data.statusCode === 200) {
                this.$Message.success({ content: '数据库表信息修改成功.', duration: 3 })
                this.reset()
                this.columns = new Columns()
                this.columns.columnsId = 'add'
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
            this.saveColumns(this.columns).then(res => {
              if (res.data.isSuccess && res.data.statusCode === 200) {
                this.$Message.success({ content: '列信息保存成功.', duration: 3 })
                this.reset()
                this.columns = new Columns()
                this.columns.columnsId = 'add'
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
