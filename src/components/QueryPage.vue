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
    <RigionSelector ref="rigionSelector" :componentAddress= "formInline.companyAddress"/>

    <div class="center">
      <el-button type="primary" @click="onQueryClicked('numberValidateForm')">查询</el-button>
      <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      <el-button @click="onAddClick('numberValidateForm')">新曾用户</el-button>
      
      
    </div>
    <TestTable :pageInfo= "pageInfo" @handleUpdateOpen="handleUpdateOpen" @currentChange= "currentChange" @onDeleteClick= "onDeleteClick"/>
    <UpdateDialog ref= "updateDialog" :dialogFormVisible= "dialogUpdateVisible" 
        @handleUpdateConfirm="handleUpdateConfirm" @handleUpdateClose="handleUpdateClose" @handleAddConfirm= "handleAddConfirm"/>
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

    // 分页参数接口
    interface PageInfo{
      currentPage: number;
      pageSize: number;
      total: number;
      users: UserInfo[];
    }

    @Component({
      components: {
        TestTable,
        UpdateDialog,
        RigionSelector
      },
    })
    export default class QueryPage extends Vue {
      public $refs!: {
        updateDialog: UpdateDialog,
        rigionSelector: RigionSelector,
        
      }
      
      public dialogUpdateVisible: boolean = false;
      public pageNum: number = 1;
      public pageSize: number = 10;
      // 用户信息实例
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
      };
      public users: UserInfo[] = [];
      // 分页参数封装实例
      public pageInfo: PageInfo = {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        users: []
      };
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
        };
        this.$refs.rigionSelector.clear();
      };
      // 保存框关闭事件
      public handleUpdateClose(): void {
        console.log('--------即将关闭----------')
        this.dialogUpdateVisible = false;
      };

      // 信息框修改事件
      public handleUpdateConfirm(form: UserInfo) {
        console.log('---------------------进入QueryPage的handleUpdateConfirm方法--------------------------');
        console.log(form);
        this.updateUser(form);
      }
      // 信息框新增事件
      public handleAddConfirm(form: UserInfo) {
        console.log('---------------------进入QueryPage的handleAddConfirm方法--------------------------');
        console.log(form);
        this.addUser(form);
      }

      // 保存框打开事件
      public handleUpdateOpen(row: UserInfo) {
        console.log('--------调用queryPage中的handleUpdateOpen方法-----------------')
        this.dialogUpdateVisible = true;
        this.$refs.updateDialog.handleParentChanged(row);
      };

      public currentChange(currentPage: number) {
        this.pageNum = currentPage;
        this.foundUser();
      }

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
        }).then((res) => {
          that.formInline = res.data.list;
        })
      };

      public onAddClick() {
        this.$refs.updateDialog.clear();
        this.$refs.updateDialog.operateType = 2;
        this.dialogUpdateVisible = true;
      }

      public onDeleteClick(id: number) {
        this.deleteUser(id);
      }

      public onQueryClicked() {
        this.pageNum = 1;
        this.foundUser();
      }

      public addUser(form: UserInfo) {
        console.log('-------------新增用户------------');
        axios({
          method: 'put',
          url: '/api/insertUser',
          data: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((res) => {
         // that.formInline = res.data.list;
        })
      };

      public foundUser(): void {
        console.log('submit!');
        console.log(this.formInline);
        let that = this;
        console.log('----------------打印plansjoin-------------------')
        console.log(this.formInline.personalPlans.join())
        
        axios({
          method: 'get',
          url: '/api/testPageHelper2',
          params: {
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            userName: that.formInline.userName,
            personalPlans: that.formInline.personalPlans.join(),
            entryDate: that.formInline.entryDate,
            province: '',
            city: '',
            origin: ''

          }
        }).then((res) => {
          console.log('--------------------数据返回---------------');
          console.log(res.data);
          that.pageInfo.users = res.data.list;
          that.pageInfo.total = res.data.total;
          that.pageInfo.currentPage = that.pageNum;
          that.pageInfo.pageSize = that.pageSize;
        })
      };

      public updateUser(form: UserInfo) {
        let that = this;
        console.log('-----------------进入QueryPage的updateUser方法------------------------')
        axios({
          method: 'post',
          url: '/api/updateUser',
          headers: {
            'Content-Type': 'application/json'
          },
          
         data: JSON.stringify(form)
        }).then((res) => {
          console.log('--------------------修改数据成功---------------');
          this.dialogUpdateVisible = false;
        })
      };

      public deleteUser(id: number) {
        axios({
          method: 'delete',
          url: '/api/deleteUser',
          params: {
            id: id
          }
        }).then((res) => {
          console.log('--------------------修改数据成功---------------');
          this.dialogUpdateVisible = false;
        })
      }

    };
      
</script>

<style scoped>
  .center{
    text-align:center;
  }

</style>