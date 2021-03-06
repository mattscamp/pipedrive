import { EventEmitter } from 'events'
import { OAuth2 } from './oauth'
import Deals from './endpoints/deals'
import Pipelines from './endpoints/pipelines'
import Persons from './endpoints/persons'
import DealFields from './endpoints/deal-fields'
import PersonFields from './endpoints/person-fields'
import Users from './endpoints/users'
import Leads from './endpoints/leads'
import Stages from './endpoints/stages'
import Notes from './endpoints/notes'
import Recents from './endpoints/recents'
import Activities from './endpoints/activities'
import ActivityFields from './endpoints/activity-fields'
import ActivityTypes from './endpoints/activity-types'
export default class Connection {
  events: EventEmitter
  oauth2: OAuth2
  endpoints: any = {
    Deals,
    Pipelines,
    Persons,
    DealFields,
    PersonFields,
    Users,
    Stages,
    Notes,
    Recents,
    Activities,
    ActivityFields,
    ActivityTypes,
    Leads
  }

  constructor(
    auth: {
      clientId: string
      clientSecret: string
      lastKnownAuthState?: {
        accessToken: string
        refreshToken: string
        expirationTime: Date
      }
    },
    options?: {
      setRefreshManually?: boolean
    }
  ) {
    this.events = new EventEmitter()
    this.oauth2 = new OAuth2(auth, this.events, options)
  }

  async endpoint(type: string): Promise<any> {
    await this.oauth2.preflight()
    if (!this.endpoints[type]) {
      throw Error(`No endpoint implemented for: ${type}.`)
    }
    return new this.endpoints[type](this.oauth2.token)
  }
}
