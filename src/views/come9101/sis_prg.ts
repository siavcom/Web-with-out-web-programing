//////////////////////////////////////////////
// Clase : dic_dat
// Descripcion : tipo de mantenimiento del diccionario de datos
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2021
// Ult.Mod  : 18/Octubre /2021
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from '@/clases/Component'


export class SIS_PRG extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    //this.prop.Name = 'sis_prg'
    this.prop.BaseClass='comboBox'
    this.prop.textLabel = "Menú del sistema";
    this.prop.ReadOnly = false;
    this.prop.Sw_cap = false;
    this.prop.Sw_val = false;
    this.prop.ErrorMessage = ''
    this.prop.RowSource = [
      ["Inventarios", "Cuentas por cobrar", "Cuentas por pagar", "Ventas","Compras","Vendedores","Estadisticas","Cierres y utilerias","Parametros generales","Contabilidad","Control vehicular","Logistica"],
      ["IN",          "CC",                 "CP",                 "VE",   "CO",     "VN",         "ES",         "CI",                 "PG",                 "CT",            "CV",               "LO" ],
    ]; // vi_cap_doc.tdo_tdo,des_tdo
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75,25";
    this.prop.Value = "MA";
    this.prop.Visible= false
  }

 
  ////////////////////////////////

  public Valid = async () => {
    const ThisForm = this.Form.value;
    const This = ThisForm[this.name].prop; // Hace referencia a las propiedades del componente
    //console.log('can_caj. this=====>', Object);
    //console.log('ThisParent =====<',Object.getPrototypeOf('ThisForm'))
    const m: any = {
      //cop_nom: '',
      // cod_nom: ''
    }; // :  Record<string, never> ;


    return true;
  }; // fin metodo valid

}
