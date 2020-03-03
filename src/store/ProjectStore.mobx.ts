import { observable, action } from "mobx";
import { create } from "mobx-persist";
import localForage from "localforage";

interface FuckThisShitProject {
  name: string;
  style: string;
}

class Project implements FuckThisShitProject {
  constructor(public readonly name: string, public readonly style: string) {}
}

class Store {
  @observable
  newProject = new Project("", "");

  @observable
  currentProject = new Project("", "");

  @observable
  projects: Array<any> = [
    {
      name: "Nate is cool",
      style: "R&B"
    }
  ];

  @action
  createNewProject() {
    this.projects.push(this.newProject);
    this.resetProject();
  }

  @action
  resetProject() {
    this.newProject = new Project("", "");
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
