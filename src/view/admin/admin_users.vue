<template>
  <div>
    <Card>
      <Tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
              @add="addUser()"/>
    </Card>
    <AdminUserSave :modal_name="UserFormName" :id="id" :username="username" :nickname="nickname" :mobile="mobile"
                   :email="email" :role="role" :avatar="avatar" :UserSaveFormType="UserSaveFormType"
                   :isShow="isUserSaveForm"
                   @is_show="isHide()"/>
  </div>
</template>

<script>
  import Tables from '_c/tables'
  import {AdminUserSave} from '_c/modal'
  import {getAdminUsers, delAdminUser, delFile} from '@/api/data'

  export default {
    name: 'admin_users',
    components: {
      Tables,
      AdminUserSave
    },
    data () {
      return {
        columns: [
          {title: '姓名', key: 'nickname', sortable: true, align: 'center'},
          {title: '手机号', key: 'mobile', sortable: true, align: 'center'},
          {title: '最后登陆IP', key: 'last_login_ip', align: 'center'},
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.row)
                    }
                  }
                }, '编辑'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '你确定要删除吗?'
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    'on-ok': () => {
                      this.remove(params.row)
                    }
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    }
                  }, '删除')
                ])
              ])
            }
          }
        ],
        tableData: [],
        id: 0,
        username: '',
        nickname: '',
        mobile: '',
        email: '',
        role: 0,
        avatar: '',
        isUserSaveForm: false,
        UserSaveFormType: 1,
        UserFormName: '添加管理员'
      }
    },
    methods: {
      show (params) {
        this.UserSaveFormType = 2
        this.id = params.id
        this.username = params.username
        this.nickname = params.nickname
        this.mobile = params.mobile
        this.email = params.email
        this.role = params.role
        this.avatar = params.avatar
        this.isUserSaveForm = true
      },
      remove (row) {
        delAdminUser(row.id).then(res => {
          this.$Message.success(res.message)
          let params = {'file_path': row.avatar}
          delFile(params)
          getAdminUsers().then(res => {
            this.tableData = res
          })
        })
      },
      isHide (bool) {
        this.UserSaveFormType = 1
        this.id = 0
        this.username = ''
        this.nickname = ''
        this.mobile = ''
        this.email = ''
        this.role = 0
        this.avatar = ''
        this.isUserSaveForm = bool
        getAdminUsers().then(res => {
          this.tableData = res
        })
      },
      addUser () {
        this.isUserSaveForm = true
      }
    },
    mounted () {
      getAdminUsers().then(res => {
        this.tableData = res
      })
    }
  }
</script>

<style>

</style>
