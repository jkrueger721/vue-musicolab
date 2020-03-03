<template>
  <h1>{{ currentProject.name }}</h1>
</template>
<script>
import { ProjectStore } from "@/store/ProjectStore.mobx";

export default {
  fromMobx: {
    ProjectStore
  }
};
</script>
