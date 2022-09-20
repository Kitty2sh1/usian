<template>
  <div class="home">

  </div>
</template>

<script>
import test from "../api/test"
export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: 'admin'
      },
      page: 1,
      size: 10
    };
  },
  methods: {
    queryVIP() {
      test.getVIP(this.page, this.size, this.form).then(res => {
        console.log(res, '12321');
      })
    }
  },
  computed: {},
  created() {
    test.getLogin(this.form).then(res => {
      console.log(res);
    })
    this.queryVIP()
  }
}
</script>

<style lang="scss" scoped>
.home {}
</style>