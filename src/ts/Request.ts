import axios from 'axios';
// import { Component, Prop, Vue } from 'vue-property-decorator';
 import { showLoading, hideLoading } from '../util/Loading';
// import TestTable from "../components/TestTable.vue";
// import UpdateDialog from "../components/UpdateDialog.vue";
// import RigionSelector from "../components/RigionSelector.vue";

/**
 * 接口
 */
// 地址接口
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
  personalDesign: string;
  companyAddress: Address;
}
// label和value对应接口
interface ValueMap {
  label: string;
  value: string;
}
// 分页参数接口
interface PageInfo{
  currentPage: number;
  pageSize: number;
  total: number;
  users: UserInfo[];
}

export default class Request{
    /**
   * 前后端数据交互事件
   */
  // 分页查询用户请求
  public static foundUser(params: any): any {
    // let that = this;
     axios({
       method: 'get',
       url: '/api/testPageHelper2',
       params: params
     }).then((res) => {
       console.log('--------------------数据返回---------------');
       console.log(res.data);
       return res.data
     })
   };
   // 更新用户请求
   public static updateUser(form: UserInfo) {
     let that = this;
     axios({
       method: 'post',
       url: '/api/updateUser',
       headers: {
         'Content-Type': 'application/json'
       },    
       data: JSON.stringify(form)
     }).then((res) => {
       return res.data;
     })
   };
   // 删除用户请求
   public static deleteUser(row: any, index: number) {
     let that = this;
     axios({
       method: 'delete',
       url: '/api/deleteUser',
       params: {
         id: row.id
       }
     }).then((res) => {
       return res.data;
     })
   }
}
  
