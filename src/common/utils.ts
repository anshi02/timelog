import { Request } from 'express';
import { URL } from 'url';
import * as querystring from 'querystring';

export function makeUrl(req: Request, queryParams: { [key: string]: any }) {
    const url = new URL(req.url, `${req.protocol}://${req.headers.host}`);
    url.search = querystring.stringify(queryParams);
    return url.href;
}
