//////////////////////////////////////////////
// Clase : des_dat
// Descripcion : Nombre del campo
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/clases/Column'


export class CAM_DAT extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.ColumnOrder = 2
        this.textLabel = 'Campo'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_dat.cam_dat'
        this.prop.Placeholder = "Nombre del campo"
        this.prop.ToolTipText ='Nombre del campo'
 
        this.estilo.flexBasis = '10%' /* width/height  - initial value: auto */
        this.estilo.width=''
        this.prop.Autofocus=true
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() { 
 
        const Value=this.prop.Value.trim()
        if (Value=='USU_USU' || Value=='USU_CRE' ||
            Value=='TIE_UAC' || Value=='TIE_CRE' ||
            Value=='TIMESTAMP' || Value=='KEY_PRI') this.prop.ReadOnly=true
         else this.prop.ReadOnly=false  
         console.log('When por aqui ReadOnly===>',Value,this.prop.ReadOnly)
 
 
      return !this.prop.ReadOnly
         //   super.when(row)
    }



}
