<template>
  <div>
    <Tree :data="admin_menu" :render="renderContent"></Tree>
    <AdminMenuSave :isShow="isaddAdminMenu" :pid="pid" :id="id" :type="type" :title="title" :listorder="listorder"
                  :modal_name='AddAdminMenu_name' @is_show="flush()"/>
  </div>
</template>
<script>
  import {delAdminMenu, getAdminMenus} from '@/api/data'
  import {AdminMenuSave} from '_c/modal'

  export default {
    name: 'admin_menu',
    components: {
      AdminMenuSave
    },
    data () {
      return {
        admin_menu: [
          {
            title: '所有操作',
            expand: true,
            render: (h, {root, node, data}) => {
              return h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%'
                }
              }, [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  h('span', data.title)
                ]),
                h('span', {
                  style: {
                    display: 'inline-block',
                    float: 'right',
                    marginRight: '32px'
                  }
                }, [
                  h('Button', {
                    props: Object.assign({}, this.buttonProps, {
                      icon: 'ios-add',
                      type: 'primary'
                    }),
                    style: {
                      width: '64px'
                    },
                    on: {
                      click: () => {
                        this.append(data)
                      }
                    }
                  })
                ])
              ])
            },
            children: []
          }
        ],
        buttonProps: {
          type: 'default',
          size: 'small',
        },
        isaddAdminMenu: false,
        AddAdminMenu_name: '添加菜单',
        pid: 0,
        id: 0,
        title: '',
        type: '1',
        listorder: 0
      }
    },
    methods: {
      renderContent (h, {root, node, data}) {
        if (data.type < 2) {
          return h('span', {
              style: {
                display: 'inline-block',
                width: '100%',
                backgroundColor: '#F0FAFF'
              }
            },
            [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'md-menu'
                  },
                  style: {
                    marginRight: '8px',
                  }
                }),
                h('span', {
                  style: {}
                }, data.title),
                h('span', {
                  style: {
                    display: 'inline-block',
                    float: 'right',
                    marginRight: '32px'
                  }
                }, [
                  h('Button', {
                    props: Object.assign({}, this.buttonProps, {
                      icon: 'ios-add'
                    }),
                    style: {
                      marginRight: '8px',
                    },
                    on: {
                      click: () => {
                        this.append(data)
                      }
                    }
                  }),
                  h('Button', {
                    props: Object.assign({}, this.buttonProps, {
                      icon: 'ios-build'
                    }),
                    style: {
                      marginRight: '8px'
                    },
                    on: {
                      click: () => {
                        this.edit(data)
                      }
                    }
                  }),
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
                        this.remove(root, node, data)
                      }
                    }
                  }, [
                    h('Button', {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'ios-remove'
                      })
                    })
                  ])
                ])
              ])
            ]
          )
        } else {
          return h('span', {
              style: {
                display: 'inline-block',
                width: '100%',
                backgroundColor: '#F0FAFF'
              }
            },
            [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'md-menu'
                  },
                  style: {
                    marginRight: '8px',
                  }
                }),
                h('span', {
                  style: {}
                }, data.title),
                h('span', {
                  style: {
                    display: 'inline-block',
                    float: 'right',
                    marginRight: '32px'
                  }
                }, [
                  h('Button', {
                    props: Object.assign({}, this.buttonProps, {
                      icon: 'ios-build'
                    }),
                    style: {
                      marginRight: '8px'
                    },
                    on: {
                      click: () => {
                        this.edit(data)
                      }
                    }
                  }),
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
                        this.remove(root, node, data)
                      }
                    }
                  }, [
                    h('Button', {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'ios-remove'
                      })
                    })
                  ])
                ])
              ])
            ]
          )
        }
      },
      append (data) {
        this.pid = data.id
        this.isaddAdminMenu = true
      },
      edit (data) {
        this.id = data.id
        this.type = String(data.type)
        this.isaddAdminMenu = true
        this.AddAdminMenu_name = '编辑菜单'
        this.title = data.title
        this.listorder = data.listorder
      },
      remove (root, node, data) {
        delAdminMenu(data.id).then(res => {
          if (res) {
            this.$Message.success(res.message)
            const parentKey = root.find(el => el === node).parent
            const parent = root.find(el => el.nodeKey === parentKey).node
            const index = parent.children.indexOf(data)
            parent.children.splice(index, 1)
          }
        })
      },
      flush (bool) {
        this.isaddAdminMenu = bool
        getAdminMenus().then(res => {
          this.admin_menu[0].children = res
        })
      }
    },
    mounted: function () {
      getAdminMenus().then(res => {
        this.admin_menu[0].children = res
      })
    }
  }
</script>
