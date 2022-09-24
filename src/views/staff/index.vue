<template>
    <div class="staff">
        <!-- 查询 -->
        <el-form :inline="true" ref="searchStaff" :model="searchStaff" class="demo-form-inline"
            style="margin-top: 20px;">
            <el-form-item prop="username">
                <el-input v-model="searchStaff.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="searchStaff.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">查询</el-button>
                <el-button type="primary" @click="handleStaffForm">新增</el-button>
                <el-button @click="handleresetForm('searchStaff')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 员工列表 -->
        <el-table :data="staffList" height="380" border style="width: 100%">
            <el-table-column type="index" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="username" label="账号">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="90">
            </el-table-column>
            <el-table-column prop="age" label="年龄">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
            <el-table-column prop="salary" label="薪酬">
            </el-table-column>
            <el-table-column prop="entryDate" label="入职时间">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleStaffForm(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleCurrentSize" @current-change="handleCurrentSize"
            :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size.sync="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- 模态框 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
            <el-form ref="staffForm" :rules="rules" :model="staffForm" label-width="100px">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="staffForm.username"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="staffForm.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="staffForm.age"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="staffForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="薪酬" prop="salary">
                    <el-input v-model="staffForm.salary"></el-input>
                </el-form-item>
                <el-form-item label="入职时间" prop="entryDate">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="staffForm.entryDate" type="date"
                        placeholder="入职时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="okStaffForm('staffForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import staff from "../../api/staff"
export default {
    data() {
        return {
            // 查询表单
            searchStaff: {
                username: "",   //账号
                name: "",       //姓名
            },
            currentPage: 1,     //当前页码
            pageSize: 10,       //每页条数
            total: 0,           //总条数
            staffList: [],   //员工列表
            // 模态框表单
            staffForm: {
                username: "",   //账号
                name: "",       //姓名
                age: "",        //年龄
                mobile: "",     //电话
                salary: "",     //薪酬
                entryDate: "",  //入职时间
            },
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
            }
        };
    },
    methods: {
        // 员工列表
        async queryStaffList() {
            try {
                const response = await staff.getStaff(this.currentPage, this.pageSize, this.searchStaff)
                // console.log(response);
                this.staffList = response.rows  //员工列表
                this.total = response.total        //总条数
            } catch (error) {
                console.log(error.message);
            }
        },
        // 查询按钮
        handleSearch() {
            this.currentPage = 1
            this.queryStaffList()
        },
        // 新增、编辑模态框出现按钮
        handleStaffForm(id) {
            this.dialogVisible = true
            if (typeof id == 'number') {
                this.title = '编辑员工'
                this.queryStaff(id)
                return
            }
            this.title = '新增员工'
        },
        // 重置查询表单
        handleresetForm(searchStaff) {
            this.$refs[searchStaff].resetFields()
        },
        // 分页
        handleCurrentSize() {
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
        // 模态框取消按钮
        close() { },
        // 模态框确定按钮
        okStaffForm(staffForm) {
            this.$refs[staffForm].validate((valid) => {
                if (valid) {
                    // 判断表单是否存在id  满足条件执行会员编辑  不满足条件执行会员新增
                    this.staffForm.id ? this.editStaff() : this.addStaff()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 查询单个员工
        async queryStaff(id) {
            try {
                const response = await staff.getQueryStaff(id)
                this.staffForm = response
            } catch (error) {
                console.log(error.message);
            }
        },
        // 新增员工
        async addStaff() {
            try {
                // 新增员工接口
                const response = await staff.getAddStaff(this.staffForm)
                // console.log(response);
                // 添加完表单内容清空重置
                this.handleresetForm('staffForm')
                // 添加成功提示
                this.$message({
                    message: '新增成功, 初始密码为:123456',
                    type: 'success'
                });
                // 关闭模态框
                this.dialogVisible = false
                // 调用员工列表方法
                this.queryStaffList()
            } catch (error) {
                console.log(error.message);
            }
        },
        // 编辑员工
        async editStaff() {
            try {
                // 编辑员工接口
                const response = await staff.getEditStaff(this.staffForm, this.staffForm.id)
                // 编辑完表单内容清空重置
                this.handleresetForm('staffForm')
                // 更新成功提示
                this.$message({
                    message: '更新成功',
                    type: 'success'
                });
                // 关闭模态框
                this.dialogVisible = false
                // 调用员工列表方法
                this.queryStaffList()
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
.staff {}
</style>