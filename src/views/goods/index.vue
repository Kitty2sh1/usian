<template>
  <div class="home">
    <!-- 查询 -->
    <el-form :inline="true" ref="searchGoods" :model="searchGoods" class="demo-form-inline" style="margin-top: 20px;">
      <el-form-item prop="name">
        <el-input v-model="searchGoods.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchGoods.code" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input v-model="searchGoods.supplierName" @focus="handleFocus" placeholder="供应商名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button type="primary" @click="handleGoodsForm">新增</el-button>
        <el-button @click="handleresetForm('searchGoods')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 员工列表 -->
    <el-table :data="goodsList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="name" label="商品名称">
      </el-table-column>
      <el-table-column prop="code" label="商品编码">
      </el-table-column>
      <el-table-column prop="spec" label="商品规格">
      </el-table-column>
      <el-table-column prop="retailPrice" label="零售价">
      </el-table-column>
      <el-table-column prop="purchasePrice" label="进货价">
      </el-table-column>
      <el-table-column prop="storageNum" label="库存数量">
      </el-table-column>
      <el-table-column prop="supplierName" label="供应商">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleGoodsForm(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleCurrentSize" @current-change="handleCurrentSize" :current-page.sync="currentPage"
      :page-sizes="[5, 10, 15, 20]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 选择供应商模态框 -->
    <el-dialog title="选择供应商" :visible.sync="dialogVisible" width="30%">
      <el-form :inline="true" ref="formInline" :model="formInline">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="供应商名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table ref="singleTable" highlight-current-row @current-change="handleCurrentChange" :data="supplierList"
        height="380" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="供应商名称">
        </el-table-column>
        <el-table-column prop="linkman" label="联系人" width="90">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-pagination @size-change="handleRender" @current-change="handleRender" :current-page.sync="currentPage1"
          :page-size.sync="pageSize1" layout="prev, pager, next" :total="total1">
        </el-pagination>
      </span>
    </el-dialog>
    <!-- 新增编辑模态框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible1" width="30%">
      <el-form ref="goodsForm" :rules="rules" :model="goodsForm" label-width="100px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="goodsForm.code"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="goodsForm.spec"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="goodsForm.retailPrice"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="goodsForm.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="goodsForm.storageNum"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input v-model="goodsForm.supplierName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="okGoodsForm('goodsForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import goods from "../../api/goods"
import supplier from "../../api/supplier"
export default {
  data() {
    return {
      searchGoods: {
        name: "",          //商品名称
        code: "",          //商品编号
        supplierName: ""   //供应商名称
      },
      currentPage: 1,       //商品当前页码
      pageSize: 10,         //商品每页条数
      total: 0,             //商品总条数
      goodsList: [],        //商品列表
      currentPage1: 1,       //供应商当前页码
      pageSize1: 10,         //供应商每页条数
      total1: 0,             //供应商总条数
      supplierList: [],      //供应商列表 
      dialogVisible: false,
      formInline: {
        supplierName: ""     //供应商名称
      },
      title: "新增商品",
      dialogVisible1: false,
      goodsForm: {
        name: "",             //商品名称
        code: "",             //商品编码
        spec: "",             //商品规格
        retailPrice: "0",      //零售价
        purchasePrice: "0",    //进货价
        storageNum: "0",       //库存数量
        supplierName: "",     //供应商
      },
      // 模态框表单验证
      rules: {
        name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '商品编码不能为空', trigger: 'blur' }
        ],
        retailPrice: [
          { required: true, message: '零售价不能为空', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    // 获取商品列表  查询
    async queryGoodsList() {
      try {
        const response = await goods.getGoods(this.currentPage, this.pageSize)
        this.goodsList = response.rows
        this.total = response.count
      } catch (error) {
        console.log(error.message);
      }
    },
    // 查询
    handleSearch() {
      this.currentPage = 1
      this.queryGoodsList()
    },
    // 点击出现新增编辑模态框
    handleGoodsForm(id) {
      this.dialogVisible1 = true
      if (typeof id == 'number') {
        this.title = '商品编辑'
        // 将id传到查询单个会员函数中
        this.searchAloneGoods(id)
        return
      }
      this.title = '新增商品'
    },
    // 重置表单
    handleresetForm(searchGoods) {
      this.$refs[searchGoods].resetFields();
    },
    //分页
    handleCurrentSize() {
      this.queryGoodsList()
    },
    // 新增编辑模态框确定按钮
    okGoodsForm(goodsForm) {
      this.$refs[goodsForm].validate((valid) => {
        if (valid) {
          // 判断表单是否存在id  满足条件执行会员编辑  不满足条件执行会员新增
          this.goodsForm.id ? this.editGoods() : this.addGoods()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消按钮
    close() {
      this.handleresetForm('goodsForm')
      this.dialogVisible1 = false
    },
    // 删除
    handleDelete(id) {
      this.$confirm('确认删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const response = await goods.getRemoveGoods(id)
          // console.log(response);
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.queryGoodsList()
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
    // 会员新增方法
    async addGoods() {
      try {
        // 调用新增会员接口
        const response = await goods.getAddGoods(this.goodsForm)
        // 添加完重置表单
        this.handleresetForm('goodsForm')
        // 关闭模态框
        this.dialogVisible1 = false
        // 添加成功提示
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        // 调用会员列表方法
        this.queryGoodsList()
      } catch (error) {
        console.log(error.message);
      }
    },
    // 会员编辑
    async editGoods() {
      try {
        // 调用编辑接口
        const response = await goods.getEditGoods(this.goodsForm, this.goodsForm.id)
        // 重置表单
        this.handleresetForm('goodsForm')
        // 关闭模态框
        this.dialogVisible1 = false
        // 编辑成功提示
        this.$message({
          message: '更新成功',
          type: 'success'
        });
        // 调用会员列表方法
        this.queryGoodsList()
      } catch (error) {

      }
    },
    // 查询单个会员
    async searchAloneGoods(id) {
      try {
        const response = await goods.getQueryGoods(id)
        console.log(response);
        // 查询单个会员复制给goodsForm
        this.goodsForm = response
      } catch (error) {
        console.log(error.message);
      }
    },

    /*
      供应商模态框
    **/
    // 获取供应商列表
    async querySupplierList() {
      try {
        const response = await supplier.getSupplier(this.currentPage1, this.pageSize1)
        this.supplierList = response.rows
        this.total1 = response.total
      } catch (error) {

      }
    },
    // 供应商列表分页
    handleRender() {
      this.querySupplierList()
    },
    // 供应商模态框
    handleFocus() {
      this.dialogVisible = true
      this.querySupplierList()
    },
    // 选择供应商
    handleCurrentChange(val) {
      console.log(val);
      this.searchGoods.supplierName = val.name
      this.dialogVisible = false
      // this.$refs.singleTable.setCurrentRow();
    },
  },
  computed: {},
  created() {
    this.queryGoodsList()
  }
}
</script>

<style lang="scss" scoped>
.home {}
</style>