// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { getLocalStorage } from './config/mUtils'
import { 
  Button,
  Row,
  Col,
  Select,
  Option,
  OptionGroup,
  Message,
  Form,
  FormItem,
  Input,
  InputNumber,
  Checkbox,
  Tabs,
  TabPane,
  Tooltip,
  Radio,
  RadioGroup,
  Upload,
 } from 'element-ui'
Vue.config.productionTip = false
Vue.prototype.$message = Message;
Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tooltip);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Upload);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted() {

  }
})
