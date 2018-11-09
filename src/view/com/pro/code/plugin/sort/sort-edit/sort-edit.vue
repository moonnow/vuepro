<style lang="less">
  @import './sort-edit.less';
</style>

<template>
  <div>
    <Card>
      <Form ref="sortForm" :model="sort" :rules="sortFormValidate" :label-width="120" class="margin-top-20">
        <Row type="flex" justify="center">
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="数据库表：" prop="dtId">
              <Select v-model="sort.dtId" clearable filterable @on-change="changeDt($event)">
                <Option v-for="item in dtList" :value="item.dtId" :key="item.dtId">{{ item.dtName + ' [ ' + item.dtNameAnnotation + ' ]' }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="列：" prop="columnsId">
              <Select v-model="sort.columnsId" clearable filterable>
                <Option v-for="item in columnsList" :value="item.columnsId" :key="item.columnsId">{{ item.columnName + ' [ ' + item.columnNameAnnotation + ' ]' }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="排序规则：" prop="sortRule">
              <RadioGroup v-model="sort.sortRule" type="button">
                <Radio label="ASC"></Radio>
                <Radio label="DESC"></Radio>
              </RadioGroup>
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
import Sort from '@/view/com/pro/code/plugin/sort/sort'
import ColumnsQuery from '@/view/com/pro/code/plugin/columns/columnsQuery'

export default {
  name: 'SortEdit',
  props: {
  },
  data () {
    return {
      sort: new Sort(),
      sortFormValidate: {
        sortRule: [
          { required: true, message: '排序规则不能为空', trigger: 'blur' }
        ],
        dtId: [
          { required: true, message: '数据库表编号不能为空', trigger: 'blur' }
        ],
        columnsId: [
          { required: true, message: '列编号不能为空', trigger: 'blur' }
        ]
      },
      submitting: false,
      continue: null,
      dtList: [],
      columnsList: [],
      columnsQuery: new ColumnsQuery()
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
      'saveSort',
      'updateSort',
      'getSortByPk'
    ]),
    ...mapActions('dtStore', [
      'getAllDt'
    ]),
    ...mapActions('columnsStore', [
      'queryColumns'
    ]),
    gotoList () {
      this.$router.push({ name: 'sort-list' })
    },
    reset () {
      this.$refs.sortForm.resetFields()
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
      this.$refs.sortForm.validate((valid) => {
        if (valid) {
          if (this.sort.sortId !== 'add') {
            this.updateSort(this.sort).then(res => {
              if (res.data.isSuccess && res.data.statusCode === 200) {
                this.$Message.success({ content: '数据库表信息修改成功.', duration: 3 })
                this.reset()
                this.sort = new Sort()
                this.sort.sortId = 'add'
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
            this.saveSort(this.sort).then(res => {
              if (res.data.isSuccess && res.data.statusCode === 200) {
                this.$Message.success({ content: '排序信息保存成功.', duration: 3 })
                this.reset()
                this.sort = new Sort()
                this.sort.sortId = 'add'
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
    changeDt (value) {
      if (value) {
        this.columnsQuery.dtId = value
        this.queryColumns(this.columnsQuery).then(res => {
          if (res.data.isSuccess && res.data.statusCode === 200) {
            this.sort.columnsId = null
            this.columnsList = res.data.data
          } else {
            this.$Message.error({ content: res.data.msg, duration: 6 })
          }
        }).catch(result => {
          this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
        })
      }
    }
  },
  created () {
    this.sort.sortId = this.$route.params.sortId
    if (this.sort.sortId !== 'add') {
      this.getSortByPk(this.sort.sortId).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          Object.assign(this.sort, res.data.data[0])
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    }
    this.getAllDt().then(res => {
      if (res.data.isSuccess && res.data.statusCode === 200) {
        this.dtList = res.data.data
      } else {
        this.$Message.error({ content: res.data.msg, duration: 6 })
      }
    }).catch(result => {
      this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
    })
  }
}
</script>
