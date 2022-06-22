import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
//import Home from "@/views/Home.vue";

import Siavcom from "../views/Siavcom/Siavcom.vue"
import Login from "../views/Login/Login.vue"
//import tomaKms from "../views/tomaKms/tomaKms.vue"
//import come9101 from "../views/come9101/come9101.vue"
import come9101 from "@/views/come9101/Main.vue"


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",  // http://Login   path (requerido)
    name: "Login", // Nombre (opcional)
    component: Login,  //Componente a llamar segun su import Login from "@/views/Login/Form.vue"
  },

 
  {
 //   path: "/Login:nom_sis/:url_srv",  //    /:url_srv http://Login  
    path: "/Login",  //    /:url_srv http://Login   path (requerido)
    name: "Login", // Nombre (opcional)
    component: Login,  //Componente a llamar segun su import Login from "@/views/Login/Form.vue"
    props: true
  },

  {
    //   path: "/Login:nom_sis/:url_srv",  //    /:url_srv http://Login  
       path: "/come9101",  //    /:url_srv http://Login   path (requerido)
       name: "come9101", // Nombre (opcional)
       component: come9101,  //Componente a llamar segun su import Login from "@/views/Login/Form.vue"
       props: true
     },
   
/*
  {
       path: "/tomaKms",  //    /:url_srv http://Login   path (requerido)
       name: "tomaKms", // Nombre (opcional)
       component: tomaKms,  //Componente a llamar segun su import Login from "@/views/Login/Form.vue"
       props: true
     },
*/  
  {
    path: "/NotFound",
    name: "NotFound",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/NotFound.vue"),
  },
  {
   // path: "/Siavcom:id_con",
    path: "/Siavcom",
    name: "Siavcom",
    component: Siavcom,
    //props: true,
 /*   path: "/user/:name", // <-- notice the colon
    name: "User",
    component: User,
    props: true,
    en el componente 

     props: ["name"],

     */

  },

  {
    path: "/:catchAll(.*)",
    component: () =>
      import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
