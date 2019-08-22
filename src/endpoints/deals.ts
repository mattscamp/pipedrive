import HttpHandler from '../utils/http'

export default class Deals {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/deals'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async all(params?: {
    userId?: number
    filterId?: number
    stageId?: number
    status?: number
    start?: number
    limit?: number
    sort?: string
    ownedByYou?: number
  }) {
    const res = await HttpHandler.get(`${this.baseUrl}`, params, this.authToken)
    return res
  }

  async find(params: { term: string; personId?: number; orgId?: number }) {
    const res = await HttpHandler.get(`${this.baseUrl}/find`, params, this.authToken)
    return res
  }

  async timeline(params: {
    startDate: string
    interval: number
    amount: number
    fieldKey: string
    userId?: number
    pipelineId?: number
    filterId?: number
    excludeDeals?: number
    totalConvertCurrency?: string
  }) {
    const res = await HttpHandler.get(`${this.baseUrl}/timeline`, params, this.authToken)
    return res
  }

  async get(params: { id: number }) {
    const res = await HttpHandler.get(`${this.baseUrl}/${params.id}`, {}, this.authToken)
    return res
  }

  async add(params: {
    title: string
    value?: string
    currency?: string
    userId?: number
    personId?: number
    orgId?: number
    pipelineID?: number
    stageId?: number
    status?: number
    probability?: number
    lostReason?: string
    addTime?: string
    visibleTo?: number
  }) {
    const res = await HttpHandler.post(`${this.baseUrl}`, params, this.authToken)
    return res
  }

  async update(params: {
    id: number
    title?: string
    value?: string
    currency?: string
    userId?: number
    personId?: number
    orgId?: number
    stageId?: number
    status?: number
    probability?: number
    lostReason?: string
    addTime?: string
    visibleTo?: number
  }) {
    const res = await HttpHandler.put(`${this.baseUrl}/${params.id}`, params, this.authToken)
    return res
  }
}
