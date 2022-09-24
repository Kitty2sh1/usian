<template>
    <div class="member">
        <!-- 查询 -->
        <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline" style="margin-top: 20px;">
            <el-form-item prop="cardNum">
                <el-input v-model="formInline.cardNum" placeholder="会员卡号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="formInline.name" placeholder="会员名字"></el-input>
            </el-form-item>
            <el-form-item prop="payType">
                <el-select v-model="formInline.payType" placeholder="支付类型">
                    <el-option v-for="item in payType" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="birthday">
                <el-date-picker value-format="yyyy-MM-dd" v-model="formInline.birthday" type="date" placeholder="出生日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">查询</el-button>
                <el-button type="primary" @click="handleMeberForm">新增</el-button>
                <el-button @click="handleresetForm('formInline')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 会员列表 -->
        <el-table :data="memberList" height="380" border style="width: 100%">
            <el-table-column type="index" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="cardNum" label="会员卡号">
            </el-table-column>
            <el-table-column prop="name" label="会员姓名" width="90">
            </el-table-column>
            <el-table-column prop="birthday" label="会员生日">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码">
            </el-table-column>
            <el-table-column prop="integral" label="可用积分">
            </el-table-column>
            <el-table-column prop="money" label="开卡金额">
            </el-table-column>
            <el-table-column prop="payType" label="支付类型">
                <template slot-scope="scope">
                    <!-- 过滤器过滤支付类型 -->
                    {{scope.row.payType | memberPaytype}}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="会员地址">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleMeberForm(scope.row.id)">编辑</el-button>
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
            <el-form ref="memberForm" :rules="rules" :model="memberForm" label-width="80px">
                <el-form-item label="会员卡号" prop="cardNum">
                    <el-input v-model="memberForm.cardNum"></el-input>
                </el-form-item>
                <el-form-item label="会员姓名" prop="name">
                    <el-input v-model="memberForm.name"></el-input>
                </el-form-item>
                <el-form-item label="会员生日" prop="birthday">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="memberForm.birthday" type="date"
                        placeholder="会员生日">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="memberForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="开卡金额" prop="money">
                    <el-input v-model="memberForm.money" value="0"></el-input>
                </el-form-item>
                <el-form-item label="可用积分" prop="integral">
                    <el-input v-model="memberForm.integral" value="0"></el-input>
                </el-form-item>
                <el-form-item prop="payType" label="支付类型">
                    <el-select v-model="memberForm.payType" placeholder="支付类型">
                        <el-option v-for="item in payType" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会员地址" prop="address">
                    <el-input type="textarea" v-model="memberForm.address" value="0"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="okMemberForm('memberForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import member from '@/api/member';
import memberPay from "@/enum/member"
export default {
    data() {
        return {
            currentPage: 1, //页码
            pageSize: 10,   //每页条数
            total: 0,       //总条数
            memberList: [],
            formInline: {
                cardNum: "",   //会员卡号
                name: "",      //会员名字
                payType: "",   //支付类型
                birthday: "",  //出生日期
            },
            payType: memberPay.payType,
            dialogVisible: false,
            memberForm: {
                cardNum: "",     //会员卡号
                name: "",        //会员姓名
                payType: "",     //支付类型
                birthday: "",    //会员生日
                phone: "",       //手机号码
                integral: "",    //可用积分
                money: "",       //开卡金额
                address: "",     //会员地址
            },
            rules: {
                cardNum: [
                    { required: true, message: '会员卡号不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '会员姓名不能为空', trigger: 'blur' }
                ],
                payType: [
                    { required: true, message: '请选择支付类型', trigger: 'change' }
                ],
            },
            title: '添加会员',
            editId: null
        };
    },
    methods: {
        // 获取会员列表
        async queryMember() {
            try {
                const response = await member.getMember(this.currentPage, this.pageSize, this.formInline)
                this.total = response.total
                this.memberList = response.rows
                console.log(response.rows);
            } catch (error) {
                console.log(error.message);
            }
        },
        // 查询
        handleSearch() {
            this.currentPage = 1
            this.queryMember()
        },
        // 分页
        handleCurrentSize() {
            this.queryMember()
        },
        // 删除
        handleDelete(id) {
            this.$confirm('确认删除这条记录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    const response = await member.getRemoveMember(id)
                    // console.log(response);
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.queryMember()
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
        handleresetForm(formInline) {
            this.$refs[formInline].resetFields();
        },
        // 点击出现模态框
        handleMeberForm(id) {
            this.dialogVisible = true
            this.editId = id
            if (typeof id == 'number') {
                this.title = '会员编辑'
                // 将id传到查询单个会员函数中
                this.searchMember(id)
                return
            }
            this.title = '添加会员'
        },
        // 模态框 确定 按钮
        okMemberForm(memberForm) {
            this.$refs[memberForm].validate((valid) => {
                if (valid) {
                    // 判断表单是否存在id  满足条件执行会员编辑  不满足条件执行会员新增
                    this.memberForm.id ? this.editMember() : this.addMember()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 会员新增方法
        async addMember() {
            try {
                // 调用新增会员接口
                const response = await member.getAddMember(this.memberForm)
                // 添加完重置表单
                this.handleresetForm('memberForm')
                // 关闭模态框
                this.dialogVisible = false
                // 添加成功提示
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                // 调用会员列表方法
                this.queryMember()
            } catch (error) {
                console.log(error.message);
            }
        },
        // 会员编辑
        async editMember() {
            try {
                // 调用编辑接口
                const response = await member.getEditMember(this.memberForm, this.memberForm.id)
                // 重置表单
                this.handleresetForm('memberForm')
                // 关闭模态框
                this.dialogVisible = false
                // 编辑成功提示
                this.$message({
                    message: '更新成功',
                    type: 'success'
                });
                // 调用会员列表方法
                this.queryMember()
            } catch (error) {

            }
        },
        // 查询单个会员
        async searchMember(id) {
            try {
                const response = await member.getQueryMember(id)
                console.log(response);
                // 查询单个会员复制给memberForm
                this.memberForm = response
            } catch (error) {
                console.log(error.message);
            }
        },
        // 模态框取消按钮
        close() {
            this.dialogVisible = false
            this.handleresetForm('memberForm')
        }
    },
    computed: {},
    created() {
        this.queryMember()
    },
    // 过滤器过滤支付类型
    filters: {
        // paytype是每行信息的支付类型
        memberPaytype(paytype) {
            // memberPay.payType是enum文件夹中member.js定义的一个数组
            // 存放支付类型
            // 查找memberPay.payType中等于每行信息的支付类型的返回出来  data接收
            const data = memberPay.payType.find(item => {
                return item.id == paytype
            })
            // console.log(data);
            // 过滤器返回值 data如果存在,返回data.title,不存在返回空字符串
            return data ? data.title : ""
        }
    }
}
</script>

<style lang="scss" scoped>
.member {
    ::v-deep .el-select {
        width: 110px;
    }
}
</style>