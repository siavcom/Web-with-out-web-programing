//////////////////////////////////////////////
// Clase : vue_dat
// Descripcion : Valor incial en typescript incertarse el registro nuevo en VUE 
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/clases/Column'


export class VUE_DAT extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.ColumnOrder = 3
        this.textLabel = 'Valor TypeScript'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_dat.vue_dat'
        this.prop.ToolTipText ='Valor incial en typescript incertarse el registro nuevo en VUE'
        this.prop.Placeholder = "Valor inicial"
        this.estilo.flexBasis = '30%' /* width/height  - initial value: auto */
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when(row: number) { 
     
    }



}
