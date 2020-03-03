<template lang="pug">
div
  div(v-for="project in projects" :key="project.id") 
    | {{project.name}} 
    v-btn.mr-4(@click="editProject(project)") edit


</template>

<script>
import { ProjectStore } from "@/store/ProjectStore.mobx";

export default {
  name: "Home",
  fromMobx: {
    ProjectStore
  },
  methods: {
    editProject(project) {
      console.log("editing proejct");
      ProjectStore.currentProject = project;
      this.$router.push("edit");
    }
  }
};
</script>
