import axios, { AxiosRequestConfig } from 'axios';
import { enLocalStorageKeys } from 'enums/enLocalStorageKeys';
import { localStorageGetItem } from 'helpers';

import { API_ENDPOINT } from '../settings';


class ApiService {
  public get(url: string, params?: any) {
    return this.request('GET', url, params);
  }

  public post(url: string, body: any = {}) {
    return this.request('POST', url, body);
  }

  public put(url: string, body: any = {}) {
    return this.request('PUT', url, body);
  }

  public delete(url: string, params?: any) {
    return this.request('DELETE', url, params);
  }

  private request(
    method: string,
    url: string,
    data: any = null
  ) {
    const token = localStorageGetItem(enLocalStorageKeys.token);
    let auth = null;
    if (!!token.access_token) {
      auth = 'Bearer ' + (token as any).access_token;
    }

    const contentType = {
      'Content-Type': 'application/json',
      'Authorization': auth as any,
    };
    const headers = { ...contentType, ...token };

    return axios.request({
      baseURL: API_ENDPOINT,
      url,
      method,
      headers,
      params: method === 'GET' ? data : null,
      data: method === 'POST' || method === 'PUT' ? data : null
    } as AxiosRequestConfig);
  }
}

const apiService = new ApiService();
export default apiService;