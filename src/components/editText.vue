<template>
  <div class="divi" v-bind:style="estilo" v-if="prop.Visible" :disabled="prop.Disabled">
    <span class="etiqueta" v-if="prop.textLabel">{{ prop.textLabel + " " }}</span>
    <div class="error">


      <div class="tooltip">
      <!--input class="texto" 
               ref="Ref" 
               v-model.trim="Value"
               :readonly="prop.ReadOnly" 
               :placeholder="prop.Placeholder" 
               :tabindex="prop.TabIndex" 
                :type="prop.Type"
                @focus="onFocus" 
                @focusout="focusOut" 
                -->
          <!--Si es numero  @input="Numeros($event)"
                       @keypress="keyPress($event)"-->
          <input v-if="prop.Type == 'number' " 
            class="number" 
            type="type" 
            ref="Ref" 
            :min="prop.Min" 
            :max="prop.Max"
            :value="numberStr"
            :readonly="prop.ReadOnly" 
            :placeholder="prop.Placeholder" 
            :tabindex="prop.TabIndex"
            :maxlength="prop.MaxLength" 
            :size="prop.MaxLength"
            :style="{'width' : estilo.width}"
            @focusout="onBlur" 
            @focus="onFocusN"
            @input="onInput"
            >
          <!--Si es spinner" -->

          <input v-else-if="prop.Type=='spinner'"
            class="number" 
            type="number" 
            ref="Ref" 
            :min="prop.Min" 
            :max="prop.Max"
            :value="numberStr"
            :readonly="prop.ReadOnly" 
            :placeholder="prop.Placeholder" 
            :tabindex="prop.TabIndex"
            :style="{'width' : estilo.width}"
            @focusout="onBlur" 
            @focus="onFocusN"
            @input="onInput"
            >

          <!--Si es fecha  -->
          <input v-else-if="prop.Type == 'date'" 
            class="date" 
            ref="Ref" 
            v-model.trim="Value" 
            :readonly="prop.ReadOnly"
            :placeholder="prop.Placeholder" 
            :tabindex="prop.TabIndex" 
            :type="prop.Type" 
            :maxlength="prop.MaxLength" 
            :size="prop.MaxLength"
            :style="{'width' : estilo.width}"
            @focusout="focusOut"
            @focus="onFocus"
            >


         


          <div v-else-if="prop.Type == 'checkbox'">
            
          <input  
            ref="Ref" 
            v-model.trim="Value"
            :readonly="prop.ReadOnly" 
            :placeholder="prop.Placeholder" 
            :tabindex="prop.TabIndex" :type="prop.Type"
            :maxlength="prop.MaxLength" 
            :size="prop.MaxLength"
            :style="{'width' : estilo.width}"
            @focusout="focusOut" 
            @focus="onFocus"
            >
           </div>

<!--Si es texto
            :maxlength="prop.MaxLength" 
            :size="prop.MaxLength"
 -->
         



          <input v-else class="text" 
            ref="Ref" 
            v-model.trim="Value"
            :readonly="prop.ReadOnly" 
            :placeholder="prop.Placeholder" 
            :tabindex="prop.TabIndex" :type="prop.Type"
            :style="{'width' : estilo.width}"
            @focusout="focusOut" 
            @focus="onFocus"
            >
  
        <span v-if="prop.ToolTipText" class="tooltiptext">{{prop.ToolTipText}} </span>
      </div>
      <span class="errorText" v-show="Error" 
            @focus="onFocus">{{ prop.MessageError }}</span>
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
const emit = defineEmits(["update", "update:Value", "update:Valid","update:Status", "update:MessageError", "update:Key", "update:Ref", "update:Focus"]);
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
    Valid: boolean;
    Sw_cap: true;
    Name: "";
    textLabel: "";
    Type: "text";
    Visible: true;
    ControlSource: string;
    Status: string;
    MessageError: string;
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
    Notation: 'standard'; //standard,scientific,enginniering,compact
    Style: string; // decimal, currency,percent,unit
    Currency: 'MXN'; //USD,EUR,MXN
    CurrencyDisplay : 'code'; //to use the ISO currency code.
    Decimals : number;
    Nu: 'arab';//
     
    //    SetFocus:false;
    //compAddress: any;
  };

  estilo: {
    background: "white";
    padding: "5px"; // Relleno
    color: "#b94295";
    width: "200px";
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
const Valid = ref(props.prop.Valid)
Status.value = 'I'
const MessageError = ref(props.prop.MessageError)
const Key = ref(props.prop.Key)
defineExpose({ Value, Status, MessageError });  // para que el padre las vea
const Error = ref(false)
const Focus = ref(props.prop.Focus)
Focus.value = false
var oldVal=Value.value
var sw_dec=false // 
////////////////////////////////
// Formateador de numeros 
/////////////////////////////
/*
const Style=ref(props.prop.Style)
if (!Style.value) Style.value='decimal'

const Currency=ref(props.prop.Currency)
if (!Currency.value) Currency.value='MXN'

const MinimumFractionDigits=ref(props.prop.Decimals) 
if (!MinimumFractionDigits.value) MinimumFractionDigits.value=2

const type = ref('text');
const toNumberStr = (n) => {
  return new Intl.NumberFormat('en-US', {
    style: Style.value,
    currency: Currency.value,
    minimumFractionDigits: MinimumFractionDigits.value,
    maximumFractionDigits: MinimumFractionDigits.value,
   
   
    
  }).format(n);
};
*/

const type = ref('text');

const toNumberStr = (n) => {
  let Style = props.prop.Style
  let Currency = props.prop.Currency
  let MinimumFractionDigits = props.prop.Decimals
  /* if (!Style) Style = 'decimal'
  if (!Currency) Currency = 'MXN'
  if (!MinimumFractionDigits) MinimumFractionDigits = 2*/
  //console.log('textLabel Digits===>',props.prop.Name,props.prop.Decimals,MinimumFractionDigits)



   return new Intl.NumberFormat('en-US', {
    style: Style,
    currency: Currency,
    minimumFractionDigits: MinimumFractionDigits,
    maximumFractionDigits: MinimumFractionDigits,
  }).format(n);
};

 const numberStr = ref(toNumberStr(Value.value));

function toNumberString(num) { 
  if (Number.isInteger(num)) { 
    return num + ".0"
  } else {
    return num.toString(); 
  }
}

 const onInput = ({ target }) => {
     target.value = target.value.replace(/[^0-9.]/g, "")  // solo admite numeros y punto decimal
    const len=target.value.length
      //Value.value = parseInt(target.value);
    let punto = target.value.indexOf('.');
 /*
    let count = 0;
    while (p !== -1) {
      count++;
      p = target.value.indexOf('.', p + 1);
    }
*/
    // busca si se digito mas de un punto
    if  (punto !== -1 && target.value.indexOf('.', punto + 1)!== -1) {
      target.value=target.value.substr(0,len-1) // quitamos el segundo punto
    }
    Value.value = parseFloat(target.value)
   //   console.log('onInput number',target.value)

};
  const onFocusN = () => {
      numberStr.value = Value.value;
      type.value = 'number';
      onFocus()
    };
  const onBlur = () => {
      type.value = 'text';
 //     numberStr.value = toNumberStr(Value.value)
        numberStr.value = toNumberString(Value.value)
 
      focusOut()
    };




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

/////////////////////////////////////////////////////////////////////
// emitValue
// Descripcion: emite hacia el componente padre el nuavo valor asignado
/////////////////////////////////////////////////////////////////
const emitValue = async () => {
  Status.value = 'A'
  console.log('EditBox antes emit Value ====>', props.prop.Value, Value.value)
  emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
  emit("update:Status", 'A'); // actualiza el valor Status en el componente padre
  emit("update:Valid",Valid.value)
  emit("update") // emite un update en el componente padre
  // console.log('EditBox despuest emit Value ====>', props.prop.Value, props.prop.Status)
  return true;
};


/////////////////////////////////////////////////////////////////////
// Numeros
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const Numeros = async ($event) => {

let stringValue= $event.data.toString()    
//x =x.replace(/\D/g, '') 
//Value.value.split('/\D/g').join('');
//
let regex = /^\d*(\.\d{1,2})?$/

console.log('Numeros Value ====>', Value.value)  


if(!stringValue.match(regex) ) {
     let Valor =Value.value
     console.log('Numeros Not match ====>',Value.value, Valor)  

   //   Value.value = oldVal
 
      }
        else {
 
          // Value.value=+(Valor)

          oldVal = Value.value

      }

}


/////////////////////////////////////////////////////////////////////
// focusOut
// Descripcion: Cuando pierda el foco el componente , actualizamo el valor en cursor local
/////////////////////////////////////////////////////////////////
const focusOut = async () => {

  //console.log('Valid updateCampo===>', Value,props.prop.ControlSource)
  if (props.prop.ControlSource && props.prop.ControlSource.length > 3) {
    // actualiza valor en localDb
    const valor = props.prop.Type == 'number' ? +Value.value : Value.value
    // Actualiza el alaSQL el dato
    await props.db.value.updateCampo(valor, props.prop.ControlSource, props.Recno)
    //await LocalDb.update(valor).then(() => { 
    // })
  }
  return await emitValue()

};
/////////////////////////////////////////////////////////////////////
// KeyPress
// Descripcion: Cada tecla que se presiona en el input
/////////////////////////////////////////////////////////////////

const keyPress = ($event) => {
  // <input       @keypress="keyPress($event)"
  const key = $event.charCode
  console.log('KeyPress===>',Value.value,key)
  Key.value = key
}


/////////////////////////////////////////////////////////////////////
// onFocus
// Descripcion: Cuando se cambie el valor del componente template (Value.value con el teclado),
//              tenemos que emitir hacia el padre el valor capturado (Value.value) y ejecutar el update
/////////////////////////////////////////////////////////////////
const onFocus = async () => {
  Error.value = false; // old revisar si se necesita
  MessageError.value = ''; // borramos el mensaje de error

  if (Status.value == 'P') return // ya se habia hecho el foco
  Status.value = 'P';  // en foco
  //console.log('onFocus elemento ===>', props.prop.Name, 'P')
  emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  emit("update:MessageError", '')
  emit("update")

}

const readCampo = async (recno: number) => {
  if (Status.value == 'A') {
    Status.value = 'P'
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  }
  const data = await props.db.value.readCampo(props.prop.ControlSource, recno)
  
  for (const campo in data){
     if (campo!='key_pri') Value.value=data[campo]  
  }

  //console.log('editText readCampo data ===>>',data,Value.value)
  
  if (data.key_pri>0){  // Ya existe en la base de datos
     Valid.value == true
  }else {
     Valid.value == false
  }

 
//  Value.value = await props.db.value.readCampo(props.prop.ControlSource, recno)
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
  () => props.prop.MessageError,
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


  oldVal=Value.value   // asignamos el valor viejo

  // si es el primer elemento a posicionarse
  if (props.prop.First) {
    emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
    emit("update") // emite un update en el componente padre
   // onFocus()
    Ref.value.focus()  // hace el foco como primer elemento
    //Ref.value.select()
    return
  }// else  await emitValue()

};


init(); // Ejecuta el init

</script>
