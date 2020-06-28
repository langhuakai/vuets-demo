import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import RigionSelector from "../components/RigionSelector.vue";

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

@Component({
    components: {
    RigionSelector
    },
})
export default class UpdateDialog extends Vue { 
  
    public $refs!: {
        rigionSelector: RigionSelector,
        
    }
    @Prop() 
    dialogFormVisible!: boolean;

    operateType: number = 1;  //操作类型   1：修改  2：新增

    componentOperateType = this.operateType;

    dialogVisible = this.dialogFormVisible;
    form: UserInfo={
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
      }
    };
    public formLabelWidth: string= '120px';
    public numberValidateForm: any= {
            age: ''
    };
    public pickerOptions0: any= {
        disabledDate(time: any) {
            return time.getTime() > Date.now() - 8.64e6
        }
    };
    
    public handleUpdateClose(){
        this.$emit('handleUpdateClose')
    }

    public onDialogOpen() {
        this.$refs.rigionSelector.changeProvince(this.form.companyAddress.province);
        this.$refs.rigionSelector.changeCity(this.form.companyAddress.city);
        this.$refs.rigionSelector.changeOrigin(this.form.companyAddress.origin);
    }

    public handleUpdateConfirm() {
        let companyAddress = {
            province: '',
            city: '',
            origin: ''
        };
        companyAddress.province = this.$refs.rigionSelector.address.province;
        companyAddress.city = this.$refs.rigionSelector.address.city;
        companyAddress.origin = this.$refs.rigionSelector.address.origin;
        this.form.companyAddress = companyAddress;

        console.log('------------------进入UpdateDialog的handleUpdateConfirm方法-----------------------')
        console.log(this.form)

        if(this.operateType === 1) {
            console.log('进入修改方法条件中')
            this.$emit('handleUpdateConfirm', this.form);
        } else if(this.operateType === 2) {
            console.log('进入新增方法条件中')
            this.$emit('handleAddConfirm', this.form);
        }
    }

    public handleParentChanged(userInfo: UserInfo) {
        this.form = userInfo;
        this.$refs.rigionSelector.changeProvince(this.form.companyAddress.province);
        this.$refs.rigionSelector.changeCity(this.form.companyAddress.city);
        this.$refs.rigionSelector.changeOrigin(this.form.companyAddress.origin);
    }

    public clear() {
        this.form = {
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
            }
        }
    };

    @Watch('dialogFormVisible')
    public onDialogFormVisibleChanged(newValue: boolean, oldValue: boolean) {
        this.dialogVisible = newValue;
    }
}