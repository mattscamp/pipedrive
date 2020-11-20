import HttpHandler from '../utils/http'

export default class ActivityTypes {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/activityTypes'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async add(params: { name: string; iconKey: string; color: string }) {
    const res = await HttpHandler.post(`${this.baseUrl}`, params, this.authToken)
    return res
  }

  async all(params: {}) {
    const res = await HttpHandler.get(`${this.baseUrl}`, params, this.authToken)
    return res
  }
}
