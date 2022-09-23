<template>
  <div class="home">
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-container>
        <el-aside width="230px">
          <app-aside></app-aside>
        </el-aside>
        <el-main>
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppAside from './AppAside/AppAside.vue';     //侧边菜单导航栏
import AppHeader from './AppHeader/AppHeader.vue';  //头部
import AppMain from './AppMain/AppMain.vue';        //main
export default {
  components: {
    AppAside,   //侧边菜单导航栏
    AppHeader,  //头部
    AppMain     //main
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  created() { }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;

  .el-container {
    height: 100%;

    .el-header {
      background-color: #2d3a4b;
      color: #fff;
      line-height: 60px;
    }

    .el-aside {
      background-color: #545c64;
      color: #fff;
    }

    .el-main {
      background-color: #fff;
      color: #333;
      height: 100%;
      padding: 10px;
    }
  }
}
</style>