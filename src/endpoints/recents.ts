import HttpHandler from '../utils/http'

export default class Pipelines {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/recents'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async all(params: { sinceTimestamp: Date; items?: string; start?: number; limit?: number }) {
    const res = await HttpHandler.get(`${this.baseUrl}`, params, this.authToken)
    return res
  }
}
