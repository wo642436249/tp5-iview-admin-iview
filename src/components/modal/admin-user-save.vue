<template>
  <Modal
          v-model="modalShow"
          :title="modal_name"
          :loading="modal_load"
          @on-ok="ok"
          @on-cancel="cancel">
    <Form ref="UserForm" :model="UserForm" :rules="UserFormValidate" :label-width="80">
      <FormItem label="用户名" prop="username">
        <Input v-model="UserForm.username" :maxlength="12" placeholder="请输入用户名"></Input>
      </FormItem>
      <FormItem label="昵称" prop="nickname">
        <Input v-model="UserForm.nickname" :maxlength="8" placeholder="请输入昵称"></Input>
      </FormItem>
      <FormItem label="手机号" prop="mobile">
        <Input v-model="UserForm.mobile" :maxlength="11" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="UserForm.email" :maxlength="32" placeholder="请输入邮箱"></Input>
      </FormItem>
      <FormItem label="角色" prop="role">
        <Select v-model="UserForm.role" placeholder="请选择角色">
          <Option v-for="item in role_list" :value="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" :maxlength="16" v-model="UserForm.password"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="passwdCheck">
        <Input type="password" :maxlength="16" v-model="UserForm.passwdCheck"></Input>
      </FormItem>
      <FormItem prop="avatar" hidden>
        <Input v-model="UserForm.avatar"></Input>
      </FormItem>
      <FormItem prop="id" hidden>
        <Input v-model="UserForm.id"></Input>
      </FormItem>
      <FormItem label="头像">
        <div class="demo-upload-list" v-for="item in uploadList">
          <template v-if="item.status === 'finished'">
            <img :src="item.url" width="100" height="100">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Upload
                ref="upload"
                name="avatar"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png','gif']"
                :max-size="2048"
                :on-exceeded-size="handleMaxSize"
                multiple
                type="drag"
                :action="UploadAvatar"
                style="display: inline-block;width:58px;">
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
        <Modal :fullscreen=true :footer-hide=true title="头像预览" v-model="visible" :transfer=false>
          <img :src="Host + imgName " v-if="visible" style="width: 100%">
        </Modal>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
  import {Host, UploadAvatar} from '../../api/api'
  import {delFile, saveAdminUser, getAdminRoles} from '@/api/data'

  export default {
    name: 'admin-user-edit',
    data () {
      const validatePass = (rule, value, callback) => {
        if (this.UserForm.passwdCheck !== '') {
          this.$refs.UserForm.validateField('passwdCheck')
        }
        callback()
      }
      const validatePassCheck = (rule, value, callback) => {
        if (value !== this.UserForm.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
      const validateMobile = (rule, value, callback) => {
        let myreg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
        if (!myreg.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      return {
        modal_load: true,
        UserForm: {
          id: 0,
          username: '',
          nickname: '',
          email: '',
          role: '',
          mobile: '',
          password: '',
          passwdCheck: '',
          avatar: ''
        },
        role_list: [],
        UserFormValidate: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {min: 6, message: '用户名至少6位', trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '昵称不能为空', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: validateMobile, trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, message: '密码至少6位', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'},
          ],
          passwdCheck: [
            {required: true, message: '请输入重复密码', trigger: 'blur'},
            {min: 6, message: '密码至少6位', trigger: 'blur'},
            {validator: validatePassCheck, trigger: 'blur'}
          ],
          role: [
            {type: 'number', required: true, message: '请选择角色', trigger: 'change'}
          ]
        },
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
        modalShow: false,
        newFilePath: '',
        newFile: [],
        oldFilePath: '',
        Host: Host,
        UploadAvatar: UploadAvatar,
        UploadType: 1
      }
    },
    props: {
      isShow: {
        type: Boolean
      },
      modal_name: {
        type: String
      },
      UserSaveFormType: {
        type: Number
      },
      id: {
        type: Number
      },
      username: {
        type: String
      },
      nickname: {
        type: String
      },
      mobile: {
        type: String
      },
      email: {
        type: String
      },
      role: {
        type: Number
      },
      avatar: {
        type: String
      }
    },
    methods: {
      ok () {
        this.$refs['UserForm'].validate((valid) => {
          if (valid) {
            saveAdminUser(this.UserForm).then(res => {
              this.$Message.success(res.message)
              this.$emit('is_show', false)
              this.modalShow = false
              this.$refs['UserForm'].resetFields()
              if (this.oldFilePath !== '') {
                let params = {'file_path': this.oldFilePath}
                delFile(params)
              }
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
        this.$refs['UserForm'].resetFields()
        if (this.UserSaveFormType === 1 && JSON.stringify(this.newFile) !== '[]') {
          let params = {'file_path': this.newFilePath}
          delFile(params)
        }
        this.defaultList = []
        this.uploadList = []
        this.newFilePath = ''
        this.newFile = []
        this.$emit('is_show', false)
      },
      handleView () {
        this.imgName = this.newFilePath
        this.visible = true
      },
      handleRemove () {
        this.$refs.upload.fileList.splice(0, 1)
        this.uploadList.splice(0, 1)
        this.UserForm.avatar = ''
        if (this.UserSaveFormType === 1) {
          let params = {'file_path': this.newFilePath}
          delFile(params)
        }
        this.newFilePath = ''
        this.newFile = []
      },
      handleSuccess (res, file) {
        this.UserForm.avatar = res.file.file_path
        if (JSON.stringify(this.newFile) !== '[]') {
          if (this.UserSaveFormType === 1) {
            let params = {'file_path': this.newFilePath}
            delFile(params)
          } else if (this.UploadType === 2) {
            this.UploadType = 1
            this.uploadList.splice(0, 1)
          }
          this.$refs.upload.fileList.splice(0, 1)
        }
        file.url = Host + res.file.file_path
        file.name = res.file.file_name
        this.newFile = file
        this.newFilePath = res.file.file_path
        this.uploadList = this.$refs.upload.fileList
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        })
      }
    },
    watch: {
      isShow: function (val) {
        this.modalShow = val
        if (val) {
          getAdminRoles().then(res => {
            this.role_list = res
          })
        }
      },
      id: function (val) {
        this.UserForm.id = val
      },
      username: function (val) {
        this.UserForm.username = val
        if (val !== '') {
          this.UserForm.password = '******'
          this.UserForm.passwdCheck = '******'
        }
      },
      nickname: function (val) {
        this.UserForm.nickname = val
      },
      mobile: function (val) {
        this.UserForm.mobile = val
      },
      email: function (val) {
        this.UserForm.email = val
      },
      role: function (val) {
        this.UserForm.role = val
      },
      avatar: function (val) {
        if (val != '') {
          let data = {
            url: Host + val,
            name: val
          }
          this.defaultList.splice(0, 1, data)
          this.newFilePath = val
          let old_file_data = {
            name: val
          }
          this.oldFilePath = val
          this.newFile.splice(0, 1, old_file_data)
          this.$refs.upload.fileList.splice(0, 1, data)
          this.uploadList = this.$refs.upload.fileList
          this.UserForm.avatar = val
        }
      },
      UserSaveFormType: function (val) {
        this.UploadType = val
      }
    }
  }
</script>

<style>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
