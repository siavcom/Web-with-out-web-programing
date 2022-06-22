<template>
  <div class="divi" :style="estilo" :v-show="prop.Visible">
    <label v-show="Error">{{ prop.ErrorMessage }}</label>
    <div class="tooltip">
      <span class="etiqueta" v-if="prop.Label">{{ prop.Label + " " }}</span>

      <input
        class="fecha"
        ref="Ref"
        @change="valid"
        @focus="onFocus"
        :disabled="prop.ReadOnly"
        :placeholder="prop.Placeholder"
        type="date"
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


//import { ThisForm } from "@/App.vue";

//onMounted, onBeforeUpdate, onUpdated, onUnmounted,

import { toRefs, ref, defineEmits, defineProps, watch ,reactive} from "vue";
import { localDb } from "@/clases/LocalDb";  // manejo del indexedDb

const emit = defineEmits(["update", "update:Value", "update:Status", "update:ErrorMessage"]);



import VueSimpleAlert from "vue3-simple-alert";
//import moment from 'moment'

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{

  Component: null;
  prop: {
    Name: "";
    Label: '';
    View: "";
    Field: "";
    Recno: "";
    Value: "";
    Placeholder: "";
    //   ControlSource: string;
    Format: "";
    InputMask: "";
    MaxLenght: 0;
    ReadOnly: false;
    Tag: "";
    Sw_val: false;
    Sw_cap: true;

    Key: 0;
    DateFormat: "0";
    Time: false;
    Estilo: "YYYY-MM-DD";
    Status: string;
    ErrorMessage: '';
    ToolTipText: '';
    Visible: true;
    ControlSource: '';
    TabIndex: number;
    BaseClass : "EditText";

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
    position: "left";
    width: "auto";
    height: "auto";
  };
}>();
const Component = reactive(props.Component)
const This=Component.value
const Ref = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)
const Value = ref(props.prop.Value);
const Status = ref(props.prop.Status);
const Error = ref(false)
const ErrorMessage = ref(props.prop.ErrorMessage)
const LocalDb = new localDb();
let estilo = 'YYYY-MM-DD';


////////////////////////////////////////
/*
    You can access or mutate the value of the ref object using the .value property but that's only inside the setup() method.
    In the corresponding template, you can use the name of the variable as usual i.e productName in our case.

    */

/////////////////////////////////////////////////////////////////////
// Valid
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const valid = async () => {
  const valor = Value.value;
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

watch(
  () => props.prop.DateFormat,
  (new_val, old_val) => {
    switch (new_val) {
      case 10:
        estilo = 'MM-DD-YYYY';
        break;
      case 11:
        estilo = 'DD-MM-YYYY';
        break;
      case 12:
        estilo = 'YYYY-MM-DD';
    }
  },
  { deep: false }
);


/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valuees inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Value en el template
/////////////////////////////////////////
const init = async () => {
  Status.value = 'A';
  // Value.value = new Date("1900-01-01"); // asignamos Value inicial
};

init();

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--style scoped src="@/components/styles.css" /-->