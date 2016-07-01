import {Injectable, Inject} from '@angular/core';

import { BLOOMBOOKS } from './mock-bloomBook';
import {APPINFOS} from "./mock-appInfo";
import {USERINFOS} from "./mock-userInfo";

@Injectable()
export class AppProducerService {
    getBooks() {
        return Promise.resolve(BLOOMBOOKS);
    }
    getApp() {
        return Promise.resolve(APPINFOS);
    }
    getUser() {
        return Promise.resolve(USERINFOS);
    }
}