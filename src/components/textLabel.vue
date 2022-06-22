<template>
  <div class="divi" :style="estilo" :v-show="prop.Visible">
    <span class="etiqueta" v-if="prop.textLabel">{{ prop.textLabel + " " }}</span>
    <div class="Caption" v-text="Caption" />
    <!--  :v-show="prop.Value > ' '" v-model="Value"  
    
    <input class="texto" readonly="true" 
    -->
    <input class="texto" readonly="true" :v-show="Text > ' '" v-model="Text" />
  </div>
</template>

<script setup lang="ts">
import {
  //  defineEmits,
  //  defineProps,
  //  defineExpose,
  ref,
  reactive,
  //  onUnmounted,
  watch,
  //  toRefs,
  // toRefs,
  //toRef,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onUnmounted,

} from "vue";
const emit = defineEmits(["update", "update:Value", "update:Status", "update:ErrorMessage", "update:Key"]);
//import { localDb } from "@/clases/LocalDb";  // manejo del indexedDb

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{
  Recno: 0;
  prop: {
    ToolTipText: string;
    View: "";
    Field: "";
    Value: "";
    Caption: string;
    Placeholder: "";
    Format: "";
    InputMask: "";
    MaxLenght: 0;
    ReadOnly: false;
    Tag: "";
    Sw_val: false;
    Sw_cap: true;
    Name: "";
    textLabel: "";
    Type: "text";
    Visible: true;
    ControlSource: "";
    Key: string;
    BaseClass: "label";
    Grid: false;
    MaxLength: 0;
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
    Style: number;
    //compAddress: any;
  };

  estilo: {
    background: "white";
    padding: "5px"; // Relleno
    color: "#b94295";
    width: "500px";
    height: "30px";
    fontFamily: "Arial";
    fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    textAlign: "left";
  };
  posicion: {
    position: "left"; //left,right,center,absolute. Si es absulute poner Value left y top
    left: number;
    Top: number;
  };
  db: any
}>();

const Value = ref(props.prop.Value);
const Text = ref('')
const Status = ref(props.prop.Status);
const Caption = ref(props.prop.Caption);
//const Recno = ref(props.Recno)
//Recno.value = 0
//defineExpose({ Caption });


//const This = Component.value
const columnas = reactive([{}]); // tiene todos los renglones del comboBox
//const Resultado = ref("");
//const width = reactive([{}]);
//const width = reactive(['60%', '20%', '20%']);


Status.value = 'I'


//const toggle = ref(false)
//const hover = ref(false)

//const zIndex = ref(props.estilo.zIndex)
const inputWidth = ref('auto')
//const LocalDb = new localDb();



/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuavo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {

  Status.value = 'A'

  //Text.value = Value.value
  console.log('textLabel emit Value ====>', Text.value)
  //emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  //emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  emit("update") // emite un update en el componente padre
  //console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};

/*
const readCampo = async (recno: number) => {
  if (Status.value == 'A') {
    Status.value = 'P'
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  }
  console.log('readCampo textLabel Control.Source,recno===',props.prop.Name,props.prop.ControlSource,recno)
  Value.value = await props.db.value.readCampo(props.prop.ControlSource, recno)
  emitValue()

}
*/

////////////////////////////////////////
// Watchers : Triggers de templates
// Descripcion : Cuando cambia el Value de la propiedad del ControlSource, asigna el Value de
//                la vista a la propiedad de Value de la propiedad
// Notas : Si se tiene en props, se tiene que vigilar el cambio de props.prop.Value

/*
////////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {
    if (new_val != old_val) {
      if (props.Recno > 0 && new_val > ' ') {
        console.log('Watch textLabel ControlSource==>', new_val)
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
    if (props.prop.ControlSource > ' ') {
      if (new_val = 0 && old_val > 0) {
        Value.value = ''
        readCampo(props.Recno)
        //emitValue()
        return

      }

      if (new_val != old_val && props.Recno > 0) {
        //console.log('Watch textLabel Recno=', new_val)
        readCampo(props.Recno)

      }
    }

  },
  { deep: false }
);

*/

//////////////////////////////////////////////
// ComboBox
//////////////////////////////////////////////
//////////////////////////////////////////////////////
// Asigna Resultado
/////////////////////////////////////////////////////
const asignaResultado = (valor: string) => {


  if (props.prop.Status == 'I') return

  // console.log('asignaResultado textLabel ColumnCount=0  ===>', props.prop.ColumnCount)
  if (props.prop.ColumnCount == 0) {  // Si no es tipo comboBox
    emitValue()
    return
  }
  if (props.prop.RowSourceType == 0) return;
  if (!props.prop.RowSource || props.prop.RowSource.length == 0) return;

  const BoundColumn =
    (!props.prop.BoundColumn ? 1 : props.prop.BoundColumn) - 1; // Si no hay valor de columna donde asignar el valor
  // recorre todo los renglones en columnas


  for (let i = 0; i < columnas.length; i++) {
    if (valor == columnas[i].value) { // El objeto columna tiene dos campos value y text
      // console.log("Busca Value =======>", i, new_val);

      // Encontro la posicion del value
      // console.log("Encontro el Value =======>",BoundColumn,columnas[i].text[0]);

      //Resultado.value = columnas[i]['text'][0];  // asigna el resultado a mostrar
      //      Value.value = valor // Resultado.value;  // Asigna el valor al componente
     
     //Value.value = columnas[i]['text'][0];  // asigna el resultado a mostrar
     Text.value = columnas[i]['text'][0];  // asigna el resultado a mostrar
    }
  }

  emitValue()
}

//////////////////////////////////////////////////////
// Renderizado del combo box
/////////////////////////////////////////////////////
const renderComboBox = async () => {


  if (props.prop.Status == 'I') return;

  if (props.prop.ColumnCount == 0) {
    emitValue()
    return
  };
  if (props.prop.RowSourceType == 0) return;
  if (!props.prop.RowSource || props.prop.RowSource.length == 0) return;

  //ColumnWidth(props.prop.ColumnWidths) // asigna tamaño de columnas

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

  // recorremos todas los renglones si es solo un columna val_col.length si no 
  // toma el tamaño del arreglo solo de la primer columna
  var valor = null

  if (props.prop.ControlSource > ' ')  // Si Hay controSource asigna el valor leido
      valor = Text.value // null
//valor = Value.value // null

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
        value: val_col[BoundColumn][ren],
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
  // console.log('textLabel render', Text.value)

  asignaResultado(valor)
  //emitValue()
};


const readCampo = async (recno: number) => {
  //   if (Status.value=='A'){
  //       Status.value='P' 
  //       emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  //    } 
  //Value.value = await props.db.value.readCampo(props.prop.ControlSource, recno)
   Text.value = await props.db.value.readCampo(props.prop.ControlSource, recno)

  renderComboBox()

}

/*
//ColumWidth
const ColumnWidth = (new_val) => {
  //console.log('Tamaño Columnas =',new_val)
  const columnWidth = eval('["' + new_val.replace(",", '","') + '"]');


  for (let col = 0; col < columnWidth.length; col++) {
    width[col] = columnWidth[col];
  }
}

/*


/*
watch(
  () => toggle.value,
  (new_val, old_val) => {

   // console.log('toggle.value', props.prop.Name, old_val, new_val)
    if (new_val == true) onFocus()
  },
  { deep: false }
);
*/
///////////////////////////////////
// Cuando cambia el estatus de Inicial a Activo 
//////////////////////

/*
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
*/


watch(
  () => props.prop.Value,
  (new_val, old_val) => {
    if (new_val != new_val) {
      // console.log('Watch prop.Value textLabel===>', new_val, old_val)
      // asigna la columna que tiene el resultado
      if (Status.value == 'A')
        asignaResultado(new_val)
    }
  },
  { deep: false }
);


///////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {

    if (new_val != old_val) {
      //console.log('Watch prop.ControlSource textLabel===>', new_val, old_val)
      if (props.Recno > 0 && props.prop.ControlSource > ' ') {
        readCampo(props.Recno)
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
    //console.log('Watch prop.Recno textLabel===>', new_val, old_val)

    //   console.log('Watch comboBox Recno=', props.Recno,props.prop.ControlSource)

    if (props.prop.ControlSource > ' ') {
      if (props.Recno == 0) {
        //Value.value = ''
        Text.value = ''

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


// RowSoure
watch(
  () => props.prop.RowSource,

  (new_val, old_val) => {
    if (new_val != old_val) {
      //console.log('Watch prop.RowSource textLabel===>', new_val, old_val)
      renderComboBox()
    }
  },
  { deep: true }
);
//RowSourceType
watch(
  () => props.prop.RowSourceType,

  (new_val, old_val) => {
    //  console.log('Watch prop.RowSourceType textLabel===>', new_val, old_val)

    if (new_val != old_val) {
      //console.log('ComboBox renderiza por cambio enRowSourceType ===>>', new_val)
      renderComboBox()
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


//BoundColum
watch(
  () => props.prop.BoundColumn,

  (new_val, old_val) => {
    if (new_val != old_val) {
      //  console.log('Watch prop.BoundColumn textLabel===>', new_val, old_val)

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
        // console.log("Cambio tamaño 2", inputWidth.value);
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
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {

  console.log('Init textLabel  ==>', props.prop.Name, props.Recno, props.prop.ControlSource.length)

  if (props.Recno > 0 && props.prop.ControlSource.length > 2) {

    //    Status.value = 'P';  // en lectura
    //    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
    await readCampo(props.Recno)
  }

  //  if (props.prop.Autofocus) {
  //   console.log('AutoFocus textLabel readCampo ===>')
  //   await emitValue()
  //  }


}

init();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--style scoped>
h1 {
  margin: 40px 0 0;
}
input {
  color: #42b960;
  width: "100px";
  height: "30px";
}
</style-->
