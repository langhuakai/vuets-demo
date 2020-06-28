import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { showLoading, hideLoading } from '../util/Loading';
import TestTable from "../components/TestTable.vue";
import UpdateDialog from "../components/UpdateDialog.vue";
import RigionSelector from "../components/RigionSelector.vue";

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

/**
 * 组件注册
 */
@Component({
  components: {
    TestTable,
    UpdateDialog,
    RigionSelector
  },
})
export default class QueryPage extends Vue {
  // refs组件注册
  public $refs!: {
    updateDialog: UpdateDialog,
    rigionSelector: RigionSelector,
    testTable:TestTable
  }
  
  /**
   * 组件数据
   */
  public dialogUpdateVisible: boolean = false;
  public pageNum: number = 1;
  public pageSize: number = 10;
  // 用户信息实例
  public formInline: UserInfo = {
    id: 0,
    userName: '',
    sex: '',
    age: 0,
    email: '',
    phone: '',
    entryDate: '',
    personalPlans: [],
    personalDesign: '',
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

  // 日期选择项
  public pickerOptions0: any= {
    disabledDate(time: any) {
      return time.getTime() > Date.now() - 8.64e6;
    }
  };


  mounted () { // 在mounted时候赋值，子组件只更新一次，后面重新选择后展示此组件的数据，不再更新
      this.foundUser();
  };
  /**
   * methods
   */
  // 查询按钮点击事件
  public onQueryClicked() {
    this.pageNum = 1;
    this.foundUser();
  }
  // 重置按钮点击事件
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
      personalDesign: '',
      companyAddress: {
        province: '',
        city: '',
        origin: '',
      },
    };
    this.$refs.rigionSelector.clear();
  };
  // 用户信息框关闭事件
  public handleUpdateClose(): void {
    console.log('--------即将关闭----------')
    this.dialogUpdateVisible = false;
  };
  // 用户信息框修改事件
  public handleUpdateConfirm(form: UserInfo) {
    console.log('---------------------进入QueryPage的handleUpdateConfirm方法--------------------------');
    console.log(form);
    this.updateUser(form);
  }
  // 用户信息框新增事件
  public handleAddConfirm(form: UserInfo) {
    console.log('---------------------进入QueryPage的handleAddConfirm方法--------------------------');
    console.log(form);
    this.addUser(form);
  }
  // 用户信息框打开事件
  public handleUpdateOpen(row: UserInfo) {
    this.dialogUpdateVisible = true;
    this.$refs.updateDialog.handleParentChanged(row);
  };
  // 当前页修改事件
  public currentChange(currentPage: number) {
    this.pageNum = currentPage;
    this.foundUser();
  }
  // 新增按钮点击事件
  public onAddClick() {
    this.$refs.updateDialog.clear();
    this.$refs.updateDialog.operateType = 2;
    this.dialogUpdateVisible = true;
  }
  // 删除按钮点击事件
  public onDeleteClick(row: any, index: number) {
    this.deleteUser(row, index);
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
      let that = this;
      // that.formInline = res.data.list;
      that.dialogUpdateVisible = false;
      that.$message({
        message: res.data.message,
        type: 'success'
      });
    })
  };

  /**
   * 前后端数据交互事件
   */
  // 分页查询用户请求
  public foundUser(): void {
    let that = this;
    showLoading();
    axios({
      method: 'get',
      url: '/api/testPageHelper2',
      params: {
        pageNum: that.pageNum,
        pageSize: that.pageSize,
        userName: that.formInline.userName,
        personalPlans: that.formInline.personalPlans.join(),
        entryDate: that.formInline.entryDate,
        province: that.formInline.companyAddress.province,
        city: that.formInline.companyAddress.city,
        origin: that.formInline.companyAddress.origin
      }
    }).then((res) => {
      console.log('--------------------数据返回---------------');
      console.log(res.data);
      that.pageInfo.users = res.data.data.pageInfo.list;
      that.pageInfo.total = res.data.data.pageInfo.total;
      that.pageInfo.currentPage = that.pageNum;
      that.pageInfo.pageSize = that.pageSize;
      hideLoading();
      that.$message({
        message: res.data.message,
        type: 'success'
      });
      // window.alert("查询成功");
    })
  };
  // 更新用户请求
  public updateUser(form: UserInfo) {
    let that = this;
    showLoading();
    axios({
      method: 'post',
      url: '/api/updateUser',
      headers: {
        'Content-Type': 'application/json'
      },    
      data: JSON.stringify(form)
    }).then((res) => {
      hideLoading();
      this.dialogUpdateVisible = false;
      window.alert(res.data.message);
    })
  };
  // 删除用户请求
  public deleteUser(row: any, index: number) {
    let that = this;
    showLoading();
    axios({
      method: 'delete',
      url: '/api/deleteUser',
      params: {
        id: row.id
      }
    }).then((res) => {
      // window.alert(res.data.message);
      hideLoading();
      that.$message({
        message: res.data.message,
        type: 'success'
      });
      console.log('--------------------调用QueryPage中的删除行方法-------------------------')
      that.$refs.testTable.deleteRow(index);


    })
  }

};
  