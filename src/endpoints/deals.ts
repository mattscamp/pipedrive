import HttpHandler from '../utils/http';

export default class Deals {
    private baseUrl: string = 'https://api-proxy.pipedrive.com/deals';
    private authToken: string;

    constructor(authToken: string) {
        this.authToken = authToken;
    }

    async all(params?: {
        userId?: number,
        filterId?: number,
        stageId?: number,
        status?: number,
        start?: number,
        limit?: number,
        sort?: string,
        ownedByYou?: number,
    }) {
        const res = await HttpHandler.get(`${this.baseUrl}`, params, this.authToken);
        return res;
    }

    async find(params: {
        term: string,
        personId?: number,
        orgId?: number,
    }) {
        const res = await HttpHandler.get(`${this.baseUrl}`, params, this.authToken);
        return res;
    }
}
