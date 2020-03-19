import { observable, action } from "mobx";
import { create } from "mobx-persist";
import localForage from "localforage";

interface TProject {
  id: number;
  name: string;
  isPrivate: boolean;
  daw: string;
  style: string;
  instruments: string;
  comments: string;
  audioUrl: string;
}

class Project implements TProject {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly isPrivate: boolean,
    public readonly style: string,
    public readonly daw: string,
    public readonly instruments: string,
    public readonly comments: string,
    public readonly audioUrl: string
  ) {}
}

class Store {
  @observable newProject = new Project(
    Math.random(),
    "",
    false,
    "",
    "",
    "",
    "",
    ""
  );

  @observable currentProject = new Project(0, "", false, "", "", "", "", "");

  @observable
  projects: Array<Project> = [
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
      "https://desolate-bayou-20758.herokuapp.com/api/projects/",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },

        mode: "no-cors"
      }
    );
    console.log(p.json());

    p = await p.json();
    console.log(p);
    this.projects.push({ p });
  }
  // @action
  // getAllProjects() {
  // 	fetch('https://desolate-bayou-20758.herokuapp.com/api/projects', {
  // 		mode: 'no-cors'
  // 	}).then((response) => {
  // 		console.log(response.json());
  // 		const p = response.json();
  // 		this.projects.forEach(({ p }) => {
  // 			this.projects.push({ p });
  // 		});
  // 	});
  // }
  @action
  resetProject() {
    this.newProject = new Project(Math.random(), "", false, "", "", "", "", "");
  }
  @action
  findProject(id: number) {
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
