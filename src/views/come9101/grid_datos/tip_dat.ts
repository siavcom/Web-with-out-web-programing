//////////////////////////////////////////////
// Clase : tip_dat
// Descripcion : Tipo de dato
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  16/Junio/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/clases/Column'

export class TIP_DAT extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.ColumnOrder = 2
        this.textLabel = 'Tipo de dato'
        this.prop.BaseClass = 'comboBox'
        this.prop.ToolTipText ='Tipo de dato'
        this.prop.Placeholder = "Tipo de dato"

        this.prop.RowSource = [
            ["Character", "Varchar", "Numeric", "Date", "Interger","TimeStamp",'Text'],
            ["C", "V", "N", "D", "I","T","M"],
          ]; // vi_cap_doc.tdo_tdo,des_tdo
        this.prop.ControlSource = 'vi_cap_dat.tip_dat'

        this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.ColumnWidths='80%,10%'        
        this.estilo.width = '100px' /* width/height  - initial value: auto */
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
