<template>
  <div class="title">
    <span>总数量：3223个</span>
    <div class="container_table">
      <el-table
        :data="users"
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
          sortable
          label="入职日期">
        </el-table-column>
        <el-table-column
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
            <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="fy"
                     layout="prev, pager, next"
                     @current-change="current_change"
                     :total="total"
                     background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">

    import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
    import axios from 'axios'

    interface Address {
      province: string;
      city: string;
      origin: string;
    }
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

    @Component
    export default class TestTable extends Vue {
      public total: number = 1000;//默认数据总数
      public pagesize: number=9;//每页的数据条数
      public currentPage: number = 1;//默认开始页面
      public istag: boolean = true;
      public input: string = "";
      public input21: string = '';

      @Prop({ default: () => [] })
      users!: UserInfo[];

      public tableUsers: UserInfo[] =this.users;

      // public users: UserInfo[] = [
      //   {
      //     id: 0,
      //     userName: 'wei',
      //     sex: '男',
      //     age: 24,
      //     email: 'aaa@qq.com',
      //     phone: '13322222222',
      //     entryDate: '2020-06-20',
      //     personalPlans: ['技术型', '营销型'],
      //     companyAddress: {
      //       province: '江西省',
      //       city: '鹰潭市',
      //       origin: '贵溪市'
      //     }
      //   },
      // ];


      switchChange(){
        this.istag = !this.istag ;

      };

      current_change(currentPage : number){
        this.currentPage = currentPage;
      };

      handleClick(row: any) {
        console.log(row);
      };

      handleLookClick(row: any) {

      };

      @Emit('handleUpdateOpen') 
      handleEditClick(row: any) {
        console.log('----------------执行TestTable中的打开方法------------------')
      }

      handleEditClick2(row: any) {
        console.log('----------------执行打开方法------------------')
      }

      @Watch('users')
      onDialogFormVisibleChanged(newValue: UserInfo[], oldValue: UserInfo[]) {
        this.users = newValue;
    }

      created(){
        this.total= this.users.length;
      };
    }
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
