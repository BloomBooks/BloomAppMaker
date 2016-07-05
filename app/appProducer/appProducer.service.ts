import {Injectable, Inject} from '@angular/core';

import { BLOOMBOOKS } from './mock-bloomBook';
import {APPINFOS} from "./mock-appInfo";
import {USERINFOS} from "./mock-userInfo";
import {AppInfo} from "./appInfo";

@Injectable()
export class AppProducerService {
    getBooks() {
        return Promise.resolve(BLOOMBOOKS);
    }
    getAppsByUsername(username: string) {
        var id = [];
        for (var user of USERINFOS) {
            if (user.username == username) {
                id = user.apps.slice();
            }
        }
        var result = [];
        for (var app of APPINFOS) {
            if (id.includes(app.id)) {
                result.push(app);
            }
        }
        return Promise.resolve(result);
    }
    saveApp(app: AppInfo, username: string) {
        if (app.id === undefined) {
            app.id = APPINFOS[APPINFOS.length-1].id + 1;
            var app_copy = JSON.parse(JSON.stringify(app));
            APPINFOS.push(app_copy);
            console.log(APPINFOS);
            return Promise.resolve("201");
        } else {
            for (var oldApp of APPINFOS) {
                if (oldApp.id == app.id) {
                    oldApp.name = app.name;
                    oldApp.title = app.title;
                    oldApp.shortDescription = app.shortDescription;
                    oldApp.fullDescription = app.fullDescription;
                    oldApp.color = app.color;
                    oldApp.icon = app.icon;
                    oldApp.feature = app.feature;
                    oldApp.books = app.books.slice();
                    oldApp.phase = app.phase.slice();
                    console.log(APPINFOS);
                    return Promise.resolve("202");
                }
            }
        }
        return Promise.resolve("404");
    }
}