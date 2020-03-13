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
    // {
    // 	id: 1,
    // 	name: 'Nate is cool',
    // 	style: 'R&B'
    // }
  ];

  @action
  createNewProject() {
    this.projects.push(this.newProject);
    console.log(this.newProject);
    this.resetProject();
  }
  @action
  async getAllProjects() {
    let p = await fetch(
      "https://desolate-bayou-20758.herokuapp.com/api/projects",
      {
        mode: "no-cors"
      }
    );

    p = await p.json();
    this.projects.push({ p });
  }
  // getAllProjects() {
  // 	fetch('https://desolate-bayou-20758.herokuapp.com/api/projects')
  // 		.then((response) => {
  // 			const p = response.json();
  // 			this.projects.forEach((p) => {
  // 				this.projects.push(p);
  // 			});
  // 		})
  // 		.then((data) => {
  // 			console.log(data);
  // 		});
  // }
  @action
  resetProject() {
    this.newProject = new Project(Math.random(), "", "");
  }
  @action
  findProject(id) {
    return this.projects.find(v => v.id);
  }
  @action
  updateProject() {
    let p = this.findProject(this.currentProject.id);
    p = this.currentProject;
    console.log(this.currentProject);
  }
  @action
  deleteProject(project: Project) {
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
