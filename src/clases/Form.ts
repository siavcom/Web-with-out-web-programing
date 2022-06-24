//////////////////////////////////////////////
// Clase : Form Base
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : Noviembre/2021
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  inject,
  //getCurrentInstance,
  //ref
} from "vue";
import { COMPONENT } from '@/clases/Component'
import { VFPDB } from "@/clases/DataBase"
//import { apply } from "file-loader";

export class FORM {
  //Dom: any = getCurrentInstance();
  Desarrollo = false
  Parent = {} //this.Dom.ctx; // Contexto
  Form = {} //this.Parent.ThisForm // Thisform
  BaseClass = 'Form'
  eventos = [] // eventos a ejecutar en el stack
  estatus=[]  // estatus de los componentes hijos
  header = {}
  body = {}
  footer = {}
  prop = {
    Login: false,
    tag: '',
    Name: 'ThisForm',
    Map: 'ThisForm',
    Status:'A'
  }
  estilo = {
    background: "white",
    color: "#b94295",
    width: "1420px",
    height: "980px",
    fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    position: "center", //absolute,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignContent: 'flex-start',
    marginLeft: 'auto',
    left: 0,
    Top: 0,
    backgroundImage: "/img/Logo_Empresa.bmp",
  };
  posicion: any = {}
  db = new VFPDB();  // conexion a la base de datos

  //  este: any = this

  //  constructor(parent: Record<string, never>) {
  constructor() {


    this.Form = this
  }

  ///////////////////////////////////////////////////////////
  // Init
  ////////////////////////////////////////////////
  //public Init = async (Form) => {  Las Funciones arrow son funciones no metodos
  //    async Init(Form) {
  public async Init() {  //Form est?: any
    console.log('ThisForm Init===>')
    for (const componente in this) { // Si el componente tiene init
      if (this[componente] && this[componente]['InitForm'] &&
        componente != 'Parent'
      ) {
        this[componente]['Parent'] = this // ref(this)
        this[componente]['InitForm'](this)  // Corre el init en todos los componentes
      }
    }
  }


  ///////////////////////////////////////////////////////////
  // MessageBox 
  ///////////////////////////////
   public async MessageBox(text: string, tipo ? : number, title: string, time: number) {

    let tip_ale = 'promp'  // tipo de alerta 'promp'  'alert' 'confirm' 'warning'
    let icon = 'error'  // tipo de icono  warning, error, success, info, and question
    //let showDenyButton = true
    let showCancelButton = true
    let showConfirmButton = true
    let showDenyButton = true

    let cancelButtonText = 'Cancel'
    let confirmButtonText = 'Ok'
    let denyButtonText = 'No'

    let reverseButtons= true
    let valor = tipo ? tipo: 0
    let val_ini = 512
    console.log('Messagebox=====>',text,tipo,title,time)
    while (valor > 5) {
      valor = valor - val_ini
      if (valor > 5) val_ini = val_ini / 2
    }
    switch (valor) {
      case 0: //ok
        icon = 'success'
        tip_ale = 'alert'
        showCancelButton = false
        showConfirmButton = true
        confirmButtonText = 'OK'
        showDenyButton = false


        break;
      case 1: //ok + cancel
        tip_ale = 'confirm'
        icon = 'info'
        showCancelButton = true
        showConfirmButton = true
        showDenyButton = false
        break;
      case 2: //abort,retry and Ignore
        denyButtonText = "Abortar"
        confirmButtonText = 'Retry'
        cancelButtonText = "Cancel"


          tip_ale = 'confirm'
        icon = 'question'
        break;
      case 3: //yes,no and cancel
        showCancelButton = true
        showConfirmButton = true
        showDenyButton = true
        tip_ale = 'confirm'
        icon = 'question'

        break;
      case 4: //yes and no 
        showCancelButton = false
        showConfirmButton = true
        showDenyButton = true
        tip_ale = 'confirm'
        icon = 'question'
        break;
      case 5: //retry and cancel
        confirmButtonText = 'Reintentar'
        cancelButtonText = "Abortar"
        showDenyButton = false
        icon = 'question'
        tip_ale = 'confirm'

        break;

      default:
        break;
    }

    valor = tipo - valor // restamos el primer resultado


    val_ini = 512
    while (valor > 64) {
      valor = valor - val_ini
      if (valor > 64) val_ini = val_ini / 2

    }
    switch (valor) {
      case 16: //stop sign
        tip_ale = 'alert'
        icon = 'error'
        break;
      case 32: //Question mark
        tip_ale = 'promp'
        icon = 'question'
        break;
      case 48: //Exclamation point
        tip_ale = 'warning'
        icon = 'info'
        break;
      case 64: //Information icon l
        tip_ale = 'alert'
        icon = 'info'
        break
      default:
        break;
    }

    valor = tipo - valor // restamos el primer resultado

    val_ini = 512
    while (valor > 512) {
      valor = valor - val_ini
      if (valor > 512) val_ini = val_ini / 2

    }
    switch (valor) {
      case 256: // 2 button default
        break;
      case 512: //3 button
        break
      default:
        break;
    }

    valor = tipo - valor // restamos el primer resultado

    //   this.VueSimpleAlert[tip_ale](title, text, '',


    /*
 
   Swal.fire({
     title: title,
     showDenyButton: true,
     showCancelButton: true,
     confirmButtonText: 'Save',
     denyButtonText: `Don't save`,
   }).then((result) => {
  
     if (result.isConfirmed) {
       Swal.fire('Saved!', '', 'success')
     } else if (result.isDenied) {
       Swal.fire('Changes are not saved', '', 'info')
     }
   })
 
 */


    /*
    showConfirmButton true 	If set to false, a "Confirm"-button will not be shown.
    showDenyButton false 	If set to true, a "Deny"-button will be shown. It can be useful when you want a popup with 3 buttons.
    showCancelButton false 	If set to true, a "Cancel"-button will be shown, which the user can click on to dismiss the modal.
    confirmButtonText 'OK' 	Use this to change the text on the "Confirm"-button.
    denyButtonText 'No' 	Use this to change the text on the "Deny"-button.
    cancelButtonText 'Cancel' 	Use this to change the text on the "Cancel"-button.
    confirmButtonColor undefined 	Use this to change the background color of the "Confirm"-button. The default color is #3085d6
    denyButtonColor undefined 	Use this to change the background color of the "Deny"-button. The default color is #dd6b55
    cancelButtonColor undefined 	Use this to change the background color of the "Cancel"-button. The default color is #aaa
    confirmButtonAriaLabel '' 	Use this to change the aria-label for the "Confirm"-button.
    denyButtonAriaLabel '' 	Use this to change the aria-label for the "Deny"-button.
    cancelButtonAriaLabel
    
    isConfirmed: false
    ​
    isDenied: true
    ​
    isDismissed: false
    
    
    */
    // No se importa swetAlert Ya que se importo desde cuando se hace la app de Vue
    var resultado=0
    await Swal({
      title: title,
      text: text,
      reverseButtons: reverseButtons,
      showConfirmButton: showConfirmButton,
      showCancelButton: showCancelButton,
      showDenyButton: showDenyButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      denyButtonText: denyButtonText,
      icon: icon,
    }).then((result) => {
      if (tip_ale == 'alert')
        resultado=0
      else { 
        /* 
        Ok 1
        Cancel 2
        Abort 3
        Retry 4
        Ignore 5
        Yes 6
        No 7

        */
          console.log('MessageBox resultado===>',tip_ale,result,result.isConfirmed)

          if (result.isConfirmed) resultado= 6
          if (result.isDenied) resultado= 7
          if (result.isDismissed) resultado= 2

        }
     });
     console.log('MessageBox por aqui salio')
    return resultado
  }

  /////////////////////////////////////////////////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  /////////////////////////////////////////////////////////////////

  public keyPress = async ($event) => {
    // async KeyPress(@event) {

    const key = $event.charCode
    //  console.log('KeyPress===>', key)


  }

 public btAceptar = new class extends COMPONENT {
    constructor() {
      super()
      this.prop.Name = this.Name
      this.prop.Value = "Aceptar";
      this.prop.Sw_cap = false;
      this.prop.Sw_val = false;
      this.prop.BaseClass = 'imgButton'
      this.prop.Position = 'footer'

      this.prop.Image = "/Iconos/Accept.png";

    } // Fin constructor

    public click = async function()  {

      console.log('graba ThisForm', this.Parent)

      this.Parent.db.tableUpdate().
        then((resultado) => {
          if (resultado) {
            alert('Se actualizo correctamente los datos')
            this.prop.ReadOnly = true; // Deshabilitamos el boton de actualizacion
            //          this.prop.Visible = false; // Deshabilitamos el boton de actualizacion

            for (const componente in this.Form) {
              // Si es campo actualizable, deshabilitamos todos los campos a capturar y habilitamos su captura
              if (this.Form[componente].prop && this.Form[componente].prop.Sw_cap) {
                this.Form[componente].prop.ReadOnly = true;
                this.Form[componente].prop.Sw_val = false;
              }
            }
            return true
          }

        })

    }
  }


public  Salir = new class extends COMPONENT {

    constructor() {
      super()
      this.prop.Value = "Salir";
      this.prop.Sw_cap = false;
      this.prop.Sw_val = false;
      this.prop.BaseClass = 'imgButton'
      this.prop.Position = 'footer'
      this.prop.Image = "/Iconos/exit.png";

    } // Fin constructor




    public click = async () => {
      if (this.Form.MessageBox("Seguro ,salimos de la forma",'',4)=='6')

        window.history.back(); // regresa forma anterior
     }
  }




}

//export const VueForm = new FORM();
//export const form = new FORM();
