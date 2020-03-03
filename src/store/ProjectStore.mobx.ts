import { observable } from "mobx";
import { create } from "mobx-persist";
import localForage from "localforage";

class Store {
  projects: Array<any> = [
    {
      name: "Nate is cool",
      style: "R&B"
    }
  ];
}

const hydrate = create({
  storage: localForage, // or AsyncStorage in react-native.
  // default: localStorage
  jsonify: false // if you use AsyncStorage, here shoud be true
  // default: true
});

export const ProjectStore = new Store();
hydrate("some", ProjectStore);
