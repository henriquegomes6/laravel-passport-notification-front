import axios, { AxiosRequestConfig } from 'axios';

import { API_ENDPOINT } from '../settings';


class ApiService {
  public get<T = any>(url: string, params?: any) {
    return this.request<T>('GET', url, params);
  }

  public post<T = any>(url: string, body: any = {}) {
    return this.request<T>('POST', url, body);
  }

  public put<T = any>(url: string, body: any = {}) {
    return this.request<T>('PUT', url, body);
  }

  public delete<T = any>(url: string, params?: any) {
    return this.request<T>('DELETE', url, params);
  }

  private request<T = any>(
    method: string,
    url: string,
    data: any = null,
    retry: boolean = true
  ) {

    const contentType = {
      'Content-Type': 'application/json',
    };

    let token = {};

    if (true) {
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