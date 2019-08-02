import axios, { AxiosRequestConfig } from 'axios';

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
    const contentType = {
      'Content-Type': 'application/json',
    };

    let token = {};

    if (false) {
      token = {
        Authorization: 'sasasa'
      };
    }

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