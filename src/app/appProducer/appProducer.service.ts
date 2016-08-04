import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';
// import {Observable} from "rxjs/Rx";

import { AppProducerHeaders } from './appProducer.headers';

@Injectable()
export class AppProducerService {
    baseUrl = "https://api.parse.com/1/classes/";

    constructor(private http: Http) {}
    
    getAppsByUserId(userId: string) {
        return this.http.get(this.baseUrl + '?where={"owner": {"__type":"Pointer","className":"_User","objectId":"'+userId+'"}}',{ headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    getAppsIdByRelation(id) {
        return this.http.get(this.baseUrl + 'appDetailsInLanguage?where={"$relatedTo":{"object":{"__type":"Pointer","className":"appSpecification","objectId":"'+id+'"},"key":"details"}}', { headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }
    
    //not currently used
    getLastModifiedApp(userId) {
        return this.http.get(this.baseUrl + '_User/'+userId, { headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    //not currently used
    pushLastModifiedApp(userId, appId) {
        return this.http.put(this.baseUrl + '_User/'+userId,
            {
                "lastAppSpecification": {
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": appId
                }
            },
            { headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    getBookById(id: string) {
        return this.http.get(this.baseUrl + 'books/'+id,{ headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    getBooksByLanguage(languageId: string) {
        return this.http.get(this.baseUrl + 'books?limit%3D9999&&where={"langPointers": {"__type":"Pointer","className":"language","objectId":"'+languageId+'"}}',{ headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    getAllLanguages() {
        return this.http.get(this.baseUrl + 'language',{ headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    postAppDetails(app) {
        return this.http.post(this.baseUrl + 'appDetailsInLanguage',
            {
                "androidStoreLanguageIso": app.language,
                "title": app.title,
                "shortDescription": app.shortDescription,
                "fullDescription": app.fullDescription
            },
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }

    putAppDetails(app, field) {
        var object;
        switch(field) {
            case "language":
                object = {"androidStoreLanguageIso": app.language};
                break;
            case "title":
                object = {"title": app.title};
                break;
            case "short":
                object = {"shortDescription": app.shortDescription};
                break;
            case "full":
                object = {"fullDescription": app.fullDescription};
                break;
        }
        return this.http.put(this.baseUrl + 'appDetailsInLanguage/'+app.appDetailsId,
            object,
            { headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    deleteAppDetails(id) {
        return this.http.delete(this.baseUrl + 'appDetailsInLanguage/'+id,
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }

    postAppSpecific(app, userId) {
        var language = "";
        var idx = app.language.indexOf("-");
        if (idx>-1) {
            language = app.language.substring(0,idx);
        } else {
            language = app.language;
        }
        return this.http.post(this.baseUrl + 'appSpecification',
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

    putAppSpecific(app, field) {
        var object;
        switch(field) {
            case "language":
                var language = "";
                var idx = app.language.indexOf("-");
                if (idx>-1) {
                    language = app.language.substring(0,idx);
                } else {
                    language = app.language;
                }
                object = {"bookVernacularLanguageIso": language, "defaultStoreLanguageIso": app.language};
                break;
            case "color":
                object = {"colorScheme": app.color[0]};
                break;
            case "icon":
                object = {"icon1024x1024": app.icon};
                break;
            case "feature":
                object = {"featureGraphic1024x500": app.feature};
                break;
        }
        return this.http.put(this.baseUrl + 'appSpecification/'+app.appSpecificId,
            object,
            { headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    deleteAppSpecific(id) {
        return this.http.delete(this.baseUrl + 'appSpecification/'+id,
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }

    createRelation(appDetailId, appSpecificId) {
        return this.http.put(this.baseUrl + 'appSpecification/'+appSpecificId,
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
        return this.http.post(this.baseUrl + 'booksInApp',
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
        return this.http.get(this.baseUrl + 'booksInApp?where={"app": {"__type":"Pointer","className":"appSpecification","objectId":"'+appSpecificId+'"}}',
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }
    
    deleteBookInApp(bookInAppId) {
        return this.http.delete(this.baseurl + 'booksInApp/'+bookInAppId,
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }

    // use this function to get the server response, need to replace 'URL' and Headers with the real ones
    // getServerProcess() {
    //     return this.http.get('URL',{ headers: Headers})
    //    
    //         .map((response: Response) => response.json());
    // }
}