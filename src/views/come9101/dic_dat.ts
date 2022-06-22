//////////////////////////////////////////////
// Clase : dic_dat
// Descripcion : tipo de mantenimiento del diccionario de datos
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2021
// Ult.Mod  : 27/Diciembre/2021
/////////////////////////////////////////////

///////////////////////////////////////

import { COMPONENT } from '@/clases/Component'


export class DIC_DAT extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
  //  this.prop.Name = 'dic_dat'
    this.prop.BaseClass = 'comboBox'
    this.prop.textLabel = "Tipo de diccionario";
    this.prop.ReadOnly = false;
    this.prop.Sw_cap = false;
    this.prop.Sw_val = false;
    this.prop.RowSource = [
      ["Datos", "Tablas", "Indices", "Vistas", "Menú del sistema","Otros"],
      ["D", "T", "I", "V", "M","O"],
    ]; // vi_cap_doc.tdo_tdo,des_tdo
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75,25";
  }
  // init del componente 
  public init = async (form) =>{
   // await super.Init(form)
    this.prop.Value = "T";
    this.Form.nom_tab.Visible=true
  }


  ////////////////////////////////

  public Valid = async () => {
    const ThisForm = this.Form.value;
    const This = this.prop; // Hace referencia a las propiedades del componente
    const m: any = {
      //cop_nom: '',
      // cod_nom: ''
    }; // :  Record<string, never> ;

    if (This.Value=='D'){
      ThisForm.nom_tab.prop.ReadOnly = true
      ThisForm.men_sis.prop.Visible = false

    }
    if (This.Value == 'M') {   // Menu
      ThisForm.men_sis.prop.Visible = true
      ThisForm.nom_tab.prop.Visible = false

      return true;
    }
    else{
      ThisForm.nom_tab.prop.ReadOnly = false
      ThisForm.men_sis.prop.Visible = false
      ThisForm.nom_tab.prop.Visible = true
    }
    

  }
}