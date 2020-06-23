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
          placeholder="选择日期"
          :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>      
    </el-form>
    <RigionSelector ref="rigionSelector"/>

    <div class="center">
      <el-button type="primary" @click="submitForm('numberValidateForm')">查询</el-button>
      <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      <el-button @click="onSubmit">发送请求</el-button>
      <el-button @click="addUser">新增用户</el-button>
      <el-button @click="foundUser">查找用户</el-button>
      
    </div>
    <TestTable :users= "users" @handleUpdateOpen="handleUpdateOpen"/>
    <UpdateDialog :dialogFormVisible= "dialogUpdateVisible"  @handleUpdateClose="handleUpdateClose"/>
  </div>
</template>

<script  lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import axios from 'axios';
    import TestTable from "./TestTable.vue";
    import UpdateDialog from "./UpdateDialog.vue";
    import RigionSelector from "./RigionSelector.vue";
   // import china_address from '/static/china_address.json';

    interface Address {
      province: string;
      city: string;
      origin: string;
    }

    // 用户信息表单接口
    interface UserInfo {
      id: number;
      userName: string;
      sex: string;
      age: number;
      email: string;
      phone: string;
      entryDate: string;
      personalPlans: string[];
      companyAddress: Address;
      // address: Address;
      // valueProvince: string; // 所选的省
      // valueCity: string; // 所选的市
      // valueOrigin: string; // 所选的区
    }

    // label和value对应接口
    interface ValueMap {
      label: string;
      value: string;
    }

    // 请求封装接口
    interface Config{
      type: string;
      url: string;
      data?:string;
      dataType:string;
    }

    @Component({
      components: {
        TestTable,
        UpdateDialog,
        RigionSelector,
      },
    })
    export default class QueryPage extends Vue {
      
      public dialogUpdateVisible: boolean = true;
      public formInline: UserInfo = {
        id: 2,
        userName: '',
        sex: '',
        age: 0,
        email: '',
        phone: '',
        entryDate: '',
        personalPlans: [],
        companyAddress: {
          province: '',
          city: '',
          origin: '',
        },
        // valueProvince: '', // 所选的省
        // valueCity: '', // 所选的市
        // valueOrigin: '', // 所选的区
      };
      public users: UserInfo[] = [];
      public pickerOptions0: any= {
        disabledDate(time: any) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      };     
      public submitForm(): void {
        console.log(this.formInline);
        let that = this;
        axios({
          method: 'get',
          url: '/api/queryUsers',
          params: this.formInline,
        }).then((res) => {
          that.formInline = res.data.list;
        })
      }

      public resetForm(): void{
        this.formInline= {
          id: 0,
          userName: '',
          sex: '',
          age: 0,
          email: '',
          phone: '',
          entryDate: '',
          personalPlans: [],
          companyAddress: {
            province: '',
            city: '',
            origin: '',
          },
          // valueProvince: '', // 所选的省
          // valueCity: '', // 所选的市
          // valueOrigin: '', // 所选的区
        };
       // this.$refs.rigionSelector.clear();
      };
      // 保存框关闭事件
      public handleUpdateClose(): void {
        console.log('--------即将关闭----------')
        this.dialogUpdateVisible = false;
      };

      // 保存框打开事件
      public handleUpdateOpen(): void {
        console.log('--------调用queryPage中的handleUpdateOpen方法-----------------')
        this.dialogUpdateVisible = true;
      };

      // ajax请求封装
      public ajax(config: Config){
        let xhr = new XMLHttpRequest();
        xhr.open(config.type, config.url, true);
        xhr.send(config.data);
        xhr.onreadystatechange = function (){
          if(xhr.readyState == 4 && xhr.status == 200){
            console.log('success')
          }
        }
      };

      // 获取用户数据
      public get(){
        this.ajax({
          type: 'get',
          url: '/api/queryUsers',
          data: JSON.stringify(this.formInline),
          dataType: 'json'
        })
      };

      public requestUsers() {
        let that = this;
        axios({
          method: 'get',
          url: '/api/queryUsers',
          params: this.formInline
        }).then((res) => {
          that.formInline = res.data.list;
        })
      };



      public onSubmit(): void {
        console.log('submit!');
        console.log(this.formInline);
        let that = this;
        let personalPlans = ['技术型','营销型']
        axios({
          method: 'get',
          url: '/api/queryUsers2',
          
          // get
         // params: {"personalPlans": personalPlans}
         // params: JSON.stringify(personalPlans)
         //params: {'personalPlan': personalPlans}
         //params: {personalPlans}
         // post
         // params: personalPlans
         // params: personalPlans.toString
        }).then((res) => {
          that.formInline = res.data.list;
        })
      };

      public addUser(): void {
        console.log('-------------新增用户------------');
        let useradd = {
          userName: 'wei',
          email: 'wei@qq.com'
        }
        axios({
          method: 'put',
          url: '/api/insertUser',
          
          // get
         // params: {"personalPlans": personalPlans}
         // params: JSON.stringify(personalPlans)
         data: useradd,
         // post
         // params: personalPlans
         // params: personalPlans.toString
        }).then((res) => {
         // that.formInline = res.data.list;
        })
      };

      public foundUser(): void {
        console.log('submit!');
        console.log(this.formInline);
        let that = this;
        
        axios({
          method: 'get',
          url: '/api/queryUsers',
          
          // get
         // params: {"personalPlans": personalPlans}
         // params: JSON.stringify(personalPlans)
         //params: {'personalPlan': personalPlans}
         params: {
           userName: that.formInline.userName,
           personalPlans: that.formInline.personalPlans,
           entryDate: that.formInline.entryDate,
           province: '',
           city: '',
           origin: ''

         }
         // post
         // params: personalPlans
         // params: personalPlans.toString
        }).then((res) => {
          console.log('--------------------数据返回---------------');
          console.log(res.data);
          that.users = res.data;
        })
      };

    };
      
</script>

<style scoped>
  .center{
    text-align:center;
  }

</style>