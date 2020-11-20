import HttpHandler from '../utils/http'

export default class ActivityFields {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/activityFields'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async all(params: {}) {
    const res = await HttpHandler.get(`${this.baseUrl}`, params, this.authToken)
    return res
  }
}
