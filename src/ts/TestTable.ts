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
  personalDesign: string;
  companyAddress: Address;
}

// 分页参数接口
interface PageInfo{
  currentPage: number;
  pageSize: number;
  total: number;
  users: UserInfo[];
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

  @Prop({
    default: () => {
      currentPage: 1;
      pageSize: 10;
      total: 0;
      users: [];
    }
  })
  pageInfo!: PageInfo;


  public tableUsers: UserInfo[] =this.users;
  public tablePageInfo: PageInfo = this.pageInfo

  public personalPlansFormatter(row: UserInfo, column: any, cellValue: any, index: any){
    return row.personalPlans.join();
  }

  switchChange(){
    this.istag = !this.istag ;

  };

  @Emit('currentChange')
  currentChange(currentPage : number){
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
    console.log(row)
  }

  handleEditClick2(row: any) {
    console.log('----------------执行打开方法------------------')
  }
  handleDeleteClick(index: number, row: UserInfo) {
    console.log('-------------------执行TestTable中的handleDeleteClick方法--------------------------')
    this.$emit('onDeleteClick', row, index)
  }

  // 删除行
  deleteRow(index: number) {
    if (index === null) {
      console.log('-------------------删除失败-----------------------')
    } else {
      this.tablePageInfo.users.splice(index, 1)
    }
  }


  getPersonalPlans(personalPlans: string[]) {
    return personalPlans.join()
  }

  @Watch('users')
  onDialogFormVisibleChanged(newValue: UserInfo[], oldValue: UserInfo[]) {
    this.users = newValue;
  }

  @Watch('pageInfo')
  onTablePageInfoChanged(newValue: PageInfo, oldValue: PageInfo) {
    this.tablePageInfo = newValue;
  }

  created(){
    this.total= this.users.length;
  };
}