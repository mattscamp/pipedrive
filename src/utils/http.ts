import axios from 'axios'
import * as qs from 'qs'

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
        params: data
      })
      return res.data
    } catch (e) {
      throw e
    }
  }

  static async post(url: string, data: any, authKey?: string): Promise<any> {
    try {
      const res = await axios({
        method: 'POST',
        url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authKey}`
        },
        data: qs.stringify(data)
      })
      return res.data
    } catch (e) {
      throw e
    }
  }
}
