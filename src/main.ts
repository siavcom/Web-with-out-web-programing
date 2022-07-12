import { createApp } from "vue";
import App from "./App.vue";  // Comienza la aplicacion aqui
import router from "./router";
//import $VueSimpleAlert from "vue3-simple-alert"; // mensajes de alerta  npm i vue-simple-alert Vue.use(VueSimpleAlert);
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
//import VueVirtualScroller from "vue-virtual-scroller";
//import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'



import "@/components/styles.css"  // Estilos default de los componentes
//import App from "./views/Siavcom.vue";

//createApp(App).use(router).mount("#app");

const app = createApp(App).use(router);
app.config.errorHandler = (err: any, vm, info) => {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in

  //  {
  //    "data": "",
  //    "status": 501,
  //    "statusText": "Registro actualizado por otro usuario",
  //    "headers": {
  //        "content-type": "text/plain"
  //    },
  //    "config": {
  //        "url": "http://176.16.200.20:58080/siavcom",
  //        "method": "post",
  //        "data": "{\"tip_llamada\":\"UPDATE\",\"tok_aut\":\"\",\"nom_vis\":\"vi_lla1_nom\",\"dat_act\":{\"key_pri\":20,\"timestamp\":76935,\"dcr_nom\":\"15\"}}",
  //        "headers": {
  //            "Accept": "application/json, text/plain, */*",
  //            "Content-Type": "application/json"
  //        },
  //        "transformRequest": [
  //            null
  //        ],
  //        "transformResponse": [
  //            null
  //        ],
  //        "timeout": 0,
  //        "xsrfCookieName": "XSRF-TOKEN",
  //        "xsrfHeaderName": "X-XSRF-TOKEN",
  //        "maxContentLength": -1,
  //        "maxBodyLength": -1
  //    },
  //    "request": {}
  //}

  // Error NodeJS
  const response = err.response;
  if (response && response.status >= 400 && response.status < 455) {
    console.log("================== STATUS ==========>", response.status);

    console.log("================== INFO ==========>", info);
    console.log("================== Mensaje =========>>>", response.statusText);

    Swal.fire("error", response.statusText);

    //$VueSimpleAlert.alert("error", response.statusText);
    // return false to stop the propagation of errors further to parent or global error handler

    return false;
  } else {
    console.log("=== ERROR ===>", err, info);
    return false;
  }
};
// Montamos el VueSweetalert2 y lo hacemos publico
app.use(VueSweetalert2);
window.Swal =  app.config.globalProperties.$swal;
//app.use(VueVirtualScroller);
app.mount("#app");

//createApp(App).mount("#app");
/*
import Vue from "vue";
import App from "./App.vue";
import VueVirtualScroller from "vue-virtual-scroller";
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.use(VueVirtualScroller);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("

*/