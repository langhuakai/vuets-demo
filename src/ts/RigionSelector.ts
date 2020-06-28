import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import RigionSelector from "../components/RigionSelector.vue";

interface Area {
  name: string;
  value: string;
  parent: string ;
}
interface Address{
  province: string;
  city: string;
  origin: string;
}
interface Province {
  label: string;
  value: string;
  children: City[];
}
interface City {
  label: string;
  value: string;
  children: Origin[];

}
interface Origin {
  label: string;
  value: string;
}

@Component
export default class RegionSelector extends Vue {

      @Prop({
        default: () => {
          province: '';
          city: '';
          origin: '';
        }
      })
      componentAddress!: Address;
      public address: Address = this.componentAddress;
      public valueProvince: string = '';// 所选的省
      public valueCity: string = ''; // 所选的市
      public valueOrigin: string = ''; // 所选的区
      public provinceList: Province[] = []; // 省列表
      public cityList: City[] = []; // 市列表
      public originList: Origin[] = []; // 区列表
      public cityOptions: City[] = []; // 市下拉框数据
      public originOptions: Origin[] = []; // 区下拉框数据

      created() {
        this._getJsonData();
      };

      mounted () { // 在mounted时候赋值，子组件只更新一次，后面重新选择后展示此组件的数据，不再更新
         
      };
    
      
       // 选择省
      public changeProvince(val: string):void {
         this.provinceList.forEach((province, index) => {
           if (val.toString() === this.provinceList[index].value) {
             this.cityOptions = this.provinceList[index].children
             this.originOptions = this.provinceList[index].children[0].children
             this.address.city = this.provinceList[index].children[0].value
             this.address.origin = this.provinceList[index].children[0].children[0].value
           }
         })
      };
      // 选择市
      changeCity(val: string) {
        this.cityList.forEach((city, index) => {
          if (val.toString() === this.cityList[index].value) {
            this.originOptions = this.cityList[index].children
            this.address.origin = this.cityList[index].children[0].value
          }
        })
      };
      // 选择区
      changeOrigin(val: string) {
        this.address.origin = val
      };
      public _getJsonData() {
        console.log("-----------------------开始解析");
       // let data: Area[] = require('../static/china_address');
        let data: Area[] = require('../../public/china_address.json')
        console.log(data);
        this.provinceList = []
        this.cityList = []
        this.originList = []

        data.forEach((item: Area) => {
          if (item.value.match(/0000$/)) {
            this.provinceList.push({
              value: item.value,
              label: item.name,
              children: [],
            });
          } else if (item.value.match(/00$/)) {
            this.cityList.push({
              value: item.value,
              label: item.name,
              children: [],
            })
          } else {
            this.originList.push({
              value: item.value,
              label: item.name,
            })
          }
        });
        console.log('--------------for结束--------------------------');
        for (let index in this.provinceList) {
          for (let index1 in this.cityList) {
            if (this.provinceList[index].value.slice(0, 2) === this.cityList[index1].value.slice(0, 2)) {
              this.provinceList[index].children.push(this.cityList[index1]);
            }
          }
        }
        for(let item1 in this.cityList) {
          for(let item2 in this.originList) {
            if (this.originList[item2].value.slice(0, 4) === this.cityList[item1].value.slice(0, 4)) {
              this.cityList[item1].children.push(this.originList[item2]);
            }
          }
        }
      };

      public clear(): void {
          this.valueProvince= '';// 所选的省
          this.valueCity= ''; // 所选的市
          this.valueOrigin= ''; // 所选的区
      }

      @Watch('componentAddress')
      onComponentAddressChanged(newValue: Address, oldValue: Address) {
        this.address = newValue;
      }
  
}