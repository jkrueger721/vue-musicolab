<template>
  <form>
    <v-text-field v-model="newProject.name" label="Name"></v-text-field>
    <v-text-field v-model="newProject.style" label="Style"></v-text-field>

    <v-btn class="mr-4" @click="createNewProject()">submit</v-btn>
  </form>
</template>
<script>
import { ProjectStore } from "@/store/ProjectStore.mobx";

export default {
  fromMobx: {
    ProjectStore
  }
};
</script>
