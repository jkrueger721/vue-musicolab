<template lang="pug">
div
  div(v-for="project in ProjectStore.projects" :key="project.id") {{project.name}}

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
  }
});
</script>
