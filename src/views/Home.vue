<template lang="pug">
  .main-content
    form(ref='form')
      v-dialog(v-model='dialog' persistent='' max-width='600px')
        v-card
          v-card-title
            span.headline User Profile
          v-card-text
            v-container
              v-row
                v-col(cols='4')
                  v-text-field(label='Name' v-model='currentProject.name')
                v-col(cols='4')
                  v-text-field(label='Style' v-model='currentProject.style')
                v-col(cols='4')
                  v-text-field(label='Instruments' v-model='currentProject.instruments')
                v-col(cols='12')
                  v-text-field(label='Daw' v-model='currentProject.daw')
                v-col(cols='12')
                  v-text-field(label='Comments' v-model='currentProject.comments')
                v-col(cols='12')
                  v-text-field(label='Audio url' v-model='currentProject.audioUrl' required='')
          v-card-actions
            v-spacer
            v-btn(color='blue darken-1' text='' @click='dialog = false') Close
            v-btn(color='blue darken-1' text='' @click='updateCurrentProject') Save

    //- v-btn.mr-4(@click="getAllProjects()") Projects
    div(v-for="project in projects" :key="project.id") 
      | {{project.name}} 
      v-btn.mr-4(@click="editProject(project)") edit
      v-btn.mr-4(@click="deleteProject(project)") delete


</template>

<script>
import { ProjectStore } from "@/store/ProjectStore.mobx";
import EditModal from "./modals/edit";

export default {
  name: "Home",
  data() {
    return {
      dialog: false
    };
  },
  fromMobx: {
    ProjectStore
  },
  methods: {
    editProject(project) {
      ProjectStore.currentProject = project;
      this.dialog = true;
    },
    updateCurrentProject() {
      this.dialog = false;
      this.updateProject();
    }
  }
};
</script>
