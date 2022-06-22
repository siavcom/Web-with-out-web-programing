//////////////////////////////////////////////
// Clase : come9101
// Case base : form
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 17/Noviembre/2021
/////////////////////////////////////////////

//import { getCurrentInstance } from "vue";
/////////////////////////////////////////
// Clase de componentes
//////////////////////////////////////
import { DIC_DAT } from "./dic_dat"
import { NOM_TAB } from "./nom_tab"
import { SIS_PRG } from "./sis_prg"
import { BT_ACEPTAR } from "./bt_aceptar"
import { GRID_DATOS } from "./grid_datos/grid_datos"
import { COMPONENT } from '@/clases/Component'
/*
import {GRID_VISTAS} from "./vistas"
import {GRID_PROGRAMAS} from "./programas"
import {GRID_TABLAS} from "./programas"
*/

///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { FORM } from '@/clases/Form'
export class THISFORM extends FORM {
  public dic_dat = new DIC_DAT()
  public nom_tab = new NOM_TAB()
  public sis_prg = new SIS_PRG()
  public btAceptar = new BT_ACEPTAR()
  public grid_datos = new GRID_DATOS()
 
  //valores_datos={}
  //valores_vistas={}
  //valores_tablas={}
  constructor() {
    super()  // inicializa la clase base
    this.Desarrollo = false
    this.prop.Name = 'come9101'
    this.prop.Login = false
    this.prop.tag = ''
    this.prop.textLabel = "Mantenimiento al diccionario de datos";
    this.prop.nem_pge = "Killo Software";
    this.prop.fpo_pge = new Date().toISOString().substring(0, 10); //  Fecha actual de la computadora cliente
    this.prop.log_emp = "/img/Logo_Empresa.png";
    this.prop.Status = 'A'

    this.estilo.display= "flex";
    this.estilo.background= "white";
    this.estilo.color= "#b94295";
    this.estilo.width= "1420px";
    this.estilo.height= "980px";
    this.estilo.fontSize= "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    this.estilo.position= "center"; //absolute,
    this.estilo.backgroundImage= "/img/Logo_Empresa.bmp";

  //  btAceptar.prototype.click=function(){
  //      this.btAceptarClick()
  //   }


    //this.Init()  esta en el come9101.vue
  }
  //public Init = async (Form) => {
  async Init() {  // (Form)

    try {

      const ThisForm = this
      const This = ThisForm.prop // Hace referencia a las propiedades del componente

      ThisForm.db.Form = this
      // Se pierde la reactividad con await
      await ThisForm.db.select(0)
      await ThisForm.db.execute('select * from vi_cap_tab order by des_tab', 'vi_cap_tab')

      await ThisForm.db.select(0)
      await ThisForm.db.useNodata("lla1_tab") // utlizar el nombre del indice en ves del nombre de la tabla


      await ThisForm.db.select(0)
      await ThisForm.db.useNodata("lla1_dat")
      await ThisForm.db.select(0)
      await ThisForm.db.useNodata("lla1_ind")
      await ThisForm.db.select(0)
      await ThisForm.db.useNodata("lla1_vis")
      await ThisForm.db.select(0)
      await ThisForm.db.useNodata("lla1_prg")

      /*    await ThisForm.db.select(0)
            await ThisForm.db.vista_captura("vi_cap_prg") 
            await ThisForm.db.select(0)
            await ThisForm.db.vista_captura("vi_cap_vis")
            await ThisForm.db.select(0)
            await ThisForm.db.vista_captura("vi_cap_prg")
      */



      //ThisForm.db.openLocalDb()
      console.log('Termine de abrir tablas', ThisForm.db.View)

      super.Init() // corre el init de la clase para asignar los valores ThisForm a todos los componentes

      // console.log('Tabla vi_cap_tab', await ThisForm.db.localSql('select * from vi_cap_tab order by des_tab'))
      // await super.Init() // corre el init de la clase
      //   await super.Init()  //Form
    }
    catch (error) {
      console.log('======Error Init=====' + this.prop.Name, error,)


    }

  }
  
  btAceptarClick=async ()=>  {
      // bt_click= 
      const m = {

      }
      if (this.Form.dic_dat.prop.Value != 'M') {  // Datos
        this.Form.grid_datos.prop.Enabled = false
        // this.Form.grid_indices.prop.Enabled = false
        // this.Form.grid_datos.vistas.Enabled = false

        m.nom_tab = this.Form.nom_tab.prop.Value
        await this.Form.db.select(0)

        if (this.Form.dic_dat.prop.Value == 'D') {
          this.Form.grid_datos.prop.Visible = false

          this.Form.grid_datos.prop.Status = 'A'

          if (await this.Form.db.select('vi_cap_dat') == 0) await this.Form.db.select(0)
          await this.Form.db.use("vi_cap_dat", m)
          this.Form.grid_datos.prop.Visible = true
          console.log('bt_aceptar====>>', this.Form.grid_datos)
          //        this.Form.grid_datos.prop.Enabled = true

          //   await this.Form.db.vista_captura(m, "vi_cap_dat")


        }

        if (this.Form.dic_dat.prop.Value == 'I') { // Indices
          if (await this.Form.db.select('vi_cap_ind') == 0) await this.Form.db.select(0)
          await this.Form.db.use("vi_cap_ind", m)

          //await this.Form.db.vista_captura(m, "vi_cap_ind")
          // this.Form.grid_indices.prop.Enabled = true
        }

        if (this.Form.dic_dat.prop.Value == 'V') // Vistas
        {
          if (await this.Form.db.select('vi_cap_vis') == 0) await this.Form.db.select(0)
          await this.Form.db.use("vi_cap_vis", m)

          // await this.Form.db.vista_captura(m, "vi_cap_vis")
          // this.Form.grid_datos.vistas.Enabled = true
        }
      return
    }
  }
}
