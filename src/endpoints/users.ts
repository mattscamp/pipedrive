import HttpHandler from '../utils/http'

export default class Users {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/users'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async all() {
    const res = await HttpHandler.get(`${this.baseUrl}`, {}, this.authToken)
    return res
  }

  async me() {
    const res = await HttpHandler.get(`${this.baseUrl}/me`, {}, this.authToken)
    return res
  }
}
