tp5-iview-admin(view-V1.0)
===================
tp5-iview-admin V1.0其主要目的是为了做一个最基本的包括管理员、角色、操作管理的系统。
## Install
```bush
// install dependencies
npm install
```
## Run
### Development
```bush
npm run dev
```
### Production(Build)
```bush
npm run build
```

> 包含功能如下：

+ 登录/登出
+ 后台权限管理
    - 管理员管理
    - 角色管理
    - 操作管理

## 文件结构
```shell
.
├── config  开发相关配置
├── public  打包所需静态资源
└── src
    ├── api  AJAX请求等后台API信息
    └── assets  项目静态资源
        ├── icons  自定义图标资源
        └── images  图片资源
    ├── components  业务组件
    ├── config  项目运行配置
    ├── directive  自定义指令
    ├── libs  封装工具函数
    ├── locale  多语言文件
    ├── mock  mock模拟数据
    ├── router  路由配置
    ├── store  Vuex配置
    ├── view  页面文件
    └── tests  测试相关
```
## 主要问题（逐渐调整）
+ 管理员编辑时不重新加载页面会删除之前编辑的管理员头像文件，下版修复

+ 签名过期后再次登陆出现服务器错误，下版修复
