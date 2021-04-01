import HttpHandler from '../utils/http'

export default class Persons {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/persons'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async all(params?: {
    userId?: number
    filterId?: number
    firstChar?: string
    start?: number
    limit?: number
    sort?: string
  }) {
    const res = await HttpHandler.get(`${this.baseUrl}`, params, this.authToken)
    return res
  }

  async add(params: {
    name: string
    ownerId?: number
    orgId?: number
    email?: string[]
    phone?: string[]
    visibleTo?: number
    addTime?: string
  }) {
    const res = await HttpHandler.post(`${this.baseUrl}`, params, this.authToken)
    return res
  }

  async get(params: { id: number }) {
    const res = await HttpHandler.get(`${this.baseUrl}/${params.id}`, {}, this.authToken)
    return res
  }

  async find(params: {
    term: string
    organizationId?: number
    exactMatch?: boolean
    fields: string
    includeFields: string
    start?: number
    limit?: number
  }) {
    const res = await HttpHandler.get(`${this.baseUrl}/search`, params, this.authToken)
    return res
  }

  async deals(params: {
    id: number
    start?: number
    limit?: number
    status?: number
    sort?: string
  }) {
    const res = await HttpHandler.get(`${this.baseUrl}/${params.id}/deals`, params, this.authToken)
    return res
  }
}
