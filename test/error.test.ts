import * as nock from 'nock'
import * as sinon from 'sinon'
import Connection from '../src/connection'

/**
 * Error test
 */
describe('Error test', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('Should return an error', async () => {
    nock('https://oauth.pipedrive.com/oauth')
      .intercept('/token', 'POST')
      .reply(400, {
        success: false,
        error: 'Test error'
      })
    const conn = new Connection({
      clientId: '1',
      clientSecret: '1'
    })
    try {
      await conn.oauth2.getToken('test_code', 'http://redirect.com')
    } catch (e) {
      expect(e.status).toEqual(400)
    }
  })
})
