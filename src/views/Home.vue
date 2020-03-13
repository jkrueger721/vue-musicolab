<template lang="pug">
  div
    v-btn.mr-4(@click="getAllProjects()") Projects
    div(v-for="project in projects" :key="project.id") 
      | {{project.name}} 
      v-btn.mr-4(@click="editProject(project)") edit
      v-btn.mr-4(@click="deleteProject(project)") delete


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
      console.log("editing " + project);
      ProjectStore.currentProject = project;
      this.$router.push("edit");
    }

    // beforeMount() {
    //   window.addEventListener("load", ProjectStore.getAllProjects);
    // }
  }
};
</script>
