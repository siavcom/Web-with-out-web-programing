//////////////////////////////////////////////
// Clase : pas_usu
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
//import { getCurrentInstance } from "vue";
import VueSimpleAlert from "vue3-simple-alert"; // mensajes de alerta  npm i vue-simple-alert Vue.use(VueSimpleAlert);

import {COMPONENT} from '@/clases/Component'

export class LOG_USU extends COMPONENT {

  //name='log_usu'
//  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.BaseClass='editText'
    this.prop.Value=''
    this.prop.textLabel = "Usuario :";
    this.prop.Type = "text";
    this.estilo.width='200px'
  
  }
  public valid = async () => { 
    console.log('Log_usu valid value',this.prop.Value)
    const m = {};
  }; // fin metodo valid
 

/////////////////////////////////////////////////////////////////////
// KeyPress
// Descripcion: Cada tecla que se presiona en el input
/////////////////////////////////////////////////////////////////

public keyPress =async ($event) => {

  const key=$event.charCode
  console.log('KeyPress===>',key)

}


  // public click() {
  public click = async () => {
    const m = {};
  }; // fin metodo click
}
