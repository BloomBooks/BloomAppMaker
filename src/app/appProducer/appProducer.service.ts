import {Injectable, Inject} from '@angular/core';

import {Headers, Http, Response} from '@angular/http';
import {Observable} from "rxjs/Rx";

import { AppProducerHeaders } from './appProducer.headers';
import { BLOOMBOOKS } from '../mock/mock-bloomBook';
import {USERINFOS} from "../mock/mock-userInfo";
import {AppInfo} from "../mock/appInfo";

@Injectable()
export class AppProducerService {
    constructor(private http: Http) {}
    
    // getAppsByUsername(username: string) {
    //     var id = [];
    //     for (var user of USERINFOS) {
    //         if (user.username == username) {
    //             id = user.apps.slice();
    //         }
    //     }
    //     var result = [];
    //     for (var app of APPINFOS) {
    //         if (id.includes(app.id)) {
    //             result.push(app);
    //         }
    //     }
    //     return Promise.resolve(result);
    // }
    // saveApp(app: AppInfo, username: string) {
    //     if (app.id === undefined) {
    //         app.id = APPINFOS[APPINFOS.length-1].id + 1;
    //         var app_copy = JSON.parse(JSON.stringify(app));
    //         APPINFOS.push(app_copy);
    //         for (var user of USERINFOS) {
    //             if (user.username == username) {
    //                 user.apps.push(app.id);
    //             }
    //         }
    //         return Promise.resolve("201");
    //     } else {
    //         for (var oldApp of APPINFOS) {
    //             if (oldApp.id == app.id) {
    //                 oldApp.title = app.title;
    //                 oldApp.shortDescription = app.shortDescription;
    //                 oldApp.fullDescription = app.fullDescription;
    //                 oldApp.color = app.color;
    //                 oldApp.icon = app.icon;
    //                 oldApp.feature = app.feature;
    //                 oldApp.books = app.books.slice();
    //                 oldApp.phase = app.phase.slice();
    //                 console.log(APPINFOS);
    //                 return Promise.resolve("202");
    //             }
    //         }
    //     }
    //     return Promise.resolve("404");
    // }

    getBooksByLanguage(languageId: string) {
        return this.http.get('https://api.parse.com/1/classes/books?limit%3D9999&&where={"langPointers": {"__type":"Pointer","className":"language","objectId":"'+languageId+'"}}',{ headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    getAllLanguages() {
        return this.http.get('https://api.parse.com/1/classes/language',{ headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    postApp(app) {
        return this.http.post('https://api.parse.com/1/classes/appDetailsInLanguage',
            {
                "androidStoreLanguageIso": app.language,
                "title": app.title,
                "shortDescription": app.shortDescription,
                "fullDescription": app.fullDescription
            },
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }

    postAppSpecific(app, appDetailId) {
        var language = "";
        var idx = app.language.indexOf("-")
        if (idx>-1) {
            language = app.language.substring(0,idx);
        } else {
            language = app.language;
        }
        return this.http.post('https://api.parse.com/1/classes/appSpecification',
            {
                "bookVernacularLanguageIso": language,
                "defaultStoreLanguageIso": app.language,
                "colorScheme": app.color[0],
                "icon1024x1024": app.icon,
                "featureGraphic1024x500": app.feature
            },
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }

    createRelation(appDetailId, appSpecificId) {
        return this.http.put('https://api.parse.com/1/classes/appSpecification/'+appSpecificId,
            {
                "details": {
                    "__op": "AddRelation",
                    "objects":[{
                        "__type": "Pointer",
                        "className": "appDetailsInLanguage",
                        "objectId": appDetailId
                    }]
                }
            },
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }

    addBooksInApp(bookId, appSpecificId, index) {
        return this.http.post('https://api.parse.com/1/classes/booksInApp',
            {
                "app": {
                    "__type":"Pointer",
                    "className":"appSpecification",
                    "objectId":appSpecificId
                },
                "book": {
                    "__type":"Pointer",
                    "className":"books",
                    "objectId": bookId
                },
                "index": index
            },
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }
}