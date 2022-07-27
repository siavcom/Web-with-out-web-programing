//////////////////////////////////////////////
// Clase : dec_dat
// Descripcion : Decimales del dato
// Author : Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  22/Junio/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/clases/Column'


export class DEC_DAT extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.ColumnOrder = 3
        this.textLabel = 'Decimales'
        this.prop.BaseClass = 'editText'
        this.prop.Type='number'
        this.prop.Min='0'
        this.prop.Max='20'
        this.prop.Decimals=0
        this.prop.ControlSource = 'vi_cap_dat.dec_dat'

        this.prop.Placeholder = "Decimales de precisión"
        this.prop.ToolTipText ="Decimales de precisión"
        this.estilo.flexBasis = '30%' /* width/height  - initial value: auto */
    }

     ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() { 
        this.prop.ReadOnly=!this.Parent.cam_dat.when() 
      return !this.prop.ReadOnly
         //   super.when(row)
    }



}
