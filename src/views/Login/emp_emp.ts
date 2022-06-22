//////////////////////////////////////////////
// Clase : emp_emp
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dat_emp from '@/empresas/datos.json';

import {COMPONENT} from '@/clases/Component'

export class EMP_EMP extends COMPONENT {

  //name = 'emp_emp'

  //  constructor(parent: Record<string, never>) {

  constructor() {
    super()
   // this.prop.Name='emp_emp'
    this.prop.BaseClass='comboBox'
    this.prop.Value = 'Demo'
    this.prop.textLabel = 'Empresa :';
    this.prop.Sw_cap = true;
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 1;
    this.prop.RowSource = [[''],['']]
    this.prop.ColumnWidths='40%,60%'
    this.estilo.zIndex = 999;  // profundidad
    let num_ren = 0

    for (const nom_emp in dat_emp) {
      this.prop.RowSource[0][num_ren] = nom_emp  // columna 1,renglon
      this.prop.RowSource[1][num_ren] = dat_emp[nom_emp].nem_emp // columna 2,renglon
      num_ren++
    }
   // console.log('emp_emp RowSource >===',this.prop.RowSource) 
/*
    this.Parent = parent.value // solo asigno algo para que no de el error
    console.log('Emp_emp=== ctx',this.Parent)
    this.Form=this.Parent.ThisForm
    const This = this.Parent.ThisForm[this.name].prop
    const estilo = this.Parent.ThisForm[this.name].estilo
    const posicion = this.Parent.ThisForm[this.name].posicion


    This.prop.Name = "Demo";
    This.prop.textLabel = 'Empresa:';
    This.prop.ReadOnly = false;
    This.prop.Sw_cap = true;
    This.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    This.prop.ColumnCount = 2;
    This.prop.BoundColumn = 2;
    let num_ren = 0
    for (const nom_emp in dat_emp) {
      This.RowSource[0][num_ren] = nom_emp  // columna 1,renglon
      This.RowSource[1][num_ren] = dat_emp[nom_emp].nem_emp // columna 2,renglon
      num_ren++
    }
  */

  }
  public valid = async () => {
    const ThisForm = this.Form;
    const This = this.prop; // Hace referencia a las propiedades del componente
    const m: any = {
      //cop_nom: '',
      // cod_nom: ''
    }; // :  Record<string, never> ;

  } // fin metodo valid
 
}
//export const emp_emp= new EMP_EMP()