import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';
// import {Observable} from "rxjs/Rx";

import { AppProducerHeaders } from './appProducer.headers';

@Injectable()
export class AppProducerService {
    constructor(private http: Http) {}
    
    getAppsByUserId(userId: string) {
        return this.http.get('https://api.parse.com/1/classes/appSpecification?where={"owner": {"__type":"Pointer","className":"_User","objectId":"'+userId+'"}}',{ headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    getAppsIdByRelation(id) {
        return this.http.get('https://api.parse.com/1/classes/appDetailsInLanguage?where={"$relatedTo":{"object":{"__type":"Pointer","className":"appSpecification","objectId":"'+id+'"},"key":"details"}}', { headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }
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

    getBookById(id: string) {
        return this.http.get('https://api.parse.com/1/classes/books/'+id,{ headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

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

    putApp(app, field, id) {
        switch(field) {
            case "language":
                return this.http.put('https://api.parse.com/1/classes/appDetailsInLanguage/'+id,
                    {"androidStoreLanguageIso": app.language},
                    { headers: AppProducerHeaders })
                    .map((response: Response) => response.json());
            case "title":
                return this.http.put('https://api.parse.com/1/classes/appDetailsInLanguage/'+id,
                    {"title": app.title},
                    { headers: AppProducerHeaders })
                    .map((response: Response) => response.json());
            case "short":
                return this.http.put('https://api.parse.com/1/classes/appDetailsInLanguage/'+id,
                    {"shortDescription": app.shortDescription},
                    { headers: AppProducerHeaders })
                    .map((response: Response) => response.json());
            case "full":
                return this.http.put('https://api.parse.com/1/classes/appDetailsInLanguage/'+id,
                    {"fullDescription": app.fullDescription},
                    { headers: AppProducerHeaders })
                    .map((response: Response) => response.json());
        }
    }

    postAppSpecific(app, userId) {
        var language = "";
        var idx = app.language.indexOf("-");
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
                "featureGraphic1024x500": app.feature,
                "owner": {
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": userId
                }
            },
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }

    putAppSpecific(app, field, id) {
        switch(field) {
            case "language":
                var language = "";
                var idx = app.language.indexOf("-");
                if (idx>-1) {
                    language = app.language.substring(0,idx);
                } else {
                    language = app.language;
                }
                return this.http.put('https://api.parse.com/1/classes/appSpecification/'+id,
                    {"bookVernacularLanguageIso": language,
                    "defaultStoreLanguageIso": app.language},
                    { headers: AppProducerHeaders })
                    .map((response: Response) => response.json());
            case "color":
                return this.http.put('https://api.parse.com/1/classes/appSpecification/'+id,
                    {"colorScheme": app.color[0]},
                    { headers: AppProducerHeaders })
                    .map((response: Response) => response.json());
            case "icon":
                return this.http.put('https://api.parse.com/1/classes/appSpecification/'+id,
                    {"icon1024x1024": app.icon},
                    { headers: AppProducerHeaders })
                    .map((response: Response) => response.json());
            case "feature":
                return this.http.put('https://api.parse.com/1/classes/appSpecification/'+id,
                    {"featureGraphic1024x500": app.feature},
                    { headers: AppProducerHeaders })
                    .map((response: Response) => response.json());
        }
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

    addBookInApp(bookId, appSpecificId, index) {
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

    getBooksIdInApp(appSpecificId) {
        return this.http.get('https://api.parse.com/1/classes/booksInApp?where={"app": {"__type":"Pointer","className":"appSpecification","objectId":"'+appSpecificId+'"}}',
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }
    
    deleteBookInApp(bookInAppId) {
        return this.http.delete('https://api.parse.com/1/classes/booksInApp/'+bookInAppId,
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }
}