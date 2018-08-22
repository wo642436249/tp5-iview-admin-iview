<template>
  <Modal
          v-model="modalShow"
          :title="modal_name"
          :mask-closable="false"
          @on-ok="asyncOK"
          :loading="modal_load"
          @on-cancel="cancel">
    <Tree ref="ruleTree" :data="ruleData" show-checkbox></Tree>
  </Modal>
</template>
<script>
  import {getRoleRule, saveRoleRule} from '@/api/data'

  export default {
    data () {
      return {
        modalShow: false,
        modal_load: true,
        ruleData: [
          {
            title: '所有操作',
            expand: true,
            children: []
          }
        ]
      }
    },
    props: {
      isShow: {
        type: Boolean
      },
      modal_name: {
        type: String
      },
      role_id: {
        type: Number
      }
    },
    methods: {
      asyncOK () {
        let data = this.$refs['ruleTree'].getCheckedNodes()
        let arr = []
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]['id'])
        }
        let params = {role_id: this.role_id, rule_arr: arr}
        saveRoleRule(params).then(res => {
          this.$Message.success(res.message)
          this.$emit('is_show')
          this.modalShow = false
        })
      },
      cancel () {
        this.$emit('is_hide')
      }
    },
    watch: {
      isShow: function (val) {
        this.modalShow = val
        if (val) {
          getRoleRule(this.role_id).then(res => {
            let data = {
              title: '所有操作',
              expand: true,
              children: res
            }
            this.ruleData.splice(0, 1, data)
          })
        }
      }
    }
  }
</script>
