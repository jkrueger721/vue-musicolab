import { observable, action } from "mobx";
import { create } from "mobx-persist";
import localForage from "localforage";
import { Service } from "./service";

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

  constructor() {
    this.getAllProjects();
  }

  @action
  async createNewProject() {
    const p = await Service.post("api/projects", this.newProject);

    this.projects.push(p);
    console.log(this.newProject);
    this.resetProject();
  }
  @action
  async getAllProjects() {
    const g = await Service.get("api/projects");
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
  async updateProject() {
    const project = Service.put(
      `api/projects/${this.currentProject.id}`,
      this.currentProject
    );
    console.log("got project", project);
    let p = this.findProject(this.currentProject.id || 0);
    p = this.currentProject;
    console.log(this.currentProject);
  }
  @action
  async deleteProject(project: TProject) {
    const p = project;
    await Service.delete("api/projects", p.id);
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
