import { observable, action } from "mobx";
import { create } from "mobx-persist";
import localForage from "localforage";

interface TProject {
  id: number;
  name: string;
  style: string;
}

class Project implements TProject {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly style: string
  ) {}
}

class Store {
  @observable newProject = new Project(Math.random(), "", "");

  @observable currentProject = new Project(0, "", "");

  @observable
  projects: Array<any> = [
    {
      id: 1,
      name: "Nate is cool",
      style: "R&B"
    }
  ];

  @action
  createNewProject() {
    this.projects.push(this.newProject);
    console.log(this.newProject);
    this.resetProject();
  }

  @action
  resetProject() {
    this.newProject = new Project(0, "", "");
  }
  @action
  findProject(id) {
    return this.projects.find(v => v.id);
  }
  @action
  updateProject() {
    // const p = this.findProject(this.currentProject.id);
    // Object.assign(p, this.currentProject);
    this.projects = this.projects.splice(
      this.projects.indexOf(this.currentProject),
      1,
      this.currentProject
    );
  }
}

const hydrate = create({
  storage: localForage, // or AsyncStorage in react-native.
  // default: localStorage
  jsonify: false // if you use AsyncStorage, here shoud be true
  // default: true
});

const ProjectStore = new Store();
// hydrate("projectstore", ProjectStore);
export { ProjectStore };
