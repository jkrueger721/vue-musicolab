import axios from "axios";

const ajax = axios.create();
ajax.defaults.baseURL = "http://localhost:64153/";
// ajax.defaults.baseURL = "https://desolate-bayou-20758.herokuapp.com/";
ajax.defaults.headers.common["Content-Type"] = "application/json";

export class Service {
  static async get(url: string): Promise<any> {
    let d;
    try {
      d = await ajax.get(url);
      d = d.data;
    } catch (e) {
      d = { error: e };
    }
    return d;
  }

  static async post(url: string, data = {}): Promise<any> {
    let d;
    try {
      d = await ajax.post(url, data);
      d = d.data;
    } catch (e) {
      d = { error: e };
    }
    return d;
  }

  static async put(url: string, data = {}): Promise<any> {
    let d;
    try {
      d = await ajax.put(url, data);
      d = d.data;
    } catch (e) {
      d = { error: e };
    }
    return d;
  }
}
