import HttpHandler from '../utils/http'

export default class Stages {
  private baseUrl: string = 'https://api-proxy.pipedrive.com/stages'
  private authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async all(params: { pipelineId?: number }) {
    const res = await HttpHandler.get(`${this.baseUrl}`, params, this.authToken)
    return res
  }
}
