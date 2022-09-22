<template>
  <div class="app-header">
    <div class="left">
      <!-- logo -->
      <el-avatar src="https://img1.imgtp.com/2022/09/22/vXELZcAw.jpg"></el-avatar>
      肥鱼会员管理系统
    </div>
    <div class="right">
      <!-- 用户 -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" command="handlePassWord">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-fold" command="handleLogOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'handlePassWord':
          this.handlePassWord()
          break;
        case 'handleLogOut':
          this.handleLogOut()
          break;
      }
    },
    // 退出登录
    async handleLogOut() {
      try {
        const response = await this.$store.dispatch('queryLogout')
        setTimeout(() => {
          this.$router.push('/login')
        }, 300)
        this.$message({
          message: '退出登录成功',
          type: 'success'
        });
      } catch (error) {
        console.log(error.message);
      }
    },
    // 修改密码
    handlePassWord() { },
  },
  computed: {
    user() {
      return this.$store.getters.userInfo.name || ''
    }
  },
  created() { }
}
</script>

<style lang="scss" scoped>
.app-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    height: 100%;

    ::v-deep .el-avatar {
      vertical-align: middle;
    }
  }

  .right {
    ::v-deep .el-dropdown {
      color: #fff;
    }
  }
}
</style>