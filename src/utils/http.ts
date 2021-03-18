import axios from 'axios'
import * as qs from 'qs'
import { formatParams } from './format'
import { ApiError } from './error'

export default class HttpHandler {
  static handleError(error: any) {
    if (error.response) {
      throw new ApiError(
        'BadResponse',
        error.response.status,
        'Pipedrive API returned an error',
        error.response.data
      )
    } else if (error.request) {
      throw new ApiError('NoResponse', null, 'Pipedrive API never returned', error.request)
    } else {
      throw new Error(error.message)
    }
  }

  static async get(url: string, data: any, authKey?: string, isJson?: boolean): Promise<any> {
    try {
      const res = await axios({
        method: 'GET',
        url,
        headers: {
          'Content-Type': isJson ? 'application/json' : 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${authKey}`
        },
        params: formatParams(data)
      })
      return res.data ? res.data : {}
    } catch (e) {
      this.handleError(e)
    }
  }

  static async post(url: string, data: any, authKey?: string, isBasic?: boolean): Promise<any> {
    try {
      const res = await axios({
        method: 'POST',
        url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `${isBasic ? 'Basic' : 'Bearer'} ${authKey}`
        },
        data: qs.stringify(formatParams(data))
      })
      return res.data ? res.data : {}
    } catch (e) {
      this.handleError(e)
    }
  }

  static async put(url: string, data: any, authKey?: string): Promise<any> {
    try {
      const res = await axios({
        method: 'PUT',
        url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${authKey}`
        },
        data: qs.stringify(formatParams(data))
      })
      return res.data ? res.data : {}
    } catch (e) {
      this.handleError(e)
    }
  }
}
