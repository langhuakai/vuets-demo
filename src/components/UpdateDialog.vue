<template>
    <el-dialog title="基础信息" :visible.sync="dialogVisible" :before-close="handleUpdateClose" open="onDialogOpen">
        <el-form :model="form">

            <el-row>
                <el-col :span="8">
                    <el-form-item label="姓名">
                        <el-input :style="{width: '90%'}"  v-model="form.userName" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="性别">
                        <el-select v-model="form.sex" :style="{width: '90%'}">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        label="年龄"
                        prop="age"
                        :rules="[
                        { required: true, message: '年龄不能为空'},
                        { type: 'number', message: '年龄必须为数字值'}
                        ]"
                    >
                        <el-input :style="{width: '90%'}" type="age" v-model.number="form.age" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="入职日期">
                        <el-date-picker
                        :style="{width: '90%'}"
                        v-model="form.entryDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :picker-options="pickerOptions0">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        prop="email"
                        label="邮箱"
                        :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]"
                    >
                        <el-input :style="{width: '90%'}" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系方式">
                        <el-input :style="{width: '90%'}" v-model="form.phone" autocomplete="off"></el-input>
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
            <el-row>
                <el-form-item label="公司地址">
                    <RigionSelector ref="rigionSelector" :componentAddress= "this.form.companyAddress"/>
                </el-form-item>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleUpdateClose">取 消</el-button>
            <el-button type="primary" @click="handleUpdateConfirm">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts" src="../ts/UpdateDialog.ts">

</script>
<style>

.input-width{
    width: 80%;
  }

</style>