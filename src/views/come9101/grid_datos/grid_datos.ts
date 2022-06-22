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
import {GRID} from  '@/clases/Grid'
// import {COLUMN} from  '@/clases/Column'
// import { COMPONENT } from '@/clases/Component'

// las clases importadas son clases tipo columna, por lo que ya no se importan columnas
import {CON_DAT} from './con_dat'

import {DES_DAT} from './des_dat'
import {TIP_DAT} from './tip_dat'
import {LON_DAT} from './lon_dat'
import {DEC_DAT} from './dec_dat'
import {REF_DAT} from './ref_dat'

export class GRID_DATOS extends GRID {
 
 // Columna que tiene el grid
 // public con_dat = new COLUMN()
 public con_dat = new CON_DAT()
 public des_dat = new DES_DAT()
  public tip_dat = new TIP_DAT()
  public lon_dat = new LON_DAT()
  public dec_dat = new DEC_DAT()
  public ref_dat = new REF_DAT()
 // public sou_dat = new COLUMN()
//  public val_dat = new COLUMN()

 
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Name = 'grid_datos'
    this.prop.textLabel= 'Definicion de la tabla'
    this.prop.RecordSource='vi_cap_dat'
    this.prop.Visible= false
  // this.prop.Label = "Campos de una tabla2";
    this.prop.ReadOnly = false;
    this.prop.ColumnCount=8
    this.estilo.display='flex'
    this.estilo.flexWrap= 'wrap'

    this.estilo.flexGrow= '0'     /* do not grow   - initial value: 0 */
    this.estilo.flexShrink= '0'   /* do not shrink - initial value: 1 */
    this.estilo.flexBasis= '900px'

    
    /*   Las propiedades de cada columna estan en cada clase columna
    this.con_dat.ColumnOrder=1
    this.con_dat.BaseClass='editNumber'
    this.con_dat.Name='con_dat'
    this.con_dat.Label='Numero'
    this.con_dat.prop.ControlSource='vi_cap_dat.con_dat'
    this.con_dat.estilo.flexBasis= '5%' 
    this.con_dat.estilo.fontSize='7px'
   
    this.des_dat.ColumnOrder=2
    this.des_dat.BaseClass='editText'
    this.des_dat.Name='des_dat'
    this.des_dat.Label='Campo'
    this.des_dat.prop.ControlSource='vi_cap_dat.des_dat'
    this.des_dat.estilo.flexBasis= '10%' /* width/height  - initial value: auto */
  /*
    this.tip_dat.ColumnOrder=4
    this.tip_dat.BaseClass='comboBox'
    this.tip_dat.Name='tip_dat'
    this.tip_dat.Label='Tipo'
    this.tip_dat.prop.ControlSource='vi_cap_dat.tip_dat'
    this.tip_dat.prop.RowSource = [
      ["Int", "Char", "Numeric", "Date", "Time","Var char"],
      ["I", "C", "N", "D", "T","V"],
    ]; // vi_cap_doc.tdo_tdo,des_tdo
    this.tip_dat.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.tip_dat.prop.ColumnCount = 2;
    this.tip_dat.prop.BoundColumn = 2;
    this.tip_dat.prop.ColumnWidths = "75,25";    
    this.tip_dat.estilo.flexBasis= '10%' /* width/height  - initial value: auto */
    /*
    this.lon_dat.ColumnOrder=5
    this.lon_dat.BaseClass='editNumber'
    this.lon_dat.Name='lon_dat'
    this.lon_dat.Label='Tamaño'
    this.lon_dat.prop.ControlSource='vi_cap_dat.lon_dat'
    this.lon_dat.prop.Min="1"
    this.lon_dat.estilo.flexBasis= '10%' /* width/height  - initial value: auto */
/*
    this.dec_dat.ColumnOrder=6
    this.dec_dat.BaseClass='editNumber'
    this.dec_dat.Name='dec_dat'
    this.dec_dat.Label='Decimales'
    this.dec_dat.prop.ControlSource='vi_cap_dat.dec_dat'
    this.dec_dat.prop.Min='0'
    this.dec_dat.prop.Min='16'
    this.dec_dat.estilo.flexBasis= '10%' /* width/height  - initial value: auto */


    /*
    this.ref_dat.ColumnOrder=7
    this.ref_dat.BaseClass='editText'
    this.ref_dat.Name='ref_dat'
    this.ref_dat.Label='Descripción'
    this.ref_dat.prop.ControlSource='vi_cap_dat.ref_dat'
    this.ref_dat.estilo.flexBasis= '10%' 
   
    this.sou_dat.ColumnOrder=8        
    this.sou_dat.BaseClass='editText'
    this.sou_dat.Name='sou_dat'        
    this.sou_dat.Label='SourceData'        
    this.sou_dat.prop.ControlSource='vi_cap_dat.sou_dat'
    this.sou_dat.estilo.flexBasis= '10%' /* width/height  - initial value: auto */
/*
    this.val_dat.ColumnOrder=9
    this.val_dat.BaseClass='editText'    
    this.val_dat.Name='val_dat'    
    this.val_dat.Label='Valor inicial'
    this.val_dat.prop.ControlSource='vi_cap_dat.val_dat'
    this.val_dat.estilo.flexBasis= '10%' /* width/height  - initial value: auto */
   
    }

 
  ////////////////////////////////

  public valid = async () => {
    //console.log('can_caj. this=====>', Object);
    //console.log('ThisParent =====<',Object.getPrototypeOf('ThisForm'))
    const m: any = {
      //cop_nom: '',
      // cod_nom: ''
    }; // :  Record<string, never> ;


    return true;
  }; // fin metodo valid

 


}
