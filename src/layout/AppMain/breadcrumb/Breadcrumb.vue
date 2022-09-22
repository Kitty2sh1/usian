<template>
    <div class="breadcrumb">
        <el-card class="box-card">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{total}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {},
    computed: {
        total() {
            return this.$route.meta.title
        }
    },
    created() { }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
    ::v-deep .el-card {
        height: 54px;
        position: relative;
        padding-left: 10px;
        box-sizing: border-box;

        ::after {
            background-color: #31c71b;
            height: 16px;
            border: 2px #31c71b solid;
            position: absolute;
            left: 18px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>