// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';
import Print from 'vue-print-nb'
import 'babel-polyfill'
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
  Checkbox,
  Tabs,
  TabPane,
  Tooltip,
  Radio,
  RadioGroup,
  Upload,
  DatePicker,
  Loading,
  Dialog,
  Card,
  Alert,
  MessageBox,
  Collapse,
  CollapseItem,
  Progress,
 } from 'element-ui'
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
Vue.use(DatePicker);
Vue.use(Loading.directive);
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Alert);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Progress);

Vue.use(VueAreaLinkage);
Vue.use(Print);  

Vue.config.productionTip = false
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    // 判断是否登录
    store.dispatch('isLogin')
    // 获取基础数据
    store.dispatch('setting')
  },
  methods: {

  },
  mounted() {
    
  }
})
