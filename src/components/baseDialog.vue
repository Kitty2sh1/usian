<template>
    <div class="basedialog">
        <el-dialog :title="title" :visible.sync="visible" width="30%">
            <el-form ref="value" :rules="rules" :model="value" label-width="80px">
                <template v-for="item in dialogList">
                    <el-form-item  v-if="item.type!=='select' &&item.type!=='date'" :label="item.label" :prop="item.prop">
                        <el-input v-model="value[item.prop]"></el-input>
                    </el-form-item>
                    <el-form-item v-bind="item" :label="item.label" v-if="item.type==='date'" :prop="item.prop">
                        <el-date-picker value-format="yyyy-MM-dd" v-model="value[item.prop]" type="date"
                            :placeholder="item.placeholder">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item v-bind="item" :label="item.label" v-if="item.type==='select'" :prop="item.prop">
                        <el-select v-model="value[item.prop]" :placeholder="item.placeholder">
                            <slot name="option"></slot>
                        </el-select>
                    </el-form-item>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <!-- <slot name="button"></slot> -->
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'basedialog',
    props: {
        value: {
            type: Object,
            default: () => { }
        },
        dialogList: {
            type: Array,
            default: () => []
        },
        dialogVisible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String
        },
        rules: {
            type: Object,
            default: () => []
        }
    },
    data() {
        return {};
    },
    methods: {
        // 取消按钮
        close(){
            this.visible=false
        },
        // 确定按钮
        handleSubmit(){
            this.$refs['value'].validate((valid) => {
                if (valid) {
                    this.$emit('submit')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleDialogResetForm() {
            this.$refs['value'].resetFields();
        },
    },
    computed: {
        visible:{
            get(val){
                return this.dialogVisible
            },
            set(val){
                this.$emit('update:dialogVisible',val)
            }
        }
    },
    created() { 
        console.log(this.dialogList);
    }
}
</script>

<style lang="scss" scoped>
.basedialog {}
</style>