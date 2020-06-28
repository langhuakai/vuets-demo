<template>
  <div class="title">
    <span>总数量：{{tablePageInfo.total}}个</span>
    <div class="container_table">
      <el-table
        :data="tablePageInfo.users"
        stripe
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="age"
          sortable
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="entryDate"
          value-format = "yyyy-MM-dd" 
          sortable
          label="入职日期">
        </el-table-column>
        <el-table-column
          :formatter="personalPlansFormatter"
          prop="personalPlans"
          label="个人规划">
        </el-table-column>
        <el-table-column
          prop="personalCV"
          sortable
          label="个人简历">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleLookClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDeleteClick(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="fy"
                     layout="prev, pager, next"
                     @current-change="currentChange"
                     :total="tablePageInfo.total"
                     background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" src="../ts/TestTable.ts">

</script>

<style scoped>
  .fl{
    float: right;
    margin-right:20px;
  }
  .fy{
    text-align:center;
    margin-top:30px;
  }
  .title{
    height:100%;
  }
</style>
