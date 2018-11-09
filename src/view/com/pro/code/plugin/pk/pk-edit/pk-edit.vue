<style lang="less">
  @import './pk-edit.less';
</style>

<template>
  <div>
    <Card>
      <Form ref="pkForm" :model="pk" :rules="pkFormValidate" :label-width="120" class="margin-top-20">
        <Row type="flex" justify="center">
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="数据库表编号：" prop="dtId">
              <Input v-model="pk.dtId" placeholder="输入数据库表编号"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="20" :md="18" :lg="14">
            <FormItem label="列编号：" prop="columnsId">
              <Input v-model="pk.columnsId" placeholder="输入列编号"></Input>
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
import Pk from '@/view/com/pro/code/plugin/pk/pk'

export default {
  name: 'PkEdit',
  props: {
  },
  data () {
    return {
      pk: new Pk(),
      pkFormValidate: {
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
    ...mapState('pkStore', [
    ]),
    ...mapGetters('pkStore', [
    ])
  },
  methods: {
    ...mapMutations('pkStore', [
    ]),
    ...mapActions('pkStore', [
      'savePk',
      'updatePk',
      'getPkByPk'
    ]),
    gotoList () {
      this.$router.push({ name: 'pk-list' })
    },
    reset () {
      this.$refs.pkForm.resetFields()
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
      this.$refs.pkForm.validate((valid) => {
        if (valid) {
          if (this.pk.pkId !== 'add') {
            this.updatePk(this.pk).then(res => {
              if (res.data.isSuccess && res.data.statusCode === 200) {
                this.$Message.success({ content: '数据库表信息修改成功.', duration: 3 })
                this.reset()
                this.pk = new Pk()
                this.pk.pkId = 'add'
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
            this.savePk(this.pk).then(res => {
              if (res.data.isSuccess && res.data.statusCode === 200) {
                this.$Message.success({ content: '主键信息保存成功.', duration: 3 })
                this.reset()
                this.pk = new Pk()
                this.pk.pkId = 'add'
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
