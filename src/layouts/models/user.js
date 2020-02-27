import {request} from "../page/utils/request";
import history from "../history";

export default {
  name: 'user',
  state: {
    user: {},
    token: '',
  },
  reducers: {},
  effects: {
    async register(data = {}) {
      const res = await request("/user/new", data)
      if(res){
        history.push("/user/login")
      }
    }
  },
};
