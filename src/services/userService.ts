import { auth } from "@services";
import { UserRegister } from "@types";
import axios from "axios";

const API_BASEURL = "http://localhost:5570/api/users";

async function register(user: UserRegister) {
  const { headers, data } = await axios.post(API_BASEURL, user);
  const token = headers["x-auth-token"];
  auth.loginWithJwt(token);
  return data;
}

export default { register };
