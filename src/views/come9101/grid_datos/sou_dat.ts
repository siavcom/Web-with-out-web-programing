//////////////////////////////////////////////
// Clase : sou_dat
// Descripcion : RowSource para ComboBox
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/clases/Column'


export class SOU_DAT extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.ColumnOrder = 3
        this.textLabel = 'RowSource ComboBox'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_dat.sou_dat'
        this.prop.ToolTipText ='RowSource para ComboBox'
        this.prop.Placeholder = "RowSource ComboBox"
        this.estilo.flexBasis = '30%' /* width/height  - initial value: auto */
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when(row: number) { 
     
    }



}
