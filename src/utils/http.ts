import request from "request-promise";

export default class HttpHandler {
    static async get(url: string, body: any, authKey?: string): Promise<any> {
        try {
            const res = await request(url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${authKey}`
                },
                body: JSON.stringify(body),
                json: true,
                method: 'GET'
            });
            return res;
        } catch (e) {
            throw e;
        }
    }

    static async post(url: string, body: any, authKey?: string): Promise<any> {
        try {
            const res = await request(url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${authKey}`
                },
                body: JSON.stringify(body),
                json: true,
                method: 'POST'
            });
            return res;
        } catch (e) {
            throw e;
        }
    }
}