import HttpHandler from '../utils/http'

export default class Activities {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/activities'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async add(params: {
    subject: string
    note?: string
    type: string
    done?: number
    dueDate?: string
    dueTime?: string
    duration?: string
    userId?: string
    dealId?: string
    orgId?: number
    personId?: string
    location?: string
    participants?: []
    busyFlag?: boolean
    attendees?: []
    publicDescription?: string
  }) {
    const res = await HttpHandler.post(`${this.baseUrl}`, params, this.authToken)
    return res
  }
}
