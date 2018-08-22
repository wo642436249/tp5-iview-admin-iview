<template>
  <Modal
          v-model="modalShow"
          :title="modal_name"
          :mask-closable="false"
          @on-ok="asyncOK"
          :loading="modal_load"
          @on-cancel="cancel">
    <Form ref="formRole" :model="formRole" :rules="ruleRole" :label-width="80">
      <FormItem label="角色名称" prop="name">
        <Input type="text" :maxlength="10" v-model="formRole.name" placeholder="请输入角色名称"></Input>
      </FormItem>
      <FormItem label="角色描述" prop="remark">
        <Input v-model="formRole.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="请输入描述该角色的信息"></Input>
      </FormItem>
      <FormItem label="排序" prop="listorder">
        <Input type="text" placeholder="角色排序序号" v-model="formRole.listorder" number></Input>
      </FormItem>
      <FormItem prop="id" hidden>
        <Input v-model="formRole.id"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
  import {saveAdminRole} from '@/api/data'

  export default {
    name: 'roleForm',
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
        formRole: {
          name: '',
          listorder: '',
          remark: '',
          id: 0
        },
        ruleRole: {
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
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
      modal_name: {
        type: String
      },
      name: {
        type: String
      },
      listorder: {
        type: Number
      },
      id: {
        type: Number
      },
      remark: {
        type: String
      }
    },
    methods: {
      asyncOK () {
        this.$refs['formRole'].validate((valid) => {
          if (valid) {
            saveAdminRole(this.formRole).then(res => {
              this.$Message.success(res.message)
              this.$emit('is_show')
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
        this.$refs['formRole'].resetFields()
        this.$emit('is_hide')
      }
    },
    watch: {
      isShow: function (val) {
        this.modalShow = val
      },
      name: function (val) {
        this.formRole.name = val
      },
      listorder: function (val) {
        if (val > -1) {
          this.formRole.listorder = val
        }
      },
      id: function (val) {
        this.formRole.id = val
      },
      remark: function (val) {
        this.formRole.remark = val
      }
    }
  }
</script>
