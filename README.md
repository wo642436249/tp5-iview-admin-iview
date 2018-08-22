
## 当前版本：v1.0-beta.1

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

## 简介
基于iview-admin2.0版本开发的提供管理员管理、角色管理、操作管理的基本功能的管理后台
## 功能

- 登录/登出
- 后台权限管理
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
