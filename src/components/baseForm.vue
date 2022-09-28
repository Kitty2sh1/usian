<template>
    <div class="baseform">
        <el-form :inline="true" ref="form" :model="value" class="demo-form-inline">
            <template v-for="item in formList">
                <el-form-item v-if="item.type!=='select' &&item.type!=='date'" :prop="item.prop">
                    <el-input :placeholder="item.placeholder" v-model="value[item.prop]"></el-input>
                </el-form-item>
                <el-form-item v-if="item.type==='select'" :prop="item.prop">
                    <el-select v-model="value[item.prop]" :placeholder="item.placeholder">
                        <slot name="option"></slot>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="item.type==='date'" :prop="item.prop">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="value[item.prop]" type="date"
                        :placeholder="item.placeholder">
                    </el-date-picker>
                </el-form-item>
            </template>
            <el-form-item>
                <slot name="button"></slot>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    props: {
        value: {
            type: Object,
            default: () => { }
        },
        formList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {};
    },
    methods: {
        // 重置
        handleResetForm() {
            this.$refs['form'].resetFields();
        },
    },
    computed: {},
    created() { }
}
</script>

<style lang="scss" scoped>
.baseform {}
</style>