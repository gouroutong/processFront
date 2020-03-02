import {request} from "../page/utils/request";
import history from "../history";

export default {
  name: 'user',
  state: {
    user: {},
  },
  reducers: {
    updateUser(preState,user){
       return {
         user:user,
       } 
    }
  },
  effects: {
    async register(data = {}) {
      const res = await request("/user/new", data)
      if(res){
        history.push("/user/login")
      }
    },
    async login(data = {}) {
      const res = await request("/user/login", data)
      if(res){
        this.updateUser(res)
        history.push("/home")

      }
    },
  },
};
