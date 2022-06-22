<template>
  <div v-if="props.prop.RecordSource.length>0 && props.db.value && props.db.value.View[prop.RecordSource] " class="divi" :style="estilo" :v-show="prop.Visible">
    <label class="error" v-show="Error">{{ prop.ErrorMessage }}</label>
    <div class="tooltip">
      <!-- Grid  -->
      <form class="gridDatos">
        <!--label text-align="center">{{ prop.textLabel }}</label>  -->
        <h2><center>{{ prop.textLabel }}</center></h2>
        <div class="tabla">
        <table style="margin-top:10px" >
          <thead>
            <tr style="font-size: 13px">
              <td>Renglon</td>
              <td v-for="(obj, elemento) in This">
                <!--Header:
                      Solo imprime si su clase es header 
                   Tambien se pueden utilizar las prop de cada componente
                      ejemplo: elemento.Value ( elemento.prop.Value)
                      hay que poner el v-if para que solo se evaluen las columnas
                       v-if="This[elemento.Name]"   Si existe la elemento
                       && This[elemento.Name].BaseClass== 'Column' 
                       :ref="el => { This.Ref = el }"
                      :set="nomCom = impComp(This[elemento].prop.BaseClass)"
                  -->
                <div v-if="This[elemento] != null && This[elemento].BaseClass && This[elemento].BaseClass == 'Column'">
                  <!--Imprime como etiqueta el header de cada columna-->
                  {{ obj.textLabel }}
                </div>
              </td>
            </tr>
          </thead>
          <!-------------  Cuerpo  
                        v-if="prop.Status == 'A' && db.View[prop.RecordSource] && db.View[prop.RecordSource]recnoVal.length > 0" >
                [RecordSource]
          ------------------------->
          <tbody 
            v-if="prop.Status=='A' && props.db.value.View[prop.RecordSource]['recnoVal']['length']  ">
            <!-------------  Renglones  -----------------------
              @click="() => items.splice(i, 1)
              -->
            <!-- Repetira segun el numero de renglones que tenga datos   
               
               This.db.View.[prop.RecordSource].recnoVal 
                             <div  v-if="This.db.View['[prop.RecordSource]']"
                >registros={{ This.db.View['[prop.RecordSource]']['recnoVal']}}</div>
                this.View[alias].recnoVal   
                Views.[prop.RecordSource].recnoVal   
              -->

            <tr
              v-for="(recno, i) in props.db.value.View[prop.RecordSource]['recnoVal']">
              <td>
                {{i+1}}
              </td>
              <!-------------  Columnas  ------------------------->
              <!-- Por cada renglon Repetimos segun el numero de columnas tenga  
                  {{ i + 1 }}
                  v-bind:Recno="This.renglon[i]" 
                      v-model="This[columna.Name].prop.Value"
                      v-model:Status="This[columna.Name].prop.Status"
                      v-model:ErrorMessage="This[columna.Name].prop.ErrorMessage"
                      v-model:Key="This[columna.Name].prop.Key"
                      v-bind:Recno="This.db.View.recnoVal[i]"
                      v-bind:prop="This[columna.Name].prop"
                      v-bind:estilo="This[columna.Name].estilo"
                      v-bind:posicion="This[columna.Name].posicion"
                      v-bind:db="ref(This.db)"
                                            v-bind:Recno="This.db.View.[columna.Name].recnoVal[i]"
                      :is="impComp(This[columna.Name].BaseClass)"
                       v-model:Value="m.Value"

                      @focusout="push_eve('This.' + columna.Name + '.valid()')"
                      @focus.capture="push_eve('This.' + columna.Name + '.when('+i+')')"
                      @focusout="eventos.push(This[columna.Name].valid())"
                      @focus.capture="eventos.push(This[columna.Name].when(i))" />


                  <div v-if="This[columna.Name] && i == This.Row">
                    <component :is="impComp(This[columna.Name].prop.BaseClass)"
                      
                      v-model:Status="This[columna.Name].prop.Status"
                      v-model:ErrorMessage="This[columna.Name].prop.ErrorMessage"
                      v-model:Key="This[columna.Name].prop.Key"
                      v-bind:Recno="This.db.View.[prop.RecordSource].recnoVal[i]"
                      v-bind:prop="This[columna.Name].prop"
                      v-bind:estilo="This[columna.Name].estilo"
                      v-bind:posicion="This[columna.Name].posicion" v-bind:db="ref(This.db)"
                      @focusout="eventos.push(This[columna.Name].valid())" 
                      @focus.capture="eventos.push(This[columna.Name].when(i))"
                      :ref="el => { This[columna.Name].Ref = el }"
                      @onmouseover=""/>

                        </div>
                        -->
              <!--
                     Al asignar el Recno al componente, automaticamente toma su valor desde el componente
                    v-bind:Recno="This.db.View.[prop.RecordSource].recnoVal[i]"
                     Pasamos por referencia el objeto donde esta la bd para poder leer y grabar su valor
                      v-bind:db="ref(This.db)"
                      :ref="el => {This[columna.Name].Refe(el)}"
                      :ref="el => {This[columna.Name].Ref=el}"

                      @focus.capture="This.eventos.push('This.' + columna.Name + '.when(' + i + ')')"
                      @focusout or @change="This.eventos.push('This.' + columna.Name + '.valid()')" />
                      :ref="el => { refe[col] = el }"
                    v-model:Ref="This[col].Ref"
                    :is="textLabel"

                    -->
              <td v-for="(obj, col) in This" style="padding:0; text-align:center">
                <div v-if="This[col].BaseClass && This[col].BaseClass == 'Column'  && This[col].prop.Status!='I'">
                  <component v-if="i != This.Row && props.db.value.View[prop.RecordSource].recnoVal[i]" 
                    :is="textLabel"
                    v-bind:Recno="props.db.value.View[prop.RecordSource].recnoVal[i]"
                    v-bind:prop="This[col].prop"
                    v-bind:estilo="This[col].estilo" v-bind:posicion="This[col].posicion" 
                    v-bind:db="db"
                    @focus.capture="This.Form.eventos.push(This.prop.Map+'.asignaRenglon(' + i + ')')">
                  </component>

                  <component v-if="i == This.Row && props.db.value.View[prop.RecordSource].recnoVal[i] "
                    :is="impComp(This[col].prop.BaseClass)" v-model:Value="This[col].prop.Value"
                    v-model:Status="This[col].prop.Status" v-model:ErrorMessage="This[col].prop.ErrorMessage"
                    v-model:Key="This[col].prop.Key" 
                    v-model:Focus="This[col].Focus"
                    v-bind:Component="ref(This.Form[col])"
                    v-bind:Recno="props.db.value.View[prop.RecordSource].recnoVal[i]"
                    v-bind:prop="This[col].prop"
                    v-bind:estilo="This[col].estilo" v-bind:posicion="This[col].posicion" 
                    v-bind:db="db"
                    @focusout="This.Form.eventos.push(This.prop.Map+'.' + This[col].Name + '.valid()')">

                  </component>
                </div>
              </td>
              <div class="left-btn hide-in-print" 
                @click="This.Form.eventos.push(This.prop.Map+'.deleteRow(' + i + ')')">
                <img src="/Iconos/delete.jpeg" width="20">
              </div>

            </tr>
            <tr>
              <td>
                <!-------------  Si el numero de Columnas es menor que 2 y da un click genera nuevo registro
                    @click="() => items.push({ key: Math.random(), ref: 'MyRef', desc: 'My description', qty: 1, price: 0 })"
                    v-if="This.renglon<2 "


                 <div  v-if="i==This.db.View.[prop.RecordSource].recno-1"
                    :ref="Status => { This.prop.Status='A'}" >
                     Status={{i}} {{This.db.View.[prop.RecordSource].recno}} {{This.prop.Status}}
                 </div>

                   :ref="Status => { This.prop.Status='A'}"

                  -->

                <div v-if="props.db.value.View[prop.RecordSource]" class="left-btn hide-in-print"
                  @click="This.Form.eventos.push(This.prop.Map+'.appendRow()')">
                  <img src="/Iconos/plus.jpeg" width="20" />
                  {{ This.prop.Status }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </form>





      <span v-if="prop.ToolTipText" class="tooltiptext">
        {{
            prop.ToolTipText
        }}
      </span>
    </div>
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
  // toRefs,
  toRef,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onUnmounted,

} from "vue";



import imgButton from "@/components/imgButton.vue"
import comboBox from "@/components/comboBox.vue"
import editText from "@/components/editText.vue"
import textLabel from "@/components/textLabel.vue"
import grid from "@/components/grid.vue"

const emit = defineEmits(["update", "update:Value", "update:Status", "update:ErrorMessage", "update:Key", "update:Ref", "update:Focus"]);
//import { localDb } from "@/clases/LocalDb";  // manejo del indexedDb

///////////////////////////////////////
// Propiedades del componente reactivas
////////////////////////////////////
const props = defineProps<{
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
    RecordSource: string;
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
  Recno : 0;
  Component: null;
  db: any
}>();
// Valores componente padre
const Component = ref(props.Component)
const This = Component.value
console.log('Gridd This=====>',This)
This['estatus'] = []

//const eventos = This.Form.eventos // hacemos referencia al stack de eventos sincronos
//console.log('grid  props.db View ====>',props.db.value,props.prop.RecordSource)
const Db=props.db.value // Vista que utilizara el grid

console.log('grid  view.value Db ====>',Db)
//const View=Db.View[props.prop.RecordSource] // Vista de captura de db
//console.log('grid  View ====>',props.prop.RecordSource,View)

// Valores propios
const Value = ref(props.prop.Value);
const Ref = ref(null) // Se necesita paratener referencia del :ref del componente  ref(props.prop.Ref)
const Status = ref(props.prop.Status);
const ErrorMessage = ref(props.prop.ErrorMessage)
const Key = ref(props.prop.Key)
defineExpose({ Value, Status, ErrorMessage });  // para que el padre las vea
const Error = ref(false)
const Focus = ref(false)

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
    // actualiza valor en localDb
    await props.db.value.updateCampo(valor, props.prop.ControlSource, props.Recno)
    //await LocalDb.update(valor).then(() => { 
    // })
  }
  console.log('editBox focusout ', props.prop.Name)
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
  //console.log('onFocus elemento ===>', props.prop.Name, 'P')
  emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  emit("update:ErrorMessage", '')
  emit("update")

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

        Value.value = props.db.value.readRenglon(new_val, props.Recno)
        emitValue()
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
    if (new_val != old_val && new_val > 0 && props.prop.ControlSource > ' ') {
      console.log('Watc Grid Recno', new_val)
      Value.value = props.db.value.readCampo(props.prop.ControlSource, new_val)
    }
    emitValue()
    //    LocalDb.ControlSource = new_val;


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
    //   console.log('watch value',new_val)
  },
  { deep: false }
);

////////////////////////////////////////
// Hacer el set focus 
///////////////////////////////////////
watch(
  () => Focus.value,
  (new_val, old_val) => {
    console.log('EditText Set Focus', props.prop.Name)
    if (Focus.value) {
      Ref.value.focus()
      Ref.value.select()
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



  for (const componente in This) {
    if (
      This[componente].prop &&       // Si tiene propiedades
      This[componente].prop.Sw_cap &&  // Si es componete de captura
      This[componente].prop.Sw_cap == true
    ) {
      This.estatus[componente] = toRef(This[componente].prop, "Status"); // stack de estatus de componentes
    }
  }



  if (props.Recno > 0 && props.prop.ControlSource.length > 0) {

    Status.value = 'P';  // en lectura
    emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

    //    Vue.nextTick(() => {
    //       console.log(this.show, this.$refs.content);
    //     });


    Value.value = await props.db.value.readCampo(props.prop.ControlSource, props.Recno)
    if (!props.prop.Autofocus) {
      await emitValue()
    }
  }
  const ref = Ref
  emit("update:Ref", Ref); // actualiza el valor del Ref al componente padre


  if (props.prop.Autofocus) {
    emit("update:Value", Value.value); // actualiza el valor Value en el componente padre
    emit("update") // emite un update en el componente padre
    //  Ref.value.focus()
    Ref.value.select()
    return
  }// else  await emitValue()


  console.log('Init EditText==>', props.prop.Name)


  // if (props.prop.Name=='des_dat')  Ref.value.autofocus=true
  //Status.value = 'I';
  //Value.value = 0; // asignamos Valor inicial
};

/************************************************************************************ */
////////////////////////////////
// revisa los eventos que hay a ejecutar, en caso que hay una estatus de un componente
// no ejecuta el evento
/////////////////////////////////
/*

watch(
  () => This.eventos,
  (new_val, old_val) => {

    if (This.eventos.length == 0) return
    //console.log('Watch eventos===>',This.eventos)
    for (const comp in This.estatus) {
      console.log('Watch estatus ===>', comp, This.estatus[comp])
      if (This.estatus[comp] != 'A') {
        return
      }
      This.Parent.ThisForm.eventos.push(evento)
      eje_eve()
    }
  }, { deep: true }
);
*/

//////////////////////////////////////////////
// revisa los estatus de todos los componentes
watch(
  () => This.estatus,
  (new_val, old_val) => {
    console.log('<=======Watch estatus =======>')

    for (const comp in This.estatus) { // Recorre todos los estatus del grid
      console.log('Watch estatus ===>', comp, This.estatus[comp])

      if (This.estatus[comp] != 'A' && Status.value == 'A') { // Si alguno no esta activo
        Status.value = 'P';  // Cambia el estatus del gri a Proceso
        emit("update:Status", 'P'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value

        return
      }
    }
    Status.value = 'A';  // Todos los componentes del grid esta Activo
    emit("update:Status", 'A'); // actualiza el valor Status en el componente padre. No se debe utilizar Status.Value
  },
  { deep: true }
);


//////////////////////////////////////////////
// revisa los estatus de todos los componentes
/*
watch(
  () => View,
  (new_val, old_val) => {
    console.log('<=======Watch grid View =======>',new_val)

     },
  { deep: false }
);

*/


//************************************************** */
init(); // Ejecuta el init

//////////////////////////////////////
//  Importa componentes dinamicos
////////////////////////////////////// 
const impComp = ((name: string) => {
  switch (name) {
    case 'editText': {
      //      return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
      return editText
      break;
    }
    case 'comboBox': {
      return comboBox
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))
      break;
    }
    case 'grid': {
      return grid
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))
      break;
    }

    case 'imgButton': {
      return imgButton
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))
      break;
    }



    default: {
      return editText
      //return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
      break;
    }
  }

  //    return defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
})




</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
div.tabla {
  /*position: absolute; */
  /* no borrar se utiliza junto con div.option position:relative*/
  border: 1px solid rgb(0, 5, 2);
  border-radius: 1%;
  max-height: 800px;
  overflow-y: auto;
  width: 100%;
}

input {
  border: 2px solid rgb(0, 5, 2);
  color: #18e94c;
  width: "100px";
  height: "30px";
  background: #f7f8f7;
  padding: "5px";
  border-radius: 5%;
}

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--style scoped src="@/components/styles.css" /-->
