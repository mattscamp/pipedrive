import HttpHandler from '../utils/http'

export default class DealFields {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/dealFields'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async all(params: { start?: number; limit?: number }) {
    const res = await HttpHandler.get(`${this.baseUrl}`, params, this.authToken)
    return res
  }
}
