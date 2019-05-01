import HttpHandler from '../utils/http'

export default class Notes {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/notes'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async add(params: {
    content: string
    dealId?: number
    personId?: number
    orgId?: number
    addTime?: string
    pinnedToDealFlag: number
    pinnedToOrganizationFlag: number
    pinnedToPersonFlag: number
  }) {
    const res = await HttpHandler.post(`${this.baseUrl}`, params, this.authToken)
    return res
  }
}
