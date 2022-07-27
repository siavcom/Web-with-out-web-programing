//////////////////////////////////////////////
// Clase : dic_dat
// Descripcion : tipo de mantenimiento del diccionario de datos
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2021
// Ult.Mod  : 23/Noviembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import {GRID} from  '@/clases/Grid'
// import {COLUMN} from  '@/clases/Column'
// import { COMPONENT } from '@/clases/Component'

// las clases importadas son clases tipo columna, por lo que ya no se importan columnas
import {CON_DAT} from './con_dat'

import {CAM_DAT} from './cam_dat'
import {TIP_DAT} from './tip_dat'
import {LON_DAT} from './lon_dat'
import {DEC_DAT} from './dec_dat'
import {REF_DAT} from './ref_dat'
import {SOU_DAT} from './sou_dat'
import {VUE_DAT} from './vue_dat'



export class GRID_DATOS extends GRID {
 
 // Columna que tiene el grid
 // public con_dat = new COLUMN()
  public con_dat = new CON_DAT()
  public cam_dat = new CAM_DAT()
  public tip_dat = new TIP_DAT()
  public lon_dat = new LON_DAT()
  public dec_dat = new DEC_DAT()
  public ref_dat = new REF_DAT()
  public sou_dat = new SOU_DAT()
  public vue_dat = new VUE_DAT()

 
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Name = 'grid_datos'
    this.prop.textLabel= 'Definicion de la tabla'
    this.prop.RecordSource='vi_cap_dat'
    this.prop.Visible= false
    this.prop.ReadOnly = false;
    this.prop.ColumnCount=8
    this.con_dat.prop.First=true // primer elemento
    this.vue_dat.prop.Last= true // ultimo elemento
 
    }

 
  ////////////////////////////////

 


}
