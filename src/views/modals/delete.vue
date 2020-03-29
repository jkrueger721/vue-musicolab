<template lang="pug">
    v-row(justify="center")
      v-dialog(v-model="dialog" persistent="" max-width="290")
        template(v-slot:activator="{ on }")
          v-btn(color="primary" dark="" v-on="on") Open Dialog
        v-card
          v-card-title.headline Are you sure you want to delete this project?
          v-card-text
            | Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
          v-card-actions
            v-spacer
            v-btn(color="green darken-1" text="" @click="dialog = false") Cancel
            v-btn(color="green darken-1" text="" @click="deleteCurrentProject") Yes

</template>
<script>
import { ProjectStore } from "@/store/ProjectStore.mobx";

export default {
  data() {
    return {
      dialog: false
    };
  },
  fromMobx: {
    ProjectStore
  },
  methods: {
    deleteCurrentProject(project) {
      ProjectStore.deleteProject(project);
    },
    deleteProjectModal(project) {
      console.log("im emitted!");
      ProjectStore.currentProject = project;
      this.dialog = true;
    }
  }
};
</script>
