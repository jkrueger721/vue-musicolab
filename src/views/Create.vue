<template lang="pug">
  
 .main-content
  form
    v-text-field(v-model='newProject.projectname' label='Name')
    v-text-field(v-model='newProject.style' label='Style')
    v-text-field(v-model='newProject.instruments' label='Instruments')
    v-text-field(v-model='newProject.daw' label='DAW')
    v-text-field(v-model='newProject.audioUrl' label='Audio Url')
    v-btn.mr-4(@click='createProject') submit

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
