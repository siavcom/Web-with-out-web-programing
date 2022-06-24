<!--
        <div v-for="(obj, comp) in ThisForm" >
        <component v-if="ThisForm[comp].prop && ThisForm[comp].prop.Position=='main' " 
          :is="impComp(ThisForm[comp].prop.BaseClass)" 
          v-bind:Component="ref(ThisForm[comp])"
          v-model:Value="ThisForm[comp].prop.Value"
          v-model:Status="ThisForm[comp].prop.Status" 
          v-model:ErrorMessage="ThisForm[comp].prop.ErrorMessage"
          v-model:Key="ThisForm[comp].prop.Key" 
          v-model:Focus="ThisForm[comp].Focus" 
          v-bind:prop="ThisForm[comp].prop"
          v-bind:estilo="ThisForm[comp].estilo" 
          v-bind:posicion="ThisForm[comp].posicion" 
          v-bind:db="ref(ThisForm.db)" 

          @focusout="ThisForm.eventos.push('ThisForm.' + comp + '.valid()')"
          @focus.capture="ThisForm.eventos.push('ThisForm.' + comp + '.setFocus()')"
          @click="ThisForm.eventos.push('ThisForm.' + compFooter + '.click()')"
          />
      </div>

-->

<template>
  <form class="LoginForm">
    <div class="imagen">
      <div class="DatosUsuario">
        <h3>Datos del usuario</h3>
        <!-- 
        <div v-for="(obj, comp) in ThisForm">
          <component v-if="ThisForm[comp].prop" :is="impComp(ThisForm[comp].prop.BaseClass)"
            v-model:Value="ThisForm[comp].prop.Value" v-model:Status="ThisForm[comp].prop.Status"
            v-model:ErrorMessage="ThisForm[comp].prop.ErrorMessage" v-model:Key="ThisForm[comp].prop.Key"
            v-model:Focus="ThisForm[comp].Focus" v-bind:prop="ThisForm[comp].prop" v-bind:estilo="ThisForm[comp].estilo"
            v-bind:posicion="ThisForm[comp].posicion" @focusout.capture="ThisForm.comp.valid()"
            @focus.capture="ThisForm.comp.setFocus()" @click="ThisForm.comp.click()" />
        </div>
       -->


        <!-- ref='esteComponente' los nombre no deben ser igual a <esteComponente -->
        
        <component :is="impComp(ThisForm.emp_emp.prop.BaseClass)"
          v-bind:Component="ref(ThisForm.emp_emp)"
          v-model:Value="ThisForm.emp_emp.prop.Value"
          v-model:Status="ThisForm.emp_emp.prop.Status"
          v-model:ErrorMessage="ThisForm.emp_emp.prop.ErrorMessage"
          v-model:Key="ThisForm.emp_emp.prop.Key"
          v-bind:prop="ThisForm.emp_emp.prop"
          v-bind:estilo="ThisForm.emp_emp.estilo"
          v-bind:posicion="ThisForm.emp_emp.posicion"
          v-bind:db="null"
          v-bind:Recno="0"
        ></component>
        <component :is="impComp(ThisForm.log_usu.prop.BaseClass)"
          v-bind:Component="ref(ThisForm.log_usu)"
          v-model:Value="ThisForm.log_usu.prop.Value"
          v-model:Status="ThisForm.log_usu.prop.Status"
          v-model:ErrorMessage="ThisForm.log_usu.prop.ErrorMessage"
          v-model:Key="ThisForm.log_usu.prop.Key"
          v-bind:prop="ThisForm.log_usu.prop"
          v-bind:estilo="ThisForm.log_usu.estilo"
          v-bind:posicion="ThisForm.log_usu.posicion"
          v-bind:db="null"
          v-bind:Recno="0"
          @keypress="ThisForm.log_usu.keyPress($event)"
          @focusout.capture="ThisForm.log_usu.valid()"
        ></component>
        <component :is="impComp(ThisForm.pas_usu.prop.BaseClass)"
          v-bind:Component="ref(ThisForm.pas_usu)"

          v-model:Value="ThisForm.pas_usu.prop.Value"
          v-model:Status="ThisForm.pas_usu.prop.Status"
          v-model:ErrorMessage="ThisForm.pas_usu.prop.ErrorMessage"
          v-model:Key="ThisForm.pas_usu.prop.Key"
          v-bind:prop="ThisForm.pas_usu.prop"
          v-bind:estilo="ThisForm.pas_usu.estilo"
          v-bind:posicion="ThisForm.pas_usu.posicion"
          v-bind:db="null"
          v-bind:Recno="0"
          @focusout.capture="ThisForm.pas_usu.valid()"
        ></component>
        <component :is="impComp(ThisForm.bt_aceptar.prop.BaseClass)"
          class="aceptar"
          v-bind:Component="ref(ThisForm.bt_aceptar)"

          v-bind:prop="ThisForm.bt_aceptar.prop"
          v-bind:estilo="ThisForm.bt_aceptar.estilo"
          v-bind:posicion="ThisForm.bt_aceptar.posicion"
          v-bind:imagen="ThisForm.bt_aceptar.imagen"
          @click.stop.prevent="ThisForm.bt_aceptar.Click()"
        ></component>
        
      </div>
    </div>
  </form>
</template>

<script  lang="ts" setup>

import {
  ref,
  reactive,
  } from "vue";

/////////////////////////////////////////////////
// Componentes
/////////////////////////////////////////////////
//import EmpEmp from "@/components/comboBox.vue"
//import LogUsu from "@/components/editText.vue";
//import PasUsu from "@/components/editText.vue";
//import btAceptar from "@/components/imgButton.vue";

import imgButton from "@/components/imgButton.vue"
import comboBox from "@/components/comboBox.vue"
import editText from "@/components/editText.vue"
import textLabel from "@/components/textLabel.vue"
import grid from "@/components/grid.vue"


//////////////////////////////////////////////
// Clases Externas typescript
//////////////////////////////////////////////
import { INIT } from "@/clases/Init";
import { VUEFORM } from "@/views/Login/login";


//////////////////////////////////////////////////
// Propiedades de los componentes
// Arbol de componentes de ThisForm segun Vfp //
//

//const This: any = getCurrentInstance()
//const ThisCtx = This.ctx


const ThisForm = reactive(new VUEFORM())

//////////////   Clase Base de datos ///////////////////////////////
const Init = new INIT();  // solo se puso para evitar de errores que tenia 

const init = async () => {
  await
    Init.Init()
      .then(() => {
        //        ThisForm.Init(ref(ThisForm))  // Pasamos por referencia  al init de la clase el ThisForm
        ThisForm.Init()  // Pasamos por referencia  al init de la clase el ThisForm
      })
      .finally(async () => {
        console.log("Inicio exitoso", ThisForm.prop.name);
      });
}

init()


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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #08315a;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

form.LoginForm {
  align-content: center;
  /* width: auto;
  height: auto; */
}

div.imagen {
  align-content: center;
  border: 5px solid green;
  border-radius: 10px;
  padding: 60px;
  background-color: #f2f4f5;
  height: 220x;
  width: 220px;
  /* se quita el directorio /public 
  background-image: url("/public/img/Logo_Empresa.png");*/
  background-image: url("/img/Logo_Empresa.png");
  /* opacity: 0.5;*/
}

div.DatosUsuario {
  opacity: 1;
  background-color: #f2f4f5;
  align-content: center;
  text-align: center;
  /*

    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

  height: 10px;
    width: 10px;
    background-image: "@/assets/favicon.ico"
  width: 300px;
  align-content: center;
  text-align: center;
  background-color: #f2f4f5;
  box-sizing: content-box;
  border-width: 2px;
  border-radius: 6px;
  border-color: black;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: flex-start;
*/
  /*margin-left: auto;*/
}
</style>
