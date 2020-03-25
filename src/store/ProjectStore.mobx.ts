import { observable, action } from "mobx";
import { create } from "mobx-persist";
import localForage from "localforage";

interface TProject {
  id?: number;
  name?: string;
  isPrivate?: boolean;
  daw?: string;
  style?: string;
  instruments?: string;
  comments?: string;
  audioUrl?: string;
}

class Project implements TProject {
  constructor(obj: TProject) {
    Object.assign(this, obj);
  }
}

class Store {
  @observable newProject: TProject = new Project({});

  @observable currentProject: TProject = new Project({});

  @observable projects: TProject[] = [];

  @action
  async createNewProject() {
    await fetch("http://localhost:64153/api/projects/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Project: this.newProject, UserId: 1 })
    });
    this.projects.push(this.newProject);
    console.log(this.newProject);
    this.resetProject();
  }
  @action
  async getAllProjects() {
    const p = await fetch("http://localhost:64153/api/projects/");
    const g = await p.json();
    console.log(g);
    this.projects = g.map((v: Project) => new Project(v));
    console.log(this.projects[22]);
  }

  @action
  resetProject() {
    this.newProject = new Project({});
  }
  @action
  findProject(id: number) {
    return this.projects.find(v => v.id);
  }
  @action
  updateProject() {
    let p = this.findProject(this.currentProject.id || 0);
    p = this.currentProject;
    console.log(this.currentProject);
  }
  @action
  deleteProject(project: TProject) {
    const p = project;
    this.projects = this.projects.filter(project => project !== p);
  }
}

const hydrate = create({
  storage: localForage, // or AsyncStorage in react-native.
  // default: localStorage
  jsonify: false // if you use AsyncStorage, here shoud be true
  // default: true
});

const ProjectStore = new Store();
// hydrate('projectstore', ProjectStore);
export { ProjectStore };
