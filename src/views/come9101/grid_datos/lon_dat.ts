//////////////////////////////////////////////
// Clase : lon_dat
// Descripcion : Longitud del dato
// Author : Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  22/Junio/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/clases/Column'


export class LON_DAT extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.ColumnOrder = 3
        this.textLabel = 'Longitud'
        this.prop.BaseClass = 'editText'
        this.prop.Type='number'
        this.prop.Min='0'
        this.prop.Decimals=0
        this.prop.ControlSource = 'vi_cap_dat.lon_dat'
        this.prop.ToolTipText ='Logitud del campo'
        this.prop.Placeholder = "Longitud del campo"

        
        this.estilo.flexBasis = '30%' /* width/height  - initial value: auto */
        this.estilo.width='50px'
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
