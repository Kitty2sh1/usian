<template>
    <div class="basetable">
        <el-table :data="data" style="width: 100%" height="380" border>
            <template v-for="(item) in column">
                <el-table-column v-if="item.type && item.type!=='action'" :type="item.type" :label="item.lable">
                </el-table-column>
                <el-table-column v-bind="item" v-else-if="!item.type || item.type=='index'" :prop="item.prop"
                    :label="item.lable">
                </el-table-column>
                <el-table-column v-bind="item" v-else-if="item.type=='action'" :label="item.lable">
                    <template slot-scope="scope">
                        <el-button size="mini" v-for="ele in item.actions" :type="ele.type" @click="handleText(ele.text,scope.row.id)">{{ele.text}}</el-button>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <!-- 分页 -->
        <el-pagination v-if="pager" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="page" :page-sizes="pageSizes" :page-size="size" :layout="layout" :total="total">
        </el-pagination>

    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        },
        column: {
            type: Array,
            default: () => []
        },
        page: {
            type: [Number, String],
            default: 1
        },
        size: {
            type: [Number, String],
            default: 10
        },
        total: {
            type: [Number, String],
            default: 0
        },
        pageSizes: {
            type: Array,
            default: () => [5, 10, 15, 20]
        },
        layout: {
            type: String,
            default: "total, sizes, prev, pager, next, jumper"
        },
        pager: Boolean
    },
    data() {
        return {};
    },
    methods: {
        handleSizeChange(size) {
            this.$emit('handleSizeChange',size)
         },
        handleCurrentChange(page) { 
            this.$emit('handleCurrentChange',page)
        },
        handleText(text,id){
            if(text=='编辑'){
                this.$emit('handleEditForm',id)
            }else{
                this.$emit('handleDelete',id)
            }
        }
    },
    computed: {},
    created() { },
}
</script>

<style lang="scss" scoped>
.basetable {}
</style>