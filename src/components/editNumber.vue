<template>
  <div class="divi" :style="estilo" :v-show="prop.Visible" >
    <div class="tooltip">
      <label v-show="Error">{{ prop.ErrorMessage }}</label>
      <span class="etiqueta" v-if="prop.Label">{{ prop.Label + " " }}</span>
      <input
        class="numero"
        type="number"
        :min="prop.Min"
        :max="prop.Max"
        v-model.number="Value"
        @change="valid"
        @focus="onFocus"
        :disabled="prop.ReadOnly"
        :placeholder="prop.Placeholder"
        :step="prop.Step"
        :tabindex="prop.TabIndex"
      />
      <span v-if="prop.ToolTipText" class="tooltiptext">
        {{
          prop.ToolTipText
        }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
//        @change="valid"

//import { ThisForm } from "@/App.vue";
import {
  //toRef,
  // defineEmits,
  // defineProps,
  ref,
  //toRefs,
  //onMounted,
  //onUpdated,
  //onUnmounted,
  reactive,
  watch,
} from "vue";
//onMounted, onBeforeUpdate, onUpdated, onUnmounted,
//import { Vue, Component, Model } from "vue-class-component";
//const emit = defineEmit(['change', 'delete'])

// eslint-disable-next-line no-undef
const emit = defineEmits(["update", "update:Value", "update:Status", "update:ErrorMessage"]);
import { localDb } from "@/clases/LocalDb";  // manejo del indexedDb

//import VueSimpleAlert from "vue3-simple-alert";
//const messagebox = VueSimpleAlert; // asignamos las clases de VueSimpleAlert a messagebox

///////////////////////////////////////
// Variables comunes globales al componente
////////////////////////////////////

//inheritAttrs= true;

//////////////////////////////////////
// Valores reactivos
/////////////////////////////////////

// Se necesita que se definan aqui para ser reactivos y poderlos modificar del componente padre
//const Valor = ref(0);

// eslint-disable-next-line no-undef
const props = defineProps<{
  Component: null;
  Recno: number;
  prop: {
    ToolTipText: string;
    Value: number;
    Placeholder: "";
    Format: "";
    InputMask: "";
    MaxLenght: 0;
    ReadOnly: false;
    Tag: "";
    Sw_val: false;
    Sw_cap: true;
    Name: "";
    Key: 0;
    Step: "1";
    Min: "0";
    Max: "999999999";
    id: 0;
    Label: "";
    ControlSource: string;
    Status: string;
    ErrorMessage: '';
    TabIndex: number;
    BaseClass : "EditText";
  };

  estilo: {
    background: "white";
    color: "#b94295";
    width: "auto";
    height: "auto";
    fontSize: "13px"; // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
    fontFamily: "Arial";
    // textAlign: "left";
  };

  posicion: {
    position: "left";
    width: "auto";
    height: "auto";

  };
  db :any
}>();
const Component = reactive(props.Component)
const This=Component.value
const Value = ref(props.prop.Value);
const Status = ref(props.prop.Status);
const Error = ref(false)
const ErrorMessage = ref(props.prop.ErrorMessage)
// eslint-disable-next-line no-undef
defineExpose({ Value, Status });

const LocalDb = new localDb();



/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuavo valoe asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {
  Status.value = 'A'
  //console.log('EditBox antes emit Value ====>', props.prop.Value, props.prop.Status)
  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  emit("update") // emite un update en el componente padre
  //console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};




/////////////////////////////////////////////////////////////////////
// Valid
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const valid = async () => {
  const valor = +Value.value; // asignamos el valor sumandolo parae que cambie a numerico

  if (props.prop.ControlSource && props.prop.ControlSource.length > 0) {
    await LocalDb.update(valor).then(() => { // actualiza valor en localDb
    })
  }
  Status.value = 'A'
  //console.log('EditBox antes emit Value ====>', props.prop.Value, props.prop.Status)
  emit("update:Value", Value.value); // actualiza el valor en el componente padre
  emit("update:Status", 'A'); // actualiza el valor en el componente padre
  emit("update") // emite un update en el componente padre


  //console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};

const updateData = async () => {
  const valor = +Value.value;
  await LocalDb.update(valor).then(() => { // actualiza valor en localDb
    emit("update:Value", Value.value); // actualiza el valor en el componente padre
    emit("update") // emite un update en el componente padre
    Status.value = 'A'
    emit("update:Status", Status.value); // actualiza el valor en el componente padre
    return true;
  })

}
/////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const onFocus = () => {
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

////////////////////////////////////////
// Watchers : Triggers de templates
// Descripcion : Cuando cambia el Value de la propiedad del ControlSource, asigna el Value de
//                la vista a la propiedad de Value de la propiedad
// Notas : Si se tiene en props, se tiene que vigilar el cambio de props.prop.Value

////////////////////////////////////////
// ControlSource
watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {
    LocalDb.ControlSource = new_val;
  },
  { deep: false }
);

/////////////////////////////////////////
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

/////////////////////////////////////////////////////////
// watch Value
//  Nota : Si se cambia el valor desde la forma principal, se debe de actualizar en el
//          Componente
//////////////////////////////////////////
watch(
  () => props.prop.Value,
  (new_val, old_val) => {
    Value.value = new_val;
  },
  { deep: false }
);

////////////////////////////////////////
// Recno
// Nota: Lee de la base de datos local segun el valor de recno
////////////////////////////////////////
watch(
  () =>props.Recno,
  (new_val, old_val) => {
  console.log('Watch EditText Recno',new_val)  

  if (new_val>0 && props.prop.ControlSource>' ')
        {
        Value.value=props.db.value.readAla(props.prop.ControlSource,new_val) 
        }
      emitValue()
//    LocalDb.ControlSource = new_val;


  },
  { deep: true }
);



/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////
const init = async () => {
  Status.value = 'A';
  //Value.value = 0; // asignamos Valor inicial
};

init();

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--style scoped src="@/components/styles.css" /-->