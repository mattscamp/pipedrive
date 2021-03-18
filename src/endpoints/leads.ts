import HttpHandler from '../utils/http'

export default class Leads {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/leads'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async all(params?: { start?: number; limit?: number; archivedStatus?: string }) {
    const res = await HttpHandler.get(`${this.baseUrl}`, params, this.authToken, true)
    return res
  }
}
