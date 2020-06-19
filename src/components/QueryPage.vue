<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.userName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="个人定位">
        <el-select v-model="formInline.personalPlan" multiple  placeholder="个人定位">
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
          placeholder="选择日期"
          :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>      
    </el-form>
    <RigionSelector :avalueProvince = "formInline.address.province" :avalueCity = "formInline.address.city" :avalueOrigin = "formInline.address.origin"/>

    <div class="center">
      <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
      <el-button @click="resetForm('numberValidateForm')">重置</el-button>
    </div>
    <TestTable></TestTable>
    <UpdateDialog :dialogFormVisible= "dialogFormVisible"/>
  </div>
</template>

<script  lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import axios from 'axios';
    import TestTable from "./TestTable.vue";
    import UpdateDialog from "./UpdateDialog.vue";
    import RigionSelector from "./RigionSelector.vue";
   // import china_address from '/static/china_address.json';

    interface Address{
      province: string;
      city: string;
      origin: string;
    }

    interface UserForm{
      userName: string;
      personalPlan: string;
      entryDate: string;
      address: Address;
      valueProvince: string; // 所选的省
      valueCity: string; // 所选的市
      valueOrigin: string; // 所选的区
    }

    interface ValueMap {
      label : string;
      value : string;
    }

    interface App {
      appname: string;
      apkname: string;
      type: string;
      comp_name: string;
      type_number: string;
      update_date: string;
      download_num: string;
    }

    @Component({
      components: {
        TestTable,
        UpdateDialog,
        RigionSelector
      },
    })
    export default class QueryPage extends Vue {

      public dialogFormVisible: boolean = true;
      public formInline: UserForm = {
        userName: '',
        personalPlan: '',
        entryDate: '',
        address: {
          province: '',
          city: '',
          origin: '',
        },
        valueProvince: '', // 所选的省
        valueCity: '', // 所选的市
        valueOrigin: '', // 所选的区
      };
      public pickerOptions0: any= {
        disabledDate(time: any) {
          return time.getTime() > Date.now() - 8.64e6
        }
      };      
      public onSubmit(): void {
        console.log('submit!');
      };
    }
</script>

<style scoped>
  .center{
    text-align:center;
  }

</style>
