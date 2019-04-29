# Pipedrive OAuth API Wrapper

A library for interfacing with Pipedrive's OAuth API. Auto refreshes tokens for you.

### Usage

Typescript

```javascript
import Connection from 'pipedrive-api';
const pipedriveConnection = new Connection({
    clientId: '432424',
    clientSecret: '2354tgf234g43g43'
});

await pipedriveConnection.oauth.getToken(code, redirectUri);
const deals = await pipedriveConnection.endpoints('Deals');
await deals.all();
);
```

```javascript
import Connection from 'pipedrive-api';
const pipedriveConnection = new Connection({
    clientId: '432424',
    clientSecret: '2354tgf234g43g43',
    lastKnownAuthState: {
        accessToken: 't2g423g3',
        refreshToken: '32f43g43g44g43g',
        expirationTime: '2019-04-04 01:01:01',
    }
});
const deals = await pipedriveConnection.endpoints('Deals');
await deals.all();
);
```
