<template>
  <div>
    <v-text-field v-model="currentProject.name" label="Name"></v-text-field>
    <v-text-field v-model="currentProject.style" label="Style"></v-text-field>
    <!-- <v-btn class="mr-4" @click="updateProject()">submit</v-btn> -->
  </div>
</template>
<script>
import { ProjectStore } from "@/store/ProjectStore.mobx";

export default {
  fromMobx: {
    ProjectStore
  }
};
</script>
