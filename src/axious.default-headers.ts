import axious from "axios";
import {localStorageUrl} from "./components/security/auth.actions";

const token = localStorage.getItem(localStorageUrl);

if (token)
{
  /* tslint:disable:no-string-literal */
  axious.defaults.headers['Authorization'] = `Bearer ${token}`
} else
{
  delete axious.defaults.headers['Authorization'];
}