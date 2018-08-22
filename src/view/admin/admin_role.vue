<template>
  <div>
    <Card>
      <Tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
              @add="addRole()"/>
    </Card>
    <AdminRoleSave :isShow="isRoleForm" :name="name" :id="id" :remark="remark" :listorder="listorder"
                   :modal_name='RoleFormName' @is_show="is_show()" @is_hide="is_hide()"/>
    <AdminRoleRuleTree :isShow="isTreeForm" :role_id="this_role" :modal_name="treeName" @is_show="is_show()"
                       @is_hide="is_hide()"/>
  </div>
</template>

<script>
  import Tables from '_c/tables'
  import {AdminRoleSave, AdminRoleRuleTree} from '_c/modal'
  import {getAdminRoles, delAdminRole} from '@/api/data'

  export default {
    name: 'admin_users',
    components: {
      Tables,
      AdminRoleSave,
      AdminRoleRuleTree
    },
    data () {
      return {
        columns: [
          {title: '角色名称', key: 'name', sortable: true, align: 'center'},
          {title: '角色描述', key: 'remark', sortable: true, align: 'center'},
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.impower(params.row)
                    }
                  }
                }, '授权'),
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
                      this.edit(params.row)
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
                      this.remove(params.row.id)
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
        isRoleForm: false,
        RoleFormName: '新增角色',
        name: '',
        listorder: 0,
        id: 0,
        remark: '',
        isTreeForm: false,
        treeName: '编辑授权',
        this_role: 0
      }
    },
    methods: {
      impower (data) {
        this.this_role = data.id
        this.isTreeForm = true
      },
      edit (data) {
        this.id = data.id
        this.name = data.name
        this.listorder = data.listorder
        this.remark = data.remark
        this.isRoleForm = true
      },
      remove (index) {
        delAdminRole(index).then(res => {
          if (res) {
            this.$Message.success(res.message)
            getAdminRoles().then(res => {
              this.tableData = res
            })
          }
        })
      },
      is_show () {
        this.isRoleForm = false
        this.isTreeForm = false
        getAdminRoles().then(res => {
          this.tableData = res
        })
      },
      is_hide () {
        this.id = 0
        this.name = ''
        this.listorder = -1
        this.remark = ''
        this.isRoleForm = false
        this.isTreeForm = false
      },
      addRole () {
        this.isRoleForm = true
      }
    },
    mounted () {
      getAdminRoles().then(res => {
        this.tableData = res
      })
    }
  }
</script>

<style>

</style>
