import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import VueMobx from "vue-mobx";
import { toJS, observable, isObservable } from "mobx";

Vue.use(VueMobx, {
  toJS,
  observable,
  isObservable
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
