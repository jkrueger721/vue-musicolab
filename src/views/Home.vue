<template lang="pug">
  .main-content
    DeleteModal(v-model="deleteModal"  @deleteProject="deleteCurrentProject")
    EditModal(v-model="editModal" @updateProject="updateCurrentProject")

   

    div.mb-6
      router-link(to="/create")
        v-btn(color="primary") 
          v-icon(left size="16") fa fa-plus
          | Create Project
   
    v-data-table.elevation-1(:headers="headers" :items="projects")       
      template(v-slot:item.actions="{ item }")
        v-icon.mr-2(small="" @click="editProject(item)") fas fa-edit
        v-icon(small="" @click="setCurrentProject(item)") fas fa-trash
                  
</template>

<script>
import { ProjectStore } from "@/store/ProjectStore.mobx";
import EditModal from "./modals/edit";
import DeleteModal from "./modals/delete";

export default {
  name: "Home",
  components: {
    DeleteModal,
    EditModal
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Project",
          align: "start",
          sortable: false,
          value: "projectname"
        },
        { text: "Style", value: "style" },
        { text: "Daw", value: "daw" },
        { text: "Style", value: "style" },
        { text: "Instruments", value: "instrumments" },
        { text: "Comments", value: "comments" },
        {
          text: "Action",
          value: "actions",
          sortable: false
        }
      ],
      items: ProjectStore.projects,
      dialog: false,
      deleteModal: false,
      editModal: false
    };
  },

  fromMobx: {
    ProjectStore
  },
  methods: {
    editProject(project) {
      ProjectStore.currentProject = project;
      this.editModal = true;
    },
    updateCurrentProject() {
      ProjectStore.editProject(ProjectStore.currentProject);
    },
    setCurrentProject(project) {
      ProjectStore.currentProject = project;
      this.deleteModal = true;
    },
    deleteCurrentProject() {
      ProjectStore.deleteProject(ProjectStore.currentProject);
    }
  }
};
</script>
