<template>
  <div class="main-content">
    <form>
      <v-text-field v-model="newProject.name" label="Name"></v-text-field>
      <v-text-field v-model="newProject.style" label="Style"></v-text-field>

      <v-btn class="mr-4" @click="createProject">submit</v-btn>
    </form>
  </div>
</template>
<script>
import { ProjectStore } from "@/store/ProjectStore.mobx";

export default {
  fromMobx: {
    ProjectStore
  },
  methods: {
    async createProject() {
      await this.createNewProject();
      this.$router.push("/");
    }
  }
};
</script>
