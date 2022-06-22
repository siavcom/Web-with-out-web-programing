//////////////////////////////////////////////
// Clase : OpenDataBase
// Descripcion : Conecta con un servidor node que esta sirviendo los servicios de la base de datos
// Author : Fernando Cuadras Angulo
// Creacion : Octubre/2021
// Ult.Mod  : 
//            
/////////////////////////////////////////////
//import {inject } from "vue";
import router from "@/router";
import axios from "axios";


import dat_emp from '@/empresas/datos.json';
const Storage= sessionStorage
export class OpenDb {
  // propiedades de las clases
  url: string;
  nom_emp: string;
  user: string;
  pass: string;


  // Inicializa la conexion
  constructor(url: string, nom_emp: string, user: string, pass: string) {
    this.url = url == null ? "http://176.16.200.20:38080/" : url;
    this.nom_emp = nom_emp == null ? "Demo" : nom_emp;
    this.user = user == null ? "sa" : user;
    this.pass = pass == null ? "*******" : pass;
    /*    
        localStorage.setItem('id_con','')
        localStorage.setItem('nom_emp','')
        localStorage.setItem('log_usu','')
        localStorage.setItem('url','')
    */


  } // Fin constructor

  ////////////////  open  ///////////////////
  // Hace la conexion al servidor NODEJS que
  // comunica con el servidor de SQL
  ///////////////////////////////////////////
  open = async () => {
    /*  localStorage.removeItem('id_con')
        localStorage.removeItem('nom_emp')
        localStorage.removeItem('log_usu')
        localStorage.removeItem('url')
    
    */
    //    const nom_emp:any=localStorage.getItem('id_con')

    let nom_emp: any = this.nom_emp
    let user: any = this.user
    let pass: any = this.pass
    //  let url: any = this.url

    if (nom_emp.length == 0 || user.length == 0 || pass.length == 0) {
      nom_emp = Storage.getItem('nom_emp')
      user = Storage.getItem('user')
      //    url = localStorage.getItem('url')
    }
    if (nom_emp.length == 0 || user.length == 0 || pass.length == 0) {
      router.push('/Login')
    }

    const url = dat_emp[nom_emp].url // obtenemos el url del servidor node 

    const def_con = { nom_emp: nom_emp, user: user, pass: pass };
    const json = JSON.stringify(def_con);
    // console.log('Conexion Axios==>>',json)
    try {
      const response = await axios.get(
        url + "login?json=" + json
        // { headers: { "Content-type": "application/json" } }
      );
      //console.log('renglon blanco =====>',response.data.ren_blanco);
      // Eslint-disable-next-line prettier/prettier
      const id_con = response.data.id; // asignamos a su conexion de base de datos
      // console.log("ID de conexion", id_con);

      Storage.setItem('id_con', id_con)
      Storage.setItem('nom_emp', this.nom_emp)
      Storage.setItem('user', this.user)
      return id_con;
    } catch (error) {
      if ( error=='Error: Network Error')  {
        console.log('OpenDb Error SQL===>',error)

        Swal.fire('Error SQL'+error) 
         return ''
      } 

      //console.log('OpenDb error ===>',error.response.status.toString() + " " + error.response.statusText)
      Swal.fire('SQL ERROR  ',error.response.status.toString() + " " + error.response.statusText, "Data Base Error ") 
      
      return '';
    } // Fin de Catch
  }

  ////////////////  open  ///////////////////
  // Hace la conexion al servidor NODEJS que
  // comunica con el servidor de SQL
  ///////////////////////////////////////////
  ver_con = async () => {

    //  sin no se ha inicilizado la conexion aborta todo
    if (!Storage.getItem("id_con") || Storage.getItem("id_con") == '') {
      router.push('/Login')
      return
    }


    //va hacer una consulta para ver si sigue activa la conexion
    const id_con: any = Storage.getItem("id_con");



   const nom_emp :any= Storage.getItem("nom_emp");
   const url = dat_emp[nom_emp].url // obtenemos el url del servidor node 

    const dat_vis = {
      id_con: id_con,
      tip_llamada: "SQLEXEC",
      //tok_aut: this.tok_aut,
      query: 'SELECT 1+1 AS result',

    };
    try {
      const response = await axios.post(url + "sql", dat_vis, {
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      // si no es un error de desconexion
      if (error.response.status.toString() != 409) {
        return true
      }
      return false
    }
    return true;
  };

}


