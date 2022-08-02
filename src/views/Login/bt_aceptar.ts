//////////////////////////////////////////////
// Clase : bt_aceptar
// Author : Fernando Cuadras Angulo
// Creacion : Otubre/2021
// Ult.Mod  :
/////////////////////////////////////////////
import router from '@/router'
import { OpenDb } from "@/clases/OpenDB";
import { COMPONENT } from '@/clases/Component'
import dat_emp from '@/empresas/datos.json';


export class BT_ACEPTAR extends COMPONENT {
  num_int = 0
  OpenDb = new OpenDb("siavcom.com.mx:38080/", "Demo", "sa", "*****")
  constructor() {
    super()
  //  this.name = 'bt_aceptar'
    this.prop.BaseClass='imgButton'
    this.prop.Value = "Entrar";
    this.estilo.width = '30%'
    this.prop.Image = "/Iconos/Accept.png";
  }

  
//  public click = async () => {
  
  
  public async Click()  {
    console.log('Entro a click=====>')

    const ThisForm = this.Form;
    
    if (!ThisForm.emp_emp.prop.Value || ThisForm.emp_emp.prop.Value.length == 0) {
      ThisForm.emp_emp.prop.MessageError = 'Escoja una empresa'
      return false;
    }

    if (!ThisForm.log_usu.prop.Value || ThisForm.log_usu.prop.Value.length == 0) {
      ThisForm.log_usu.prop.MessageError = 'Digite usuario'
      return false;
    }
    
    if (!ThisForm.pas_usu.prop.Value || ThisForm.pas_usu.prop.Value.length==0) {
      ThisForm.pas_usu.prop.MessageError = 'Digite contraseña'
      return false;
    }

    
    const db = this.OpenDb
    console.log('Empresas===>',dat_emp,db)
    
    db.nom_emp = ThisForm.emp_emp.prop.Value
    db.user = ThisForm.log_usu.prop.Value
    //db.url = dat_emp[db.nom_emp].url // obtenemos el url del servidor node 
    db.pass = ThisForm.pas_usu.prop.Value

    // console.log('Datos de conexión====>>',db.nom_emp,db.url,db.user,db.pass)
    
    const id_con = await db.open()
    console.log('Empresas id_con ===>',id_con)
   
    if (id_con.length < 4) {
      this.num_int++
      if (this.num_int == 5) window.close() // numero maximo de intentos = 5
      return
    }
    
    this.num_int = 0 // reinicializamos los numero de intentos
    //guardamos el id de conexión
    ThisForm.prop.Login = true // apaga el teleport para cerrar ventana login

    // asigna nombre de la empresa
    const nom_sis = dat_emp[db.nom_emp].nom_sis //ThisForm.nom_sis.replace(':','')
    console.log('TokenId=========> ', id_con, nom_sis)
    //        router.push({ name: nom_prg, params: { id_con ,nom_prg} })
    router.push({ name: nom_sis })

  }

}
