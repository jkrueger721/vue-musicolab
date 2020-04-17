<template lang="pug">

  form(ref='form')
      v-dialog(v-model='dialog' persistent='' max-width='600px')
        v-card
          v-card-title
            span.headline User Profile
          v-card-text
            v-container
              v-row
                v-col(cols='4')
                  v-text-field(label='Name' v-model='currentProject.projectname')
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
</template>
<script>
import { ProjectStore } from "@/store/ProjectStore.mobx";

export default {
  props: {
    value: Boolean
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  data() {
    return {};
  },
  fromMobx: {
    ProjectStore
  },
  methods: {
    updateCurrentProject() {
      this.dialog = false;
      this.$emit("editProject");
    }
  }
};
</script>
