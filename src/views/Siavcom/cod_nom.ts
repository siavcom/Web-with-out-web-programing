//////////////////////////////////////////////
// Clase : cod_nom
// Author : Fernando Cuadras Angulo
// Creacion : Agosto/2021
// Ult.Mod  : 21/Ags/2021.- Se implementa jsStore para el manejo indexedDb donde quedara guardara los datos
//                           recuperados de la base de datos
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getCurrentInstance } from "vue";
import VueSimpleAlert from "vue3-simple-alert"; // mensajes de alerta  npm i vue-simple-alert Vue.use(VueSimpleAlert);

export class COD_NOM {
  Instance: any = getCurrentInstance();
  Parent = {};
  constructor() {
    this.Parent = this.Instance.ctx; // solo asigno algo para que no de el error
  }
  public valid = async () => { // aqui me quede
    const thisform = this.Instance.ctx; // Hace referencia a las clases
    const ThisForm = this.Instance.ctx.ThisForm;
    const This = ThisForm.cod_nom.prop; // Hace referencia alas propiedades
    // console.log('Valid cod_nom this', This, thisform, this.Parent);
     const m:any = {
      //cop_nom: '',
      // cod_nom: ''
    }; // :  Record<string, never> ;


    if (!This.Value) {
      return;
    }
    This.Value = ("000000" + This.Value.trim()).substr(-6, 6);

    m.cop_nom = "C";
    m.cod_nom = This.Value;
    // console.log("Valid cod_nom this.prop =====>", this.Form.cod_nom.prop.Value);

    // LLamamos a use con el objeto m para hacer la condicion de busqueda
    await thisform.db.use("vi_lla1_nom", m).then(result => {
      // si fue existosa la llamada y encontro registro

      if (result) {
        ThisForm.bt_graba.prop.ReadOnly = false; // habilitamos el boton de otro
        // Recorremos la forma y si es un componente de captura e quita el ReadOnly
        for (const componente in ThisForm) {
          if (ThisForm[componente].prop && ThisForm[componente].prop.Sw_cap) {
            ThisForm[componente].prop.ReadOnly = false; // Permitimos su captura
            ThisForm[componente].prop.Sw_val = true; // Prendemos sw_val (switch de validacion)
          }
        }
      } else {
        VueSimpleAlert.alert("Error", "No existe el cliente");
        return false;
      }
    });
    return true;
  }; // fin metodo valid

  // public click() {
  public click = async () => {
    const m = {};
  }; // fin metodo click
}
