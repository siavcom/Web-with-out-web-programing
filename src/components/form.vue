<!--   
&& ----------------------------------------------------------------------------------------------
&&              Siavcom Software S. de R.L. de C.V.
&& ----------------------------------------------------------------------------------------------
&& Autor    	: Ing. Fernando Cuadras Angulo
&& Sistema  	: Siavcom  							Version : 10.0  VUE
&& Programa 	: Forma prinncipal   		Mnemo   : form.VUE
&& Ult. mod.	: Fernando Cuadras  				Fecha   : 16/Jun/2022
&& Evento		: 
&& Objeto		: VUE
&& Comentarios	: Genera la forma dinamicamente en base al THISFORM que se pasa del comeponente padre
&& ----------------------------------------------------------------------------------------------
-->
<template>
  <section class="pagina" style="ThisForm.estilo" >

    <!--VueForm class="cuerpo" v-bind:style="ThisForm.estilo" v-bind:posicion="ThisForm.posicion"-->
    <slot name="header">

      <!--template v-slot:header-->
      <header class="header" float="left">
        <img class="logoVue" src="@/assets/logo.png" contain />
        <img class="logoEmp" src="/img/Logo_Empresa.bmp" contain />
        <div class="nemPge">
          <label text-align="left">{{ ThisForm.db.nem_pge }}</label>
        </div>
        <div class="fpoPge">
          <label type="date" text-align="center">{{ ThisForm.prop.fpo_pge + ' ' + ThisForm.prop.Name }}</label>
        </div>
        <div class="titFor">
          <label text-align="center">{{ ThisForm.prop.textLabel }}</label>
        </div>
      </header>



      <div v-for="(obj, compHeader) in ThisForm">
        <component
          v-if="ThisForm[compHeader].prop && ThisForm[compHeader].prop.Position == 'header' && compHeader != 'grid_datos'"
          :is="impComp(ThisForm[compHeader].prop.BaseClass)"
          v-bind:Component="ref(ThisForm[compHeader])"
          v-model:Value="ThisForm[compHeader].prop.Value"
          v-model:Status="ThisForm[compHeader].prop.Status"
          v-model:ErrorMessage="ThisForm[compHeader].prop.ErrorMessage" 
          v-model:Key="ThisForm[compHeader].prop.Key"
          v-model:Focus="ThisForm[compHeader].Focus" 
          v-bind:Recno="ThisForm[compHeader].Recno==null ? 0 : ThisForm[compHeader].Recno"
          v-bind:prop="ThisForm[compHeader].prop"
          v-bind:estilo="ThisForm[compHeader].estilo" 
          v-bind:posicion="ThisForm[compHeader].posicion"
          @focusout="ThisForm.eventos.push('ThisForm.' + compHeader + '.valid()')"
          @focus.capture="ThisForm.eventos.push('ThisForm.' + compHeader + '.when()')">
        </component>
      </div>

    </slot>
    <!--/template-->
    <!--template v-slot:main-->
    <!-- Despliega todo los componentes de la forma  
      && comp!='grid_datos'
      -->
    <section class="main">
      <slot name="main">

        <!-- @focus.capture -->
        <div v-for="(obj, comp) in ThisForm">
          <component v-if="ThisForm[comp].prop && ThisForm[comp].prop.Position == 'main'"
            :is="impComp(ThisForm[comp].prop.BaseClass)" 
            v-bind:Component="ref(ThisForm[comp])"
            v-model:Value="ThisForm[comp].prop.Value" 
            v-model:Status="ThisForm[comp].prop.Status"
            v-model:ErrorMessage="ThisForm[comp].prop.ErrorMessage" 
            v-model:Key="ThisForm[comp].prop.Key"
            v-model:Focus="ThisForm[comp].Focus" 
            v-bind:Recno="ThisForm[comp].Recno==null ? 0 : ThisForm[comp].Recno"
            v-bind:prop="ThisForm[comp].prop" 
            v-bind:estilo="ThisForm[comp].estilo"
            v-bind:posicion="ThisForm[comp].posicion" 
            v-bind:db="ref(ThisForm.db)"
            @focusout="ThisForm.eventos.push('ThisForm.' + comp + '.valid()')"
            @focus.capture="ThisForm.eventos.push('ThisForm.' + comp + '.when()')"
            @click="ThisForm.eventos.push('ThisForm.' + comp + '.click()')"></component>
        </div>

      </slot>
    </section>

    <!--/template-->
    <!--template v-slot:footer-->
    <section class="footer">
      <img v-if="ThisForm.prop.Status == 'A'" src="/Iconos/BotonVerde.png" style="float:left" />
      <img v-if="ThisForm.prop.Status != 'A'" src="/Iconos/BotonRojo.png" style="float:left" />
      <slot name="footer">

        <!-- @focus.capture -->

        <div v-for="(obj, compFooter) in ThisForm">
          <component v-if="ThisForm[compFooter].prop && ThisForm[compFooter].prop.Position == 'footer'"
            :is="impComp(ThisForm[compFooter].prop.BaseClass)" 
            v-bind:Component="ref(ThisForm[compFooter])"
            v-model:Value="ThisForm[compFooter].prop.Value" 
            v-model:Status="ThisForm[compFooter].prop.Status"
            v-model:ErrorMessage="ThisForm[compFooter].prop.ErrorMessage" 
            v-model:Key="ThisForm[compFooter].prop.Key"
            v-model:Focus="ThisForm[compFooter].Focus" 
            v-bind:Recno="ThisForm[compFooter].Recno==null ? 0 : ThisForm[compFooter].Recno"
            v-bind:prop="ThisForm[compFooter].prop" 
            v-bind:estilo="ThisForm[compFooter].estilo"
            v-bind:posicion="ThisForm[compFooter].posicion" 
            v-bind:db="ref(ThisForm.db)"
            @focusout="ThisForm.eventos.push('ThisForm.' + compFooter + '.valid()')"
            @focus.capture="ThisForm.eventos.push('ThisForm.' + compFooter + '.when()')"
            @click="ThisForm.eventos.push('ThisForm.' + compFooter + '.click()')"></component>
        </div>
      </slot>
    </section>

    <!--/template-->
    <!--/VueForm-->
  </section>

  <!--teleport to="#modal"  >
      <laLogUsu
        v-model:Value="ThisForm.la_log_usu.prop.Value"
        v-bind:prop="ThisForm.la_log_usu.prop"
        v-bind:estilo="ThisForm.la_log_usu.estilo"
        v-bind:posicion="ThisForm.la_log_usu.posicion"
      />
      <pasUsu
        v-model:Value="ThisForm.pas_usu.prop.Value"
        v-model:Status="ThisForm.pas_usu.prop.Status"
        v-model:ErrorMessage="ThisForm.pas_usu.prop.ErrorMessage"
        v-bind:prop="ThisForm.pas_usu.prop"
        v-bind:estilo="ThisForm.pas_usu.estilo"
        v-bind:posicion="ThisForm.pas_usu.posicion"
        @focusout="ThisForm.pas_usu.valid()"
 
      />
  </teleport-->
</template>

<script  lang="ts" setup>
//   @click.stop.prevent="push_eve('ThisForm.btAceptar.click()')"

//   @keypress ="ThisForm.nom_tab.keyPress($event)"   llamar el keypress
//.stop.prevent

import {
  nextTick,
  ref,
  toRef,
  reactive,
  computed,
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
  defineAsyncComponent,
  //defineProps,
} from "vue";

import { INIT } from "@/clases/Init";

//const This: any = getCurrentInstance();
//const ThisCtx = This.ctx;
//const showModal=ref(false)
/////////////////////////////////////////////////
// Componentes
/////////////////////////////////////////////////

import imgButton from "@/components/imgButton.vue"
import comboBox from "@/components/comboBox.vue"
import editText from "@/components/editText.vue"
import textLabel from "@/components/textLabel.vue"
import grid from "@/components/grid.vue"



/////////////////////////////////////////
// Programa base en typeScript
/////////////////////////////////////////

//import { THISFORM } from '/src/views/come9101/ThisForm.ts'



///////////////////////////////////////
// Propiedades del componente . Obtiene la forma base desde c/Main.vue 
////////////////////////////////////
const props = defineProps<{
  THISFORM: null;
}>();

const ThisForm = reactive(new props.THISFORM);


//const refe = reactive({})

//const estatus = reactive({}); //estatus de proceso de cada componente actualizable de la base de datos
//const eventos = reactive([]);  // pila de eventos a ejecutar en forma sincrona

//ThisForm.eventos=ref(eventos)
//const m = reactive({ Value: 'valor' })


// asigna por referencia un Value de un objeto reactivo. Con toRefs hace todas las variables reactivas a referencia
//export const nom_nom_value = toRef(vi_lla1_nom[0], 'nom_nom')

//ThisThisForm.refs.fea_nom.Value=ahora;
//console.log('Fecha ahora ====>',ThisThisForm.refs.fea_nom.Value);

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
////////////////////////////////////////////
/////////////////////////////////////////////////////
// Ejecuta los eventos que hay en la pila de eventos
async function eje_eve() {
  try {

    //if (ThisForm.eventos.length > 0) console.log("Watch Eventos a ejecutar ===>", ThisForm.eventos);

    while (ThisForm.eventos.length > 0) {

      // corremos el stack de eventos a ejecutar
      for (const nom_com in ThisForm.estatus) { //
        if (ThisForm.estatus[nom_com] != "A") return; // Si el estatus del componente esta en Proceso se sale
      }

      ThisForm.prop.Status = 'P'  // Prende el foco rojo mientras ejecuta cada evento
      // Wait for eval wrapper


      const waitEval = (evento:string, form) => {
        return new Promise((resolve, reject) => {
          // Se tiene que pasar por referencia donde esta el ThisForm 
          const ThisForm = form.value //ya que se trabajo solo en ambiente local
          console.log('WaitEval  evento ejecutado =====>', evento)

          //          if (evento == 'ThisForm.grid_datos.des_dat.Ref.focus()') {

          //            console.log('WaitEval des_dat.prop =====>',ThisForm.grid_datos.des_dat.Ref) // ThisForm.grid_datos.des_dat.Ref.value)
          //           const ele=ThisForm.grid_datos.des_dat.Ref //refe.des_dat.$el
          //            setTimeout(() => {
          //                ele.click() // Focus the element
          //            }, 500)

          //            nextTick(() => {
          //              ele.click();
          //              console.log('wait eval nextTick==>',ele)
          //            });

          //ele.focus()
          //            return
          //          }



          resolve(eval(evento))
        });
      }

      /*
          const waitFn = (fn, form) => {
      
            // Wait for new Function wrapper
            //const waitFn = (ev) => {
            // new Function('resolve', ev)(resolve); // si no se le pone el return el scope es local
            console.log('ThisForm promise===>', ThisForm)
            return new Promise((resolve, reject) => {
              return new Function('resolve', ` return ${fn}`)(resolve);
            });
          };
         */


      // LLamamos el evento a ejecutar en forma sincrona
      // Necesitamos pasar por referencia el ThisForm


      waitEval(ThisForm.eventos[0], ref(ThisForm)).
        then(() => {
          ThisForm.prop.Status = 'A' // Se necesita cambiar un dato directamente para refresh
          //   nextTick()
        }).
        finally(() => {

        })

      //    await nextTick()
      //eval(eventos[0]); //(); // emitimos el primer evento.Tiene que llevar () para que funcione

      //await waitFn(eventos[0])
      ThisForm.eventos.splice(0, 1); // borramos el evento
    }

  }
  catch (error) {
    console.log('Error al ejecutar evento ', error)
  }
}
/**

    await nextTick(() => {
    
    
        //console.log("ejecuta Eventos en cola", eventos);
            console.log('ThisForm estatus',ThisForm.prop.Status);
          });


 */



/////////////////////////////////////////////////////
// Incerta el evento a ejecutar en la pila de eventos
async function push_eve(nom_eve: string) {
  ThisForm.eventos.push(nom_eve);
  console.log("Evento empujado", eventos[0]);
  await eje_eve();
}
/*
watch(
  () => eventos,
  (new_val, old_val) => {
    console.log("Eventos a ejecutar ===>", new_val);
    eje_eve();
  }, { deep: true }
);

*/
////////////////////////////////
// revisa los eventos que hay a ejecutar, en caso que hay una estatus de un componente
// no ejecuta el evento
/////////////////////////////////
watch(
  () => ThisForm.eventos,
  (new_val, old_val) => {

    if (ThisForm.eventos.length == 0) return
    //console.log('Watch eventos===>',ThisForm.eventos)
    for (const comp in ThisForm.estatus) {
      console.log('Watch estatus ===>', comp, ThisForm.estatus[comp])
      if (ThisForm.estatus[comp] != 'A') {
        return
      }
      eje_eve()
    }
  }, { deep: true }
);


//////////////////////////////////////////////
// revisa los estatus de todos los componentes
watch(
  () => ThisForm.estatus,
  (new_val, old_val) => {
    console.log('<=======Watch estatus =======>')

    for (const comp in ThisForm.estatus) {
      console.log('Watch estatus ===>', comp, ThisForm.estatus[comp])

      if (ThisForm.estatus[comp] != 'A') {
        return
      }
    }
    eje_eve(); // Ejecutara pila de eventos
  },
  { deep: true }
);


//////////////////////////////////////////////
// revisa los estatus del grid de datos
/*
watch(
  () => grid_datos,
  (new_val, old_val) => {
    for (const comp in grid_datos) {
      //      console.log('Watch grid_datos  ===>', comp, grid_datos[comp])

      if (grid_datos[comp] != 'A') {
        ThisForm.estatus.grid_datos = 'P'
        //      console.log('Watch grid_datos.estatus ===>', estatus.grid_datos)

        return
      }
    }
    ThisForm.estatus.grid_datos = 'A'
  },
  { deep: true }
);



*/
const Init = new INIT();  // solo se puso para evitar de errores que tenia 

const init = async () => {
  try {
    console.log('<===============Comenzamos============>')
    await Init.Init()
      .then(() => {
      })
      .finally(async () => {
        console.log('No hubo error')

        if (1 == 1) {
          for (const componente in ThisForm) {
            if (
              ThisForm[componente].prop &&       // Si tiene propiedades
              ThisForm[componente].prop.Sw_cap &&  // Si es componente de captura
              ThisForm[componente].prop.Sw_cap == true
            ) {
              // if (ThisForm[componente].Ref)
              // console.log('RefHtml===>', componente, ThisForm[componente].Ref.$el)
              ThisForm.estatus[componente] = toRef(ThisForm[componente].prop, "Status"); // stack de estatus de componentes

            }
          }

        }
        /*
        // Por cada grid sus estatus
        for (const componente in ThisForm.grid_datos) {
          if (
            ThisForm.grid_datos[componente].prop &&       // Si tiene propiedades
            ThisForm.grid_datos[componente].prop.Sw_cap &&  // Si es componete de captura
            ThisForm.grid_datos[componente].prop.Sw_cap == true
          ) {
            // if (ThisForm[componente].Ref)
            // console.log('RefHtml===>', componente, ThisForm[componente].Ref.$el)
            //console.log('Asignando componentes de captura',componente)
            grid_datos[componente] = toRef(ThisForm.grid_datos[componente].prop, "Status"); // stack de estatus de componentes

          }
        }
        */
        console.log("Inicio exitoso come9101.vue", ThisForm)  //ThisForm,
        await ThisForm.Init()

        //ThisForm.nom_tab.Ref.$el.focus()
        // Solo muestra las que esta visibles . El grid_datos no lo muestra
      });
  }
  catch (error) {
    console.log('Error al inicializa la forma ', error)
  }

}

init()

//var result = x === true ? "passed" : "failed";


//const vi_cap_dat = computed(() => Views.value.vi_cap_dat ? Views.value.vi_cap_dat.recnoVal : [])
/*
const sub_total = computed(() => items.reduce((acc, item) => acc += item.qty * item.price, 0))
 
const total = computed(() => sub_total.value * (1 + tax_percent / 100) + shipping)
 
const valor_computed = computed((ref_com,recno) => ThisForm.db.readAla(ref_com.value.ControlSource,recno) )
 
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



//init();
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #08315a;
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
}
/*
div.contenedor {
  background: white;
  color: #b94295;
  min-width: 375px;
  min-height: 812px;
  background-image: "/img/Logo_Empresa.bmp";
  margin-top: 30%;

}
*/
header {
  color: #9ef1a5;
  height: 75px;
  border: black;
  border-width: 1px;
  padding: 0 10x;
}
img.logoVue {
  float: left;
  border: 1px solid #ddd;
  padding: 5px;
  width: 64px;
}
div.nemPge {
  float: left;
  width: 20%;
  color: #42b960;
  font-size: 11px;
  font-family: Arial;
  text-align: left;
}

div.titFor {
  float: center;
  color: #42b960;
  font-size: 18px;
  font-family: Arial;
  width: 65%;
}

div.fpoPge {
  float: right;
  width: 70px;
  color: #42b960;
  font-size: 11px;
  font-family: Arial;
}

.modal {
  width: 300px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
  /*z-index: 999;*/
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}

div.password {
  font-family: myriad-pro, sans-serif;
  position: fixed;
  top: 20%;

  width: max-content;
  height: max-content;
  padding: 30px;
  background-color: #fff;
  border-radius: 20px;
  border: #42b960 3px solid;
  z-index: 999;
  /*    opacity: 1;*/
}

img.logoEmp {
  float: right;

  border: 1px solid #ddd;
  padding: 5px;
  width: 64px;
}

section.footer {
  display: flex; /*  flex;*/
  /*flex-direction: column; */
  align-items: center; /*center;*/
  justify-content: space-around;
  /*width: 100%;*/
  height: 90px;
  background-color: #c8e0ce;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 6px;
}

img.bt_salir {
  background-color: rgb(255, 255, 255);
  box-shadow: 0 4px 8px 0, 0 6px 20px 0;
  box-sizing: border-box;
  /* width: 80px;*/
  height: auto;
  border-radius: 10%;
  padding: 5px;
  /*align-self: flex-end;*/
  /*position: absolute; /*"relative,static,absolute,sticky,fixed*/
  /* float: inline-end /**/
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
