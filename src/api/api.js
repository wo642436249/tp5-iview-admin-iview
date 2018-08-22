export const Host = 'http://****' //基于swoole server的Api地址
export const FPM_HOST = 'http://****' //非基于swoole的Api地址
export const Login = Host + '/AdminLogin' //登陆
export const AdminUser = Host + '/AdminUser' //获取、新增、更新、删除管理人员
export const AdminRule = Host + '/AdminRule' //获取、新增、更新、删除后台菜单
export const AdminRole = Host + '/AdminRole' //获取、新增、更新、删除后台角色
export const AdminRoleRule = Host + '/AdminRoleRule' //获取、操作后台角色关联后台的数据
export const UploadAvatar = FPM_HOST + '/uploadAvatar' //上传头像
export const RmFile = Host + '/RmFile' //删除文件
