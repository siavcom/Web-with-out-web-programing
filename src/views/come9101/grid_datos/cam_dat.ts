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
        this.estilo.width='100px'
        
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
 
        for (const comp in this.Parent ) 
           if (this.Parent[comp].prop && this.Parent[comp].prop.BaseClass=='column' && this.Parent[comp].prop.ReadOnly==false){
             this.Parent[comp].prop.ReadOnly=true
           }
       
 
      return !this.prop.ReadOnly
         //   super.when() no hace falta el super porque en focus.capture lo hace 
    }

    async valid() {

        const vfp=this.Form.db
        console.log('VALID inssql====>',`select count(recno) as recno from vi_cap_dat where cam_dat="${this.prop.Value}"`)

        const data=await vfp.localSql(`select count(key_pri) as existe from vi_cap_dat where cam_dat="${this.prop.Value}" and key_pri>0`) 
        console.log('VALID====>',data[0])
        if (data[0].existe>0){
            this.prop.MessageError='Campo existente'
            return false
        }
           return true
      }


}
