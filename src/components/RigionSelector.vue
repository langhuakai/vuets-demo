<template>
  <el-form v-model="address">
    <el-row title="公司所在地址">
      <el-col :span="6" class="col-width">
        <el-form-item label="省">
          <el-select v-model="address.province"
                    placeholder="请选择省"
                    @change="changeProvince">
            <el-option
              v-for="item in provinceList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6" class="col-width">
        <el-form-item label="市">
          <el-select v-model="address.city"
                    placeholder="请选择市"
                    @change="changeCity">
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6" class="col-width">
        <el-form-item label="区">
          <el-select v-model="address.origin"
                    placeholder="请选择区"
                    @change="changeOrigin">
            <el-option
              v-for="item in originOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>  
  </el-form>
</template>
<script lang= "ts" src="../ts/RigionSelector.ts">

</script>

<style scoped>
  .col-width{
    width: 300px;
  }

</style>>