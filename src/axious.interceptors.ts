import axious from "axios";
import {localStorageUrl} from "./axious.default-headers";
import {history} from "./components/App";
import {logOut} from "./components/security/auth.actions";

axious.interceptors.response.use(r => r, r => {
  if(r.response.status === 401) {
    logOut();
    localStorage.removeItem(localStorageUrl);
    history.push("/login");
  }
  return r;
});