import HttpHandler from '../utils/http'

export default class PersonFields {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/personFields'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async all() {
    const res = await HttpHandler.get(`${this.baseUrl}`, {}, this.authToken)
    return res
  }

  async add(params: { name: string; options: any; fieldType: string }) {
    const res = await HttpHandler.post(`${this.baseUrl}`, params, this.authToken)
    return res
  }
}
