//////////////////////////////////////////////
// Clase : Form Base
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : Noviembre/2021
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  //getCurrentInstance,
  ref
} from "vue";
import VueSimpleAlert from "vue3-simple-alert"; // mensajes de alerta  npm i vue-simple-alert Vue.use(VueSimpleAlert);
//import Swal from 'sweetalert2'
import { COMPONENT } from '@/clases/Component'
import { VFPDB } from "@/clases/DataBase";


export class FORM {
  //Dom: any = getCurrentInstance();
  Parent = {} //this.Dom.ctx; // Contexto
  Form = {} //this.Parent.ThisForm // Thisform
  BaseClass = 'Form'
  prop = {
    Login: false,
    tag: '',
    Titulo: "",
    nem_pge: "Siavcom Software S de RL de CV",
    fpo_pge: new Date().toISOString().substring(0, 10), //  Fecha actual de la computadora cliente
    log_emp: "/img/Logo_Empresa.png",
    Name: 'Siavcom'
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

  este: any = this

  //  constructor(parent: Record<string, never>) {
  constructor() {
    //console.log('Vue Form base padre,form========>>', this.este)
    for (const componente in this.este) {
      if (this.este[componente].Parent) this.este[componente].Parent = ref(this.este)
    }
    this.Form = this.este
  }

  ///////////////////////////////////////////////////////////
  // Init
  ////////////////////////////////////////////////
  //public Init = async (Form) => {  Las Funciones arrow son funciones no metodos
  async Init(Form) {
    this.Form = Form // asignamos el Form a la forma
    for (const componente in this) {
     // console.log('Init Form componente=>',componente)
      if (this[componente]['Form']) { // Si tiene la propiedad Form le asigna su valor
        //        this[componente]['Parent'] = ref(this.este)
        this[componente]['Form'] = Form // referencia del Form
       // console.log('Init Form componente==>',componente,this[componente])
  
        if (this[componente]['Init']) 
        await this[componente]['Init']() //(Form) 
      }
    }

  }


  ///////////////////////////////////////////////////////////
  // MessageBox 
  ///////////////////////////////
  //  public MessageBox = async (text: string, tipo: number, title: string, time: number) => {

  async MessageBox(text: string, tipo: number, title: string, time: number) {

    let tip_ale = 'promp'  // tipo de alerta 'promp'  'alert' 'confirm' 'warning'
    let icon = 'error'  // tipo de icono  warning, error, success, info, and question
    //let showDenyButton = true
    let showCancelButton = true

    let confirmButtonText = 'Si'
    let denyButtonText = 'No'


    let valor = tipo

    let val_ini = 512

    while (valor > 5) {
      valor = valor - val_ini
      if (valor > 5) val_ini = val_ini / 2
    }
    switch (valor) {
      case 0: //ok
        icon = 'succes'
        tip_ale = 'alert'

        break;
      case 1: //ok + cancel


        tip_ale = 'confirm'
        icon = 'info'
        break;
      case 2: //abort,retry and Ignore
        confirmButtonText = 'Reintentar',
          denyButtonText = "Abortar",


          tip_ale = 'confirm'
        icon = 'question'
        break;
      case 3: //yes,no and cancel
        tip_ale = 'confirm'
        icon = 'question'
        break;
      case 4: //yes and no 
        showCancelButton = false,
          tip_ale = 'confirm'
        icon = 'question'
        break;
      case 5: //retry and cancel
        confirmButtonText = 'Reintentar',
          denyButtonText = "Abortar",
          showCancelButton = false,
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

    /*
 
   title: string;
   showDenyButton: boolean;
   showCancelButton: true;
   confirmButtonText: string;
   denyButtonText: string;
  }' is not assignable to parameter of type 'SweetAlertOptions'.
   Object literal may only specify known properties, and 'showDenyButton' does not exist in type 'SweetAlertOptions'.ts(2345)
   
 
 
   
 
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

    await VueSimpleAlert[tip_ale](title, text, '',
      {
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        console.log('VueSimpleAlert.resultado', result)

        if (result.value)

          return 6
        //Swal.fire('Saved!', '', 'success')
        else
          return 7
        // Swal.fire('Changes are not saved', '', 'info')

      })
    /*
        VueSimpleAlert.fire({
          // icon: icon,
          title: title,
          text :text,
          // showDenyButton: true,
          showCancelButton: showCancelButton,
          confirmButtonText: confirmButtonText,
          //denyButtonText: denyButtonText,
          //showClass: {
          //  popup: 'animate__animated animate__fadeInDown'
          // },
          // hideClass: {
          //   popup: 'animate__animated animate__fadeOutUp'
          // }
        }).then((result) => {
        // Read more about isConfirmed, isDenied below 
          console.log('VueSimpleAlert.resultado', result)
    
          if (result.value) 
            return 6
          else
            return 7
          
        })
        */




    /*
    otro programa
    icons:
      success 	
      error 	
      warning 	
      info 	
      question
    
    
    SweetAlertType :
      error
      info
      question
      succes
      warning
      
      npm install sweetalert2
    
    
    
    prompt(message: string, defaultText?: string, title?: string, type?: SweetAlertType, options?: SweetAlertOptions): Promise<string>
    
    alert(message?, title?, type?, options?)
    The alert() method displays an alert box with a specified message and an OK button.
    
    prompt(message, defaultText?, title?, type?, options?)
    The prompt() method displays a dialog box that prompts the user for input.
    
    confirm(message?, title?, type?, options?)
    The confirm() method displays a dialog box with a specified message, along with an OK and a Cancel button.
    
    type: 'success=48' | 'error=16' | 'warning=48' | 'info=48' | 'question=32'
    
        */



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

  bt_Graba = new class extends COMPONENT {

    constructor() {
      super()
      this.name = 'bt_Graba'
      this.prop.Name = this.name
      this.prop.Value = "Grabar";
      this.prop.Sw_cap = false;
      this.prop.Sw_val = false;
      this.imagen.src = "/Iconos/Accept.png";

    } // Fin constructor

    public click = async () => {

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

  public Salir = new class {
    name = 'Salir'
    //Parent: any = {}; // Parent
    BaseClass = 'button'
    prop: any = {}
    estilo: any = {}
    posicion: any = {}
    este: any = this
    Parent: any = {}
    //form = this.este

    constructor() {
      this.prop.ReadOnly = true
      this.prop.Visble = false
      //    console.log('Dentro del bt graba este====>', this.este, this.Parent.value)
    } // Fin constructor

    public click = async () => {

      VueSimpleAlert.confirm("Salimos de la forma").then(() => {

        window.history.back(); // regresa forma anterior
      });



    }




  }



}

//export const VueForm = new FORM();
//export const form = new FORM();
