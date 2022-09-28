<template>
    <div class="member">
        <!-- 查询 -->
        <base-form ref="queryForm" v-model.sync="formInline" :formList="formList">
            <template #option>
                <el-option v-for="item in payType" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </template>
            <template #button>
                <el-button type="primary" @click="handleSearch">查询</el-button>
                <el-button type="primary" @click="handleMeberForm">新增</el-button>
                <el-button @click="handleReset">重置</el-button>
            </template>
        </base-form>
        <!-- 会员列表 -->
        <base-table :pager="true" @handleDelete="handleDelete" @handleEditForm="handleMeberForm"
            @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :data="memberList"
            :column="column" :page="currentPage" :size="pageSize" :total="total">
        </base-table>
        <!-- 添加编辑模态框 -->
        <base-dialog :rules="rules" ref="dialogForm" @submit="okDialogForm" v-model.sync="dialogForm" :title="title"
            :dialogList="dialogList" :dialogVisible.sync="dialogVisible">
            <template #option>
                <el-option v-for="item in payType" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </template>
        </base-dialog>

    </div>
</template>


<script>
import member from '@/api/member';
import memberPay from "@/enum/member"
let arr = {
    1: "现金",
    2: "微信",
    3: "支付宝",
    4: "银行卡"
}
export default {
    components: {
        "base-table": () => import('../../components/baseTable.vue'),
        "base-form": () => import('../../components/baseForm.vue'),
        "base-dialog": () => import('../../components/baseDialog.vue')
    },

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
            formList: [{
                type: 'input',
                placeholder: "会员卡号",
                prop: "cardNum"
            }, {
                type: 'input',
                placeholder: "会员名字",
                prop: "name"
            }, {
                type: 'select',
                placeholder: "支付类型",
                prop: "payType"
            },
            {
                type: 'date',
                placeholder: "出生日期",
                prop: "birthday"
            }],
            payType: memberPay.payType,
            dialogVisible: false,
            dialogForm: {
                cardNum: "",     //会员卡号
                name: "",        //会员姓名
                payType: "",     //支付类型
                birthday: "",    //会员生日
                phone: "",       //手机号码
                integral: "",    //可用积分
                money: "",       //开卡金额
                address: "",     //会员地址
            },
            dialogList: [
                {
                    type: "input",
                    label: "会员卡号",
                    prop: "cardNum"
                }, {
                    type: "input",
                    label: "会员姓名",
                    prop: "name"
                }, {
                    type: "date",
                    label: "会员生日",
                    prop: "birthday",
                    placeholder: "会员生日"
                }, {
                    type: "input",
                    label: "手机号码",
                    prop: "phone"
                }, {
                    type: "input",
                    label: "开卡金额",
                    prop: "money"
                }, {
                    type: "input",
                    label: "可用积分",
                    prop: "integral"
                }, {
                    type: "select",
                    label: "支付类型",
                    prop: "payType",
                    placeholder: "支付类型"
                }, {
                    type: "textarea",
                    label: "会员地址",
                    prop: "address",
                }
            ],
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
            column: [{
                type: "index",
                lable: "序号",
                width: "60"
            }, {
                lable: "会员卡号",
                prop: "cardNum"
            }, {
                lable: "会员姓名",
                prop: "name"
            }, {
                lable: "会员生日",
                prop: "birthday"
            }, {
                lable: "手机号码",
                prop: "phone"
            }, {
                lable: "可用积分",
                prop: "integral"
            }, {
                lable: "开卡金额",
                prop: "money"
            }, {
                lable: "支付类型",
                prop: "payType",
                formatter(cellValue) {
                    return arr[cellValue.payType]
                }
            }, {
                lable: "会员地址",
                prop: "address"
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
        // 获取会员列表
        async queryMember() {
            try {
                const response = await member.getMember(this.currentPage, this.pageSize, this.formInline)
                this.total = response.count
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
        // handleCurrentSize() {
        //     this.queryMember()
        // },
        handleSizeChange(size) {
            this.pageSize = size
            this.queryMember()
        },
        handleCurrentChange(page) {
            this.currentPage = page
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
        handleReset() {
            this.$refs['queryForm'].handleResetForm()
        },
        // 点击出现模态框
        handleMeberForm(id) {
            this.dialogVisible = true
            if (typeof id == 'number') {
                this.title = '会员编辑'
                // 将id传到查询单个会员函数中
                this.searchMember(id)
                return
            } else {
                this.title = '添加会员'
                this.dialogForm = {
                    cardNum: "",     //会员卡号
                    name: "",        //会员姓名
                    payType: "",     //支付类型
                    birthday: "",    //会员生日
                    phone: "",       //手机号码
                    integral: "",    //可用积分
                    money: "",       //开卡金额
                    address: "",     //会员地址
                }
            }
        },
        // 模态框 确定 按钮
        okDialogForm() {
            // 判断表单是否存在id  满足条件执行会员编辑  不满足条件执行会员新增
            this.dialogForm.id ? this.handleEdit() : this.handleAdd()
        },
        // 会员新增方法
        async handleAdd() {
            try {
                // 调用新增会员接口
                const response = await member.getAddMember(this.dialogForm)
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
                // 调用会员列表方法
                this.queryMember()
            } catch (error) {
                console.log(error.message);
            }
        },
        // 会员编辑
        async handleEdit() {
            try {
                // 调用编辑接口
                const response = await member.getEditMember(this.dialogForm, this.dialogForm.id)
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
                // 查询单个会员复制给dialogForm
                response.payType=response.payType=='1'?"现金":response.payType=='2'?"微信":response.payType=='3'?'支付宝':"银行卡"
                this.dialogForm = response

            } catch (error) {
                console.log(error.message);
            }
        }, 
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
    padding-top: 20px;
}
</style>