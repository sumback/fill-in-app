import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class Http {
  protected axios: AxiosInstance;

  public constructor(axiosConfig: {}) {
    this.axios = axios.create(axiosConfig);
  }

  public get(url: string, params?: {}, config?: {}): Promise<AxiosResponse<any>> {
    try {
      return this.axios.request({
        method: 'get',
        url,
        params,
        ...config,
      });
    } catch (error) {
      throw error;
    }
  }

  public post(url: string, data: {}, config?: {}): Promise<AxiosResponse<any>> {
    try {
      return this.axios.request({
        method: 'post',
        url,
        data,
        ...config,
      });
    } catch (error) {
      throw error;
    }
  }

  public put(url: string, data: {}, config?: {}): Promise<AxiosResponse<any>> {
    try {
      return this.axios.request({
        method: 'put',
        url,
        data,
        ...config,
      });
    } catch (error) {
      throw error;
    }
  }

  public patch(url: string, data: {}, config?: {}): Promise<AxiosResponse<any>> {
    try {
      return this.axios.request({
        method: 'patch',
        url,
        data,
        ...config,
      });
    } catch (error) {
      throw error;
    }
  }

  public delete(url: string, config?: {}): Promise<AxiosResponse<any>> {
    try {
      return this.axios.request({
        method: 'delete',
        url,
        ...config,
      });
    } catch (error) {
      throw error;
    }
  }
}
