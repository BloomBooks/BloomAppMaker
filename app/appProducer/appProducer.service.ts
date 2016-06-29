import {Injectable, Inject} from '@angular/core';

import { BLOOMBOOKS } from './mock-bloomBook';

@Injectable()
export class AppProducerService {
    getBooks() {
        return Promise.resolve(BLOOMBOOKS);
    }
}