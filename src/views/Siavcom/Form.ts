//////////////////////////////////////////////
// Clase : Form
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
//import { getCurrentInstance } from "vue";
import VueSimpleAlert from "vue3-simple-alert"; // mensajes de alerta  npm i vue-simple-alert Vue.use(VueSimpleAlert);

export class FORM {

  name = 'login'
  classBase = 'form de VFP'
  Ctx: any;
  Parent: any = {};
  Form: any = {}
  prop: any = {}
  estilo: any = {}
  posicion: any = {}
  
  //  constructor(parent: Record<string, never>) {
  constructor() {
    this.prop.Login = false
    this.prop.tag = ''
    this.prop.Titulo = "Altas Bajas Cambios de clientes";
    this.prop.nem_pge = "Empresa SA de CV";
    this.prop.fpo_pge = new Date().toISOString().substring(0, 10); //  Fecha actual de la computadora cliente
    this.prop.log_emp = "/img/Logo_Empresa.bmp";
    this.prop.Name='Siavcom'


  }

  public valid = async () => {

    const m = {};
  }; // fin metodo valid


  /////////////////////////////////////////////////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  /////////////////////////////////////////////////////////////////

  public keyPress = async ($event) => {

    const key = $event.charCode
    console.log('KeyPress===>', key)
    

  }

  // public click() {
  public click = async () => {
    const m = {};
    
  }; // fin metodo click

/////////////////////////////////
// Descripcion :Metodo Init VFP
// Obs : Se debe de pasar la propiedad de Form a todas las clases
public init=async(ThisForm) =>{
/*   this.emp_emp.Form=ThisForm
   this.pas_usu.Form=ThisForm
   this.log_usu.Form=ThisForm
*/
   

}

  // Demas clases que tiene la clase padre

}
//export const form = new FORM();
