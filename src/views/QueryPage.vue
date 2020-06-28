<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.userName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="个人定位">
        <el-select v-model="formInline.personalPlans" multiple  placeholder="个人定位">
          <el-option label="技术型" value="技术型"></el-option>
          <el-option label="业务型" value="业务型"></el-option>
          <el-option label="营销型" value="营销型"></el-option>
          <el-option label="管理型" value="管理型"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入职日期">
        <el-date-picker
          v-model="formInline.entryDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>      
    </el-form>
    <RigionSelector ref="rigionSelector" :componentAddress= "formInline.companyAddress"/>

    <div class="center">
      <el-button type="primary" @click="onQueryClicked('numberValidateForm')">查询</el-button>
      <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      <el-button @click="onAddClick('numberValidateForm')">新增用户</el-button>
      
      
    </div>
    <TestTable ref="testTable" :pageInfo= "pageInfo" @handleUpdateOpen="handleUpdateOpen" @currentChange= "currentChange" @onDeleteClick= "onDeleteClick"/>
    <UpdateDialog ref= "updateDialog" :dialogFormVisible= "dialogUpdateVisible" 
        @handleUpdateConfirm="handleUpdateConfirm" @handleUpdateClose="handleUpdateClose" @handleAddConfirm= "handleAddConfirm"/>
  </div>
</template>

<script  lang="ts" src="../ts/QueryPage.ts">
      
</script>

<style scoped>
  .center{
    text-align:center;
  }

</style>