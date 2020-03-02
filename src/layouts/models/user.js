import {request} from "../page/utils/request";
import history from "../history";

export default {
  name: 'user',
  state: {
    token: "",
    username: ""
  },
  reducers: {
    updateUser(preState, user) {
      const {username, token} = user
      return {
        username, token
      }
    }
  },
  effects: {
    async register(data = {}) {
      const res = await request("/user/new", data)
      if (res) {
        history.push("/user/login")
      }
    },
    async login(data = {}) {
      const res = await request("/user/login", data)
      if (res) {
        this.updateUser(res)
        //history.push("/home")

      }
    },
  },
};
