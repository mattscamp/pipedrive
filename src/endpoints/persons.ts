import HttpHandler from '../utils/http'

export default class Persons {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/persons'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async find(params: {
    term: string
    orgId?: number
    start?: number
    limit?: number
    searchByEmail?: number
  }) {
    const res = await HttpHandler.get(`${this.baseUrl}/find`, params, this.authToken)
    return res
  }
}
