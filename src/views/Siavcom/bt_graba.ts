//////////////////////////////////////////////
// Clase : bt_graba
// Author : Fernando Cuadras Angulo
// Creacion : Agosto/2021
// Ult.Mod  : 21/Ags/2021.- Se implementa jsStore para el manejo indexedDb donde quedara guardara los datos
//                           recuperados de la base de datos
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getCurrentInstance } from "vue";
//import { Global } from "@/Global";

export class BT_GRABA {
  // propiedades de las clases
  // Ojo : Por ningun motivo utilizar la variable Form
  Dom: any = getCurrentInstance();
  Parent = this.Dom.ctx; // Contexto

  /*
  Dom :any = getCurrentInstance();
  //Instance = $root  // cambiarlo en Vue 3.2.1
  Parent = this.Dom.ctx; // para llamar a las clase
  Form = this.Dom.ctx.ThisForm;
 */ 
  constructor() {
  console.log('Entro Contructor')
  
  } // Fin constructor

  async click() {
    const ThisForm = this.Parent.ThisForm;
    console.log('Click ThisForm',this.Parent) 
   
    this.Parent.db.tableUpdate().
    then((resultado) => {
      if (resultado) {
        alert('Se actualizo correctamente los datos')
        ThisForm.bt_graba.prop.ReadOnly = true; // Deshabilitamos el boton de actualizacion
        ThisForm.bt_graba.prop.Visible = false; // Deshabilitamos el boton de actualizacion

        for (const componente in ThisForm) {
          // Si es campo actualizable, deshabilitamos todos los campos a capturar y habilitamos su captura
          if (ThisForm[componente].prop && ThisForm[componente].prop.Sw_cap) {
            ThisForm[componente].prop.ReadOnly = true;
            ThisForm[componente].prop.Sw_val = false;
          }
        }
        ThisForm.cod_nom.prop.ReadOnly = false;
        return true
      }
       
    })


  
  }


}
