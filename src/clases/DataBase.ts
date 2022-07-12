//////////////////////////////////////////////
// Clase : DataBase
// Descripcion : Conecta con un servidor node que esta sirviendo los servicios de la base de datos
// Author : Fernando Cuadras Angulo
// Creacion : Enero/2021
// Ult.Mod  : 15/Jul/2021.- Se implementa jsStore para el manejo indexedDb donde quedara guardara los datos
//                           recuperados de la base de datos
//            23/Ags/2021 cambiamos a guardar en string los date
/////////////////////////////////////////////

/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint
//global axios, db, url, messagebox
//eslint no-undef: "error"

//import { inject, ref } from "vue";
import { Functions } from '@/clases/Functions'
import axios from "axios";
//import { getCurrentInstance } from "vue";
//import VueSimpleAlert from "vue3-simple-alert"; // mensajes de alerta  npm i vue-simple-alert Vue.use(VueSimpleAlert);

//import { DATA_TYPE } from "jsstore";
//import { newLocalDb } from "@/services/jsstore_con_new";
//import { oldLocalDb } from "@/services/jsstore_con_old";
//import { Connection } from "jsstore";
import alasql from "alasql";



import workerInjector from "jsstore/dist/worker_injector";
import dat_emp from '@/empresas/datos.json' // json con los datos de la empresa, substituye comeemp
const Storage = sessionStorage;
//import { Global } from "@/Global";
//import moment from 'moment'  // manejo de fechas



export class VFPDB {
  // propiedades de las clases
  name = 'VFPDB'
  url: string;
  nom_emp: string;
  user: string;
  pass: any;
  //vis_tra: any = []; // guarda nombre de las vistas de trabajo en el servidor SQL
  are_tra: string[] = [""]; // Las areas de trabajo donde cada vista tendra.
  // Inicilizamos el elemento 0 ya que el select 0 indica nueva area a utilzar 

  num_are: number; // numero de area de trabajo que se esta en este momento
  //db: any = {}; // estructura de toda la base de datos
  View: any = {}; // aqui se guarda toda la informacion de las vistas SQL ( estructura, recno, recCount, exp_ind)
  messagebox = Functions.Messagebox; // asignamos las clases de VueSimpleAlert a messagebox
  Form = {} // any = getCurrentInstance();
  Ctx = {} //this.Form.ctx; // Contexto
  id_con: string;
  event: any;
  newTables = [];
  oldTables = [];
  Estatus: boolean


  /*
    newData = {
      name: "New",
      tables: [],
    };
    oldData = {
      name: "Old",
      tables: [],
    };
  */
  // Inicializa la conexion
  constructor() {

    this.Estatus = false
    this.url = ''
    this.nom_emp = ''
    this.user = ''

    this.num_are = 0;
    const id_con: any = Storage.getItem('id_con')
    this.id_con = id_con;
    // recupera datos de conexion 
    const nom_emp: any = Storage.getItem('nom_emp')
    if (nom_emp) {
      const user: any = Storage.getItem('user')

      const url = dat_emp[nom_emp].url // obtenemos el url del servidor node 
      this.url = url
      this.user = user
      this.nom_emp = nom_emp
    }

    //try {
    alasql('DROP DATABASE IF EXISTS Temporales ;')
    alasql('CREATE DATABASE Temporales ;')
    alasql('DROP DATABASE IF EXISTS Now ;')
    alasql('CREATE DATABASE Now ;')
    alasql('DROP DATABASE IF EXISTS Last ;')
    alasql('CREATE DATABASE Last ;')


    /*
    this.borraLocalDb('New');  // Borra primero toda la Base de datos local
    this.borraLocalDb('Old')
    */
    this.Estatus = true
    /* }
     catch (error) {
       console.log('Error borrar Local Db ', error)
       this.messagebox.alert(
         error,
         "Error borraLocalDb ",
         "error"
       );
     }*/


    //    alasql('CREATE INDEXEDDB DATABASE IF NOT EXISTS TEMP_; \
    //                  ATTACH INDEXEDDB DATABASE TEMP_;' )

    // alasql("CREATE DATABASE 'new'; CREATE DATABASE 'old'")
    //await alasql.promise(`ATTACH INDEXEDDB DATABASE ${dbName};USE DATABASE ${dbName};`);

    //   console.log(this.id_con, this.url, this.user)
  } // Fin constructor

  public async Init(Form) {
    this.Form = Form  //.value
  }


  ////////////////  open  ///////////////////
  // Hace la conexion al servidor NODEJS que
  // comunica con el servidor de SQL
  ///////////////////////////////////////////
  open = async (pass: string) => {
    while (!this.Estatus) {
      console.log('esperando cambio de estatus')

    }
    Storage.setItem('id_con', '')
    const def_con = { nom_emp: this.nom_emp, user: this.user, pass: pass };
    const json = JSON.stringify(def_con);
    try {
      const response = await axios.get(
        this.url + "login?json=" + json
        // { headers: { "Content-type": "application/json" } }
      );
      //console.log('renglon blanco =====>',response.data.ren_blanco);
      // Eslint-disable-next-line prettier/prettier
      this.id_con = response.data.id; // asignamos a su conexion de base de datos
      Storage.setItem('id_con', this.id_con)

      return true;
    } catch (error) {
      this.messagebox(
        error.response.status.toString() + " " + error.response.statusText,
        "Error SQL "

      );
      return false;
    } // Fin de Catch
  };

  ////////////////  Vfp Use nodata ///////////////////
  // nom_vis : Nombre de la vista a utilizar
  ////////////////////////////////////////////////////

  useNodata = async (nom_vis: string, alias?: string) => {

    while (!this.Estatus) {
      console.log('esperando cambio de estatus')
    }

    if (nom_vis == null) {
      this.messagebox("No se permite nombre de vista en null", "error");
      return false;
    }
    if (!alias) {
      // Si no hay alias asigna el mismo nombre de la vista
      alias = nom_vis;
    }

    // La vista esta definida en forma reactiva desde la forma principal y es donde estan los
    // valores de los componentes, por lo que aqui aparece en el contexto de la forma
    // Por el momento se quita y se graba en localDb
    //const vis_act = ThisForm.ctx[alias];

    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: "USENODATA",
      // tok_aut: this.tok_aut,
      nom_vis: "",
    };

    dat_vis.nom_vis = nom_vis; // Nombre de la vista
    try {
      //const response = await this.axiosCall(dat_vis)
      const response: any = await this.axiosCall(dat_vis)
      if (response == null) {
        console.error("==== . No existe la tabla===>", alias);
        return false
      }
      // console.log('USENODATA ===>',response)
      await this.genera_tabla(response, alias, true)  // generamos la tabla segun la estructura regresada
      //  this.View[alias] = response; // Generamos la vista, asignamos su estructura  y filtros de condiciones

      return true
      /*
        //this.View[alias]["ref"] = vis_act; // referencia a la vista de actualizacion
  
        this.newTables[alias] =
        {
          name: alias,
          columns: {
            recno: {
              primaryKey: true,
              autoIncrement: true,
            },
          },
        };
  
        // this.oldData.tables[0]={
        //const oldTabla = {
        this.oldTables[alias] = {
          name: alias,
          columns: {
            recno: {
              primaryKey: true,
              autoIncrement: false,
            },
          },
        };
  
   
        // recorre todos los campos de la tabla y genera su estructura
        // const valores ={}
  
        // Como la tabla es nueva, genera la tabla con la estructura que tiene la la tabla
        let des_tab = ' CREATE TABLE ' + alias + ' (recno INT PRIMARY KEY'
        for (const nom_ele in this.View[alias].est_tabla) {
          const campo = this.View[alias].est_tabla[nom_ele];
       
          //    valores[campo]=null;
          let dataType: string; // :any asignamos el tipo de datos a newLocalDb
          switch (campo.tip_cam) {
            case "C":
              // dataType = DATA_TYPE.String;  // localDb
              dataType = 'STRING'
              //  this.View[alias].valores[nom_ele] = ''
              break;
            case "I":
              //            dataType = DATA_TYPE.Number;
              dataType = 'INT';
              //  this.View[alias].valores[nom_ele] = 0
              break;
            case "N":
              //            dataType = DATA_TYPE.Number;
              dataType = 'NUMBER';
              //  this.View[alias].valores[nom_ele] = 0
              break;
            case "D":
              // 23/Ags/2021   dataType = DATA_TYPE.DateTime;
              //            dataType = DATA_TYPE.String;
              dataType = 'DATE';
            //  this.View[alias].valores[nom_ele] = '1900-01-01'
  
            case "T":
              // 23/Ags/2021   dataType = DATA_TYPE.DateTime;
              //            dataType = DATA_TYPE.String;
              dataType = 'TIME';
              //this.View[alias].valores[nom_ele] = '1900-01-01'
  
              break;
            case "L":
              //            dataType = DATA_TYPE.Boolean;
              dataType = 'INT';
              //this.View[alias].valores[nom_ele] = 0
  
              break;
            default:
              //            dataType = DATA_TYPE.String;
              dataType = 'STRING';
            //this.View[alias].valores[nom_ele] = ''
  
          }
  
          des_tab = des_tab + ',' + nom_ele + ' ' + dataType
  
         
        }
        des_tab = des_tab + ')'
        // Creamos la tablas 
        alasql('USE Now ; DROP TABLE IF EXISTS Now.' + alias + '; ')
        alasql(des_tab)
  
        alasql('USE Last ; DROP TABLE IF EXISTS Last.' + alias + '; ')
        alasql(des_tab)
  
        //   console.log('Vista creada ===', des_tab, alasql('SELECT * from Last.' + alias))
  
        return true;
        // return this.View[alias].new[0]
        */
    } catch (error) {
      console.error(error)

      return false
      //  this.errorSql(error)

    }
  };


  ////////////////  Vfp USE /////////////////////
  // nom_vis  : Nombre de la vista a utilizar
  // m        :  Varibles de memoria a pasar
  // alias    : Alias
  ///////////////////////////////////////////////
  //  use = async (obj_vis:any, nom_vis:any , m: {}, alias?:any) => {
  use = async (nom_vis: string, m: Record<string, never>, alias: string) => {
    while (!this.Estatus) {
      console.log('esperando cambio de estatus')

    }

    if (!alias) {
      alias = nom_vis; // asignamos el nombre de la vista

    }
    if (await this.select(alias) == 0) // si el alias no existe
      await this.useNodata(nom_vis)


    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: "USE",
      //tok_aut: this.tok_aut,
      nom_vis: nom_vis,
      where: "",
    };

    if (this.View[alias].tip_obj = 'VIEW') // si es una VIEW
    {
      dat_vis['query'] = 'select * from ' + nom_vis
      dat_vis.tip_llamada = 'SQLEXEC'
    }
    // la expresion del indice es generada desde el servidor de node y es formada 
    // por un objeto json el cual utiliza los model del sequelize
    // { cop_nom=m.cop_nom, cod_nom=m.cod_nom }

    var exp_ind = ''
    var exp_whe = ''
    if (this.View[alias].tip_obj = 'VIEW') // si es una VIEW
    {

      if (this.View[alias].exp_indice.trim().length > 0)
        exp_ind = eval(this.View[alias].exp_indice)

      const exp_whe = this.View[alias].exp_where.trim()     //  `${a}`

      if (exp_ind.length + exp_whe.length > 0) {
        dat_vis['query'] = dat_vis['query'] + ' where '

        if (exp_ind.length > 0 && exp_whe.length > 0)
          dat_vis['query'] = dat_vis['query'] + exp_ind + ' and ' + exp_whe

        if (exp_ind.length > 0 && exp_whe.length == 0)
          dat_vis['query'] = dat_vis['query'] + exp_ind

        if (exp_ind.length == 0 && exp_whe.length > 0)
          dat_vis['query'] = dat_vis['query'] + exp_whe

      }

    }
    else  // es un MODEL
      eval("dat_vis.where=" + this.View[alias].exp_indice); // obtenemos la expresion del indice

    console.log('USE llamada Axios====>', dat_vis)

    // console.log("VfpDb use llamada axios========>", dat_vis);


    try {

      const response = await this.axiosCall(dat_vis)

      //console.log('Axios Ok response =====>', response) //.data
      const respuesta = response;

      return await this.genera_tabla(respuesta, alias)  // genera tabla Now y Last
    } catch (error) {
      console.error(error);

      this.messagebox(
        error.response.status.toString() + " " + error.response.statusText,
        "Error SQL ")


      return false;
    }
  };


  ////////////////  Vfp obten un registro  /////////////////////
  // nom_vis  : Nombre de la vista a utilizar
  // key_pri  :  Key_pri
  ///////////////////////////////////////////////
  // aqui me quede . revisar todo esto, puede que la tabla tenga varios alias

  obtRegistro = async (nom_tab: "", key_pri: number) => {

    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: "USE",
      //tok_aut: this.tok_aut,
      nom_vis: nom_tab,
      where: { key_pri: key_pri },
    };


    try {
      const response = await this.axiosCall(dat_vis)

      /*      const response = await axios.post(this.url + "sql", dat_vis, {
              headers: { "Content-type": "application/json" },
            });
      
            */
      const respuesta = response.data;

      return respuesta[0]; //response.data;
    } catch (error) {
      console.error(error);
      this.messagebox(
        error.response.status.toString() + " " + error.response.statusText,
        "Error SQL "
      );

      return false;
    }
  };

  ////////////////  Vfp table update /////////////////////
  // nRows     :  =0 Solo el registro actual
  //              =1 Todos los registros de la vista hasta encontrar un error de actualizacion. Si TableUpdate encuentra un registro que no
  //                puede ser actualizado, fallará en ese punto y retornará un valor de .F., indicando que ha fallado. Ningún registro más allá del que tiene el problema será procesado.
  //              =2 Todos los registros de la vista. Si encuentra un error de actualizacion,
  //                forzara la actualizacion con los datos propios.

  // nom_vis  : Nombre de la vista a utilizar
  // m        :  Varibles de memoria a pasar
  //
  ///////////////////////////////////////////////
  tableUpdate = async (nFilas?: number, force?: boolean, alias?: string) => {
    if (!nFilas) nFilas = 0;

    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }
    if (alias == '') return true;// no hay alias a actualizar
    let sw_val = true;
    const nom_vis = this.View[alias].tablaSql; // obtenemos el nombre original de la tabla segun su alias para actualizar en SQL
    const recno = this.View[alias].recno; // obtenemos el recno a actualizar
    const recCount = this.View[alias].recCount; // obtenemos el recCount de la vista

    if (recCount == 0) { // la vista no tiene registros a actualizar
      console.log("No hay registros en este alias", alias);
      return false;
    }
    // select para localDb
    const select = {
      from: alias,
      order: {
        by: 'recno',
        type: 'asc'
      }
    };
    let where = ''  // where alasql
    if (nFilas == 0) {
      // Solo actualiza un registro
      if (!recno) { // No hay registro a actualizar
        this.messagebox("No hay recno activo en " + alias, "ERROR");
        return;
      }
      select["where"] = { recno: recno };
      where = ' WHERE recno=' + recno
    }
    // obtenemos los datos a actualizar
    console.log("Table Update Alias =========>", alias, select);
    const dat_act = alasql('USE Now; SELECT * FROM ' + alias + ' ' + where)

    /*    LocalDb
    const dat_act: any = await newLocalDb.select(select);
    */

    console.log('Datos leidos  de localDB para actualizar ', dat_act);
    if (dat_act.length == 0) return; // No hay datos a actualizar

    // llamado AXIOS
    const dat_vis: any = {
      id_con: this.id_con,
      tip_llamada: "UPDATE",
      //tok_aut: this.tok_aut,
      nom_vis: nom_vis,
      dat_act: {},
    };

    // Recorremos todos los datos a actualizar

    for (let i = 0; i < dat_act.length; i++) {
      // recorre los registros de la vista a actualizar
      // asignamos key_pri y timestamp del registro
      dat_vis.dat_act["key_pri"] = dat_act[i].key_pri;
      dat_vis.dat_act["timestamp"] = dat_act[i].timestamp;

      // Nos traemos los datos de Old para ver cuales son los registros que cambiaron

      /* localDb
      select["where"] = { recno: dat_act[i].recno };
      const old_dat = await oldLocalDb.select(select);
      */

      const old_dat = alasql(' USE Last; SELECT * FROM ' + alias + ' WHERE recno=' + dat_act[i].recno)


      // Recorremos todos los campos para ver cual cambio para mandarlo actualizar campo.old != campo.new
      if (dat_act[i].key_pri == 0 || old_dat.length == 0) {
        dat_vis.tip_llamada = "INSERT";
      }
      for (const campo in dat_act[i]) {  //  recorremos todos los campos del registro  actualizar
        // Si el campo nuevo o es diferente al viejo, aumentamos en los datos a actualizar
        if (
          dat_vis.tip_llamada == "INSERT" ||
          old_dat[campo] != dat_act[i][campo]
        ) {
          dat_vis.dat_act[campo] = dat_act[i][campo];
        }
      }

      this.View[alias].recCount = i; // actualiza el recCount de la vista
      const recno = dat_act[i].recno;
      console.log("Actualizara con Axios vista ", dat_vis.dat_act,);


      // aqui me queda  const response = await this.axiosCall(this.url + "sql", dat_vis)

      const response = await this.axiosCall(dat_vis)
      if (response.data)  // No hay error
      {
        const respuesta = response.data[0];
        respuesta.recno = recno;
        //console.log('Lee nuevo timestamp y/o recno ===> ', alias, respuesta);

        /* LocalDb
        this.updateLocalDb(alias, respuesta);  // actualizara timestamp actual
        */
        alasql('USE Now;\
                DELETE '+ alias + ' WHERE recno=' + recno + ';\
                INSERT INTO '+ alias + ' VALUES ?', [respuesta])

        alasql('USE Last;\
                DELETE '+ alias + ' WHERE recno=' + recno + ';\
                INSERT INTO '+ alias + ' VALUES ?', [respuesta])



      } else { // hay error, obtiene los datos nuevos que tiene el registro y vuelve a grabar
        const respuesta = await this.obtRegistro(nom_vis, dat_act[i].key_pri); // se trae de nuevo los datos

        respuesta.recno = recno;
        //console.log('Obtuvo nuevos datos ===>',respuesta);

        /* localDb
        this.insertLocalDb(alias, respuesta);
        */

        alasql('USE Now;\
                DELETE '+ alias + ' WHERE recno=' + recno + ';\
                INSERT INTO '+ alias + ' VALUES ?', [respuesta])

        alasql('USE Last;\
                DELETE '+ alias + ' WHERE recno=' + recno + ';\
                INSERT INTO '+ alias + ' VALUES ?', [respuesta])

        sw_val = false;
      }


      /* 
      await axios
        .post(this.url + "sql", dat_vis, {
          headers: { "Content-type": "application/json" },
        })
        .then((response) => {
          const respuesta = response.data[0];
          respuesta.recno = recno;
          //console.log('Lee nuevo timestamp y/o recno ===> ', alias, respuesta);
          this.updateLocalDb(alias, respuesta);  // actualizara timestamp actual
        })
        .catch(async (error) => {
          this.messagebox.alert(
            error.response.status.toString() + " " + error.response.statusText,
            "Error SQL ",
            "error"
          );
          const respuesta = await this.obtRegistro(nom_vis, dat_act[i].key_pri); // se trae de nuevo los datos

          respuesta.recno = recno;
          //console.log('Obtuvo nuevos datos ===>',respuesta);
          this.insertLocalDb(alias, respuesta);
          sw_val = false;

        });

        */


    } //  Fin del for de graba registro por registro
    return sw_val;
  }; //

  ////////////////  Vfp append blank /////////////////////
  // nom_vis  : Nombre de la vista a utilizar
  ///////////////////////////////////////////////
  appendBlank = async (alias: any, m: Record<string, never>) => {
    // const thisform = this.ThisForm; //getCurrentInstance();

    const ThisForm = this.Form
    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
      alert("No existe la vista SQL " + alias);
      return;
    }


    let recno = 0
    /*
        const res = alasql('USE Now; select min(recno)-1 as recno from ' + alias)
    
       
        if (res[1] && res[1].recno < 0) {
          recno = res[1].recno
        }
        else recno = -1
    */

    // Obtenemos el valor del siguiente recno
    const res = alasql('USE Now; select max(recno)+1 as recno from ' + alias)

    if (res[1] && res[1][0].recno > 0) { // si hay registro
      recno = res[1][0].recno
    }
    else recno = 1  // Si es el primer registro

    const valores = {}
    //console.log('Valores default View 1 ===>', this.View[alias].val_def)
    for (const valor in this.View[alias].val_def) {
      // const val_eval="`"+this.View[alias].val_def[valor]+"`"
      const val_eval = this.View[alias].val_def[valor]
      const val_defa = eval(val_eval)
      valores[valor] = val_defa

    }

    //const val_defa = eval(this.View[alias].val_def)
    console.log('Valores defaul insertados View 2===>', valores)

    alasql('USE Now;\
    INSERT INTO Now.'+ alias + ' VALUES ?', [valores])
    alasql('USE Last;\
    INSERT INTO Last.'+ alias + ' SELECT * FROM Now.' + alias + ' WHERE recno=?', recno)
    console.log('appendBlank alasql =====>', alasql(' SELECT * FROM Now.' + alias + ' WHERE recno=?', recno))
    //   const recno = -(this.View[alias].recCount + 1)  // Incrementamos el valor de los registros
    //    this.View[alias].recno = recno           // asignamos el valor recno

    //   this.View[alias].recnoVal.push(recno)   
    const id=this.View[alias].recnoVal.length
    this.View[alias].recnoVal.push({ recno: recno, id:id })   // insertamos en el arreglo para llenar el grid
    this.View[alias].recCount = this.View[alias].recCount + 1
    this.View[alias].row = this.View[alias].recnoVal.length - 1 //asignamos nuevo row

    return valores

    /* locaDb
    await this.insertLocalDb(alias, valores); // Insertamos los valores blancos en LocalDb
    */
  };

  ////////////////  Vfp delete /////////////////////
  // alias  : Nombre de la vista a utilizar
  // row : Renglon donde se encuentra el registro a borrar
  ///////////////////////////////////////////////
  delete = async (row: number, alias: any) => {
    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
      alert("No existe la vista SQL " + alias);
      return;
    }

    var recno = 0
    if (!row) {
      row = this.View[alias].row
    }

    if (row < 0) return null // no hay row por borrar

    console.log('Delete alias,row,recnoVal ', alias, row, this.View[alias].recnoVal)

    //    recno = this.View[alias].recnoVal[row]  // obtenemos el recno
    recno = this.View[alias].recnoVal[row].recno  // obtenemos el recno

    // obtenemos el key_pri
    const data = alasql('USE Last;\
    select key_pri from '+ alias + ' where recno=?', recno)
    const key_pri = data[1][0]['key_pri']

    // Borrar base de datos si existe el renglon
    if (key_pri > 0) {

      const dat_vis = {
        id_con: this.id_con,
        tip_llamada: "DELETE",
        //tok_aut: this.tok_aut,
        nom_vis: this.View[alias].tablaSql,  // tabla en servidor SQL
        where: "",
      };


      const condicion = {}; // Generamos la condicion

      dat_vis.where = "key_pri=" + key_pri // obtenemos la expresion del indice
      try {
        console.log('delete borra en la base de datos row data recno,data ===>', recno, dat_vis)

        /* borra en la base de datos   ojo *****
        const response = await this.axiosCall(dat_vis)

        console.log('Axios Ok response =====>', response.data)
        const respuesta = response.data;
        */

      }
      catch (error) {
        console.log('Errror en delete', error)
        return null
      }
    }

    //  borra el LolcaDb        
    alasql('USE Last;\
        delete from '+ alias + ' where recno=?', recno)
    alasql('USE Now;\
        delete from '+ alias + ' where recno=?', recno)
    //  borra en el arreglo de recno
    //delete this.View[alias].recnoVal[row];

    console.log('delete antes slice ===>', row, this.View[alias].recnoVal)

    this.View[alias].recnoVal.slice(row, 1);
    // this.View[alias].recnoVal.slice(row)  // borramos de arreglo 
    console.log('delete despues slice ===>', row, this.View[alias].recnoVal)


    if (this.View[alias].recnoVal.length - 1 < row)
      row = this.View[alias].recnoVal.length - 1

    this.View[alias].row = row
    //    recno = this.View[alias].recnoVal[row]
    recno = this.View[alias].recnoVal[row].recno

    return await this.goto(recno)    // se va a leer registro



  }

  ////////////////  Vfp table insert /////////////////////
  // nom_vis  : Nombre de la vista a utilizar
  ///////////////////////////////////////////////
  // Aqui me quede
  insert = async (alias: string, m: Record<string, never>) => {

    if (!alias) {
      // si no se da el alias
      alias = this.are_tra[this.num_are - 1]; // asigna el nombre de la vista segun el area de trabajo
    }

    if (!alias) {
      alert("No existe la vista SQL " + alias);
      return;
    }
    // Leemos los datos a actualizar
    const recno = this.View[alias].recno
    const nom_vis = this.View[alias].tabla

    /*
    const valores = await newLocalDb.select({
      from: alias,
      where: {
        recno: this.View[alias].recno
      }
    });
   */

    const valores = alasql('USE Now;\
            select from '+ alias + ' where renco=?', recno)


    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: "INSERT",
      //tok_aut: this.tok_aut,
      nom_vis: nom_vis,
      where: "",
      dat_act: valores,
    };

    try {
      const response = await this.axiosCall(dat_vis)

      /*
            const response = await axios.post(this.url + "sql", dat_vis, {
              headers: { "Content-type": "application/json" },
            });
      */
      const respuesta = response.data;

      /*
      this.insertLocalDb(alias, respuesta);
      */
      alasql('USE Now;\
              UPDATE '+ alias + '\
              set  key_pri=?,set timestamp=? where recno=? ', respuesta.key_pri, respuesta.timestamp, recno)

      alasql('USE Last;\
              DELETE Last.'+ alias + ' where recno=?;\
              INSERT INTO Last.'+ alias + ' SELECT * from Now.' + alias + ' where recno=?', recno, recno)


      return;
    } catch (error) {
      this.messagebox(
        error.response.status.toString() + " " + error.response.statusText,
        "Error SQL "
      );
      return false;
    }
  };
  //*******************
  ////////////////  sqlexec /////////////////////
  // query  : Query a ejecutar
  //////////////////////////////////////////////
  // Aqui me quede
  execute = async (query: string, alias?: string, tip_res?: string) => {

    if (!alias) {
      // Si no hay alias asigna el mismo nombre de la vista
      alias = 'sqlresult';
    }

    if (!tip_res) {
      // Si no hay alias asigna el mismo nombre de la vista
      tip_res = 'T';
    }


    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: "SQLEXEC",
      query: query,
    }
    try {
      const respuesta = await this.axiosCall(dat_vis)
      //console.log('SQLExec =====>',respuesta)
      // Generamos la extructura de la respuesta
      if (respuesta.length == 0) return false
      //  console.log('Ejecutara ala con  :', respuesta)

      alasql('USE Temporales ; ')
      alasql('DROP TABLE IF EXISTS ' + alias + '; ')


      await this.select(alias)
      // await alasql(' CREATE TABLE ' + alias + ' ; \
      //     SELECT * INTO '+ alias + '  FROM ?', [respuesta])

      /*
           alasql.promise(ins_sql + ' INTO ' + alias + '(' + filename + ')')
              .then(function (data) {
                resultado = data
                console.log('Datos Guardados');
              }).catch(function (err) {
                console.log('select Into Error:', err);
              });
      
      
      
      
      */
      let resp_sql = {}
      //const resp_sql = await
      alasql.promise(' CREATE TABLE ' + alias + ' ; \
          SELECT * INTO '+ alias + '  FROM ?', [respuesta]).
        then(function () {
          alasql.promise('USE Temporales ; SELECT * FROM ' + alias)
            .then(function (data) {
              resp_sql = data
              console.log('Tabla creada en Temporales Nuevo', resp_sql)
            })
            .catch(function (error) {
              console.log('Execute SELECT * FROM ' + alias, error)
            })
        })
      /*
      const est_sql={}  // estructura de la respuesta 
      for (const campo in respuesta[0])
          {
            const tip_dat=respuesta[0].campo.typeof
           
         

            let dataType: any; // asignamos el tipo de datos a newLocalDb
            switch (tip_dat) {
              case "C":
                dataType = DATA_TYPE.String;
                break;
              case "I":
                dataType = DATA_TYPE.Number;
                break;
              case "N":
                dataType = DATA_TYPE.Number;
                break;
              case "D":
                // 23/Ags/2021   dataType = DATA_TYPE.DateTime;
                dataType = DATA_TYPE.String;
                break;
              case "L":
                dataType = DATA_TYPE.Boolean;
                break;
              default:
                dataType = DATA_TYPE.String;
            }
          } */




      //    console.log('Axios sqlexec',response[0][0])
      //    const respuesta = response.data;
      if (alias.toUpperCase() == 'MEMVAR')
        return respuesta
      return true;
    } catch (error) {
      console.log('Error SQL', error)
      /*      this.messagebox.alert(
              error.response.status.toString() + " " + error,
              "Error SQL ",
              "error"
            );
       */
      return false;
    }
  };



  ////////////////  Vfp select() /////////////////////
  // Vista de captura de datos
  // 
  /////////////////////////////////////////////////
  vista_captura = async (m: any, nom_vis: string, alias?: string) => {

    if (!alias) {
      // Si no hay alias asigna el mismo nombre de la vista
      alias = nom_vis
    }
    let query = " SELECT fil_vis FROM man_comevis WHERE nom_vis= '" + nom_vis + "'"

    let exp_where = ''
    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: "SQLEXEC",
      query: query,

    }

    const replacements: any = {}
    // obtenemos el filtro de la vista
    try {
      const data = await this.axiosCall(dat_vis)
      console.log('Respuesta axios data===>', data)
      const respuesta = data[0]
      // console.log('Axios gen_vista data[]==>data,m ',data,m)


      let nom_cam = '';
      let con_vis = '';   // generamos la condicion de la vista
      let exp_vis = data[0].fil_vis.trim().toLowerCase();
      let pos = exp_vis.indexOf(',')  // Posicion de la primera coma

      while (pos > 0) {   // Recorremos todas las variables del indice
        nom_cam = exp_vis.substr(0, pos);
        replacements[nom_cam] = m[nom_cam]
        con_vis = con_vis + nom_cam + ' =: ' + nom_cam;

        exp_vis = exp_vis.substr(pos + 1);
        pos = exp_vis.indexOf(',')
        if (pos > 0) con_vis = con_vis + ' AND '
      }
      if (exp_vis.length > 0) {
        replacements[exp_vis] = m[exp_vis]

        con_vis = ' WHERE ' + con_vis + exp_vis + '=:' + exp_vis

      }

      exp_where = con_vis  // genera la expresion where


    } catch (error) {
      console.log('Error SQL', error)
      /*      this.messagebox.alert(
              error.response.status.toString() + " " + error,
              "Error SQL ",
              "error"
            );
       */
      return false;
    }

    query = ' SELECT * FROM ' + nom_vis + exp_where
    const dat_sel = {
      id_con: this.id_con,
      tip_llamada: "SQLEXEC",
      query: query,
      opciones: { replacements },
    }
    console.log('Axios ==>' + nom_vis, exp_where, replacements)
    try {
      const data = await this.axiosCall(dat_sel)
      //const respuesta = data[0]
      console.log('Axios genera vistas===>>>', data)
      // Aumentamos a la rspuesta el regitro recno
      return await this.genera_tabla(data, alias)

    } catch (error) {
      console.log('Error SQL', error)
      /*      this.messagebox.alert(
              error.response.status.toString() + " " + error,
              "Error SQL ",
              "error"
            );
       */
      return;
    }
  };


  ////////////////  Vfp select() /////////////////////
  // are_sel : area seleccionada
  /////////////////////////////////////////////////
  select = async (are_sel: unknown) => {

    this.Form['dic_dat']['prop']['Status'] = 'F'
    //console.log('Select 0',this.Form)
    if (are_sel == null) {
      return this.num_are;
    }

    if (typeof are_sel == "number") {
      this.num_are = are_sel;
    } else {
      const alias: any = are_sel;
      this.num_are = this.are_tra.indexOf(alias); // busca el numero de alias
      if (this.num_are == -1) this.num_are = 0
      console.log('Db select num_are ====>>', are_sel, this.num_are)

    }
    /* revisar
        this.Form['dic_dat']['prop']['Status'] = 'G'
        this.Form['dic_dat']['prop']['Status'] = 'H'
        this.Form['dic_dat']['prop']['Status'] = 'I'
    */
    return this.num_are;
  }

  /////////////////////////////////////////////////////
  // genera la tabla en alasql 
  // data : json con la estructura de la tabla
  // alias : nombre que tendra la tabla
  // sw_ini : si es useNodata 
  // obs : Borrar si no se utiliza
  /////////////////////////////////////////////////////
  async genera_vista(data: {}, alias: string, sw_ini?: boolean) {

    this.num_are = this.are_tra.indexOf(alias) + 1  // regresa un -1 si no hay elemento

    if (this.num_are == 0) {  // si es una area de trabajo nueva busca si ya existe el alias
      this.are_tra.push(alias); // Se incremente en uno y se asigna que alias tiene

    }
    else { // Si existe la tabla borra los regisros

      alasql('USE Now ; ')
      alasql('delete from Now.' + alias + '; ')
      alasql('USE Last ; ')
      alasql('delete from  Last.' + alias + '; ')
      return
    }
    // Si es una vista nueva
    this.num_are = this.are_tra.indexOf(alias) + 1; // asigna el numero de area de trabajo 
    // Obtenemos la estructura de la vista desde la base de datos

    //////   Estructura
    const dat_est = {
      id_con: this.id_con,
      tip_llamada: "GETDEF",
      query: alias,
    }
    //    console.log('Axios ==>' + nom_vis, exp_where, replacements)
    try {
      const data = await this.axiosCall(dat_est)
      console.log('Estructura vistas===>>', data)

    } catch (error) {
      console.log('Error SQL', error)
      /*      this.messagebox.alert(
              error.response.status.toString() + " " + error,
              "Error SQL ",
              "error"
            );
       */
      return;
    }







    ////////////////////////////////////







    // Inicializamos la vista







    if (!this.View[alias]) {
      this.View[alias] = {} // Generamos el nuevo alias
      this.View[alias]['recnoVal'] = [] // Generamos el arreglo de recnoVal

      if (sw_ini) {
        // agregamos todos los componente de uno por uno para no romper la reactividad
        for (const comp in data) {
          this.View[alias][comp] = data[comp] // asignamos su estructura si es de una vista actualizable
        }
      }
    }
    // por reactividad borramos de uno por uno
    while (this.View[alias]["recnoVal"].length > 0) {
      this.View[alias]["recnoVal"].pop()
    }



    //    delete this.View[alias]['valores']  // borramos el registro de valores 
    this.View[alias]["recno"] = 0; // asignamos el ultimo numero registro de trabajo
    this.View[alias]["recCount"] = 0; // registros totales 
    this.View[alias]["tablaSql"] = alias; // tabla en servidor SQL 


    // if (sw_ini) return  // es la inicializacion de la tabla (useNodata)

    if (!sw_ini || data.length > 0) { // si hay datos

      // Generamos el campo recno
      let recnoVal = []
      for (let i = 0; i < data.length; i++) {
        data[i]['recno'] = i + 1
        //        recnoVal[i] = i + 1
        recnoVal[i]={recno : i + 1, id:i} 

      }


      // Asignamos los valores a la vista 

      //      this.View[alias] = response; // asignamos su estructura  y filtros de condiciones
      this.View[alias]["recno"] = data.length; // asignamos el ultimo numero registro de trabajo
      this.View[alias]["recCount"] = data.length; // registros totales 
      this.View[alias]["tablaSql"] = alias // tabla en servidor SQL 
      this.View[alias]['data'] = data[data.length - 1] // asignamos el valor del ultimo registro


      //this.View[alias]["ref"] = vis_act; // referencia a la vista de actualizacion

      // Bora las tablas
      alasql('USE Now ; DROP TABLE IF EXISTS Now.' + alias + ';')
      alasql('USE Last ; DROP TABLE IF EXISTS Last.' + alias + ';')

      await this.select(alias)

      alasql.promise('USE Now; CREATE TABLE ' + alias + ' ; \
      SELECT * INTO Now.'+ alias + '  FROM ?', [data]).
        then(function () {  // Generara la tabla en Last (old)
          alasql.promise('USE Last; CREATE TABLE ' + alias + ' ; \
          SELECT * INTO ' + alias + ' FROM Now.' + alias)


            .catch(function (error) {
              console.log('Error al generar Vis_captura' + alias, error)
              return
            })

        })

      // revisr despues si al insertar los datos el recno queda como lo habiamos generado
      // o seleccionar los recno para llenar el recnoval
      // recnoVal=alasql(SELECT recno FROM Now.' + alias) 

      this.View[alias].recnoVal = [...recnoVal] // utilizamos el spread Operator 
      console.log('RecnoVal===>',this.View[alias].recnoVa)
    } else this.View[alias]['data'] = {} // no hay datos

  }

  /////////////////////////////////////////////////////
  // genera la tabla en alasql 
  // respuesta : json con los renglones para generar la tabla
  // alias : nombre que tendra la tabla
  // sw_ini : si es useNodata 
  /////////////////////////////////////////////////////
  async genera_tabla(respuesta: {}, alias: string, sw_ini?: boolean) {

    this.num_are = this.are_tra.indexOf(alias) + 1  // regresa un -1 si no hay elemento

    if (!this.View[alias]) sw_ini = true // No hay definicion de vista

    if (this.num_are == 0) {  // si es una area de trabajo nueva 
      this.are_tra.push(alias);
      sw_ini = true

    }
    else { // Si existe la tabla borra los regisros

      alasql('USE Now ; ')
      alasql('delete from Now.' + alias + '; ')
      alasql('USE Last ; ')
      alasql('delete from  Last.' + alias + '; ')
    }

    this.num_are = this.are_tra.indexOf(alias) + 1; // asigna el numero de area de trabajo 

    // Inicializamos la vista

    if (sw_ini) {
      this.View[alias] = {} // Generamos el nuevo alias
      this.View[alias]['recnoVal'] = [] // Generamos el arreglo de recnoVal

      this.View[alias]["tablaSql"] = respuesta.nom_tab; // nombre de tabla en servidor SQL 
      this.View[alias]["exp_indice"] = respuesta.exp_indice
      this.View[alias]["exp_where"] = respuesta.exp_where
      this.View[alias]["tip_obj"] = respuesta.tip_obj  // MODEL O VIEW
      this.View[alias]['data'] = {} // asignamos el valor del ultimo registro
      this.View[alias]['val_def'] = { recno: 'recno' } // valores default
      this.View[alias]['recCount'] = 0  // Total de registros de la vista
      this.View[alias]['eof'] = false  // Fin de archivo 
      this.View[alias]['bof'] = false  // Principio de archivo
      this.View[alias]['row'] = -1  // Renglon posicionado el registro


      // agregamos toda la definicion de la tabla
      if (!respuesta.est_tabla) { // Si no hay estructura de la tabla
        //////   Obtiene la Estructura
        const dat_est = {
          id_con: this.id_con,
          tip_llamada: "GETDEF",
          query: alias,
        }
        //    console.log('Axios ==>' + nom_vis, exp_where, replacements)
        try {
          const estructura = await this.axiosCall(dat_est)
          console.log('Data vista===>>', respuesta)

          respuesta.est_tabla = estructura
          console.log('Estructura vista===>>', respuesta)


        } catch (error) {
          console.log('Error SQL', error)
          /*      this.messagebox.alert(
                  error.response.status.toString() + " " + error,
                  "Error SQL ",
                  "error"
                );
           */
          return;
        }

        ////////////////////////////////
      }
      // Como la tabla es nueva, genera la tabla con la estructura que tiene la la tabla
      let des_tab = ' CREATE TABLE ' + alias + ' (recno INT PRIMARY KEY'

      for (const nom_ele in respuesta.est_tabla) { // genera la descripcion de la tabla para generarla en alasql

        des_tab = des_tab + ',' + nom_ele + ' ' + respuesta.est_tabla[nom_ele].tip_cam
        //        const val_def="${"+respuesta.est_tabla[nom_ele].val_def+"}"
        const val_def = respuesta.est_tabla[nom_ele].val_def
        // const val_def=respuesta.est_tabla[nom_ele].replace('undefined','null')

        this.View[alias].val_def[nom_ele] = val_def

        //  this.View[alias]["val_def"] = val_def.replace('undefined','null')    ; // valores default 

        //        val_def = val_def + nom_ele + ':' + respuesta.est_tabla[nom_ele].val_def + ','


        /*  Indexed Local Data base
        this.newTables[alias].columns[nom_ele] = { notNull: false, dataType: dataType }
        this.oldTables[alias].columns[nom_ele] = { notNull: false, dataType: dataType }
        */

      }
      // console.log('Estructura View respuesta===>', alias, respuesta)
      // console.log('Estructura View ===>', alias, this.View[alias].val_def)



      des_tab = des_tab + ')'
      //console.log('Valores default=====>',alias,this.View[alias].val_def)

      // console.log('ALASQL Estructura ===>',des_tab)
      // Creamos la tablas 
      alasql('USE Now ; DROP TABLE IF EXISTS Now.' + alias + '; ')
      alasql(des_tab)

      alasql('USE Last ; DROP TABLE IF EXISTS Last.' + alias + '; ')
      alasql(des_tab)

    }

    // por reactividad borramos de uno por uno
    while (this.View[alias]["recnoVal"].length > 0) {
      this.View[alias]["recnoVal"].pop()
    }

    //    delete this.View[alias]['valores']  // borramos el registro de valores 
    this.View[alias]["recno"] = 0; // asignamos el ultimo numero registro de trabajo
    this.View[alias]["recCount"] = 0; // registros totales 

    /*    this.View[alias]["tablaSql"] = respuesta.nom_tab; // nombre de tabla en servidor SQL 
        this.View[alias]["exp_indice"] =respuesta.exp_indice
        this.View[alias]["exp_where"] =respuesta.exp_where
        this.View[alias]["tip_obj"] = respuesta.tip_obj
    */
    if (sw_ini) console.log('View creada ===>', alias, this.View[alias])

    if (sw_ini) return  // es la inicializacion de la tabla (useNodata o genera_vista)

    if (respuesta.length > 0) { // si hay datos

      // Generamos el campo recno
      let recnoVal = []
      for (let i = 0; i < respuesta.length; i++) {
        respuesta[i]['recno'] = i + 1
        //        recnoVal[i] = i + 1
        recnoVal[i]={recno : i + 1,id : i}

      }


      // Asignamos los valores a la vista 

      //      this.View[alias] = response; // asignamos su estructura  y filtros de condiciones
      this.View[alias]["recno"] = respuesta.length; // asignamos el ultimo numero registro de trabajo
      this.View[alias]["recCount"] = respuesta.length; // registros totales 
      //    this.View[alias]["tablaSql"] = alias // tabla en servidor SQL 
      this.View[alias]['data'] = respuesta[respuesta.length - 1] // asignamos el valor del ultimo registro


      //this.View[alias]["ref"] = vis_act; // referencia a la vista de actualizacion

      // Borra las tablas

      alasql('USE Now ; DROP TABLE IF EXISTS Now.' + alias + ';')
      alasql('USE Last ; DROP TABLE IF EXISTS Last.' + alias + ';')

      await this.select(alias)

      alasql.promise('USE Now; CREATE TABLE ' + alias + ' ; \
      SELECT * INTO Now.'+ alias + '  FROM ?', [respuesta]).
        then(function () {  // Generara la tabla en Last (old)
          alasql.promise('USE Last; CREATE TABLE ' + alias + ' ; \
          SELECT * INTO ' + alias + ' FROM Now.' + alias)


            .catch(function (error) {
              console.log('Error al generar Vis_captura' + alias, error)
              return
            })

        })

      this.View[alias].recnoVal = [...recnoVal] // utilizamos el spread Operator 
      console.log('View leida ===>', this.View[alias], respuesta)



      if (!this.View[alias].componente) return // si  no hay asignacion a valores de componentes
      const componente = this.View[alias].componente
      // revisar no entiendo
      for (let comp in componente) {  // recorre componente por componente
        for (let i = 0; i < comp.length; i++) {
          componente[comp][i].value = recnoVal[comp] // asignamos el valor a c/componente del form
        }
      }


    } else this.View[alias]['data'] = {} // no hay datos

  }



  ////////////////  Vfp recCount() /////////////////////
  // alias    : Alias
  ///////////////////////////////////////////////
  recCount = async (alias: string) => {

    //const vis_act = obj_vis.value;

    if (alias == null) {
      // liberamos el area de trabajo
      alias = this.are_tra[this.num_are - 1]; // buscamos a cual alias pertenece
    }
    return this.View[alias].recCount;
  }

  ////////////////  Vfp reccno() /////////////////////
  // alias    : Alias
  ///////////////////////////////////////////////
  recno = async (alias: string) => {


    //const vis_act = obj_vis.value;

    if (alias == null) {
      // liberamos el area de trabajo
      alias = this.are_tra[this.num_are - 1]; // buscamos a cual alias pertenece
    }
    return this.View[alias].recno;
  }



  ////////////////////////////////  local Db ///////////////////////////////////

  // Borra  LocalDb
  borraLocalDb = async (db_name: string) => {

    const req = await indexedDB.deleteDatabase(db_name);
    req.onsuccess = function () {
      console.log("Deleted database successfully ", db_name);
    };
    req.onerror = function () {
      console.log("Couldn't delete database ", db_name);
    };
    req.onblocked = function () {
      console.log("Couldn't delete database due to the operation being blocked ", db_name);
    };





    /*
        alasql.promise("DROP INDEXEDDB DATABASE IF  EXISTS 'New' ;").
                          then(()=>{
                            alasql(" DROP INDEXEDDB DATABASE IF  EXISTS 'Old'")
    
                          }).
                          then(()=>{
                            alasql("DROP INDEXEDDB DATABASE IF  EXISTS Temp_ ;")
    
                          }).
                          then(()=>{
                            alasql("CREATE INDEXEDDB DATABASE Temp_ ;")
    
                            console.log('Creo Temp_')
                          }).
                          catch((error)=>{
                            console.log('Error al borrar Base de datos Local')
    
                          })
    */

    //    alasql("CREATE INDEXEDDB DATABASE IF NOT EXISTS temp_;\
    //           ATTACH INDEXEDDB DATABASE temp_")

    //       ATTACH INDEXEDDB DATABASE 'NEW';")

    //alasql("ATTACH INDEXEDDB DATABASE 'NEW';")

    //        ATTACH INDEXEDDB DATABASE 'Old'; \
    //        ATTACH INDEXEDDB DATABASE '_Temp';")

    return



    /*
const newDb = {
name: "New",
tables: []
};
const oldDb = {
name: "Old",
tables: []
};
const tempDb = {
name: "tempDb",
tables: []
};



try {

const conn = new Connection();
conn.addPlugin(workerInjector);
await conn.initDb(newDb);
await conn.dropDb();  // borra toda la base de datos
await conn.terminate();

const old = new Connection();
old.addPlugin(workerInjector);
await old.initDb(oldDb);
await old.dropDb(); // borra toda la base de datos
await old.terminate();

const temp = new Connection();
old.addPlugin(workerInjector);
await old.initDb(tempDb);
await old.dropDb(); // borra toda la base de datos
await old.terminate();



}
catch (error) {
this.messagebox.alert(
error,
"Error clear localDb ",
"error"
);
return false;
}



*/
  }


  // Crea tablas en  LocalDb
  /*
    openLocalDb = async () => {
      // console.log('ALASQL===>',alasql('select * from lla1_tab'))
  
      this.newTables['recno'] =
      {
        name: 'recno',
        columns: {
          recno: {
            primaryKey: true,
            autoIncrement: true,
          },
        },
      };
  
      const newDb = {
        name: "New",
        tables: []
      };
      const oldDb = {
        name: "Old",
        tables: []
      };
  
      const recno_values = {};
  
      try {
  
  
  
        for (const tabla in this.oldTables)  // anexamos todas las tablas
        {
  
          // aumenta la columna con el nombre de la vista en la tabla recno        
          newDb.tables.push(this.newTables[tabla]);
          oldDb.tables.push(this.oldTables[tabla]);
  
          this.newTables['recno'].columns[tabla] = { notNull: false, dataType: DATA_TYPE.Number }
          recno_values[tabla] = null;
  
        }
        const tabla: any = 'recno';
        newDb.tables.push(this.newTables[tabla]);
        console.log('Tablas locales ====>>>', newDb)
  
        await newLocalDb.initDb(newDb);
        await oldLocalDb.initDb(oldDb);
  
  
  
        // insertamos los valores de recno de cada tabla
        await newLocalDb.insert({
          into: "recno",
          values: [recno_values],
        });
  
        // 
  
        // alasql('CREATE INDEXEDDB DATABASE IF NOT EXISTS TEMPO ;\
        //         ATTACH INDEXEDDB DATABASE new;\
        //         ATTACH INDEXEDDB DATABASE old')
  
  
  
        /////////////////////////////
  
  
  
  
      }
      catch (error) {
        this.messagebox.alert(
          error,
          "Error OpenlocalDb ",
          "error"
        );
        return false;
      }
    }
  
    ////////////////////////////////////////////////////
    // Graba valor de la tabla local
    /////////////////////////////////////////
    //  Record<string, unknown>
    async updateLocalDb(alias: string, datos: Record<string, unknown>) {
      // actualizamos el timestamp
      const timestamp = datos.timestamp;
      const recno: any = datos.recno;
      //console.log('updateLocalDb',alias,timestamp,recno);
      //newLocalDb.transaction()
      const resultado = await newLocalDb.update(
        {
          in: alias,
          set: { timestamp: timestamp },
          where: {
            recno: recno
          }
        })
  
      if (resultado == 1) { // si se pudo actualizar leemos datos actuales 
        const updated = await newLocalDb.select({
          from: alias,
          where: {
            recno: recno
          }
        })
        // actualizamos el registro old
        await oldLocalDb.insert({
          into: alias,
          return: true,
          upsert: true,
          values: updated,
        }).then((resultado) => {
          if (resultado) {
            return
          }
          else {
            alert('No se pudo actualizar oldLocalDb');
            return false
          }
  
        })
      }
  
  
    }
    ////////////////////////////////////////////////////
    // Incerta  valores en la tabla local
    /////////////////////////////////////////
    //  Record<string, unknown>
    async insertLocalDb(alias: string, datos: Record<string, unknown>) {
      //  if (datos.recno && datos.recno>0) {
      const ThisForm = this.Form    //.ctx.ThisForm;
      if (datos.length == 0) return true
      const valores = {};
  
  
      // Recorremos todos los registros obtenidos desde la bas de datos y los transforma
      for (const campo in datos) {
        let valor: any = datos[campo];
        if (campo == "recno") valores['recno'] = +valor; // si es el campo recno no busca en la estructura de la tabla
        if (campo != "recno" && campo != "createdAt" && campo != "updatedAt") {
          //console.log('UpdateLocalDb campo',campo);
  
          if (
            this.View[alias].est_tabla[campo].tip_cam == "D" &&
            valor > "1900"
          ) {
            // Si el campo es tipo fecha, le quitamos el tiempo
            valor = valor.substring(0, 10);
          }
          //console.log('Campo==>',campo,this.View[alias].est_tabla[campo].tip_cam,respuesta[i][campo])
          //let val_date= new Date() 
          switch (this.View[alias].est_tabla[campo].tip_cam) {
            case "NUMERIC":
              valores[campo] = +valor; // generamos valores para localDb
              break;
            case "INT":
              valores[campo] = +valor; // generamos valores para localDb
              break;
            case "DATE":
              if (valor) {
                if (valor <= '1900-01-01T9') valor = "1900-01-01T00:00:00.000";
                // 23/Ags/2021 cambiamos a guardar en string     valores[campo] = new Date(valor);
                valores[campo] = valor;
                // console.log('Valor Fecha', campo, valor, 'Valor=' + valores[campo]);
              } else
                valores[campo] = valor;
              break;
              //valores[campo] = moment(valores[campo]).format('YYYY-MM-DD hh:mm') ;//new Date(valor); // generamos valores para localDb
              break;
            case "TIME":
              if (valor) {
                if (valor <= '1900-01-01T9') valor = "1900-01-01T00:00:00.000";
                // 23/Ags/2021 cambiamos a guardar en string     valores[campo] = new Date(valor);
                valores[campo] = valor;
                //  console.log('Valor Fecha', campo, valor, valores[campo]);
              } else
                valores[campo] = valor;
              break;
  
            default:
              valores[campo] = valor; // generamos valores para localDb
          }
        }
      }
      // console.log('UpdateLocalDb', valores);
  
      try {
        const updated: any = await newLocalDb.insert({
          into: alias,
          return: true,
          upsert: true,
          values: [valores]
  
        });
  
        //  console.log(' Incerto en New===>',updated);
        console.log('New ======>', updated);
        if (updated[0].recno && updated[0].recno > 0) {
          const updatedOld: any = await oldLocalDb.insert({
            into: alias,
            return: true,
            upsert: true,
            values: updated,
  
          });
          console.log('old======>', updatedOld);
  
          if (updatedOld[0].recno) {
            const recno = updatedOld[0].recno; //asignamos el nuevo recno
  
            this.View[alias].recno = recno; // actualizamos en la clase
            await newLocalDb.update({
              in: "recno",
              set: {
                [alias]: recno,
              },
            });
  
            const recCount = await newLocalDb.count({ from: alias }); // obtiene el numero de registros
            // console.log('Record Count=======>',recCount)
            this.View[alias].recCount = recCount;
  
          }
          else {
            this.View[alias].recno = null; //asignamos el nuevo recno
            this.View[alias].recCount = 0;
  
          }
        }
  
        // actualizamos los datos de la forma
        for (const campo in ThisForm) {
          if (ThisForm[campo].prop && ThisForm[campo].prop.ControlSource &&
            ThisForm[campo].prop.ControlSource > "     "
          ) {
            const ControlSource = ThisForm[campo].prop.ControlSource;
            //console.log(ControlSource)
  
            const pos = ControlSource.indexOf(".") + 1;
            if (pos > 1) {
              const nom_cam = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
              const nom_tab = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)
  
              if (nom_tab == alias && ThisForm[campo].prop.Value != updated[0][nom_cam]) {
  
                ThisForm[campo].prop.Value = updated[0][nom_cam];
  
              }
            }
          }
        }
  
        return true;
      }
      catch (error) {
        this.messagebox.alert(
          error,
          "Error update localDb ",
          "error"
        );
        return false;
      }
  
      return true;
  
    }
  
  */

  async axiosCall(dat_lla: Record<string, unknown>) {

    const ThisForm: any = this.Form

    if (!(this.id_con > " ")) {
      this.messagebox(
        "No hay conexion con la base de datos",
        "Error SQL Open"
      );
      window.close();
    }

    do {
      try {
        const response = await axios.post(this.url + "sql", dat_lla, {
          headers: { "Content-type": "application/json" },
        });
        const respuesta = response.data;
        return respuesta;
      } catch (error) {
        this.messagebox(
          error.response.status.toString() + " " + error.response.statusText,
          "Error SQL Open"
        );

        // si no es un error de desconexion
        if (error.response.status.toString() != 409) {
          return
        }

        ThisForm.prop.login = false
        Storage.setItem('id_con', '')
      }

    } while (ThisForm.prop.login)
    window.close()

  }

  ////////////////////////////////////////////////////
  // Instruccion sql base de datos local
  // db_name :Base de datos a utilizar
  // ins_sql : Instruccion SQL
  /////////////////////////////////////////
  public async localSql(ins_sql: string) {
    try {
      ins_sql = 'USE Temporales;' + ins_sql
      const resultado = alasql(ins_sql)
      // console.log('Lectura SQL',resultado[1][0])
      return resultado[1]
    }
    catch (error) {
      console.log('localSql error==>', error)
    }
  }

  public async selectInto(ins_sql: string, alias?: string, filename?: string) {
    // alias  : TXT(filename)
    //          CSV(filename,options) 
    //          XLSX("restest280b.xlsx")
    try {
      alasql(' USE Temporales ; ')

      if (!alias) alias = 'sqlresult'

      alias = alias.toUpperCase()
      ins_sql = ins_sql.trim()

      let resultado = {}
      if (alias == 'TXT' || alias == 'CSV' || alias == 'TAB' || alias == 'TSV' || alias == 'XLSX' || alias == 'HTML' || alias) {
        alasql.promise(ins_sql + ' INTO ' + alias + '(' + filename + ')')
          .then(function (data) {
            resultado = data
            console.log('Datos Guardados');
          }).catch(function (err) {
            console.log('select Into Error:', err);
          });
      }
      else {
        alasql('DROP TABLE IF EXISTS ' + alias + '; ')

        const resultado = alasql(ins_sql + ' INTO ' + alias)

        if (resultado.length) { //el resultado es un arreglo
          this.select(alias)
          alasql(' CREATE TABLE IF NOT EXISTS' + alias + ' ; \
        SELECT * INTO '+ alias + '  FROM ?', [resultado])
          const resp = alasql('select * from ' + alias)
          console.log('localSql=>>', resp)
        }
      }
      return resultado
    }
    catch (error) {
      console.log('localSql error==>', error)
    }

  }

  //================================

  ////////////////////////////////////////////////////
  // Lee Value de la tabla local
  /////////////////////////////////////////
  readCampo = async (ControlSource: string, recno: number) => {

    if (ControlSource == "") return; // No  hay ControlSource
    const pos = ControlSource.indexOf(".") + 1;
    if (pos == 1) return; // si no hay definida vista

    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)
    //console.log('readCampo=', tabla, campo, recno)
    const data = await this.nowValue(tabla, campo, recno)
    //console.log('Read renglon ',data[0])

    return data[0][campo]

  };


  ////////////////////////////////////////////////////
  // Lee Valor de Now
  /////////////////////////////////////////
  nowValue = async (tabla: string, campos: string, recno: number) => {
    // console.log('nowValue Select=====>', tabla, campos, recno)

    const data = await alasql('USE Now; SELECT ' + campos + '  FROM ' + tabla + ' WHERE recno=? ;', recno)

    if (data.length > 1) {
      //console.log('Read Renglon===>', data[1][0].constructor.length, data[1][0])
      // console.log('nowValue todos los campos=====>',data[1])
      //      if (data[1][0].constructor.length == 1) return data[1][0][campos] // un solo campo
      //      console.log('nowValue todos los campos=====>',data[1])

      return data[1] // todos los campos

    }
    return null

  };

  ////////////////////////////////////////////////////
  // Lee Valor de Now
  /////////////////////////////////////////
  oldValue = async (tabla: string, campo: string, recno: number) => {

    const data = await alasql('USE Lasr; SELECT ' + campo + '  FROM ' + tabla + ' WHERE recno=? ;', recno)
    if (data.length > 1) return data[1][0][campo]
    return null

  };

  ////////////////////////////////////////////////////
  // Graba Value de la tabla local
  /////////////////////////////////////////
  updateCampo = async (Value: any, ControlSource: string, recno: number) => {
    //async update(Value: any) {
    //  const ControlSource = this.ControlSource;

    if (ControlSource == "" || recno==0) return; // No  hay ControlSource
    const pos = ControlSource.indexOf(".") + 1;
    if (pos == 1) return; // si no hay definida vista

    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const tabla = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)
    let valor = ""

    switch (typeof Value) {
      case "number":
        valor = Value.toString
        break;
      case "string":
        valor = "'" + Value + "'"
        break;
      case "boolean":
        valor = "'" + Value + "'"
        break;
      default:
        valor = "'" + Value + "'"
        break;

    }

    //    if (typeof Value=='string' || )


    try {
      //     await alasql('USE Now;')
      const ins_sql = `USE Now; UPDATE ${tabla}  set ${campo}=${valor}  WHERE recno=${recno}`
      console.log('update ala===',ins_sql,tabla,campo,recno)
      await alasql(ins_sql)
      //    console.log('update componente =>', ins_sql)
      //    console.log('update componente valor=', await this.readCampo(ControlSource, recno))
    }
    catch (error) {
      console.log('AlaSql error==>', error)
    }
    return true;
  }

  ////////////////////////////////////////////////////
  // Graba Value de la tabla local
  /////////////////////////////////////////
  asignaComponente_xx = async (ControlSource: string, refValue: any) => {

    const pos = ControlSource.indexOf(".") + 1;
    if (pos == 1) return; // si no hay definida vista

    const campo = ControlSource.slice(pos).trim(); // obtenemos el nombre del campo
    const alias = ControlSource.slice(0, pos - 1).trim(); // obtenemos el nombre de la vista (queda hasta el punto)

    // Si no esta dado de alta la vista, componente
    if (!this.View[alias])
      this.View[alias] = {
        recnoval: []
      } // objeto vacio

    if (!this.View[alias].componente) this.View[alias].componente = {} // arreglo vacio

    if (!this.View[alias]["componente"][campo]) this.View[alias]["componente"][campo] = []

    this.View[alias]["componente"][campo].push(refValue) // aumenta el arreglo con las referencias componentes



  }
  ////////////////////////////////////////////////////
  // goto : se mueve al registro donde si  
  // despla : Si es numerico brinca al recno con ese numero, 
  //          Si es string top=brinca la primer registro del alias, botton=brinca la ultimo registro del alias
  /////////////////////////////////////////
  goto = async (despla: unknown) => {
    if (!this.are_tra[this.num_are]) return false
    const alias = this.are_tra[this.num_are]

    this.View[alias].eof = false
    this.View[alias].bof = false

    let data = []
    let recno = 0
    if (typeof despla == "number") {
      recno = despla
    }
    else {  // desplazamiento top o bottom
      if (despla == 'top') {
        data = await alasql('USE Now; SELECT top 1 recno   FROM ' + alias + ' order by recno desc')
      }
      if (despla == 'bottom') {
        data = await alasql('USE Now; SELECT top 1 recno   FROM ' + alias + ' order by recno ')
      }

      if (data.length > 1) {
        recno = data[1][0][recno] // un solo campo

      }
      this.View[alias].row = -1
      if (recno > 0) {
        //        this.View[alias].recno = this.nowValue(alias, '*', recno) // asignamos valores del alias posicionado       
        for (let row = 0; this.View[alias].recnoVal.lenght; row++) {
          if (this.View[alias].recnoVal[row].recno == recno) {
            this.View[alias].row = row;
            break
          }

        }
        //          this.View[alias].row   = this.View[alias].recnoVal  
        //          this.View[alias].recno = this.nowValue(alias, 'recno', recno) // asignamos valores del alias posicionado       

      }
      else {
        // this.View[alias].recnoVal = []
        this.View[alias].row = -1
        if (despla == 'top')
          this.View[alias].eof = true
        else
          this.View[alias].bof = true

        return false
      }

    }

    // leedatos
    data = await alasql('USE Now; SELECT *   FROM ' + alias + ' where recno=' + recno.toString)
    if (data[1].length > 0) {
      this.View[alias].recno = recno
      return data[1]
    }
    this.View[alias].eof = true
    return null
  }

  ////////////////////////////////////////////////////
  // skip : se mueve registro en forma relativa donde este el recno  
  // despla : Si es positivo hacia adelante y negativo hacia atras  
  /////////////////////////////////////////
  skip = async (despla?: number) => {

    if (!despla) despla = 1

    const alias = this.are_tra[this.num_are]
    this.View[alias].eof = false
    this.View[alias].bof = false

    let data = []
    const row = this.View[alias].row
    //    let recno = this.View[alias].recnoVal(row)
    let recno = this.View[alias].recnoVal[row].recno

    if (despla > 0) {
      data = await alasql('USE Now; SELECT top ' + despla.toString + '  FROM ' + alias + ' where recno>' + recno.toString + ' order by recno ')
    } else {
      data = await alasql('USE Now; SELECT top ' + despla.toString + '  FROM ' + alias + ' where recno<' + recno.toString + ' order by recno desc')
    }

    if (data[1].length > 0) // Si regreso datos
    {
      const ult_ele = data[1].length
      if (despla > 0 && ult_ele < despla) // si el desplazamiento es positivo
        this.View[alias].eof = true

      if (despla < 0 && ult_ele < (despla * -1)) // si el desplazamiento es negativo 
        this.View[alias].bof = true

      recno = data[1][ult_ele - 1][recno] // asigna el ultimo elemento
    }
    else {
      if (despla > 0)
        this.View[alias].eof = true
      else
        this.View[alias].bof = true

    }
    return await this.goto(recno)    // se va a leer registro
  }


  ////////////////////////////////////////////////////
  // scatter Lee los datos del registro actual
  // tipo : MEMVAR (todos los registros), FIELDS (solo los campos que esten en FIELDS )   
  /////////////////////////////////////////
  scatter = async (tipo?: String, fields?: []) => {

    let resultado = {}
    if (!this.are_tra[this.num_are]) return false
    const alias = this.are_tra[this.num_are]
    //    const recno = this.View[alias].recnoVal[this.View[alias].row]
    const recno = this.View[alias].recnoVal[this.View[alias].row].recno

    const data = await this.goto(recno) // lee los datos actuales
    if (data[1] && data[1].length == 0)
      return null

    if (tipo.toLowerCase() == 'MEMVAR') {
      resultado = data[1]
    }

    if (tipo.toLowerCase() == 'FIELDS') {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        resultado[field] = data[1][field]
      }
    }
    if (data[1].length > 0)
      return data[1]
    return null

  }


  // Fin de la clase================================

}
