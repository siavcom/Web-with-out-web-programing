<template>
  <div class="divi" :style="estilo" v-if="prop.Visible" :disabled="prop.Disabled">
    <span class="etiqueta" v-if="prop.textLabel">{{ prop.textLabel + " " }}</span>
    <div class="error">


      <!--Si es numero  -->
      <div class="tooltip">

      <input class="texto" 
               ref="Ref" 
               v-model.trim="Value"
               :readonly="prop.ReadOnly" 
               :placeholder="prop.Placeholder" 
               :tabindex="prop.TabIndex" 
                :type="prop.Type"
                @focus="onFocus" 
                @focusout="focusOut" 
                >





        <!--input v-if="prop.Type == 'number'" class="numero" type="number" ref="Ref" :min="prop.Min" :max="prop.Max"
          v-model.trim="Value" :readonly="prop.ReadOnly" :placeholder="prop.Placeholder" :tabindex="prop.TabIndex"
          :type="prop.Type" @focusout="focusOut" @focus="onFocus" -->

        <!--Si es texto  -->
        <!--input class="texto" 
               ref="Ref" 
               v-model.trim="Value"
               :readonly="prop.ReadOnly" 
               :placeholder="prop.Placeholder" 
               :tabindex="prop.TabIndex" :type="prop.Type"
                :maxlength="prop.MaxLength" 
                @focusout="focusOut" 
                @focus="onFocus" -->

        <!--Si es fecha  -->
        <!--input v-if="prop.Type == 'date'" class="date" ref="Ref" v-model.trim="Value" :readonly="prop.ReadOnly"
          :placeholder="prop.Placeholder" :tabindex="prop.TabIndex" :type="prop.Type" @focusout="focusOut"
          @focus="onFocus"-->



        <span v-if="prop.ToolTipText" class="tooltiptext">
          {{
              prop.ToolTipText
          }}
        </span>
      </div>
      <span class="errorText" v-show="Error">{{ prop.ErrorMessage }}</span>
    </div>
  </div>
</template>



<script setup lang="ts">
/*
         :ref="el => {Ref = el }"
 

type="text ? props.prop.Type : 'text'"
        @keypress="keyPress($event)"
<div id="app">
  <div v-for="(something, index) in model.filter.something" v-bind:key="something">
    <input type="text" v-model.trim="model.filter.something[index]" />
    {{something}}
  </div>
  <div v-for="(something, index) in model.filter.something">
    <input type="text" v-model.trim="model.filter.something[index]" :key="index" />
    {{something}}
  </div>
</div>
*/
import {
  //  defineEmits,
  //  defineProps,
  //  defineExpose,
  ref,
  reactive,
  //  onUnmounted,
  watch,
  // toRefs,
  //toRef,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onUnmounted,

} from "vue";
const emit = defineEmits(["update", "update:Value", "update:Status", "update:ErrorMessage", "update:Key", "update:Ref", "update:Focus"]);
//import { localDb } from "@/clases/LocalDb";  // manejo del indexedDb

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{
  Recno: 0;
  Component: null;
  prop: {
    ToolTipText: string;
    View: "";
    Field: "";

    Value: string;
    Placeholder: "";
    Format: "";
    InputMask: "";
    MaxLenght: 0;
    ReadOnly: false;
    Disabled: false;
    Tag: "";
    Sw_val: false;
    Sw_cap: true;
    Name: "";
    textLabel: "";
    Type: "text";
    Visible: true;
    ControlSource: string;
    Status: string;
    ErrorMessage: string;
    TabIndex: number;
    Key: string;
    BaseClass: "EditText";
    Grid: false;
    Autofocus: false;
    Min: number;
    Max: number;
    Focus: boolean;
    MaxLength: 254;
    First: false;
    //    SetFocus:false;
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
const Component = ref(props.Component)
//const This = Component.value
const Value = ref(props.prop.Value);
const Ref = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)
const Status = ref(props.prop.Status);
Status.value = 'I'
const ErrorMessage = ref(props.prop.ErrorMessage)
const Key = ref(props.prop.Key)
defineExpose({ Value, Status, ErrorMessage });  // para que el padre las vea
const Error = ref(false)
const Focus = ref(props.prop.Focus)
Focus.value = false

/*  position
static	Elements renders in order, as they appear in the document flow. This is default.
absolute	The element is positioned relative to its first positioned (not static) ancestor element
fixed	The element is positioned relative to the browser window
relative	The element is positioned relative to its normal position, so "left:20" adds 20 pixels to the element's LEFT position
sticky	The element is positioned based on the user's scroll position
A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like position:fixed).

Note: Not supported in IE/Edge 15 or earlier. Supported in Safari from version 6.1 with a Webkit prefix.
initial	Sets this property to its default value. Read about initial
inherit	Inherits this property from its parent element. Read about inherit
*/

// funciona para cualquier comoponente de este componente

/////////////////////////////////////////
// Metodo KeyPres Vfp
// Este metodo se corre cada ves que se teclea cualquier cosa en el componente
// Similar al keypress si  no esta el lasy
/////////////////////////////////////////

// string : String,
//texto: Number,
//boleano: Boolean,
// arreglo: Array,
// objeto: Object,
//fecha: Date,
//simbolo: Symbol,
// valida: Function,

// arreglo1: Object,
// default: () => {},
//    arreglo2: Array,
//    default: () => [],

// Vue dice no utilizar "this" dentro del setup segun Vue
// al pasarle props se podra tomar todos los Valuees de props anteriormente definidos
// como props.Value
//The second argument passed to the setup function is the context. The context is a normal JavaScript object that exposes
// three component properties:
// Attributes (Non-reactive object)
//    console.log(context.attrs)
// Slots (Non-reactive object)
//    console.log(context.slots)
// Emit Events (Method)
//    console.log(context.emit)
//setup(props,context)
//setup(props, { attrs, slots, emit })
// Setup funciona de la misma forma que el actual data(), devolviendo un objeto con las propiedades
// que serán usadas en el template:
// Inicio Setup


/////////////////////////////////////////
// Metodo Release Vfp
/////////////////////////////////////////
/*
const onUnmounted = () => {
  //  console.log("Component unmounted!");
};
*/

//const LocalDb = new localDb();
/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuavo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {
  Status.value = 'A'
  //console.log('EditBox antes emit Value ====>', props.prop.Value, Value.value)
  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  emit("update") // emite un update en el componente padre
  // console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};


/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {

  console.log('Valid updateCampo===>', Value,props.prop.ControlSource)
  if (props.prop.ControlSource && props.prop.ControlSource.length > 3) {
    // actualiza valor en localDb
    const valor = props.prop.Type == 'number' ? +Value.value : Value.value
    await props.db.value.updateCampo(valor, props.prop.ControlSource, props.Recno)
    //await LocalDb.update(valor).then(() => { 
    // })
  }
  //console.log('editBox focusout ', props.prop.Name)
  return await emitValue()


  //console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  //return true;

};
/////////////////////////////////////////////////////////////////////
// KeyPress
// Descripcion: Cada tecla que se presiona en el input
/////////////////////////////////////////////////////////////////

const keyPress = ($event) => {
  // <input       @keypress="keyPress($event)"
  const key = $event.charCode
  emit("update:Key", Key)
  Key.value = key
}


/////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const onFocus = async () => {
  Error.value = false; // old revisar si se necesita
  ErrorMessage.value = ''; // borramos el mensaje de error

  if (Status.value == 'P') return // ya se habia hecho el foco
  Status.value = 'P';  // en foco
  console.log('onFocus elemento ===>', props.prop.Name, 'P')
  emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  emit("update:ErrorMessage", '')
  emit("update")
  console.log('onFocus elemento ===>', props.prop.Name, 'P')

}

const readCampo = async (recno: number) => {
  if (Status.value == 'A') {
    Status.value = 'P'
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  }
  Value.value = await props.db.value.readCampo(props.prop.ControlSource, recno)
  emitValue()

}

////////////////////////////////////////
// Watchers : Triggers de templates
// Descripcion : Cuando cambia el Value de la propiedad del ControlSource, asigna el Value de
//                la vista a la propiedad de Value de la propiedad
// Notas : Si se tiene en props, se tiene que vigilar el cambio de props.prop.Value

////////////////////////////////////////
// ControlSource
///////////////////////////////////////
watch(
  () => props.prop.ControlSource,
  (new_val, old_val) => {
    if (new_val != old_val) {
      if (props.Recno > 0 && new_val.trim().length) {
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

      if (props.Recno == 0) {
        Value.value = ''
        emitValue()
        return

      }

      if (new_val != old_val && new_val > 0) {
        // console.log('Watch EditText Recno=', new_val)
        readCampo(props.Recno)
      }
      //    LocalDb.ControlSource = new_val;

    }
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
    Value.value = new_val
    console.log('watch value', props.prop.Name, new_val)
  },
  { deep: false }
);

////////////////////////////////////////
// Hacer el set focus 
///////////////////////////////////////
watch(
  () => Focus.value,
  (new_val, old_val) => {
    if (!Focus.value) return
    //console.log('EditText Set Focus', props.prop.Name)
    if (Focus.value) {
      Ref.value.focus()
      //      Ref.value.select()
      Focus.value = false
      emit("update:Focus", false)
    }
  },
  { deep: false }
);

///////////////////////////////////////////////
// Cuando cambia el estatus de Inicial a Activo, emite valores  
///////////////////////////////////////////////

watch(
  () => props.prop.Status,
  (new_val, old_val) => {

    if (new_val == 'A' && old_val == 'I') {
      emitValue()
    }
  },
  { deep: false }
);

/////////////////////////////////////////
// Metodo init Vfp
// Aqui debemos de asignar todos los Valores inciales del componente
// A pesar que nom_nom se pasa por referencia, se tuvo que definir en props para qu fuera reactivo
// Se tiene que emitir para que cambie el Valor en el template
/////////////////////////////////////////

const init = async () => {

  if (props.Recno > 0 && props.prop.ControlSource.length > 0) {

    Status.value = 'P';  // en lectura
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

    //    Vue.nextTick(() => {
    //       console.log(this.show, this.$refs.content);
    //     });

    await readCampo(props.Recno)
    //Value.value = await props.db.value.readCampo(props.prop.ControlSource, props.Recno)
    //   if (!props.prop.Autofocus) {
    if (!props.prop.First) {

      await emitValue()
    }
  }
  // const ref = Ref
  // emit("update:Ref", Ref); // actualiza el valor del Ref al componente padre

  // si es el primer elemento a posicionarse
  if (props.prop.First) {
    emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
    emit("update") // emite un update en el componente padre
    Ref.value.focus()  // hace el foco como primer elemento
    //Ref.value.select()
    return
  }// else  await emitValue()

};


init(); // Ejecuta el init

</script>
