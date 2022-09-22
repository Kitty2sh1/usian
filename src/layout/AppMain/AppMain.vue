<template>
    <div class="app-main">
        <!-- 面包蟹 -->
        <breadcrumb v-if="!($route.path==='/index')"></breadcrumb>
        <!-- 坑 -->
        <router-view></router-view>
    </div>
</template>

<script>
import breadcrumb from './breadcrumb/Breadcrumb.vue';
export default {
    components: {
        breadcrumb
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
.app-main {}
</style>