import HttpHandler from '../utils/http'

export default class Pipelines {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/pipelines'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async all() {
    const res = await HttpHandler.get(`${this.baseUrl}`, {}, this.authToken)
    return res
  }
}
