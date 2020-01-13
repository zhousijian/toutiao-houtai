<template>
  <div class="articles">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="articleList" style="width: 100%" border>
      <el-table-column label="类型" width="80" align="center">
        <template slot-scope="scope">
          {{scope.row.type==1?'文章':'视频'}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="580"></el-table-column>
      <el-table-column prop="create_date" label="时间" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.create_date | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="150" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="edit(scope.$index, scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button type="info" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { articlelist } from '@/apis/article'
import { dateFormat } from '@/filters/myfilters'
export default {
  data () {
    return {
      articleList: [],
      pageIndex: 1,
      pageSize: 2,
      total: 10
    }
  },
  filters: {
    dateFormat
  },
  mounted () {
    this.init()
    // let res = await articlelist({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    // // console.log(res)
    // this.articleList = res.data.data
  },
  methods: {

    // 封装
    async init () {
      let res = await articlelist({ pageIndex: this.pageIndex, pageSize: this.pageSize })
      // console.log(res)
      this.articleList = res.data.data
      this.total = res.data.total
    },

    edit (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
