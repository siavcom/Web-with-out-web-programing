<template>
    <VueForm v-bind:THISFORM="THISFORM">
        <template v-slot:header></template>
        <template v-slot:main></template>
        <template v-slot:footer></template>
    </VueForm>
</template>
<script  lang="ts" setup>
import VueForm from "@/components/form.vue";
import { THISFORM } from './ThisForm'
</script>