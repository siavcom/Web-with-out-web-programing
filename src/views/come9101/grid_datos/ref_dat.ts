//////////////////////////////////////////////
// Clase : ref_dat
// Descripcion : Nombre del campo
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/clases/Column'


export class REF_DAT extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.ColumnOrder = 3
        this.textLabel = 'Descripción'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_dat.ref_dat'
        this.prop.ToolTipText ='Descripción del campo'
        this.prop.Placeholder = "Descripción del campo"

        this.estilo.flexBasis = '30%' /* width/height  - initial value: auto */
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() { 
        await this.Parent.cam_dat.when()
        this.prop.ReadOnly = this.Parent.cam_dat.prop.ReadOnly
        return !this.prop.ReadOnly

    }



}
