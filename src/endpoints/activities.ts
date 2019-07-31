import HttpHandler from '../utils/http'

export default class Activities {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/activities'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async add(params: {
    subject: string
    type: string
    done?: number
    dueDate?: number
    dueTime?: string
    duration?: string
    userId?: string
    dealId?: string
    personId?: string
    participants?: string
    orgId?: number
    note?: string
  }) {
    const res = await HttpHandler.post(`${this.baseUrl}`, params, this.authToken)
    return res
  }
}
