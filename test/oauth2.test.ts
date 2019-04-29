import * as nock from 'nock';
import * as sinon from 'sinon';
import Connection from "../src/pipedrive-api"

/**
 * OAuth2 test
 */
describe("OAuth2 test", () => {
  afterEach(() => {
    nock.cleanAll();
  })

  it("Should set and return an auth state", async () => {
    nock('https://oauth.pipedrive.com/oauth')
      .intercept('/token', 'POST')
      .reply(200, {
        access_token: '1',
        token_type: 'Bearer',
        refresh_token: '2',
        scope: 'test, test',
        expires_in: 1000,
      });
    const conn = new Connection({
      clientId: '1',
      clientSecret: '1',
    });
    const state = await conn.oauth2.getToken('test_code', 'http://redirect.com');
    expect(state.accessToken).toEqual('1');
    expect(state.refreshToken).toEqual('2');
    expect(state.expirationTime).toBeInstanceOf(Date);
    expect(state).toEqual(conn.oauth2.state);
  })

  it("Should refresh auth token if expired", async () => {
    nock('https://oauth.pipedrive.com/oauth')
      .intercept('/token', 'POST')
      .times(2)
      .reply(200, {
        access_token: '1',
        token_type: 'Bearer',
        refresh_token: '2',
        scope: 'test, test',
        expires_in: 1000,
      });
    nock('https://api-proxy.pipedrive.com')
      .intercept('/deals', 'GET')
      .reply(200, {});
    const conn = new Connection({
      clientId: '1',
      clientSecret: '1',
    });
    const spy = sinon.spy();
    conn.events.on('refreshToken', spy);
    const state = await conn.oauth2.getToken('test_code', 'http://redirect.com');
    const time = new Date();
    if (conn.oauth2._authState) {
      conn.oauth2._authState.expirationTime = time;
    }
    const deals = await conn.endpoint('Deals');
    sinon.assert.calledOnce(spy);
    await deals.all();
    expect(conn.oauth2.state).toBeDefined();
    expect(conn.oauth2.state ? conn.oauth2.state.expirationTime.getTime() : 0).toBeGreaterThan(state.expirationTime.getTime());
  })

  it("Should throw an error if no endpoint exists", async () => {
    nock('https://oauth.pipedrive.com/oauth')
      .intercept('/token', 'POST')
      .reply(200, {
        access_token: '1',
        token_type: 'Bearer',
        refresh_token: '2',
        scope: 'test, test',
        expires_in: 1000,
      });
    const conn = new Connection({
      clientId: '1',
      clientSecret: '1',
    });
    await conn.oauth2.getToken('test_code', 'http://redirect.com');
    try {
      await conn.endpoint('Test')
      expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe('No endpoint implemented for: Test.');
    }
  })
})
