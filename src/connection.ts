import { EventEmitter } from 'events'
import { OAuth2 } from './oauth'
import Deals from './endpoints/deals'
import Pipelines from './endpoints/pipelines'
import Persons from './endpoints/persons'
import DealFields from './endpoints/deal-fields'
import Users from './endpoints/users'
import Stages from './endpoints/stages'
import Notes from './endpoints/notes'

export default class Connection {
  events: EventEmitter
  oauth2: OAuth2
  endpoints: any = {
    Deals,
    Pipelines,
    Persons,
    DealFields,
    Users,
    Stages,
    Notes
  }

  constructor(auth: {
    clientId: string
    clientSecret: string
    lastKnownAuthState?: {
      accessToken: string
      refreshToken: string
      expirationTime: Date
    }
  }) {
    this.events = new EventEmitter()
    this.oauth2 = new OAuth2(auth, this.events)
  }

  async endpoint(type: string): Promise<Deals> {
    await this.oauth2.preflight()
    if (!this.endpoints[type]) {
      throw Error(`No endpoint implemented for: ${type}.`)
    }
    return new this.endpoints[type](this.oauth2.token)
  }
}
