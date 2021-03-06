import EventEmitter from 'events'
import HttpHandler from '../utils/http'

export class OAuth2 {
  private emitter: EventEmitter
  private baseUrl: string = 'https://oauth.pipedrive.com/oauth'
  private authKey: string
  private options: {
    setRefreshManually?: boolean
    prehook?: Function
  }
  _isRefreshing: boolean
  _authState?: {
    accessToken: string
    refreshToken: string
    expirationTime: Date
  } | null

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
    emitter: EventEmitter,
    options?: {
      setRefreshManually?: boolean
      prehook?: Function
    }
  ) {
    this.emitter = emitter
    if (!auth.clientId || !auth.clientSecret) {
      throw Error('Both auth.clientId and auth.clientSecret are required fields.')
    }
    this.options = options || {}
    this._isRefreshing = false
    this._authState = auth.lastKnownAuthState
    this.authKey = new Buffer(`${auth.clientId}:${auth.clientSecret}`).toString('base64')
    this.emitter.on(
      'refreshedToken',
      (authState?: { accessToken: string; refreshToken: string; expirationTime: Date }) => {
        if (authState) {
          this._authState = authState
        }
      }
    )
  }

  get state(): {
    accessToken: string
    refreshToken: string
    expirationTime: Date
  } | null {
    return this._authState || null
  }

  get token(): string {
    if (!this._authState) {
      throw Error('Attempting to get a token that does not exist.')
    }
    return this._authState.accessToken
  }

  async preflight(): Promise<void> {
    if (!this._authState) {
      throw Error('You must get a token before making a request.')
    }
    if (this.options.prehook) {
      await this.options.prehook()
    }
    if (new Date() >= this._authState.expirationTime) {
      await this.refreshToken(this._authState.refreshToken)
    }
  }

  async revokeToken(token: string, type: 'refresh_token' | 'access_token'): Promise<null> {
    await HttpHandler.post(
      `${this.baseUrl}/revoke`,
      {
        token,
        token_type_hint: type
      },
      this.authKey,
      true
    )
    return (this._authState = null)
  }

  async getToken(
    code: string,
    redirectUri: string
  ): Promise<{
    accessToken: string
    refreshToken: string
    expirationTime: Date
  }> {
    const res = await HttpHandler.post(
      `${this.baseUrl}/token`,
      {
        grantType: 'authorization_code',
        code,
        redirectUri: redirectUri
      },
      this.authKey,
      true
    )
    return (this._authState = {
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      expirationTime: this.generateExpiredDate(res.expires_in)
    })
  }

  async refreshToken(
    token: string
  ): Promise<{
    accessToken: string
    refreshToken: string
    expirationTime: Date
  }> {
    this._isRefreshing = true
    const res = await HttpHandler.post(
      `${this.baseUrl}/token`,
      {
        grantType: 'refresh_token',
        refreshToken: token
      },
      this.authKey,
      true
    )
    this._authState = {
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      expirationTime: this.generateExpiredDate(res.expires_in)
    }
    this.emitter.emit('refreshToken', this._authState)
    this._isRefreshing = false
    return this._authState
  }

  private generateExpiredDate(ttl: number): Date {
    const date = new Date()
    date.setSeconds(date.getSeconds() + ttl)
    return date
  }
}
