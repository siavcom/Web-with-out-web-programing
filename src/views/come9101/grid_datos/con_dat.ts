//////////////////////////////////////////////
// Clase : con_dat
// Descripcion : Decimales del dato
// Author : Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  22/Junio/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/clases/Column'


export class CON_DAT extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.ColumnOrder = 1
        this.textLabel = 'Consecutivo'
        this.prop.BaseClass = 'editText'
        this.prop.Type='number'
        this.prop.Min='0'
        this.prop.Max='256'
        this.prop.ControlSource = 'vi_cap_dat.con_dat'
        this.prop.Placeholder = "Consecutivo/Orden "
        this.prop.ToolTipText ='Consecutivo/Orden'
        this.estilo.flexBasis = '30%' /* width/height  - initial value: auto */
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when(row: number) { 
     
    }



}
