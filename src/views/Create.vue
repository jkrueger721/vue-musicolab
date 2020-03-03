<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
    ></v-text-field>
    <v-text-field
      v-model="style"
      :error-messages="emailErrors"
      label="Style"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-btn class="mr-4" @click="addNewProject()">submit</v-btn>
    <!-- <v-btn @click="clear">clear</v-btn> -->
  </form>
</template>
<script>
import { observer } from "mobx-vue";
import { ProjectStore } from "@/store/ProjectStore.mobx";

export default observer({
  name: "Home",
  data() {
    return {
      ProjectStore
    };
  },
  methods: {
    addNewProject() {
      ProjectStore.projects.push();
    }
  }
});
</script>
