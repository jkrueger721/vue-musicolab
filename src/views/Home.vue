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
    div.mb-6
      router-link(to="/create")
        v-btn(color="primary") 
          v-icon(left size="16") fa fa-plus
          | Create Project
    //- div(v-for="project in projects" :key="project.id") 
    //-   | {{project.name}} 
    //-   v-btn.mr-4(@click="editProject(project)") edit
    //-   v-btn.mr-4(@click="deleteProject(project)") delete
    
    //- v-card
    //-   v-card-title
    //-     | Projects
    //-     v-spacer
    //-     v-text-field(v-model='search' append-icon='mdi-magnify' label='Search' single-line='' hide-details='')
    //-   v-data-table(:headers='headers' :items='projects' :search='search')
          
          //- v-dialog(v-model="dialog" max-width="500px")
              //-   template(v-slot:activator="{ on }")
              //-     v-btn.mb-2(color="primary" dark="" v-on="on") New Item
              //-   v-card
              //-     v-card-title
              //-       span.headline {{ formTitle }}
              //-     v-card-text
              //-       v-container
              //-         v-row
              //-           v-col(cols="12" sm="6" md="4")
              //-             v-text-field(v-model="currentProject.name" label="Project name")
              //-           v-col(cols="12" sm="6" md="4")
              //-             v-text-field(v-model="currentProject.style" label="Style")
              //-           v-col(cols="12" sm="6" md="4")
              //-             v-text-field(v-model="currentProject.instruments" label="Instrumments")
              //-           v-col(cols="12" sm="6" md="4")
              //-             v-text-field(v-model="currentProject.daw" label="Daw")
              //-           v-col(cols="12" sm="6" md="4")
              //-             v-text-field(v-model="currentProject.comments" label="Comments")
              //-     v-card-actions
              //-       v-spacer
              //-       v-btn(color="blue darken-1" text="" @click="close") Cancel
              //-       v-btn(color="blue darken-1" text="" @click="save") Save
    v-data-table.elevation-1(:headers="headers" :items="projects")       
      template(v-slot:item.actions="{ item }")
        v-icon.mr-2(small="" @click="editProject(item)") fas fa-edit
        v-icon(small="" @click="deleteProjectModal(item)") fas fa-trash
                  //- template(v-slot:no-data="")
                  //-   v-btn(color="primary" @click="initialize") Reset

</template>

<script>
import { ProjectStore } from "@/store/ProjectStore.mobx";
import EditModal from "./modals/edit";
import DeleteModal from "./modals/delete";

export default {
  name: "Home",
  data() {
    return {
      components: {
        "delete-modal": DeleteModal
      },
      search: "",
      headers: [
        {
          text: "Project",
          align: "start",
          sortable: false,
          value: "name"
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
    },
    deleteProjectModal(project) {
      ProjectStore.currentProject = project;
      DeleteModal.dialog = true;
    }
  }
};
</script>
