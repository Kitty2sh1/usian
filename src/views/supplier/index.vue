<template>
    <div class="supplier">
        <!-- 查询 -->
        <base-form ref="queryForm" v-model.sync="searchForm" :formList="formList">
            <template #button>
                <el-button type="primary" @click="handleSearch">查询</el-button>
                <el-button type="primary" @click="handleDialogForm">新增</el-button>
                <el-button @click="handleReset">重置</el-button>
            </template>
        </base-form>
        <!-- 添加编辑模态框 -->
        <base-dialog :rules="rules" ref="dialogForm" @submit="okDialogForm" v-model.sync="dialogForm" :title="title"
            :dialogList="dialogList" :dialogVisible.sync="dialogVisible">
        </base-dialog>
        <!-- 供应商列表 -->
        <base-table :pager="true" @handleDelete="handleDelete" @handleEditForm="handleDialogForm"
            @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :data="supplierList"
            :column="column" :page="currentPage" :size="pageSize" :total="total">
        </base-table>
    </div>
</template>

<script>
import supplier from "../../api/supplier"
export default {
    components: {
        'base-table': () => import('../../components/baseTable.vue'),
        "base-form": () => import('../../components/baseForm.vue'),
        "base-dialog": () => import('../../components/baseDialog.vue')
    },
    data() {
        return {
            // 查询表单
            searchForm: {
                name: "",       //供应商名称
                linkman: "",    //联系人
                mobile: "",     //联系电话
            },
            formList: [{
                type: 'input',
                placeholder: "供应商名称",
                prop: "name"
            }, {
                type: 'input',
                placeholder: "联系人",
                prop: "linkman"
            }, {
                type: 'input',
                placeholder: "联系电话",
                prop: "mobile"
            }],
            currentPage: 1,     //当前页码
            pageSize: 10,       //每页条数
            total: 0,           //总条数
            supplierList: [],   //供应商列表
            // 模态框表单
            dialogForm: {
                name: "",       //供应商名称
                linkman: "",    //联系人
                mobile: "",     //联系电话
                remark: ""       //备注
            },
            dialogList: [
                {
                    type: "input",
                    label: "供应商名称",
                    prop: "name"
                }, {
                    type: "input",
                    label: "联系人",
                    prop: "linkman"
                }, {
                    type: "input",
                    label: "联系电话",
                    prop: "mobile"
                }, {
                    type: "input",
                    label: "备注",
                    prop: "remark"
                }
            ],
            title: "新增供应商",           // 模态框标题
            dialogVisible: false,//模态框开启或关闭状态
            // 模态框表单验证
            rules: {
                name: [
                    { required: true, message: '供应商名称不能为空', trigger: 'blur' }
                ],
                linkman: [
                    { required: true, message: '联系人不能为空', trigger: 'blur' }
                ],
            },
            column: [
                {
                    type: "index",
                    lable: "序号",
                    width: "60px"
                },
                {
                    lable: "供应商名称",
                    prop: "name"
                },
                {
                    lable: "联系人",
                    prop: "linkman"
                },
                {
                    lable: "联系电话",
                    prop: "mobile"
                },
                {
                    lable: "备注",
                    prop: "remark"
                },
                {
                    lable: "操作",
                    width: "150",
                    type: "action",
                    actions: [{
                        type: "primary",
                        text: "编辑"
                    }, {
                        type: "danger",
                        text: "删除"
                    }]
                },

            ]
        };
    },
    methods: {
        // 供应商列表
        async querySupplierList() {
            try {
                const response = await supplier.getSupplier(this.currentPage, this.pageSize, this.searchSupplier)
                // console.log(response);
                this.supplierList = response.rows  //供应商列表
                this.total = response.count        //总条数
            } catch (error) {
                console.log(error.message);
            }
        },
        // 查询按钮
        handleSearch() {
            this.currentPage = 1
            this.querySupplierList()
        },
        // 分页
        handleSizeChange(size) {
            this.pageSize = size
            this.querySupplierList()
        },
        handleCurrentChange(page) {
            this.currentPage = page
            this.querySupplierList()
        },
        // 删除
        handleDelete(id) {
            this.$confirm('确认删除这条记录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    this.currentPage = 1
                    this.handleReset()
                    const response = await supplier.getRemoveSupplier(id)
                    console.log(response);
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.querySupplierList()
                } catch (error) {
                    console.log(error.message);
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 重置查询输入框
        handleReset() {
            this.$refs['queryForm'].handleResetForm()
        },
        // 点击出现模态框
        handleDialogForm(id) {
            this.dialogVisible = true
            if (typeof id == 'number') {
                this.title = '供应商编辑'
                // 将id传到查询单个供应商函数中
                this.querySupplier(id)
                return
            } else {
                this.title = '添加供应商'
                this.dialogForm = {
                    name: "",       //供应商名称
                    linkman: "",    //联系人
                    mobile: "",     //联系电话
                    remark: ""       //备注
                }
            }
        },
        // 模态框 确定 按钮
        okDialogForm() {
            // 判断表单是否存在id  满足条件执行供应商编辑  不满足条件执行供应商新增
            this.dialogForm.id ? this.handleEdit() : this.handleAdd()
        },
        // 供应商新增方法
        async handleAdd() {
            try {
                // 调用新增供应商接口
                const response = await supplier.getAddSupplier(this.dialogForm)
                // 关闭模态框
                this.dialogVisible = false
                // 重置模态框输入框
                // console.log(this.$refs['dialogForm']);
                this.$refs['dialogForm'].handleDialogResetForm()
                // 添加成功提示
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                // 调用供应商列表方法
                this.querySupplierList()
            } catch (error) {
                console.log(error.message);
            }
        },
        // 供应商编辑
        async handleEdit() {
            try {
                // 调用编辑接口
                const response = await supplier.getEditSupplier(this.dialogForm, this.dialogForm.id)
                // 关闭模态框
                this.dialogVisible = false
                // 重置模态框输入框
                // console.log(this.$refs['dialogForm']);
                this.$refs['dialogForm'].handleDialogResetForm()
                // 编辑成功提示
                this.$message({
                    message: '更新成功',
                    type: 'success'
                });
                // 调用供应商列表方法
                this.querySupplierList()
            } catch (error) {

            }
        },
        // 查询单个供应商
        async querySupplier(id) {
            try {
                const response = await supplier.getQuerySupplier(id)
                this.supplierForm = response
            } catch (error) {
                console.log(error.message);
            }
        },
    },
    computed: {},
    created() {
        this.querySupplierList()
    }
}
</script>

<style lang="scss" scoped>
.supplier {
    padding-top: 20px;
}
</style>