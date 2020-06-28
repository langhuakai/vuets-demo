<template>
    <el-dialog title="基础信息" :visible.sync="dialogVisible" :before-close="handleUpdateClose" open="onDialogOpen">
        <el-form :model="form">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="姓名">
                        <el-input v-model="form.userName" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="性别">
                        <el-select v-model="form.sex">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                        label="年龄"
                        prop="age"
                        :rules="[
                        { required: true, message: '年龄不能为空'},
                        { type: 'number', message: '年龄必须为数字值'}
                        ]"
                    >
                        <el-input type="age" v-model.number="form.age" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="入职日期">
                        <el-date-picker
                        v-model="form.entryDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :picker-options="pickerOptions0">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                        prop="email"
                        label="邮箱"
                        :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]"
                    >
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="联系方式">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item label="个人规划">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="form.personalDesign">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item  label="个人定位">
                    <el-checkbox-group v-model="form.personalPlans">
                        <el-checkbox label="技术型"></el-checkbox>
                        <el-checkbox label="业务型"></el-checkbox>
                        <el-checkbox label="营销型"></el-checkbox>
                        <el-checkbox label="管理型"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-row>
            <RigionSelector ref="rigionSelector" :componentAddress= "this.form.companyAddress"/>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleUpdateClose">取 消</el-button>
            <el-button type="primary" @click="handleUpdateConfirm">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import RigionSelector from "./RigionSelector.vue";

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
</script>
<style>

</style>