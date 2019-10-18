<template>
    <el-container>
        <el-header>
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="2">工作台</el-menu-item>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-menu-item index="4">订单管理</el-menu-item>
            </el-menu>

            <div class="drop-menu">
              <!-- 下拉才当 -->
                <el-dropdown size="medium" split-button type="primary">
                  {{info}}
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>修改信息</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>

        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu
                    @select="routeJumpHandler"
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="/home">
                    <i class="el-icon-house"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="/books">
                    <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>书籍信息</span>
                    </template>
                        <el-menu-item index="/books/booksList">图书列表</el-menu-item>
                        <el-menu-item index="/books/booksInfo">富文本</el-menu-item>
                </el-submenu>
                <el-submenu index="/user">
                    <template slot="title">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">用户信息</span>
                    </template>
                        <el-menu-item index="/user/userList">用户列表</el-menu-item>
                        <el-menu-item index="/user/userInfo">修改信息</el-menu-item>
                </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <slot></slot>
            </el-main>
        </el-container>
        <el-footer>Footer</el-footer>
    </el-container>
</template>
<script>
import {mapState} from "vuex";
import {Container,Menu,Dropdown,DropdownMenu,DropdownItem} from "element-ui"
export default {
  name:"LayOut",
  data() {
      return {
          activeIndex2:"1",
          // info:sessionStorage.getItem("username") || ""
      }
  },
  methods: {
      handleSelect(key,keypath) {
          console.log(key,keypath)
      },
      routeJumpHandler(index,indexPath) {
        this.$router.push(index);
      }
  },
  computed: {
    ...mapState({
      info:state=>state.username
    })
  },

}
</script>

<style lang="scss">
#app {
  height: 100%;
}
.el-container,.el-menu-vertical-demo, .el-menu {
  height: 100%;
}
.el-header,.el-footer {
    background-color: #545c64;
    color: #333;
    text-align: center;
    width: 100%;
    padding:0;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .drop-menu {
    position:absolute;
    right: 50px;
    top:0;
  }
  .el-dropdown {
    width: 100%;
  }
</style>