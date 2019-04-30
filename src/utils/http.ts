import axios from 'axios'
import * as qs from 'qs'
import { formatParams } from './format'

export default class HttpHandler {
  static async get(url: string, data: any, authKey?: string): Promise<any> {
    try {
      const res = await axios({
        method: 'GET',
        url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authKey}`
        },
        params: formatParams(data)
      })
      return res.data ? res.data : {}
    } catch (e) {
      throw e
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
      throw e
    }
  }

  static async put(url: string, data: any, authKey?: string): Promise<any> {
    try {
      const res = await axios({
        method: 'PUT',
        url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authKey}`
        },
        data: qs.stringify(formatParams(data))
      })
      return res.data ? res.data : {}
    } catch (e) {
      throw e
    }
  }
}
