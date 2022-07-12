<template>
  <VueForm ref="form"  
      v-bind:prop="Form.prop"
      v-bind:estilo="Form.estilo"
      v-bind:posicion="Form.posicion">

    <template v-slot:header></template>
    <template v-slot:main>
      <div class="DatosClientes">
        <codNom
          v-model:Value="ThisForm.cod_nom.prop.Value"
          v-bind="ThisForm.cod_nom"
          @update="cod_nom.valid()"
        ></codNom>
        <laNomNom v-bind="ThisForm.la_nom_nom" />
        <nomNom
          v-model:Value="ThisForm.nom_nom.prop.Value"
          v-bind="ThisForm.nom_nom"
        />
        <laDcrNom v-bind="ThisForm.la_dcr_nom" />
        <dcrNom
          v-model:Value="ThisForm.dcr_nom.prop.Value"
          v-bind="ThisForm.dcr_nom"
        />
        <laLimNom v-bind="ThisForm.la_lim_nom" />
        <limNom
          ref="lim_nom"
          v-model:Status="ThisForm.lim_nom.prop.Status"
          v-model:Value="ThisForm.lim_nom.prop.Value"
          v-bind="ThisForm.lim_nom"
        />
        <laFeaNom v-bind="ThisForm.la_fea_nom" />
        <feaNom
          v-model:Value="ThisForm.fea_nom.prop.Value"
          v-bind="ThisForm.fea_nom"
        />
        <tipTdn
          v-model:Value="ThisForm.tip_tdn.prop.Value"
          v-bind="ThisForm.tip_tdn"
        />
        <lisNom
          v-model:Value="ThisForm.lis_nom.prop.Value"
          v-bind="ThisForm.lis_nom"
        />
        <sta_Nom
          v-model:Value="ThisForm.sta_nom.prop.Value"
          v-bind="ThisForm.sta_nom"
        />
      </div>
    </template>
    <template v-slot:footer>
      <btGraba
        ref="bt_graba"
        v-bind="ThisForm.bt_graba"
        @click.stop.prevent="push_eve('bt_graba.click()')"
      ></btGraba>
    </template>

  </VueForm>

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
//                 v-model:Value="ThisForm.sta_nom.prop.Value"
//         v-model:value="ThisForm.sta_nom.option2.prop.PickValue"
//            v-model:value="ThisForm.sta_nom.option1.prop.PickValue"

import {
  ref,
  toRef,
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
  getCurrentInstance,
  // defineAsyncComponent,
  defineProps,
} from "vue";
const This: any = getCurrentInstance();
const ThisCtx = This.ctx;
const showModal=ref(false)
/////////////////////////////////////////////////
// Componentes
/////////////////////////////////////////////////
import VueForm from "@/components/VueForm.vue";
import codNom from "@/components/editText.vue";
import nomNom from "@/components/editText.vue";
import dcrNom from "@/components/editNumber.vue";

//const limNom = defineAsyncComponent(() =>
//      import('@/components/editNumber.vue')
//    )

import limNom from "@/components/editNumber.vue";
import feaNom from "@/components/editDate.vue";

import laDcrNom from "@/components/label.vue";
import laLimNom from "@/components/label.vue";
import laNomNom from "@/components/label.vue";
import laFeaNom from "@/components/label.vue";
import tipTdn from "@/components/comboBox.vue";
import lisNom from "@/components/comboBox.vue";
import sta_Nom from "@/components/optionGroup.vue";

import btGraba from "@/components/button.vue";
import {FORM} from"@/views/Siavcom/Form.ts"


//import laLogUsu from "@/components/label.vue";
//import pasUsu from "@/components/editText.vue";


//////////////////////////////////////////////
// Clases Externas
//////////////////////////////////////////////
import {Functions} from '@/clases/Functions'
import { VFPDB } from "@/clases/DataBase";

//import { PAS_USU } from "@/views/Login/pas_usu";
//provide('dataBase', $dataBase );
//provide("messagebox", messagebox); // asignamos las clases de VueSimpleAlert a messagebox
//provide('URL',url);

/*

    onBeforeMount(() => console.log('before mount'));
    onMounted(() => console.log('mounted'));
    onBeforeUpdate(() => console.log('before update'));
    onUpdated(() => console.log('updated'));
    onBeforeUnmount(() => console.log('before unmount'));
    onUnmounted(() => console.log('unmounted'));
    onActivated(() => console.log('activated'));
    onDeactivated(() => console.log('deactivated'));
    onErrorCaptured(() => console.error('error captured'));
    onRenderTracked(() => console.log('render tracked'));
    onRenderTriggered(() => console.log('render triggered'));
*/

//////////////////////////////////////////////////
// Propiedades de los componentes
// Arbol de componentes de ThisForm segun Vfp //
//
/*
const props = defineProps<{
  id_con: string;
}>();
*/
const form=new FORM()
const Form =reactive(form)

const ThisForm = reactive({
  tag: "",
  name: "",
  prop: {},
  estilo: {},
  posicion: {} ,
//  la_log_usu: { prop: {}, estilo: {}, posicion: {} },
//  pas_usu: new PAS_USU(ref(ThisCtx), ref(This)),
  la_dcr_nom: { prop: {}, estilo: {}, posicion: {} },
  la_lim_nom: { prop: {}, estilo: {}, posicion: {} },
  la_nom_nom: { prop: {}, estilo: {}, posicion: {} },
  la_fea_nom: { prop: {}, estilo: {}, posicion: {} },
  cod_nom: { prop: {}, estilo: {}, posicion: {} },
  nom_nom: { prop: {}, estilo: {}, posicion: {} },
  dcr_nom: { prop: {}, estilo: {}, posicion: {} },
  lim_nom: { prop: {}, estilo: {}, posicion: {} },
  fea_nom: { prop: {}, estilo: {}, posicion: {} },
  bt_graba: { prop: {}, estilo: {}, posicion: {}, imagen: {} },
  tip_tdn: { prop: {}, estilo: {}, posicion: {} },
  lis_nom: { prop: {}, estilo: {}, posicion: {} },
  sta_nom: {
    prop: {},
    estilo: {},
    posicion: {},
    componente: {},
  },
});



const estatus = reactive({}); //reactive({})
const eventos = [];

// clases de cada componentes
import { COD_NOM } from "@/views/Siavcom/cod_nom.ts";
const cod_nom = new COD_NOM();

import { BT_GRABA } from "@/views/Siavcom/bt_graba.ts";
const bt_graba = new BT_GRABA();

//  https://www.tutorialesprogramacionya.com/angularya/index.php?inicio=20

/////////////////////////////////////////////
//  Constantes globales
////////////////////////////////////////////
//const This = getCurrentInstance();
//console.log('This Cod_nom ====>',cod_nom);

const fec_act = new Date().toISOString().substr(0, 10); //  Fecha actual de la computadora cliente
const messagebox = Functions.MessageBox; // asignamos las clases de VueSimpleAlert a messagebox

//////////////   Clase Base de datos ///////////////////////////////
//const db = new VFPDB("http://siavcom.com.mx:58000/", "Demo", "sa", "******");
const db = new VFPDB("", "", "", "");

// VFPDB(<url>:string,<Base de datos>:string,<user>:string,<password>:string)

// async do existe en el ultimo typescript . en esta version todavia no esta implementado
//async do { };

// the DOM element will be assigned to the ref after initial render
// Los elementos DOM se asignaran despues de renderizar se podran reasignar aqui y deben de estar declarados como variables ref

//////////////////////////////////////////////////////////
//////////  Init Vfp  //////////////////////////////////

const init = async () => {
  //////////////////////////////////////////////////
  ////////  Abre la base de datos y si lo logra se abren las vistas remotas SQL
  // useNodata(<nombre de la vistas>: string,<alias>:string )
  // db.id_con=props.id_con
  /*
let id_con: any = ''
  try {
    id_con = sessionStorage.getItem('id_con')
    db.id_con = id_con
    console.log('Base de datos===>', id_con, db)
  }
  catch {
    document.body.remove() // removeChild similar destroy vfp
    console.log('No hay id de conexion')
  }
*/
  
  await //  db
  //    .open()
  //    .then(async () => {
  db
    .useNodata("vi_lla1_nom")
    .then(() => {
      //      db.useNodata("vi_lla1_ven","vendedores");
    })
    .then(() => {
      //      db.useNodata("vi_lla1_isu");
    })
    .then(async () => {
      await db.openLocalDb();
      //      db.useNodata("vi_lla1_pro");
    })
    .finally(async () => {
      console.log("Inicio exitoso");
 
      //const mounted =  onMounted(() => {
      // console.log("==============<¡Se monto en padre!>=============");
      // Definimos todas las propiedades de los componentes en el componente ThisForma
/*
      ThisForm.prop.Titulo = "Altas Bajas Cambios de clientes";
      ThisForm.prop.nem_pge = "Empresa SA de CV";
      ThisForm.prop.fpo_pge = fec_act;
      ThisForm.prop.log_emp = "/img/Logo_Empresa.bmp";
      ThisForm.prop.Name='Siavcom'
*/
      //ThisForm.vue_form.prop.ModalWindow = true

      // Etqiuetas
      //ThisForm.la_log_usu.prop.Value = "Usuario";

      ThisForm.la_dcr_nom.prop.Caption = "Dias de credito";
      ThisForm.la_lim_nom.prop.Caption = "Credito por ";
      ThisForm.la_nom_nom.prop.Caption = "Nombre del cliente";
      ThisForm.la_fea_nom.prop.Caption = "Fecha de alta";

      // Componentes de captura
      ThisForm.cod_nom.prop.Name = "cod_nom";
      ThisForm.cod_nom.prop.Placeholder = "Codigo del cliente ";
      ThisForm.cod_nom.prop.Value = "";
      ThisForm.cod_nom.prop.Sw_val = false;
      ThisForm.cod_nom.prop.Label = "Codigo del cliente";
      ThisForm.cod_nom.prop.Type = "text";
      ThisForm.cod_nom.prop.ReadOnly = false;
      ThisForm.cod_nom.prop.Sw_cap = false;
      ThisForm.cod_nom.prop.ToolTipText = "Pon aqui el codigo del cliente";
      ThisForm.cod_nom.prop.TabIndex = 1;

      ThisForm.nom_nom.prop.Name = "nom_nom";
      ThisForm.nom_nom.prop.Placeholder = "Nombre del cliente";
      // ThisForm.nom_nom.prop.Db = ref(db);
      ThisForm.nom_nom.prop.ControlSource = "vi_lla1_nom.nom_nom";
      ThisForm.nom_nom.prop.ReadOnly = false;
      ThisForm.nom_nom.prop.Sw_val = false;
      //ThisForm.nom_nom.estilo.width = "300px";
      ThisForm.nom_nom.estilo.height = "30px";
      ThisForm.nom_nom.prop.ReadOnly = true;
      ThisForm.nom_nom.prop.Sw_cap = true;
      ThisForm.nom_nom.prop.TabIndex = 2;

      ThisForm.dcr_nom.prop.Placeholder = "Días de crédito";
      ThisForm.dcr_nom.prop.ControlSource = "vi_lla1_nom.dcr_nom";
      ThisForm.dcr_nom.prop.Sw_val = false;
      //ThisForm.dcr_nom.estilo.width = "200px";
      ///ThisForm.dcr_nom.estilo.height = "30px";
      ThisForm.dcr_nom.prop.ReadOnly = true;
      ThisForm.dcr_nom.prop.Sw_cap = true;
      ThisForm.dcr_nom.prop.TabIndex = 3;

      ThisForm.lim_nom.prop.Placeholder = "Limite de crédito";
      ThisForm.lim_nom.prop.ControlSource = "vi_lla1_nom.lim_nom";
      ThisForm.lim_nom.prop.Sw_val = false;
      //ThisForm.lim_nom.estilo.width = "200px";
      //ThisForm.lim_nom.estilo.height = "30px";
      ThisForm.lim_nom.prop.ReadOnly = true;
      ThisForm.lim_nom.prop.Sw_cap = true;
      ThisForm.lim_nom.prop.ToolTipText = "= 0 No hay limite de credito";
      ThisForm.lim_nom.prop.Status = "";
      ThisForm.lim_nom.prop.TabIndex = 4;

      ThisForm.fea_nom.prop.ControlSource = "vi_lla1_nom.fea_nom";
      ThisForm.fea_nom.prop.Sw_val = false;
      ThisForm.fea_nom.prop.ReadOnly = true;
      ThisForm.fea_nom.prop.Sw_cap = true;
      ThisForm.fea_nom.prop.ToolTipText = "Primera ves que se le vendio";
      ThisForm.fea_nom.prop.TabIndex = 5;

      ThisForm.tip_tdn.prop.ControlSource = "vi_lla1_nom.tip_tdn";
      ThisForm.tip_tdn.prop.Label = "Tipo de cliente";
      ThisForm.tip_tdn.prop.RowSource = [
        ["Publico en general", "Mayoreo", "Menudeo", "Especial"],
        ["PG", "MA", "ME", "ES"],
      ]; // vi_cap_doc.tdo_tdo,des_tdo
      ThisForm.tip_tdn.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
      ThisForm.tip_tdn.prop.ColumnCount = 2;
      ThisForm.tip_tdn.prop.BoundColumn = 2;
      ThisForm.tip_tdn.prop.ColumnWidths = "75,25";
      ThisForm.tip_tdn.prop.Value = "MA";
      ThisForm.tip_tdn.prop.ReadOnly = true;
      ThisForm.tip_tdn.prop.Sw_cap = true;
      ThisForm.tip_tdn.estilo.zIndex = 999;
      ThisForm.tip_tdn.prop.TabIndex = 6;

      ThisForm.lis_nom.prop.ControlSource = "vi_lla1_nom.lis_nom";
      ThisForm.lis_nom.prop.Label = "Lista de precios";
      //ThisForm.lis_nom.prop.RowSource = ["A", "B", "C", "D", "E", "F"]; // vi_cap_doc.tdo_tdo,des_tdo
      ThisForm.lis_nom.prop.RowSource = "A,B,C,D,E,F"; // vi_cap_doc.tdo_tdo,des_tdo
      ThisForm.lis_nom.prop.RowSourceType = 1; //1-Value, 2-Alias, 5-Array
      ThisForm.lis_nom.prop.ColumnCount = 1;
      ThisForm.lis_nom.prop.ColumnWidths = "40";
      ThisForm.lis_nom.prop.Value = "B";
      ThisForm.lis_nom.prop.ReadOnly = true;
      ThisForm.lis_nom.prop.Sw_cap = true;
      //ThisForm.lis_nom.estilo.width = "80px";
      ThisForm.lis_nom.estilo.zIndex = 800;
      ThisForm.lis_nom.prop.TabIndex = 7;

      ThisForm.sta_nom.prop.Label = "Estatus";
      ThisForm.sta_nom.prop.ControlSource = "vi_lla1_nom.sta_nom";
      ThisForm.sta_nom.prop.Sw_val = false;
      ThisForm.sta_nom.prop.ReadOnly = true;
      ThisForm.sta_nom.prop.Sw_cap = true;
      ThisForm.sta_nom.prop.ButtonCount = 2;
      ThisForm.sta_nom.prop.Value = "B";

      //ThisForm.sta_nom.estilo.width = "200px";
      ThisForm.sta_nom.estilo.height = "30px";

      //ThisForm.sta_nom.option1.estilo.width = "200px";
      // definimos su arbol
      ThisForm.sta_nom.componente.option1 = {
        prop: {},
        estilo: {},
        posicion: {},
      };
      ThisForm.sta_nom.componente.option1.prop.Sw_cap = true;
      ThisForm.sta_nom.componente.option1.prop.Caption = "Activo";
      ThisForm.sta_nom.componente.option1.prop.Value = "";
      ThisForm.sta_nom.componente.option1.prop.Label = "Activo";
      ThisForm.sta_nom.componente.option1.prop.TabIndex = 8;
      ThisForm.sta_nom.componente.option1.prop.PickValue = "A";

      //      ThisForm.sta_nom.option1.estilo.height = "30px";
      ThisForm.sta_nom.componente.option1.estilo.display = "inline-block";

      //ThisForm.sta_nom.option2.estilo.width = "200px";
      // definimos su arbol
      ThisForm.sta_nom.componente.option2 = {
        prop: {},
        estilo: {},
        posicion: {},
      };
      ThisForm.sta_nom.componente.option2.estilo.height = "30px";
      ThisForm.sta_nom.componente.option2.prop.Sw_cap = true;
      ThisForm.sta_nom.componente.option2.prop.Caption = "Baja";
      ThisForm.sta_nom.componente.option2.prop.Value = "";
      ThisForm.sta_nom.componente.option2.prop.TabIndex = 9;
      ThisForm.sta_nom.componente.option2.prop.PickValue = "B";

      ThisForm.bt_graba.prop.Value = "Otro";
      ThisForm.bt_graba.prop.ToolTipText = "Graba datos";
      ThisForm.bt_graba.prop.ReadOnly = true;
      //ThisForm.bt_graba.estilo.float='left';
      ThisForm.bt_graba.imagen.src = "/Iconos/Accept.png";
      //ThisForm.bt_graba.imagen.backgroundImage= "@/Iconos/Accept.png"
      ThisForm.bt_graba.prop.TabIndex = 10;

      //ponemos todos los estatus de los componentes de captura y
      // los vigilamos con un watch el cambio de estatus
      for (const comp in ThisForm) {
        //aqui me quede
        if (
          ThisForm[comp].prop &&
          ThisForm[comp].prop.Sw_cap &&
          ThisForm[comp].prop.Sw_cap == true
        ) {
          ThisForm[comp].prop.Status = "A";
          estatus[comp] = toRef(ThisForm[comp].prop, "Status");
        }
      }

      //console.log('onMounted ThisThisForm======>>>>',ThisThisForm);
      /* Las propiedades que puede tener un objeto
          View: ref(vi_lla1_nom),       // referencia a la vist a actualizar
          Field: "nom_nom",             // campo dentro de la tabla
          Recno: ref(recno.vi_lla1_nom),// referencia del registro que esta en ese momento
          Placeholder: "Nombre del cliente",
          ThisFormat: "",
          InputMask: "",
          MaxLenght: 0,
          ReadOnly: false,
          Tag: "",
          Value: "",
          Sw_val: false
      
      export const estilo = {
        background: "white",
        color: "#b94295",
        width: "500px",
        height: "30px",
        fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
        textAlign: "left" // left, center, right;
      };
      
      export const posicion = {
        position: "", //absolute,
        left: 0,
        Top: 0
      };
      
      */
    });
}; // ) End onMounted

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

function SubmitForm() {
  // reviza si ya estan actualizados todos los componentes de captura
  for (const componente in ThisForm) {
    // aqui me quede
    if (
      ThisForm[componente].prop &&
      ThisForm[componente].prop.Sw_cap &&
      ThisForm[componente].prop.Sw_cap == true
    ) {
      let contador = 0;
      while (ThisForm[componente].prop.Status == "P") {
        // esperando a que cambie el estatus
        console.log("Esperando cambio de estatus", componente);
        // e.preventDefault()
        sleep(1000);
        console.log(
          "Click thisform lim_nom.prop.Status",
          contador,
          ThisForm.lim_nom.prop.Status
        );
        contador = contador + 1;
        if (contador > 5) return; // return
      }
    }
  }
  console.log("¡Entra a submit form! ");
  bt_graba.click();
}

////////////////////////////////////////////
// Metodos propios
////////////////////////////////////////////

//Cod_nom.ThisForm=ThisForm;
//Cod_nom.db=db; // ref(db);

/*
const cod_nom_ant = new (class {
  prop = ThisForm.cod_nom.prop; // asignamos todas las propiedades del componente


  // Metodo Valid
  //  public valid() {

  public valid = async () => {
    const This = ThisForm.cod_nom.prop;
    const m = {};

    if (!this.prop.Value) {
      return;
    }
    This.Value = ("000000" + This.Value.trim()).substr(-6, 6);

    m.cop_nom = "C";
    m.cod_nom = This.Value;
    // console.log("Valid cod_nom this.prop =====>", ThisForm.cod_nom.prop.Value);

    // LLamamos a use con el objeto m para hacer la condicion de busqueda
    await db.use("vi_lla1_nom", m).then(result => {
      // si fue existosa la llamada y encontro registro

      if (result) {
        ThisForm.bt_graba.prop.ReadOnly = false; // habilitamos el boton de otro
        // Recorremos la forma y si es un componente de captura e quita el ReadOnly
        for (const componente in ThisForm) {
          if (ThisForm[componente].prop && ThisForm[componente].prop.Sw_cap) {
            ThisForm[componente].prop.ReadOnly = false; // Permitimos su captura
            ThisForm[componente].prop.Sw_val = true; // Prendemos sw_val (switch de validacion)
          }
        }
      } else {
        messagebox.alert("Error", "No existe el cliente");

      }
    });
  }; // fin metodo valid

  // public click() {
  public click = async () => {
    const m = {};
  }; // fin metodo click
})();

const bt_graba = new (class {

  prop = ThisForm.bt_graba.prop;

  // Metodo click
  //  public click() {
  public click = async () => {
    //    const sw_act = await db.tableUpdate()
    await db.tableUpdate().
      then((resultado) => {
        if (resultado) {
          alert('Se acutualizo correctamente los datos')
          ThisForm.bt_graba.prop.ReadOnly = true; // Deshabilitamos el boton de actualizacion
          ThisForm.bt_graba.prop.Visible = false; // Deshabilitamos el boton de actualizacion

          for (const componente in ThisForm) {
            // Si es campo actualizable, deshabilitamos todos los campos a capturar y habilitamos su captura
            if (ThisForm[componente].prop && ThisForm[componente].prop.Sw_cap) {
              ThisForm[componente].prop.ReadOnly = true;
              ThisForm[componente].prop.Sw_val = false;
            }
          }
          ThisForm.cod_nom.prop.ReadOnly = false;
        }
      })
  };
})();
*/
//Vue.config.errorHandler = (error) => ErrorService.onError(error);
/*
errorCaptured(err, vm, info) {
    // err: error trace
    // vm: component in which error occured
    // info: Vue specific error information such as lifecycle hooks, events etc.
    // TODO: Perform any custom logic or log to server
    // return false to stop the propagation of errors further to parent or global error handler
  }
*/

/////////////////////////////////////////////////////
// Ejecuta los eventis que hay en la pila de eventos
function eje_eve() {
  while (eventos.length > 0) {
    // corremos el stack de eventos a ejecutar
    for (const nom_com in estatus) { //
      console.log("Revizando estatus eje_eve ====>", estatus[nom_com]);
      if (estatus[nom_com] != "A") return; // si hay algo en proceso se sale
    }
    console.log("ejecutara Evento  ====>", eventos[0]);
    eval(eventos[0]); //(); // emitimos el primer evento.Tiene que llevar () para que funcione

    eventos.splice(0, 1); // borramos el evento
    console.log("Eventos en cola", eventos);
  }
}

/////////////////////////////////////////////////////
// Incerta el evento a ejecutar en la pila de eventos
function push_eve(nom_eve: string) {
  eventos.push(nom_eve);
  console.log("Evento empujado", eventos[0], ThisForm.lim_nom.prop);
  eje_eve();
}

//////////////////////////////////////////////
// revisa los estatus de todos los componentes
watch(
  () => estatus,
  (new_val, old_val) => {
    console.log("Watch estatus===>", new_val.lim_nom);
    eje_eve(); // Ejecutara pila de eventos
  },
  { deep: true }
);

init();
</script>

<style>
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
  /*margin-left: auto;*/
}
</style>
