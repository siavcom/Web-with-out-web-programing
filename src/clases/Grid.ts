//////////////////////////////////////////////
// Clase : Gridd
// Author : Fernando Cuadras Angulo
// Creacion : Febrero/2022
// Ult.Mod  :  28/Mayo /2022
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { COMPONENT } from '@/clases/Component'
//import { nextTick} from "vue"
export class GRID extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  // Tenemos que utilizar renglon o data
  data = [{}]    // arreglo donde esta el data 
  Row = -1
  constructor() {
    super()
    this.prop.Name = 'Grid'
    this.prop.ColumnCount = 1
    this.prop.BaseClass = 'grid'
    this.prop.Sw_cap = false;
    this.prop.Sw_val = false;
    this.prop.RecordSource = '';
    this.prop.Row = 0;
    this.prop.textLabel ='Grid de datos'
  }

  public async Init() {
    
    
    for (const columna in this) {
      if (this[columna].prop && this[columna].ColumnOrder) {  // Solo si es una columna
        this[columna].prop.Grid = true  // indicamos que la collumna pertenece a un grid de datos 
        switch (this[columna].prop.BaseClass) {
          case 'editText': {
            this.renglon[columna] = ''
            break;
          }
          case 'editNumber': {
            this.renglon[columna] = 0.0
            break;
          }
          case 'editDate': {
            this.renglon[columna] = '01-01-1900'
            break;
          }
          default: {

            this.renglon[columna] = ''
            break;
          }
        }


      }
    }
  }


  ///////////////////////////////////////////////////// 
  // asignaRenglon 
  // lee los datos del renglon actual y depliega los componentes de captura
  ///////////////////////////////////////////////////////////
  public async asignaRenglon(row: number) {
 //   console.log('asignaRenglon row ',row,this.Form.db.View[this.prop.RecordSource].recnoVal)
//    if (row>this.Form.db.View[this.prop.RecordSource].recnoVal.length-1) 
//      row=this.Form.db.View[this.prop.RecordSource].recnoVal.length-1


    this.Row=row
    
    //nextTick(() => 
    //    this.Row=row
   // )
  }

  ///////////////////////////////////////////////////
  // Incerta renglon
  // m : valiables de memoria
  ///////////////////////////////////////////////////
  public async appendRow(m?: {}) { 
  //public appendRow = async (m?: {}) => {
    if (!m) m = {}
    this.Row=-1 // Quitamos donde esta el renglon
    this.Form.db.select(this.prop.RecordSource) 
    const values= await this.Form.db.appendBlank(this.prop.RecordSource, m) //Incertamos un renglon en blanco
    
  //  const row=(this.Form.db.View[this.prop.RecordSource].recnoVal.length-1).toString()
  //  this.Form.eventos.push('ThisForm.grid_datos.asignaRenglon(' +row + ')')

    console.log('appendRow alasql =====>',this.Form.db) // this.Form.db.alasql(' SELECT * FROM Now.' + this.prop.RecordSource ))
    
    //this.Row=this.Form.db.View[this.prop.RecordSource].recnoVal.length-1  // asigna el row donde tomo el foco
     
  }

/*
  ////////////////////////////////////////////////////
  // Recorrera todos los componentes columna donde esta el foco y
  // asigna todos los Value a los componentes del grid que sean columnas
  // recno : el regsitro actual que tiene el foco
  ///////////////////////////////////////////////////
  async asignaValue_2old(recno: number,Values?:{})  {

    const RecordSource = this.prop.RecordSource
    // Lee los valores del registro en la  tabla local
    if (recno!=0 ) {
      const data = await this.Form.db.nowValue(RecordSource, ' * ', recno)
      Values=data[0]
    } else   console.log('Asigna Valores Values =====>>', Values)
  }

*/

  //////////////////////////
// Borra renglon
// row: renglon a borrar
/////////////////////////
  async deleteRow(recno : number) {
     console.log('Delete row, recnoVal==== ',recno,this.prop.RecordSource)
     //const recno=this.Form.db.View[this.prop.RecordSource].recnoVal(row) 
     //console.log('delete renglon',row,'Recno',recno,this.Form.db.View[this.prop.RecordSource].recnoVal)
//    await this.Form.db.delete(this.Form.db.View[this.prop.RecordSource].recnoVal[row],this.prop.RecordSource)
    await this.Form.db.delete(recno,this.prop.RecordSource)
    this.Row=-1
    //await this.asignaRenglon(recno)

    
  }
}


