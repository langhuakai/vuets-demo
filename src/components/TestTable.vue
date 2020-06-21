<template>
  <div class="title">
    <span>总数量：3223个</span>
    <div class="container_table">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="appname"
          label="姓名"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="apkname"
          label="性别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          sortable
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="comp_name"
          sortable
          label="入职日期">
        </el-table-column>
        <el-table-column
          prop="type_number"
          label="个人规划">
        </el-table-column>
        <el-table-column
          prop="update_date"
          sortable
          label="个人简历">
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

    import { Component, Prop, Vue } from 'vue-property-decorator';
    import axios from 'axios'

    interface ValueMap {
      label : string;
      value : string;
    }

    interface App {
      appname: string;
      apkname: string;
      type: string;
      comp_name: string;
      type_number: string;
      update_date: string;
      download_num: string;
    }

    @Component
    export default class TestTable extends Vue {
      public total: number = 1000;//默认数据总数
      public pagesize: number=9;//每页的数据条数
      public currentPage: number = 1;//默认开始页面
      public istag: boolean = true;
      public input: string = "";
      public input21: string = '';
      public options: ValueMap[] =[{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }];
      public value5: ValueMap[] = [];
      public tableData: App[] = [
        {
          appname: '1喵喵直播',
          apkname: '1bdkdl',
          type: '3视频直播',
          comp_name: '1广大科技公司',
          type_number: '1V1.2',
          update_date: '12016-05-02',
          download_num: '123.6',
        },
        {
          appname: '2喵喵直播',
          apkname: '2bdkdl',
          type: '2视频直播',
          comp_name: '2广大科技公司',
          type_number: '2V1.2',
          update_date: '22016-05-02',
          download_num: '223.6',
        },
        {
          appname: '3喵喵直播',
          apkname: '1bdkdl',
          type: '3视频直播',
          comp_name: '3广大科技公司',
          type_number: '3V1.2',
          update_date: '32016-05-02',
          download_num: '323.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
        {
          appname: '4喵喵直播',
          apkname: '4bdkdl',
          type: '4视频直播',
          comp_name: '4广大科技公司',
          type_number: '4V1.2',
          update_date: '42016-05-02',
          download_num: '423.6',
        },
      ];
      switchChange(){
        this.istag = !this.istag ;

      };

      current_change(currentPage : number){
        this.currentPage = currentPage;
      };
      created(){
        this.total= this.tableData.length;
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
