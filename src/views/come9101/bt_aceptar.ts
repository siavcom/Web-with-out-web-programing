//////////////////////////////////////////////
// Clase : bt_graba
// Author : Fernando Cuadras Angulo
// Creacion : Agosto/2021
/////////////////////////////////////////////
import { COMPONENT } from '@/clases/Component'


export class BT_ACEPTAR extends COMPONENT {

  constructor() {
    super()
 
    this.prop.BaseClass='imgButton'
    this.prop.Position='footer'

    this.prop.Value = "Aceptar";
    this.prop.Sw_cap = false;
    this.prop.Sw_val = false;
    this.prop.Image = "/Iconos/Accept.png";

//    this.imagen.src = "/Iconos/Accept.png";
 
  } // Fin constructor

 // public click = async () => {
 public async click() {  
    const m = {
  
    }  
    if (this.Form.dic_dat.prop.Value != 'M') {  // Datos

      // Hay datos capturados
      if (this.Form.grid_datos.prop.Visible && await this.Form.db.select('vi_cap_dat')>0) {
        const resultado=await this.Form.MessageBox('Quieres Grabar la definicion de la tabla',4,'Confirm')
        console.log('bt_aceptar resultado=====>',resultado)
        if  (resultado==6)   {
          this.Form.grid_datos.prop.Visible = false
           this.Form.MessageBox('Datos grabados',0)   
        }
        // this.Form.dic_dat.setFocus()
        //this.Form.db.use() 
        return
      }

      // this.Form.grid_indices.prop.Enabled = false
      // this.Form.grid_datos.vistas.Enabled = false

      m.nom_tab = this.Form.nom_tab.prop.Value
      await this.Form.db.select(0)

      if (this.Form.dic_dat.prop.Value == 'D') {
        this.Form.grid_datos.prop.Visible=false

        this.Form.grid_datos.prop.Status='A' 

        if (await this.Form.db.select('vi_cap_dat')==0)  await this.Form.db.select(0)
        await this.Form.db.use("vi_cap_dat",m)
        this.Form.grid_datos.prop.Visible=true 
        console.log('bt_aceptar====>>',this.Form.grid_datos)
//        this.Form.grid_datos.prop.Enabled = true

     //   await this.Form.db.vista_captura(m, "vi_cap_dat")
 
  
      }

      if (this.Form.dic_dat.prop.Value == 'I') { // Indices
        if (await this.Form.db.select('vi_cap_ind')==0)  await this.Form.db.select(0)
        await this.Form.db.use("vi_cap_ind",m)

        //await this.Form.db.vista_captura(m, "vi_cap_ind")
        // this.Form.grid_indices.prop.Enabled = true
      }

      if (this.Form.dic_dat.prop.Value == 'V') // Vistas
      {
        if (await this.Form.db.select('vi_cap_vis')==0)  await this.Form.db.select(0)
        await this.Form.db.use("vi_cap_vis",m)

        // await this.Form.db.vista_captura(m, "vi_cap_vis")
        // this.Form.grid_datos.vistas.Enabled = true
      }

    }

  return
  }

  public setFocus = async () => {
  }
}


