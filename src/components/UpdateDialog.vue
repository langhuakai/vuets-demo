<template>
    <el-dialog title="基础信息" :visible.sync="dialogVisible" :before-close="handleUpdateClose">
        <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.sex">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
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
            <el-form-item label="入职日期">
                <el-date-picker
                v-model="form.entryDate"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions0">
                </el-date-picker>
            </el-form-item>
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
            <el-form-item label="联系方式" :label-width="formLabelWidth">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="form.personalPlan">
                </el-input>
            </el-form-item>
            <el-form-item  label="个人定位" :label-width="formLabelWidth">
                <el-checkbox-group v-model="form.personalPlans">
                    <el-checkbox label="技术型"></el-checkbox>
                    <el-checkbox label="业务型"></el-checkbox>
                    <el-checkbox label="营销型"></el-checkbox>
                    <el-checkbox label="管理型"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <RigionSelector :avalueProvince = "form.companyAddress.province" :avalueCity = "form.companyAddress.city" :avalueOrigin = "form.companyAddress.origin"/>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleUpdateClose">取 消</el-button>
            <el-button type="primary" @click="handleUpdateClose">确 定</el-button>
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
      companyAddress: Address;
      // address: Address;
      // valueProvince: string; // 所选的省
      // valueCity: string; // 所选的市
      // valueOrigin: string; // 所选的区
    }

@Component({
    components: {
    RigionSelector
    },
})
export default class UpdateDialog extends Vue { 
  
    @Prop() 
    dialogFormVisible!: boolean;
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
    
    handleUpdateClose(){
        this.$emit('handleUpdateClose')
    }

    @Watch('dialogFormVisible')
    onDialogFormVisibleChanged(newValue: boolean, oldValue: boolean) {
        this.dialogVisible = newValue;
    }
}
</script>
<style></style>