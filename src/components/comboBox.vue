<template>
  <div class="divi" :style="estilo"
     v-if="prop.Visible" :disabled="prop.Disabled || prop.ReadOnly">
    <!--Mensaje de error -->
    <label v-show="Error">{{ prop.ErrorMessage }}</label>
    <div class="tooltip">
      <!--Etiqueta del componente -->
      <span class="etiqueta" v-if="prop.textLabel">{{ prop.textLabel + " " }}</span>
      <!--Input del componente
          class=text  
          :disabled="true"

      
      -->
      <div class="comboBox"  >
        <input class="text" ref="Ref" :class="{ ReadOnly: prop.ReadOnly }" :readonly="prop.Style == 2" type="text"
          :value="Resultado" @focusout="focusOut" />

        <!--span> {{ prop.Value }}</span-->
        <!--Valor seleccionado click-->
        <div class="toggle"  v-if="toggle ">
          <!--CheckBox -->
          <div class="option"  v-for="(option, valueIndex) in columnas" :key="valueIndex" @mouseover="hover = true"
            @mouseleave="hover = false" @click="valid(valueIndex)" :disabled="prop.ReadOnly">
            <!--Imprime Columnas -->
            <div class="columna" :disabled="prop.ReadOnly" v-for="(text, col) in option.text" :key="col"
              :style="{ 'width': width[col], 'text-align': 'left' }">
              <label class="label" v-text="text" />
            </div>
          </div>
          <span v-if="prop.ToolTipText" class="tooltiptext">
            {{
                prop.ToolTipText
            }}
          </span>
        </div>
        <img class="imagen" v-if="!prop.Disabled && !prop.ReadOnly"
           src="Iconos/TrianguloAbajo.png" 
          @click.prevent="toggle = prop.ReadOnly == false ? !toggle.value : toggle.value" :tabindex="prop.TabIndex" />
      </div>
    </div>
    <span v-if="prop.ShowValue">{{ prop.Value }}</span>
  </div>
</template>

<script setup lang="ts">

import {
  defineEmits,
  defineProps,
  ref,
  reactive,
  //computed,
  //  onUnmounted,
  watch,
  //watchEffect,
  //render,
  //watchPostEffect,
  // watchSyncEffect,
  //  toRefs,
  // toRefs,
  //toRef,
  //onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onUnmounted,

} from "vue";

//import { localDb } from "@/clases/LocalDb";  // manejo del indexedDb
//import VueSimpleAlert from "vue3-simple-alert";
const emit = defineEmits(["update", "update:Value", "update:Status", "update:ErrorMessage", "update:Ref","update:Focus"]);


///////////////////////////////////////
// Variables comunes globales al componente
////////////////////////////////////


const props = defineProps<{
  /// columnas: any;
  // Value: string;

  Component: null;
  prop: {
    Name: "";
    textLabel: "";
    ToolTipText: string;
    Value: string;
    ControlSource: string;
    Placeholder: "";
    Format: "";
    InputMask: "";
    MaxLength: 0;
    ReadOnly: false;
    Disabled: false;
    Tag: "";
    Sw_val: false;
    Sw_cap: true;
    Type: "text";
    Visible: true;
    RowSource: ""; // vi_cap_doc.tdo_tdo,des_tdo
    RowSourceType: 0; //1-Value, 2-Alias, 3-Local SQL 5-Array
    ColumnCount: 0;
    ColumnWidths: string;
    Sorted: false;
    BoundColumn: 1; // Columna donde se tomara el Value
    Multiple: false;
    Status: string;
    ErrorMessage: string;
    ShowValue: false;
    TabIndex: number;
    BaseClass: "ComboBox";
    Style: number;
    Focus: boolean;

  };

  estilo: {
    background: "white";
    padding: "5px"; // Relleno
    color: "#b94295";
    width: "auto";
    height: "30px";
    fontFamily: "Arial";
    fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    textAlign: "left";
    borderColor: "#000a01";
    borderWidth: "1px";
    zIndex: 900;

    // inputWidth: "inherit"
  };
  posicion: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };
  db: any;
  Recno: number;
  // colStyle: [
  //   {
  //     width: "100px";
  //   },
  //   {
  //     width: "100px";
  //   },
  //   {
  //     width: "100px";
  //   }
  // ];
}>();
const Component = ref(props.Component)
//const This = Component.value
const columnas = reactive([{}]); // tiene todos los renglones del comboBox
const Resultado = ref("");
//const width = reactive([{}]);
const width = reactive(['60%', '20%', '20%']);


const Value = ref(props.prop.Value);
const Ref = ref(null)

const Status = ref(props.prop.Status);
Status.value = 'I'
const Error = ref(false)
const ErrorMessage = ref(props.prop.ErrorMessage)
const toggle = ref(false)
const hover = ref(false)
const Focus= ref(props.prop.Focus)
Focus.value=false
//const zIndex = ref(props.estilo.zIndex)
const inputWidth = ref('auto')
//const LocalDb = new localDb();


/////////////////////////////////////////
// Metodo on change Vfp cuando es Value por referencia
/////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuavo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {
  console.log('ComboBox emitValue====>')

  Status.value = 'A'
  //console.log('EditBox antes emit Value ====>', props.prop.Value, props.prop.Status)
  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  emit("update") // emite un update en el componente padre
  //console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};

/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {
  const valor = Value.value;

  if (props.prop.ControlSource && props.prop.ControlSource.length > 0) {
    await props.db.value.updateCampo(valor, props.prop.ControlSource, props.Recno)
  }
  return await emitValue()

};

/////////////////////////////////////////////////////////////////////
// Valid
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const valid = async (num_ren: number) => {
  toggle.value = false
  // if (!toggle.value) return
  console.log('ComboBox  dio Click===>',columnas[num_ren].value)
  Value.value = columnas[num_ren].value  // columnas tiene dos campos value y text
  asignaResultado()
  // await emitValue()
  Ref.value.select()

  //  Ref.value.focus()
  //  if(props.prop.Style==2) return
  //  Ref.value.select()
  return
};

/////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const onFocus = () => {
//  Status.value = 'P';  // en proceso
  Error.value = false;
  ErrorMessage.value = '';
  if (Status.value == 'P') return // ya se habia hecho el foco
  
  //emit("update:Status", Status.value); // actualiza el valor en el componente padre


  // eslint-disable-next-line no-undef
  emit("update:Status", 'P'); // actualiza el valor en el componente padre. No se debe utilizar Status.Value
  emit("update:ErrorMessage", '')
  emit("update")
  //console.log('On Focus status  ===>', props.prop.Status)


}

const lostFocus = () => {
  Status.value = 'P';  // en proceso
  Error.value = false;
  ErrorMessage.value = '';

  //emit("update:Status", Status.value); // actualiza el valor en el componente padre


  // eslint-disable-next-line no-undef
  emit("update:Status", 'P'); // actualiza el valor en el componente padre. No se debe utilizar Status.Value
  emit("update:ErrorMessage", '')
  emit("update")
  //console.log('On Focus status  ===>', props.prop.Status, props.prop.ErrorMessage)

}



/////////////////////////////////////////
// Metodo onMounted
/////////////////////////////////////////
/*
const OnMounted = onMounted(() => {
  renderComboBox();
});
*/


//////////////////////////////////////////////////////
// Asigna Resultado
/////////////////////////////////////////////////////
const asignaResultado = (valor?: string) => {
  if (props.prop.Status == 'I') return
  if (props.prop.ColumnCount == 0) return;
  if (props.prop.RowSourceType == 0) return;
  if (!props.prop.RowSource || props.prop.RowSource.length == 0) return;

  const BoundColumn =
    (!props.prop.BoundColumn ? 1 : props.prop.BoundColumn) - 1; // Si no hay valor de columna donde asignar el valor
  // recorre todo los renglones en columnas

  // console.log("AsignaResultado  valor,columnas ======>",valor, columnas)

  if (valor) {
        console.log("ComboBox AsignaResultado valor columnas =======>", props.prop.Name,valor,columnas)


    for (let i = 0; i < columnas.length; i++) {
      if (valor == columnas[i].value) { // El objeto columna tiene dos campos value y text
        // console.log("Busca Value =======>", i, new_val);

        // Encontro la posicion del value
        // console.log("Encontro el Value =======>",BoundColumn,columnas[i].text[0]);

        //Resultado.value = columnas[i].text[0];
        Resultado.value = columnas[i]['text'][0];  // asigna el resultado a mostrar
        //     Value.value = valor // Resultado.value;  // Asigna el valor al componente
        //console.log("AsignaResultado  Value =======>",props.prop.Name, Resultado.value, valor)
      }
    }
  }
  else {  //aqui me quede checar cuando es por arreglo genra el value con array
        console.log("ComboBox AsignaResultad Value.vale columnas =======>", props.prop.Name,Value.value,columnas)

    for (let i = 0; i < columnas.length; i++) {
//      if (Value.value == columnas[i]['text'][0]) { // El objeto columna tiene dos campos value y text
       if (Value.value == columnas[i]['value'][0] || Value.value == columnas[i]['value']) {  // { // El objeto columna tiene dos campos value y text
      // if (Value.value == columnas[i]['value']) { // El objeto columna tiene dos campos value y text

// console.log("Busca Value =======>", i, new_val);

        // Encontro la posicion del value
        // console.log("Encontro el Value =======>",BoundColumn,columnas[i].text[0]);

        //Resultado.value = columnas[i].text[0];
        console.log("ComboBox AsignaResultado columnas =======>", props.prop.Name,props.prop.Value,columnas[i].text[0])


        Resultado.value = columnas[i]['text'][0]   // asigna el resultado a mostrar
        //     Value.value = valor // Resultado.value;  // Asigna el valor al componente
        //console.log("AsignaResultado  Value =======>",props.prop.Name, Resultado.value, valor)
      }
    }
  }

  emitValue()
}

//////////////////////////////////////////////////////
// Renderizado del combo box
/////////////////////////////////////////////////////
const renderComboBox = async () => {


  if (props.prop.Status == 'I') return;

  if (props.prop.ColumnCount == 0) return;
  if (props.prop.RowSourceType == 0) return;
  if (!props.prop.RowSource || props.prop.RowSource.length == 0) return;

  ColumnWidth(props.prop.ColumnWidths) // asigna tamaño de columnas

  //console.log('ComboBox renderiza  ===>>', props.prop.Name,props.prop.Status)

  const BoundColumn =
    (!props.prop.BoundColumn ? 1 : props.prop.BoundColumn) - 1;

  // Numero de columnas
  const ColumnCount = !props.prop.ColumnCount ? 1 : props.prop.ColumnCount;

  //console.log('Bound Column',!(props.prop.BoundColumn)) ;
  for (let ren = 0; ren < columnas.length; ren++) {
    // Borra todos los renglones
    delete columnas[ren];
  }
  ///////////////////////
  // generamos un arreglo dependiendo del RowSourceType

  let val_col: any = [];  // valores de columna
  const tip_rst = props.prop.RowSourceType;
  switch (tip_rst) {

    case 1:    // Value o por valor directamente 

      {
        let RowSource = "'" + props.prop.RowSource + "'"
        RowSource = RowSource.replaceAll(',', "','");
        //let pos=0;
        //pos= props.prop.RowSource.indexOf() // similar at VFP

        const Values = eval("[" + RowSource + "]"); // por medio del eval generamos el arreglo
        if (props.prop.ColumnCount == 1) {  // si solo tiene una columna
          val_col = Values;
        } else {  // Si tiene mas de una columna
          let ren = 0; // renglon
          let ele = 0; // numero de elemento
          while (ele < Values.length) {
            // recorremos todos los elementos
            for (
              let col = 0;
              col < props.prop.ColumnCount;
              col++ // recorre columna por columna
            ) {
              val_col[ren][col] = Values[ele];
              ele++; // incrementamos el elemento
            }
          }
          ren++; // incrementamos el renglon
        }
        break;
      }



    case 2: {
      // Alias

      const Values = eval("[" + props.prop.RowSource + "]");  // generamos un arreglo con los valores
      // Obtenemos la vista sql
      const pos = Values[0].indexOf(".");

      if (pos == 1) return; // si no hay definida vista
      // el primer elemento tiene el nombre de la tabla local, se obtiene y se quita del primer elemento
      const nom_tab = Values[0].slice(0, pos); // obtenemos el nombre de la tabla
      Values[0] = Values[0].slice(pos); // Quitamos el nombre de la tabla (similar al left se le indica de que posicion hacia adelante)

      //        const resultado = await selectLocalDb(nom_tab);// hacemos select a la tabla local
      // aqui me quede (arreglar lectura por alias)
      const data = await sql.value.localSql(props.prop.RowSource)
      /*
      LocalDb.select(nom_tab, {}).  // hacemos select a la tabla local
        then(data => {
          // Asigna valores al arreglo
          if (data.length > 0) { // Si hay datos
            for (let num_ren = 0; num_ren < data.length; num_ren++) { // recorremos todos los renglones del resultado
              for (let num_col = 0; num_col < props.prop.ColumnCount; num_col++) { // recorremos las columnas 
                val_col[num_ren][num_col] = data[num_ren][Values[num_col]]; // asignamos el valor al arreglo
              }
            }

          }
        })
        */
      break;
    }
    case 3: {
      const sql = props.db
      //console.log('ComboBox db sql =======>>', sql.value)
      const data = await sql.value.localSql(props.prop.RowSource)
      //console.log('Combo Box sql resultado ', data.length, data[0], data)     

      // renglon 0 ["Inventarios", "Cuentas por cobrar", "Cuentas por pagar", "Ventas","Compras","Vendedores","Estadisticas","Cierres y utilerias","Parametros generales","Contabilidad","Control vehicular","Logistica"],
      // renglon 1 ["IN",          "CC",                 "CP",                 "VE",   "CO",     "VN",         "ES",         "CI",                 "PG",                 "CT",            "CV",               "LO" ],
      // Generamos el arreglo 
      for (const nom_obj in data[0]) {
        const renglon = []
        for (let ren = 0; ren < data.length; ren++) {
          
          renglon.push(data[ren][nom_obj])

        }
        //console.log('ComboBox renglon',renglon)

        val_col.push(renglon)

        }
      /*
            console.log('ComboBox sql No registros',val_col[0].length)
      
            for (let i=0 ;i<val_col[0].length ;i++) 
                console.log('ComboBox sql resultado =>', data.length,val_col[0][i],val_col[1][i])
      */
      break
    }

    case 5: {
      // Array , solo copiamos el arreglo
      val_col = props.prop.RowSource;

      break;
    }
    case 6: {
      // Field
      break;
    }
  }

  console.log('ComboBox renglones',val_col)


  // recorremos todas los renglones si es solo un columna val_col.length si no 
  // toma el tamaño del arreglo solo de la primer columna
  var valor = null

  if (props.prop.ControlSource>' ')  // Si Hay controSource asigna el valor leido
       valor =Value.value // null

  for (
    let ren = 0;
    ren < (props.prop.ColumnCount <= 1 ? val_col.length : val_col[0].length);
    ren++
  ) {
    // asignamos el Value del BoundColum 
    if (props.prop.ColumnCount <= 1) { // Si solo es una columna
      valor = val_col[ren] // si no hay valor , asigna el primer valor

      // Si solo tiene una columna
      columnas[ren] = {
        value: val_col[ren],
        text: [val_col[ren]],
      };
      //columnas[ren].text[0]= props.prop.RowSource[ren]
    } else {
      if (!valor)
        valor = val_col[BoundColumn][ren] // si no hay valor , asigna el primer valor

      columnas[ren] = {  // asignmos el valor segun el BoundColumn
        value: val_col[BoundColumn][ren], // asignamos el valor segun BoundCoulumn
        text: [],   // un arreglo vacio y se llenara con el numero de columnas del resultado
      };
      // console.log("Antes de Asigna option columnCount ===>",props.prop.ColumnCount);
      for (let col = 0; col < props.prop.ColumnCount; col++) { // recorremos todas las columnas
        //console.log("Asigna option ===>",props.prop.RowSource,ren,col);

        columnas[ren].text[col] = val_col[col][ren]; // asignamos los valore text de todas las demas columnas
        // console.log("Asigna option ===>",ren,col.props.prop.RowSource[col][ren]);
      }

    }
  }
  // console.log('Columnas del comboBox',columnas)
  //props.prop.Value = valor

  //console.log("Asigna render Combo box columnas", columnas);
  console.log('ComboBox Renderiza column ===>', props.prop.Name,columnas)

  Value.value = valor
  
  asignaResultado(valor)
};

const readCampo = async (recno: number) => {
  if (Status.value == 'A') {
    Status.value = 'P'
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  }
  if (props.prop.ControlSource > ' ') {
    
    Value.value = await props.db.value.readCampo(props.prop.ControlSource, recno)
    renderComboBox()
  }
}





//////////////////////////////////////////////////////
// Watchers : Triggers de templates .Cambios en los modos del combo box
// Descripcion : Cuando cambia el valor de una propiedad que afecte el contenido
// Notas : Si se tiene en props, se tiene que vigilar el cambio de props.prop.Value
//////////////////////////////////////////////////////
/*
watchEffect(() => {
  console.log('WatchEffect ComboBox '+props.prop.Name,props.prop.Status)
  //renderComboBox()
  },
   {
    flush: 'pre'
  })


watchPostEffect(() => {
  console.log('WatchPostEffect ComboBox '+props.prop.Name,props.prop.Value)
  //renderComboBox()
  })

watchSyncEffect(() => {
  console.log('WatchSyncEffect ComboBox '+props.prop.Name,props.prop.Status)
  //renderComboBox()asignaResultado
  })

*/
//watchPostEffect()
////////////////////////////////////////
// Hacer el set focus 
///////////////////////////////////////
watch(
  () => Focus.value,
  (new_val, old_val) => {
    if (!Focus.value) return
    console.log('ComboBox Set Focus', props.prop.Name)
    if (Focus.value) {
//      Ref.value.focus()
      Ref.value.select()
      Focus.value = false
      emit("update:Focus", false)
    }
  },
  { deep: false }
);


////////////////////////////////////////
// Da click para renderizar 
///////////////////////////////////////

watch(
  () => toggle.value,
  (new_val, old_val) => {

    // console.log('toggle.value', props.prop.Name, old_val, new_val)
    if (new_val == true) onFocus()
  },
  { deep: false }
);

///////////////////////////////////
// Cuando cambia el estatus de Inicial a Activo 
//////////////////////

watch(
  () => props.prop.Status,
  (new_val, old_val) => {


    if (new_val == 'A' && old_val == 'I') {
      //      console.log('Watch Estatus Renderiza por cambio de estatus==>', props.prop.Name, old_val, new_val)

      renderComboBox()
    }
  },
  { deep: false }
);



// ErrorMesagge
watch(
  () => props.prop.ErrorMessage,
  (new_val, old_val) => {
    if (new_val.length == 0)
      Error.value = false
    else
      Error.value = true;

    //console.log('Watch Mensage de error==>', new_val, Error.value)

  },
  { deep: false }
);

//Value
watch(
  () => props.prop.Value,
  (new_val, old_val, onClean) => {
    console.log('Watch prop.Value ComboBox===>', new_val)
    // asigna la columna que tiene el resultado
    asignaResultado()

  },
  { deep: false }
);

// ControlSource
///////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {

    if (new_val != old_val) {
      // console.log('Watch comboBox ControlSource=')
      if (props.Recno > 0 && props.prop.ControlSource > ' ') {
        readCampo(props.Recno)
        //Value.value = props.db.value.readRenglon(new_val, props.Recno)
        //emitValue()
      }
    }
    //    LocalDb.ControlSource = new_val;


  },
  { deep: false }
);


////////////////////////////////////////
// Recno
// Nota: Lee de la base de datos local segun el valor de recno
///////////////////////////////////////
watch(
  () => props.Recno,
  (new_val, old_val) => {
    //   console.log('Watch comboBox Recno=', props.Recno,props.prop.ControlSource)

    if (props.prop.ControlSource > ' ') {
      if (props.Recno == 0) {
        Value.value = ''
        emitValue()
        return

      }

      // console.log('watch textLabel Recno =',props.Recno, new_val,'old_val=',old_val,props.prop.ControlSource,Value.value)

      //console.log('watch textLabel Recno new_val=',new_val,'old_val=',old_val,props.prop.ControlSource,Value.value)

      if (new_val != old_val && props.Recno > 0) {
        // console.log('Watch comboBox Recno=', props.Recno)
        readCampo(props.Recno)

      }
      //    LocalDb.ControlSource = new_val;
    }

  },
  { deep: false }
);





/*
watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {
    LocalDb.ControlSource = new_val;
  },
  { deep: true }
);
*/

// RowSoure
watch(
  () => props.prop.RowSource,

  (new_val, old_val) => {
    if (new_val != old_val) {
      //console.log('ComboBox renderiza por cambio enRowSource ===>>', new_val)
      renderComboBox()
    }
  },
  { deep: true }
);
//RowSourceType
watch(
  () => props.prop.RowSourceType,

  (new_val, old_val) => {
    // console.log('ComboBox RowSourceType===>>', new_val)
    if (new_val != old_val) {
      //console.log('ComboBox renderiza por cambio enRowSourceType ===>>', new_val)
      renderComboBox()
    }
  },
  { deep: false }
);

//Sorted
watch(
  () => props.prop.Sorted,

  (new_val, old_val) => {
    if (new_val != old_val) {
      //console.log('ComboBox renderiza por cambio en Sorted ===>>', new_val)

      renderComboBox();
    }
  },
  { deep: false }
);
//ColumCount
watch(
  () => props.prop.ColumnCount,

  (new_val, old_val) => {
    if (new_val != old_val) {
      // console.log('ComboBox renderiza por cambio en ColumnCount ===>>', new_val)

      renderComboBox();
    }
  },
  { deep: false }
);

//ColumWidth
const ColumnWidth = (new_val) => {
  //console.log('Tamaño Columnas =',new_val)
  const columnWidth = eval('["' + new_val.replace(",", '","') + '"]');


  for (let col = 0; col < columnWidth.length; col++) {
    width[col] = columnWidth[col];
  }
}

watch(
  () => props.prop.ColumnWidths,

  (new_val, old_val) => {
    console.log('Watch ColumnWidths', new_val)

    if (new_val != old_val) {
      ColumnWidth(new_val)
      /*
      const columnWidth = eval('["' + new_val.replace(",", '","') + '"]');

      for (let col = 0; col < columnWidth.length; col++) {
        width[col] = columnWidth[col] + "%";
      console.log("Cambio tamaño de columnas==>", width[col]);
      }
      */
    }

  },
  { deep: false }
);


//BoundColum
watch(
  () => props.prop.BoundColumn,

  (new_val, old_val) => {
    if (new_val != old_val) {
      //console.log('ComboBox renderiza por cambio en BoundCoulmn ===>>', new_val)

      renderComboBox();
    }
  },
  { deep: false }
);

//width
watch(
  () => props.estilo.width,

  (new_val, old_val) => {
    console.log("Cambio tamaño ", inputWidth.value);
    if (new_val != old_val) {
      if (props.estilo.width.substr(-2, 2) == 'px') {
        const len = props.estilo.width.length - 2
        const width: number = +props.estilo.width.substr(0, len) - 30
        inputWidth.value = width.toString() + 'px'
        console.log("Cambio tamaño 2", inputWidth.value);
      }


    }
  },
  { deep: false }
);
/////////////////////////////////////////////
// Computed
/////////////////////////////////////////////

//const getZIndex = computed(() => {
//  return props.estilo.zIndex;
//})




/////////////////////////////////////////
// Metodo init 
/////////////////////////////////////////


/*
const init =  () => {
  //props.prop.ColumnWidths='50%,50%' 
  
  console.log('InitcomoBox==>',props.prop)
  renderComboBox()
  emit("update:Ref"); // actualiza el valor del Ref al componente padre


};
*/


/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {
  if (props.Recno > 0 && props.prop.ControlSource > ' ') {

     //    Vue.nextTick(() => {
    //       console.log(this.show, this.$refs.content);
    //     });


    await readCampo(props.Recno)

    //    emitValue()

  }
  const ref = Ref
  //emit("update:Ref", Ref); // actualiza el valor del Ref al componente padre


  if (props.prop.Autofocus) {
    emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
    emit("update") // emite un update en el componente padre
    Ref.value.focus()
    Ref.value.select()
  }
  //else await emitValue()

  console.log('Init comboBox==>', props.prop.Name)



  // if (props.prop.Name=='des_dat')  Ref.value.autofocus=true
  //Status.value = 'I';
  //Value.value = 0; // asignamos Valor inicial
};






init();
</script>
<style scoped >
/*  elemento click check*/
img.imagen {
  width: 19px;
  height: 18px;
  border-radius: 20%;
  border: 2px;
  vertical-align: bottom;
  border-style: solid;
  border-color: black;
  margin-left: -2px;
  background: #94ccb2;

  /* margin-bottom: 5px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;*/
}

div.divi {
  display: inline-block;

}
div.comboBox {
  display: inline;
}

input.label {
  width: v-bind("inputWidth");
  border: 2px solid rgb(0, 5, 2);
  border-radius: 5px;
  background: white;
  color: black;
}

/* Cambia el background cuando solo es de lectura */
input.label.ReadOnly {
  background: rgb(212, 212, 212);
  /* disabled color */

  /* visibility: visible;
  opacity: 1;*/
}

/*input.label:disabled {
    color: black;
    background : white;
     
}
*/
div.toggle {
  position: absolute;
  /* no borrar se utiliza junto con div.option position:relative*/
  border: 1px solid rgb(0, 5, 2);
  border-radius: 3%;
  overflow: hidden;
  height: 700%;
  overflow-y: auto;
  width: 100%;
}

div.option {
  box-shadow: 0 4px 8px 0, 0 6px 20px 0;
  cursor: pointer;
  display: flex;
  justifyContent: space-around;
  position: relative;
  /* no borrar se utiliza junto con div.toggle position:absolute*/
  /* border: 1px solid rgb(0, 5, 2);*/
  padding: 5px 10px;
  /* espacio top left right booton ,vertical horizontal */

  background: #e5e5e5;
  color: #7a18e9;
  /*este es el color que toman los elementos desplegados**/
  /*display: table-row;   /*list-item;  /* inline-block;

 /* margin-left: -60px; */
  /* bottom: 125%;
 /* left: 50%;
  margin-left: -60px;*/
  opacity: 1;
  z-index: v-bind("props.estilo.zIndex"
    );
  /* v-bind('zIndex') la capa en la cual se presenta donde 0 la mas abajo */
  right: 0%;
  min-width: 100%;
  max-width: 100%;
  width: 100%;
  /* transition: opacity 0.3s;*/
}

div.option:hover {
  background: rgb(231, 238, 231);
}

/*div class='column'*/
</style>

<!-- 

 -->
