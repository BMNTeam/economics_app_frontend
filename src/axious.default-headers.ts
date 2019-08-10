import axious from "axios";
export const localStorageUrl = "token";

const token = localStorage.getItem(localStorageUrl);

if (token)
{
  setAuthHeader(token);
} else
{
  delete axious.defaults.headers['Authorization'];
}

export function setAuthHeader(token: string)
{
  /* tslint:disable:no-string-literal */
  axious.defaults.headers['Authorization'] = `Bearer ${token}`
}