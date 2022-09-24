<template>
    <div class="supplier">
        <!-- 查询 -->
        <el-form :inline="true" ref="searchSupplier" :model="searchSupplier" class="demo-form-inline"
            style="margin-top: 20px;">
            <el-form-item prop="name">
                <el-input v-model="searchSupplier.name" placeholder="供应商名称"></el-input>
            </el-form-item>
            <el-form-item prop="linkman">
                <el-input v-model="searchSupplier.linkman" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
                <el-input v-model="searchSupplier.mobile" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">查询</el-button>
                <el-button type="primary" @click="handleSupplierForm">新增</el-button>
                <el-button @click="handleresetForm('searchSupplier')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 供应商列表 -->
        <el-table :data="supplierList" height="380" border style="width: 100%">
            <el-table-column type="index" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="name" label="供应商名称">
            </el-table-column>
            <el-table-column prop="linkman" label="联系人" width="90">
            </el-table-column>
            <el-table-column prop="mobile" label="联系电话">
            </el-table-column>
            <el-table-column prop="remark" label="备注">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleSupplierForm(scope.row.id)">编辑</el-button>
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
            <el-form ref="supplierForm" :rules="rules" :model="supplierForm" label-width="100px">
                <el-form-item label="供应商名称" prop="name">
                    <el-input v-model="supplierForm.name"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="linkman">
                    <el-input v-model="supplierForm.linkman"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile">
                    <el-input v-model="supplierForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="supplierForm.remark" value="0"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="okSupplierForm('supplierForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import supplier from "../../api/supplier"
export default {
    data() {
        return {
            // 查询表单
            searchSupplier: {
                name: "",       //供应商名称
                linkman: "",    //联系人
                mobile: "",     //联系电话
            },
            currentPage: 1,     //当前页码
            pageSize: 10,       //每页条数
            total: 0,           //总条数
            supplierList: [],   //供应商列表
            // 模态框表单
            supplierForm: {
                name: "",       //供应商名称
                linkman: "",    //联系人
                mobile: "",     //联系电话
                remark: ""       //备注
            },
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
            }
        };
    },
    methods: {
        // 供应商列表
        async querySupplierList() {
            try {
                const response = await supplier.getSupplier(this.currentPage, this.pageSize, this.searchSupplier)
                // console.log(response);
                this.supplierList = response.rows  //供应商列表
                this.total = response.total        //总条数
            } catch (error) {
                console.log(error.message);
            }
        },
        // 查询按钮
        handleSearch() {
            this.currentPage = 1
            this.querySupplierList()
        },
        // 新增、编辑模态框出现按钮
        handleSupplierForm(id) {
            this.dialogVisible = true
            if (typeof id == 'number') {
                this.title = '编辑供应商'
                this.querySupplier(id)
                return
            }
            this.title = '新增供应商'
        },
        // 重置查询表单
        handleresetForm(searchSupplier) {
            this.$refs[searchSupplier].resetFields();
        },
        // 分页
        handleCurrentSize() {
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
        // 模态框取消按钮
        close() { },
        // 模态框确定按钮
        okSupplierForm(supplierForm) {
            this.$refs[supplierForm].validate((valid) => {
                if (valid) {
                    // 判断表单是否存在id  满足条件执行会员编辑  不满足条件执行会员新增
                    this.supplierForm.id ? this.editSupplier() : this.addSupplier()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
        // 新增供应商
        async addSupplier() {
            try {
                // 新增供应商接口
                const response = await supplier.getAddSupplier(this.supplierForm)
                // console.log(response);
                // 添加完表单内容清空重置
                this.handleresetForm('supplierForm')
                // 添加成功提示
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                // 关闭模态框
                this.dialogVisible = false
                // 调用供应商列表方法
                this.querySupplierList()
            } catch (error) {
                console.log(error.message);
            }
        },
        // 编辑供应商
        async editSupplier() {
            try {
                // 编辑供应商接口
                const response = await supplier.getEditSupplier(this.supplierForm, this.supplierForm.id)
                // 编辑完表单内容清空重置
                this.handleresetForm('supplierForm')
                // 更新成功提示
                this.$message({
                    message: '更新成功',
                    type: 'success'
                });
                // 关闭模态框
                this.dialogVisible = false
                // 调用供应商列表方法
                this.querySupplierList()
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
.supplier {}
</style>