<style lang="less">
  @import './virtualColumns-edit.less';
</style>

<template>
  <div>
    <Card>
      <Form ref="virtualColumnsForm" :model="virtualColumns" :rules="virtualColumnsFormValidate" :label-width="120" class="margin-top-20">
        <Row type="flex" justify="center">
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="源表：" prop="sourceDtId">
              <Select v-model="virtualColumns.sourceDtId" clearable filterable @on-change="changeSourceDt($event)">
                <Option v-for="item in sourceDtList" :value="item.dtId" :key="item.dtId">{{ item.dtName + ' [ ' + item.dtNameAnnotation + ' ]' }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="源表外键列：" prop="sourceColumnsId">
              <Select v-model="virtualColumns.sourceColumnsId" clearable filterable>
                <Option v-for="item in sourceColumnsList" :value="item.columnsId" :key="item.columnsId">{{ item.columnName + ' [ ' + item.columnNameAnnotation + ' ]' }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="目标表：" prop="targetDtId">
              <Select v-model="virtualColumns.targetDtId" clearable filterable @on-change="changeTargetDt($event)">
                <Option v-for="item in targetDtList" :value="item.dtId" :key="item.dtId">{{ item.dtName + ' [ ' + item.dtNameAnnotation + ' ]' }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="目标表关联列：" prop="targetColumnsId">
              <Select v-model="virtualColumns.targetColumnsId" clearable filterable>
                <Option v-for="item in targetColumnsList" :value="item.columnsId" :key="item.columnsId">{{ item.columnName + ' [ ' + item.columnNameAnnotation + ' ]' }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="目标表显示列：" prop="targetDisplayColumnsId">
              <Select v-model="virtualColumns.targetDisplayColumnsId" clearable filterable @on-change="changeDisplayColumns($event)">
                <Option v-for="item in targetDisplayColumnsList" :value="item.columnsId" :key="item.columnsId">{{ item.columnName + ' [ ' + item.columnNameAnnotation + ' ]' }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="显示列别名：" prop="displayColumnsAlias">
              <Input v-model="virtualColumns.displayColumnsAlias" placeholder="输入显示字段别名"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="排序权重：" prop="weightOrder">
              <InputNumber v-model="virtualColumns.weightOrder"></InputNumber>
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
import VirtualColumns from '@/view/com/pro/code/plugin/virtualColumns/virtualColumns'
import ColumnsQuery from '@/view/com/pro/code/plugin/columns/columnsQuery'

export default {
  name: 'VirtualColumnsEdit',
  props: {
  },
  data () {
    return {
      virtualColumns: new VirtualColumns(),
      virtualColumnsFormValidate: {
        sourceDtId: [
          { required: true, message: '源表数据库表编号不能为空', trigger: 'blur' }
        ],
        targetDtId: [
          { required: true, message: '目标表数据库表编号不能为空', trigger: 'blur' }
        ],
        sourceColumnsId: [
          { required: true, message: '源表列编号不能为空', trigger: 'blur' }
        ],
        targetColumnsId: [
          { required: true, message: '目标表列编号不能为空', trigger: 'blur' }
        ],
        targetDisplayColumnsId: [
          { required: true, message: '目标表显示字段列编号不能为空', trigger: 'blur' }
        ],
        displayColumnsAlias: [
          { required: true, message: '显示字段别名不能为空', trigger: 'blur' }
        ]
      },
      submitting: false,
      continue: null,
      sourceDtList: [],
      sourceColumnsList: [],
      sourceColumnsQuery: new ColumnsQuery(),
      targetColumnsQuery: new ColumnsQuery(),
      targetDtList: [],
      targetColumnsList: [],
      targetDisplayColumnsList: []
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
      'saveVirtualColumns',
      'updateVirtualColumns',
      'getVirtualColumnsByPk'
    ]),
    ...mapActions('dtStore', [
      'getAllDt'
    ]),
    ...mapActions('columnsStore', [
      'getColumnsByPk',
      'queryColumns'
    ]),
    gotoList () {
      this.$router.push({ name: 'virtualColumns-list' })
    },
    reset () {
      this.$refs.virtualColumnsForm.resetFields()
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
      this.$refs.virtualColumnsForm.validate((valid) => {
        if (valid) {
          if (this.virtualColumns.virtualColumnsId !== 'add') {
            this.updateVirtualColumns(this.virtualColumns).then(res => {
              if (res.data.isSuccess && res.data.statusCode === 200) {
                this.$Message.success({ content: '数据库表信息修改成功.', duration: 3 })
                this.reset()
                this.virtualColumns = new VirtualColumns()
                this.virtualColumns.virtualColumnsId = 'add'
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
            this.saveVirtualColumns(this.virtualColumns).then(res => {
              if (res.data.isSuccess && res.data.statusCode === 200) {
                this.$Message.success({ content: '虚拟列信息保存成功.', duration: 3 })
                this.reset()
                this.virtualColumns = new VirtualColumns()
                this.virtualColumns.virtualColumnsId = 'add'
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
    },
    changeSourceDt (value) {
      if (value) {
        this.sourceColumnsQuery.dtId = value
        this.queryColumns(this.sourceColumnsQuery).then(res => {
          if (res.data.isSuccess && res.data.statusCode === 200) {
            this.virtualColumns.sourceColumnsId = null
            this.sourceColumnsList = res.data.data
          } else {
            this.$Message.error({ content: res.data.msg, duration: 6 })
          }
        }).catch(result => {
          this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
        })
      }
    },
    changeTargetDt (value) {
      if (value) {
        this.targetColumnsQuery.dtId = value
        this.queryColumns(this.targetColumnsQuery).then(res => {
          if (res.data.isSuccess && res.data.statusCode === 200) {
            this.virtualColumns.targetColumnsId = null
            this.virtualColumns.targetDisplayColumnsId = null
            this.targetColumnsList = res.data.data
            this.targetDisplayColumnsList = res.data.data
          } else {
            this.$Message.error({ content: res.data.msg, duration: 6 })
          }
        }).catch(result => {
          this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
        })
      }
    },
    changeDisplayColumns (value) {
      if (value) {
        this.getColumnsByPk(value).then(res => {
          if (res.data.isSuccess && res.data.statusCode === 200) {
            this.virtualColumns.displayColumnsAlias = res.data.data[0].columnName
          } else {
            this.$Message.error({ content: res.data.msg, duration: 6 })
          }
        }).catch(result => {
          this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
        })
      }
    },
    initUpData () {
      this.sourceColumnsQuery.dtId = this.virtualColumns.sourceDtId
      this.queryColumns(this.sourceColumnsQuery).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.sourceColumnsList = res.data.data
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
      this.targetColumnsQuery.dtId = this.virtualColumns.targetDtId
      this.queryColumns(this.targetColumnsQuery).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.targetColumnsList = res.data.data
          this.targetDisplayColumnsList = res.data.data
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    }
  },
  created () {
    this.virtualColumns.virtualColumnsId = this.$route.params.virtualColumnsId
    if (this.virtualColumns.virtualColumnsId !== 'add') {
      this.getVirtualColumnsByPk(this.virtualColumns.virtualColumnsId).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          Object.assign(this.virtualColumns, res.data.data[0])
          this.initUpData()
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    }
    this.getAllDt().then(res => {
      if (res.data.isSuccess && res.data.statusCode === 200) {
        this.sourceDtList = res.data.data
        this.targetDtList = res.data.data
      } else {
        this.$Message.error({ content: res.data.msg, duration: 6 })
      }
    }).catch(result => {
      this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
    })
  }
}
</script>
