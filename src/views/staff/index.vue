<template>
    <div class="staff">
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
        <!-- 员工列表 -->
        <base-table :pager="true" @handleDelete="handleDelete" @handleEditForm="handleDialogForm"
            @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :data="staffList"
            :column="column" :page="currentPage" :size="pageSize" :total="total">
        </base-table>
    </div>
</template>

<script>
import staff from "../../api/staff"
export default {
    components: {
        "base-table": () => import('../../components/baseTable.vue'),
        "base-form": () => import('../../components/baseForm.vue'),
        "base-dialog": () => import('../../components/baseDialog.vue')
    },
    data() {
        return {
            // 查询表单
            searchForm: {
                username: "",   //账号
                name: "",       //姓名
            },
            formList: [{
                type: 'input',
                placeholder: "账号",
                prop: "username"
            }, {
                type: 'input',
                placeholder: "姓名",
                prop: "name"
            }],
            currentPage: 1,     //当前页码
            pageSize: 10,       //每页条数
            total: 0,           //总条数
            staffList: [],   //员工列表
            // 模态框表单
            dialogForm: {
                username: "",   //账号
                name: "",       //姓名
                age: "",        //年龄
                mobile: "",     //电话
                salary: "",     //薪酬
                entryDate: "",  //入职时间
            },
            dialogList: [
                {
                    type: "input",
                    label: "账号",
                    prop: "username"
                }, {
                    type: "input",
                    label: "姓名",
                    prop: "name"
                }, {
                    type: "input",
                    label: "年龄",
                    prop: "age"
                }, {
                    type: "input",
                    label: "电话",
                    prop: "mobile"
                }, {
                    type: "input",
                    label: "薪酬",
                    prop: "salary"
                }, {
                    type: "input",
                    label: "入职时间",
                    prop: "entryDate"
                }
            ],
            title: "新增员工",           // 模态框标题
            dialogVisible: false,//模态框开启或关闭状态
            // 模态框表单验证
            rules: {
                username: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
            },
            column: [{
                type: "index",
                lable: "序号",
                width: "60"
            }, {
                lable: "账号",
                prop: "username"
            }, {
                lable: "姓名",
                prop: "name",
                width: '90'
            }, {
                lable: "年龄",
                prop: "age"
            }, {
                lable: "电话",
                prop: "mobile"
            }, {
                lable: "薪酬",
                prop: "salary"
            }, {
                lable: "入职时间",
                prop: "entryDate"
            }, {
                lable: "操作",
                type: "action",
                width: "150",
                actions: [
                    {
                        type: "primary",
                        text: "编辑"
                    }, {
                        type: "danger",
                        text: "删除"
                    }
                ]
            },
            ]
        };
    },
    methods: {
        // 员工列表
        async queryStaffList() {
            try {
                const response = await staff.getStaff(this.currentPage, this.pageSize, this.searchForm)
                // console.log(response);
                this.staffList = response.rows  //员工列表
                this.total = response.count        //总条数
            } catch (error) {
                console.log(error.message);
            }
        },
        // 查询按钮
        handleSearch() {
            this.currentPage = 1
            this.queryStaffList()
        },
        // 分页
        handleSizeChange(size) {
            this.pageSize = size
            this.queryStaffList()
        },
        handleCurrentChange(page) {
            this.currentPage = page
            this.queryStaffList()
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
                    const response = await staff.getRemoveStaff(id)
                    console.log(response);
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.queryStaffList()
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
                this.title = '员工编辑'
                // 将id传到查询单个员工函数中
                this.queryStaff(id)
                return
            } else {
                this.title = '添加员工'
                this.dialogForm = {
                    username: "",   //账号
                    name: "",       //姓名
                    age: "",        //年龄
                    mobile: "",     //电话
                    salary: "",     //薪酬
                    entryDate: "",  //入职时间
                }
            }
        },
        // 模态框 确定 按钮
        okDialogForm() {
            // 判断表单是否存在id  满足条件执行员工编辑  不满足条件执行员工新增
            this.dialogForm.id ? this.handleEdit() : this.handleAdd()
        },
        // 员工新增方法
        async handleAdd() {
            try {
                // 调用新增员工接口
                const response = await staff.getAddStaff(this.dialogForm)
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
                // 调用员工列表方法
                this.queryStaffList()
            } catch (error) {
                console.log(error.message);
            }
        },
        // 员工编辑
        async handleEdit() {
            try {
                // 调用编辑接口
                const response = await staff.getEditStaff(this.dialogForm, this.dialogForm.id)
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
                // 调用员工列表方法
                this.queryStaffList()
            } catch (error) {

            }
        },
        // 查询单个员工
        async queryStaff(id) {
            try {
                const response = await staff.getQueryStaff(id)
                this.dialogForm = response
            } catch (error) {
                console.log(error.message);
            }
        },
    },
    computed: {},
    created() {
        this.queryStaffList()
    }
}
</script>

<style lang="scss" scoped>
.staff {
    padding-top: 20px;
}
</style>