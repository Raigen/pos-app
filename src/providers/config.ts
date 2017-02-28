import {RequestOptions, Headers} from '@angular/http';

export const SERVER_URL = "http://unity-01.epages.com/rs/shops/fatty-01";
export const TOKEN = 'F2mFe7qcrCeSJ3yuGdhTBgpnlKUO8wmE';

export function options ({token}): RequestOptions {
    return new RequestOptions({
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Accept": 'application/vnd.epages.v1+json' }
        )
    });
}

