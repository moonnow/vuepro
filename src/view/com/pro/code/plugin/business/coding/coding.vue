<style lang="less">
  @import './coding.less';
</style>

<template>
  <div>
    <Card>
      <Row type="flex" justify="center">
        <Col span="2">
          <Button type="dashed" ghost icon="ios-brush-outline" @click="toEdit()">edit</Button>
        </Col>
        <Col span="18">
          <Select v-model="dtId" clearable filterable @on-change="changeDt($event)">
            <Option v-for="item in dtList" :value="item.dtId" :key="item.dtId">{{ item.dtName + ' [ ' + item.dtNameAnnotation + ' ]' }}</Option>
          </Select>
        </Col>
        <Col span="2">
          <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingAll()">一键生成</Button>
        </Col>
      </Row>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成项目
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          pro项目
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="项目路径：">
                    <Input v-model="config.projectPath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingProject()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成实体类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Jdbc实体类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.jdbcEntityFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingJdbcEntity()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成查询类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Java查询类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.queryFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingQuery()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成VO类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          VO类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.voFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingVo()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成异常类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          异常类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.exceptionFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingException()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成持久化接口类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          持久化接口类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.persistentInterfaceFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingIPersistent()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成Jpa持久化接口类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Jpa持久化接口类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.jpaPersistentInterfaceFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingIJpaPersistent()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成Jdbc持久化实现类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Jdbc持久化实现类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.jdbcPersistentImplFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingJdbcPersistentImpl()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成服务接口类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          服务接口类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.serviceInterfaceFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingIService()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成服务实现类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          服务实现类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.serviceImplFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingServiceImpl()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成控制器类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          控制器类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.controllerFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingController()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成Vue实体类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Vue实体类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.vueEntityFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingVueEntity()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成Vue查询类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Vue查询类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.vueQueryFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingVueQuery()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成VueVO类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          VueVO类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.vueVoFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingVueVo()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成Vue服务类
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Vue服务类
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.vueServiceFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingVueService()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成VueStore
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          VueStore
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.vueStoreFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingVueStore()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成Vue列表页
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Vue列表页
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.vueListFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingVueList()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成Vue列表页样式
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Vue列表页样式
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.vueListCssFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingVueListCss()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成Vue编辑页
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Vue编辑页
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.vueEditFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingVueEdit()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成Vue编辑页样式
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Vue编辑页样式
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.vueEditCssFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingVueEditCss()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成Vue详情页
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Vue详情页
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.vueDetailFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingVueDetail()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card>
      <p slot="title">
        生成Vue详情页样式
      </p>
      <Collapse simple class="margin-top-10" :value="'0'">
        <Panel>
          Vue详情页样式
          <div slot="content">
            <Row>
              <Col span="21" class="margin-top-10">
                <Form :label-width="150">
                  <FormItem label="文件路径：">
                    <Input v-model="config.vueDetailCssFilePath" :disabled="isEdit"></Input>
                  </FormItem>
                </Form>
              </Col>
              <Col span="2" class="margin-top-10">
                <Button class="margin-left-8" ghost icon="ios-flash-outline" @click="toCodingVueDetailCss()">生成</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import Config from '@/view/com/pro/code/plugin/business/coding/config'

export default {
  name: 'Coding',
  props: {
  },
  data () {
    return {
      isEdit: true,
      dtList: [],
      spinShow: false,
      config: new Config(),
      dtId: null
    }
  },
  computed: {
    ...mapState('codingStore', [
    ]),
    ...mapGetters('codingStore', [
    ])
  },
  methods: {
    ...mapMutations('codingStore', [
    ]),
    ...mapActions('codingStore', [
      'getConfig',
      'codingProject',
      'codingJdbcEntity',
      'codingQuery',
      'codingVo',
      'codingException',
      'codingIPersistent',
      'codingIJpaPersistent',
      'codingJdbcPersistentImpl',
      'codingIService',
      'codingServiceImpl',
      'codingController',
      'codingVueEntity',
      'codingVueQuery',
      'codingVueVo',
      'codingVueService',
      'codingVueStore',
      'codingVueList',
      'codingVueListCss',
      'codingVueEdit',
      'codingVueEditCss',
      'codingVueDetail',
      'codingVueDetailCss',
      'codingAll'
    ]),
    ...mapActions('dtStore', [
      'getAllDt'
    ]),
    toEdit () {
      this.isEdit = !this.isEdit
    },
    changeDt (value) {
      if (value) {
        this.spinShow = true
        this.getConfig(value).then(res => {
          if (res.data.isSuccess && res.data.statusCode === 200) {
            this.$Message.success({ content: '配置信息获取成功.', duration: 3 })
            Object.assign(this.config, res.data.data[0])
            setTimeout(() => { this.spinShow = false }, 700)
          } else {
            this.$Message.error({ content: res.data.msg, duration: 6 })
            setTimeout(() => { this.spinShow = false }, 700)
          }
        }).catch(result => {
          this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
          setTimeout(() => { this.spinShow = false }, 700)
        })
      }
    },
    toCodingProject () {
      this.codingProject({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: '项目生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingJdbcEntity () {
      this.codingJdbcEntity({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'Jdbc实体类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingQuery () {
      this.codingQuery({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'Java查询类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingVo () {
      this.codingVo({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'VO类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingException () {
      this.codingException({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: '异常类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingIPersistent () {
      this.codingIPersistent({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: '持久化接口类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingIJpaPersistent () {
      this.codingIJpaPersistent({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: '持久化接口类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingJdbcPersistentImpl () {
      this.codingJdbcPersistentImpl({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'Jdbc持久化实现类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingIService () {
      this.codingIService({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: '服务接口类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingServiceImpl () {
      this.codingServiceImpl({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: '服务实现类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingController () {
      this.codingController({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: '控制器类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingVueEntity () {
      this.codingVueEntity({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'Vue实体类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingVueQuery () {
      this.codingVueQuery({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'Vue查询类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingVueVo () {
      this.codingVueVo({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'VueVO类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingVueService () {
      this.codingVueService({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'Vue服务类生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingVueStore () {
      this.codingVueStore({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'VueStore生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingVueList () {
      this.codingVueList({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'Vue列表页生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingVueListCss () {
      this.codingVueListCss({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'Vue列表页样式生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingVueEdit () {
      this.codingVueEdit({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'Vue编辑页生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingVueEditCss () {
      this.codingVueEditCss({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'Vue编辑页样式生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingVueDetail () {
      this.codingVueDetail({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'Vue详情页生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingVueDetailCss () {
      this.codingVueDetailCss({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: 'Vue详情页样式生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    },
    toCodingAll () {
      this.codingAll({ primaryKey: this.dtId, config: this.config }).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          this.$Message.success({ content: '代码生成成功.', duration: 3 })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
    }
  },
  mounted () {
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
