<template>
  <section class="pagina" 
          v-bind:prop="ThisForm.prop"
          v-bind:estilo="ThisForm.estilo"
          v-bind:posicion="ThisForm.posicion"
          >
      <!--  header  -->
    <header class="header" v-bind:prop="ThisForm.header.prop"
          v-bind:estilo="ThisForm.header.estilo"
          v-bind:posicion="ThisForm.header.posicion" 
          v-bind:db="ref(ThisForm.db)" >
        
      <div v-for="comp in ThisForm.header" v-if="comp.prop" >
          <component 
            :is="impComp(ThisForm.header[comp.Name].prop.BaseClass)" :ref="el => { refe[comp.Name] = el }"
            v-model:Value="ThisForm.header[comp.Name].prop.Value"
            v-model:Status="ThisForm.header[comp.Name].prop.Status"
            v-model:ErrorMessage="ThisForm.header[comp.Name].prop.ErrorMessage"
            v-model:Key="ThisForm.header[comp.Name].prop.Key" v-model:Ref="ThisForm[comp.Name].Ref"
            v-model:Focus="ThisForm.header[comp.Name].Focus"
            v-bind:prop="ThisForm.header[comp.Name].prop"
            v-bind:estilo="ThisForm.header[comp.Name].estilo"
            v-bind:posicion="ThisForm.header[comp.Name].posicion" v-bind:db="ref(ThisForm.db)" />
      </div>
    </header>

    <body>
      <form>
        <transition name="modal">
          <div v-if="!ThisForm.prop.Login">
            <div class="overlay">
              <div id="modal" class="modal">
                <laLogUsu v-bind="ThisForm.la_log_usu" />
                <pasUsu v-model:Value="ThisForm.pas_usu.prop.Value" v-model:Status="ThisForm.pas_usu.prop.Status"
                  v-model:ErrorMessage="ThisForm.pas_usu.prop.ErrorMessage" v-bind:prop="ThisForm.pas_usu.prop"
                  v-bind:estilo="ThisForm.pas_usu.estilo" v-bind:posicion="ThisForm.pas_usu.posicion"
                  @focusout="validPassword()" />
              </div>
            </div>
          </div>
        </transition>

        <div class="body"
          v-bind:prop="ThisForm.body.prop"
          v-bind:estilo="ThisForm.body.estilo"
          v-bind:posicion="ThisForm.body.posicion" 
          >
        
          <div v-for="comp in ThisForm.body" v-if="comp.prop" >
            <component 
              :is="impComp(ThisForm.body[comp.Name].prop.BaseClass)" :ref="el => { refe[comp.Name] = el }"
              v-model:Value="ThisForm.body[comp.Name].prop.Value"
              v-model:Status="ThisForm.body[comp.Name].prop.Status"
              v-model:ErrorMessage="ThisForm.body[comp.Name].prop.ErrorMessage"
              v-model:Key="ThisForm.body[comp.Name].prop.Key" v-model:Ref="ThisForm[comp.Name].Ref"
              v-model:Focus="ThisForm.body[comp.Name].Focus"
              v-bind:prop="ThisForm.body[comp.Name].prop"
              v-bind:estilo="ThisForm.body[comp.Name].estilo"
              v-bind:posicion="ThisForm.body[comp.Name].posicion" v-bind:db="ref(ThisForm.db)" />
          </div>
        </div>  
      </form>
    </body>

    <section class="footer"
          v-bind:prop="ThisForm.footer.prop"
          v-bind:estilo="ThisForm.footer.estilo"
          v-bind:posicion="ThisForm.footer.posicion" >
      <img v-if='prop.Status' src="/Iconos/BotonVerde.png" style="float:left" />
      <img v-if='!prop.Status' src="/Iconos/BotonRojo.png" style="float:left" />

      <div v-for="comp in ThisForm.footer" v-if="comp.prop" >
            <component "
              :is="impComp(ThisForm.footer[comp.Name].prop.BaseClass)" :ref="el => { refe[comp.Name] = el }"
              v-model:Value="ThisForm.footer[comp.Name].prop.Value"
              v-model:Status="ThisForm.footer[comp.Name].prop.Status"
              v-model:ErrorMessage="ThisForm.footer[comp.Name].prop.ErrorMessage"
              v-model:Key="ThisForm.footer[comp.Name].prop.Key" v-model:Ref="ThisForm[comp.Name].Ref"
              v-model:Focus="ThisForm.footer[comp.Name].Focus"
              v-bind:prop="ThisForm.footer[comp.Name].prop"
              v-bind:estilo="ThisForm.footer[comp.Name].estilo"
              v-bind:posicion="ThisForm.footer[comp.Name].posicion" v-bind:db="ref(ThisForm.db)" />
      </div>
    </section>
  </section>
</template>

<script  lang="ts" setup>
//   @click.stop.prevent="push_eve('ThisForm.bt_aceptar.click()')"

//   @keypress ="ThisForm.nom_tab.keyPress($event)"   llamar el keypress
//.stop.prevent

import {
  nextTick,
  ref,
//  toRef,
  reactive,
//  computed,
  //  onMounted,
  //  onUpdated,
  //  onUnmounted,
  watch,
  //  isRef,
  //  isReactive,
  //  isReadonly,
  //  isProxy,
  // inject,
  // provide,
  //getCurrentInstance,
//  defineAsyncComponent,
  //defineProps,
} from "vue";

import { useRoute } from "vue-router";
import { INIT } from "@/clases/Init";
import { VueSimpleAlert } from "vue3-simple-alert";

/////////////////////////////////////////////////
// Componentes
/////////////////////////////////////////////////

import comboBox from "@/components/comboBox.vue"
import editText from "@/components/editText.vue"
import editNumber from "@/components/editNumber.vue"
import editDate from "@/components/editDate.vue"
import label from "@/components/label.vue"

//import VueSimpleAlert from "vue3-simple-alert"
/////////////////////////////////////////
// Clase base de la Forma a correr en typeScript
/////////////////////////////////////////
import { THISFORM } from "./ThisForm";

const route = useRoute();
// Now you can access params like:
//console.log('Parametros',route.params.id);
console.log("Vue Form  Parametros", route);

const ThisForm = reactive(new THISFORM);
const estatus = reactive({}); //estatus de proceso de cada componente actualizable de la base de datos
const refe = reactive({})

function mouseleave() {
  alert("¡Has sacado el ratón del botón!");
}
function beforeUpdate() {
  console.log("¡Antes de actualizar en padre!");
}

function sleep(sleepDuration: number) {
  const now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}

////////////////////////////////////////////
// Metodos propios



const Password = async () => {
  //console.log("Valid pas_usu Status ===> ", This.Status);

  if (ThisForm.pas_usu.prop.Value.length == 0) {
    ThisForm.pas_usu.prop.ErrorMessage = "Digite contraseña";
    return;
  }
  ThisForm.db.pass = ThisForm.pas_usu.prop.Value;

  const id_con = await ThisForm.db.open();
  if (id_con.length < 4) {
    VueSimpleAlert.alert(
      "No hay conexión, usuario o contraseña invalidos ",
      "Error",
      "error"
    );
    num_int.value++;
    if (num_int.value == 5) window.close(); // numero maximo de intentos = 5
    return;
  }
  num_int.value = 0; // reinicializamos los numero de intentos
  //guardamos el id de conexión
  ThisForm.prop.Login = true; // apaga el teleport para cerrar ventana login

  return true;
}; // fin metodo valid


////////////////////////////////////////////
// Ejecuta los eventos que hay en la pila de eventos
async function eje_eve() {
  try {

    if (ThisForm.eventos.length > 0) console.log("Watch Eventos a ejecutar ===>", ThisForm.eventos);

    while (ThisForm.eventos.length > 0) {

      // corremos el stack de eventos a ejecutar
      for (const nom_com in estatus) { //
        if (estatus[nom_com] != "A") return; // Si el estatus del componente esta en Proceso se sale
      }

      ThisForm.prop.Status = false  // Prende el foco rojo mientras ejecuta cada evento
      // Wait for eval wrapper


      const waitEval = (evento, form) => {
        return new Promise((resolve, reject) => {
          // Se tiene que pasar por referencia donde esta el ThisForm 
          const ThisForm = form.value //ya que se trabajo solo en ambiente local
          console.log('WaitEval=====>', evento)
            resolve(eval(evento))
        });
      }

  
      // LLamamos el evento a ejecutar en forma sincrona
      // Necesitamos pasar por referencia el ThisForm

      waitEval(ThisForm.eventos[0], ref(ThisForm)).
        then(() => {
          ThisForm.prop.Status = true // Se necesita cambiar un dato directamente para refresh
          console.log('Fin ejecucion evento')
          nextTick()
        }).
        finally(() => {

        })

      ThisForm.eventos.splice(0, 1); // borramos el evento
    }

  }
  catch (error) {
    console.log('Error al ejecutar evento ', error)
  }
}


////////////////////////////////
// revisa los eventos que hay a ejecutar, en caso que hay una estatus de un componente
// no ejecuta el evento
/////////////////////////////////
watch(
  () => ThisForm.eventos,
  (new_val, old_val) => {

    if (ThisForm.eventos.length == 0) return
    //   console.log('Watch eventos===>',ThisForm.eventos.length,ThisForm.eventos)
    for (const comp in estatus) {
      //      console.log('Watch estatus ===>', comp, estatus[comp])
      if (estatus[comp] != 'A') {
        return
      }
      eje_eve()
    }
  }, { deep: true }
);

//////////////////////////////////////////////
// revisa los estatus de todos los componentes
watch(
  () => estatus,
  (new_val, old_val) => {
    for (const comp in estatus) {
      //      console.log('Watch estatus ===>', comp, estatus[comp])

      if (estatus[comp] != 'A') {
        return
      }
    }
    eje_eve(); // Ejecutara pila de eventos
  },
  { deep: true }
);


const Init = new INIT();  // solo se puso para evitar de errores que tenia 

const init = async () => {
  try {
    await
      Init.Init(ref(ThisForm),ref(estatus))

  }
  catch (error) {
    console.log('Error al inicializa la forma ', error)
  }
}

init()

/* 
const computed_key= (recno) => {
  console.log('Computed key',recno)
if (recno>0 ) return recno
else return 0} 
*/

////////////////////////////////////

//const editText =computed(()  => defineAsyncComponent(() => import('@/components/editText.vue')))

//const view = computed(() => defineAsyncComponent(() => import(`/src/components/${state.view}.vue`)))
//const view = computed(() => defineAsyncComponent(() => import(`/src/components/${state.view}.vue`)))
//const editText=defineAsyncComponent(() => import('@/components/editText.vue'))  //import('@/components/${name}.vue'))
//const editText=() => import('@/components/editText.vue')  //import('@/components/${name}.vue'))


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
    case 'editNumber': {
      return editNumber
      //  return defineAsyncComponent(() => import('@/components/editNumber.vue'))  //import('@/components/${name}.vue'))
      break;
    }
    case 'editDate': {
      return editDate
      //  return defineAsyncComponent(() => import('@/components/editDate.vue'))  //import('@/components/${name}.vue'))
      break;
    }
    case 'comboBox': {
      return comboBox
      //return defineAsyncComponent(() => import('@/components/comboBox.vue'))  //import('@/components/${name}.vue'))
      break;
    }
    case 'label': {
      return label
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



//init();
</script>

<style>
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #08315a;
  margin-top: 60px;
}

div.DatosClientes {
  background-color: #f2f4f5;
  border-width: 1px;
  border-radius: 6px;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: flex-start;
}
*/
</style>
