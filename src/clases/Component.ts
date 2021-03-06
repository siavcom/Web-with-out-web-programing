//////////////////////////////////////////////
// Clase : Componente Base
// Author : Fernando Cuadras Angulo
// Creacion : Noviembre/2021
// Ult.Mod  : 22/Junio/2022
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */

//import { THISFORM } from "@/views/come9101/ThisForm"
//import { nextTick } from "vue"

export class COMPONENT {
  Parent: any = {} //this.Dom.ctx; // Contexto
  Form: any = {} //this.Parent.ThisForm // Thisform
  Name = 'component'  // Se one aqui el name para que en el html poder hacer refere
  db: any
  Recno: 0
  Ref: null // Referencia del componente html
  Focus: boolean
  prop = {
    Name: "",
    textLabel: "",
    ToolTipText: '',
    Value: '',
    Placeholder: "",
    Format: "",
    InputMask: "",
    MaxLenght: 0,
    ReadOnly: false,
    Disabled: false,
    Tag: "",
    Valid: false,
    Capture: false,
    Key: 0,
    id: 0,
    ControlSource: "",
    Status: "I",
    MessageError: '',
    TabIndex: 0,
    BaseClass: "editText",
    Type: "text",
    RowSourceType: 0, //1-Value, 2-Alias, 5-Array
    ColumnCount: 1,
    BoundColumn: 1,
    RowSource: {},
    ColumnWidths: '100',
    Visible: true,
    Grid: false,
    RecordSource: '',
    Row: 0,
    Map: "",
    Autofocus: false,
    Position: 'main', // main, header , footer
    Image: '',
    Focus: false,
    First: false,
    Last: false,
    // Datos numericos
    Step: "1",
    Min: "0",
    Max: "999999999",
    Style: 'decimal', // decimal, currency,percent,unit
    Currency: 'MXN', //USD,EUR,MXN
    CurrencyDisplay : 'code', //to use the ISO currency code.
    Decimals : 2,
 

  };
  estilo = {
    //display: "flex",
    display: "inline-block",
    flexGrow: "0",     /* do not grow   - initial value: 0 */
    flexShrink: "0",   /* do not shrink - initial value: 1 */
    flexBasis: "auto", /* width/height  - initial value: auto */
    flexWrap: "wrap",

    background: "white",
    color: "#b94295",
    width: "auto",
    maxWidth: "auto",
    minWidth: "auto",
    height: "auto",
    fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    fontFamily: "Arial",
    zIndex: 100,  // profundidad
    alignContent: "center",
    textAlign: "left",


    // textAlign: "left";
  };

  posicion = {
    position: "left",
    width: "auto",
    height: "auto",

  };    //this.form = ThisForm.value
  imagen = { src: "" }

  //  constructor(parent: Record<string, never>) {
  // contructor base on create 
  constructor() {
    // console.log('On Create Componente ====>',this.constructor.name,this)
    this.Name = this.constructor.name.toLowerCase()
    this.prop.Name = this.constructor.name.toLowerCase()

  }

  ///////////////////////////////////////////////////////////
  // InitForm : Iicializa los valores de toda la forma en c/componente 
  ////////////////////////////////////////////////
  public async InitForm(Form) {

    //console.log('Inicializando componente Parent ===> ', this.prop.Name,this.Parent)

    //console.log('InitForm  componente Parent ===> ',this.prop.Name)

    if (this.Parent.prop) { // Si tiene padre 
      this.prop.Map = this.Parent.prop.Map + '.' + this.prop.Name
    }
    //console.log('Mapa clase ======>', this.name, this.prop.Map)



    for (const componente in this) {
      if (componente != 'Ref' &&
        componente != 'Parent' &&
        this[componente]['InitForm']  // si es un componente
      ) {
        //console.log('Inicializando componente =========> ', this.prop.Name,componente)

        this[componente]['Parent'] = this // ref(this) Pasamos el padre al componente hijo
        await this[componente]['InitForm'](Form) //Hacemos el InitForm a cada componente hijo
        if (this[componente]['init']) await this[componente]['init']() // Init del componente
      }
    }

    this.Form = Form  // asigna la forma a la propiedad Form 
    //console.log('Init form ====>', this.prop.Name)
    this.prop.Status = 'A'

    // console.log('Init Componente this.Form',this.Form)
  }

  /////////////////////////////////////////////////////////////////////
  // Valid
  // Descripcion: Cada tecla que se presiona en el input
  /////////////////////////////////////////////////////////////////
  public async valid() {
    this.prop.Valid=true
    return true
  }

  /////////////////////////////////////////////////////////////////////
  // Click
  // Descripcion: Hace el click
  /////////////////////////////////////////////////////////////////

  public async click() {


    return
  }

  /////////////////////////////////////////////////////////////////////
  // When VFP
  // Descripcion: Couando recibe el focoHace el click
  /////////////////////////////////////////////////////////////////

  public async when() {

    //console.log('Super when ==>',this.prop.Name)
    return true
  }

  /////////////////////////////////////////////////////////////////////
  // Focus
  // Descripcion: Hace el setFocus
  // Obs : se anexa al stack de eventos a ejecutar en forma sincrona
  /////////////////////////////////////////////////////////////////
  public async setFocus() {
    //public setFocus = async () => {
    this.prop.Focus = true
    console.log('Super setFocus ==>', this.prop.Name)
    //    this.pushEvent('Focus=true') Para probar

    //    nextTick(() => {
    //        this.prop.SetFocus=false
    //    });


    //    console.log('This setFocus Ref',this.Name,this.prop.BaseClass,this.Ref)
    //    this.pushEvent('Focus=true')
    //  this.pushEvent('Ref.focus()') 
  }

  /////////////////////////////////////////////////////////////////////
  // pushEvent
  // Descripcion: Hace push a la tabla de eventos sincronos
  //              Utiliza el map de la clase para saber la ruta completa de donde 
  //              pertencece en la clase
  //              ThisForm 
  /////////////////////////////////////////////////////////////////

  public pushEvent = async (evento: string) => {
    //console.log('Componente evento empujado====>>',this.prop.Map+ '.' + evento)

    this.Form.eventos.push(this.prop.Map + '.' + evento)
    //console.log('pushEvent eventos===>',this.Form.eventos)

  }


  /////////////////////////////////////////////////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  /////////////////////////////////////////////////////////////////

  public keyPress = async ($event) => {

    const key = $event.charCode
    //  console.log('KeyPress===>', key)

  }

  /////////////////////////////////////////////////////////////////////
  // Refe
  // Descripcion: asigna la ref html del componente desplegado
  /////////////////////////////////////////////////////////////////
  Refe(el: any) {
    this.Ref = el.$el
    console.log('Columna Ref===>', this.Ref)
  }



}


//export const VueForm = new FORM();
//export const form = new FORM();
