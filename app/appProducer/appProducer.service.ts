import {Injectable, Inject} from '@angular/core';

import { BLOOMBOOKS } from './mock-bloomBook';
import {APPINFOS} from "./mock-appInfo";
import {USERINFOS} from "./mock-userInfo";

@Injectable()
export class AppProducerService {
    getBooks() {
        return Promise.resolve(BLOOMBOOKS);
    }
    getAppsByUsername(username: string) {
        var id = [];
        for (var i=0;i<USERINFOS.length;i++) {
            if (USERINFOS[i].username == username) {
                id = USERINFOS[i].apps.slice();
            }
        }
        var result = [];
        for (var i=0;i<APPINFOS.length;i++) {
            if (id.includes(APPINFOS[i].id)) {
                result.push(APPINFOS[i]);
            }
        }
        return Promise.resolve(result);
    }
    
}