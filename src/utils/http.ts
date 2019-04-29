import axios from 'axios';

export default class HttpHandler {
    static async get(url: string, data: any, authKey?: string): Promise<any> {
        try {
            const res = await axios({ 
                method: 'GET', 
                url,
                headers:  {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${authKey}`
                }, 
                data
            });
            return res.data;
        } catch (e) {
            throw e;
        }
    }

    static async post(url: string, data: any, authKey?: string): Promise<any> {
        try {
            const res = await axios({ 
                method: 'POST', 
                url,
                headers:  {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${authKey}`
                }, 
                data
            });
            return res.data;
        } catch (e) {
            throw e;
        }
    }
}