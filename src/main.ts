import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import './element-variables.scss';
import axios from 'axios';

Vue.use(Element)

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;


interface Config{
	type: string;
	url: string;
	data?:string;
	dataType:string;
}

function ajax(config: Config){
	let xhr = new XMLHttpRequest();
	xhr.open(config.type, config.url, true);
	xhr.send(config.data);
	xhr.onreadystatechange = function (){
		if(xhr.readyState == 4 && xhr.status == 200){
			console.log('success')
		}
	}
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
