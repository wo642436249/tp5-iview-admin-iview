<template>
  <Modal
          v-model="modalShow"
          :title="modal_name"
          :mask-closable="false"
          @on-ok="asyncOK"
          :loading="modal_load"
          @on-cancel="cancel">
    <Form ref="formMenu" :model="formMenu" :rules="ruleMenu" :label-width="80">
      <FormItem label="菜单名称" prop="title">
        <Input type="text" v-model="formMenu.title" placeholder="请输入菜单名称"></Input>
      </FormItem>
      <FormItem label="菜单类型">
        <RadioGroup v-model="formMenu.type">
          <Radio label=1>菜单</Radio>
          <Radio label=2>操作</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="排序" prop="listorder">
        <Input type="text" placeholder="菜单排序序号" v-model="formMenu.listorder" number></Input>
      </FormItem>
      <FormItem prop="id" hidden>
        <Input v-model="formMenu.id"></Input>
      </FormItem>
      <FormItem prop="pid" hidden>
        <Input v-model="formMenu.pid"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
  import {addAdminMenu} from '@/api/data'

  export default {
    name: 'add_admin_menu',
    data () {
      const validateListorder = (rule, value, callback) => {
        if (value) {
          if (!Number.isInteger(value)) {
            callback(new Error('Please enter a numeric value'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        modalShow: false,
        modal_load: true,
        formMenu: {
          title: '',
          type: '1',
          listorder: '',
          id: 0,
          pid: 0
        },
        ruleMenu: {
          title: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'}
          ],
          listorder: [
            {validator: validateListorder, trigger: 'blur'}
          ]
        }
      }
    },
    props: {
      isShow: {
        type: Boolean
      },
      type: {
        type: String
      },
      modal_name: {
        type: String
      },
      title: {
        type: String
      },
      listorder: {
        type: Number
      },
      pid: {
        type: Number
      },
      id: {
        type: Number
      }
    },
    methods: {
      asyncOK () {
        this.$refs['formMenu'].validate((valid) => {
          if (valid) {
            addAdminMenu(this.formMenu).then(res => {
              this.$Message.success(res.message)
              this.$emit('is_show', false)
              this.modalShow = false
            })
          } else {
            this.modal_load = false
            this.$nextTick(() => {
              this.modal_load = true
            })
          }
        })
      },
      cancel () {
        this.$refs['formMenu'].resetFields()
        this.$emit('is_show', false)
      }
    },
    watch: {
      isShow: function (val) {
        this.modalShow = val
      },
      title: function (val) {
        this.formMenu.title = val
      },
      type: function (val) {
        this.formMenu.type = val
      },
      listorder: function (val) {
        this.formMenu.listorder = val
      },
      pid: function (val) {
        this.formMenu.pid = val
      },
      id: function (val) {
        this.formMenu.id = val
      },
    }
  }
</script>
