//////////////////////////////////////////////
// Clase : nom_tab
// Descripcion : tipo de mantenimiento del diccionario de datos
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2020
// Ult.Mod  : 18/Octubre /2021
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from '@/clases/Component'
//import { nextTick } from 'vue';


export class NOM_TAB extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.BaseClass = 'comboBox'
    // this.prop.Name = 'nom_tab'
    this.prop.textLabel = "Tablas del sistema";
    this.prop.Sw_cap = true;
    this.prop.Sw_val = false;
    this.prop.ErrorMessage = ''
    this.prop.Value = "COMETAB";
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = "select des_tab,nom_tab from vi_cap_tab"
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "50%,50%";
    this.prop.Visible = false;
    this.prop.Style = 2; //0=DropDown Combo 2=DropDown List
  }


  ////////////////////////////////
  public async when() {
    // public setFocus = async () => {
    super.when()
    console.log('nom_tab when')
    this.Form.grid_datos.prop.Visible = false
  }

  public async valid() {
    super.valid()

    /*    console.log('this.Value', this.prop.Value)
        if (ThisForm.dic_dat.prop.Value == 'D') {  // Datos
          //ThisForm.grid_datos.renglon.length=0 // Limpiamos los renglones que tenga el grid
          ThisForm.grid_datos.prop.Visible=true 
          ThisForm.grid_datos.prop.Status='A' 
    
          m.nom_tab=This.Value.trim()
          if (await ThisForm.db.select('vi_cap_dat')==0)  await ThisForm.db.select(0)
          await ThisForm.db.use("vi_cap_dat",m)
    
    //      await ThisForm.db.vista_captura(m,"vi_cap_dat") // borrar vista_captura en DataBase
    
        }
    
        if (ThisForm.dic_dat.prop.Value == 'I') { // Indices
          m.nom_tab=This.Value.trim()
          if (await ThisForm.db.select('vi_cap_ind')==0) await ThisForm.db.select(0)
          await ThisForm.db.use("vi_cap_ind",m) 
          ThisForm.grid_datos.prop.Visible=false
     
        }
    
        if (ThisForm.dic_dat.prop.Value == 'V') // Vistas
        {
          m.nom_tab=This.Value.trim()
          if (await ThisForm.db.select('vi_cap_vis')==0) await ThisForm.db.select(0)
          await ThisForm.db.use("vi_cap_vis",m) 
          ThisForm.grid_datos.prop.Visible=false
    
        }
    */
   return true
  }; // fin metodo valid
}
