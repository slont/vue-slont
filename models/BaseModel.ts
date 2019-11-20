import axios, {AxiosRequestConfig, AxiosError} from 'axios'
import qs from 'qs'

export default abstract class BaseModel {

  static stringify = (query = {}) => qs.stringify(query, {indices: false})

  static getHeaders = (headers = {}) => ({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...headers
  })

  protected axios = axios.create({
    headers: BaseModel.getHeaders()
  })

  private autoCaptureError = true

  protected constructor(baseURL: string, autoCaptureError = true) {
    this.axios = axios.create({baseURL, headers: BaseModel.getHeaders()})
    this.autoCaptureError = autoCaptureError
  }

  public async get(id: string | number, params = {}, config: AxiosRequestConfig = {}) {
    return this.axios
        .get(`${id}`, Object.assign(config, {params}))
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async getList(path = '', params = {}, config: AxiosRequestConfig = {}) {
    return this.axios
        .get(path, {params, ...config})
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async post(path = '', data = {}, config: AxiosRequestConfig = {}) {
    return this.axios
        .post(path, data, config)
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async put(id: string | number, data = {}, config: AxiosRequestConfig = {}) {
    return this.axios
        .put(`${id}`, data, config)
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async patch(id: string | number, data = {}, config: AxiosRequestConfig = {}) {
    return this.axios
        .patch(`${id}`, data, config)
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async delete(id: string | number, config: AxiosRequestConfig = {}) {
    return this.axios
        .delete(`${id}`, config)
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  protected postFetch(response = {data: {}}) {
    return Promise.resolve(Object.assign(response, {
      data: this.deserialize(response.data)
    }))
  }

  protected postError(error: AxiosError) {
    if (!!error.response) {
      return Promise.reject(error)
    }

    const data = {code: '990', message: '予期せぬエラーが発生しました', errors: []}
    if ('ECONNABORTED' === error.code) {
      Object.assign(data, {code: '910', message: '接続タイムアウト'})
    } else if (!!error.isAxiosError && !error.response) {
      Object.assign(data, {code: '900', message: 'ネットワークエラー'})
    }
    return Promise.reject(Object.assign({
      response: {data},
      error
    }))
  }

  protected deserialize(part = {}): any {
    return Object.assign({}, part)
  }
}
