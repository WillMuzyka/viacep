import axios, { AxiosResponse } from 'axios';

async function httpGet<T = AxiosResponse>(url: string): Promise<T> {
  return axios
    .get(url)
    .then((response) => response.data);
}

export default httpGet;
