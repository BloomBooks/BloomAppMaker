import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';
// import {Observable} from "rxjs/Rx";

import { AppProducerHeaders } from './appProducer.headers';

@Injectable()
export class AppProducerService {
    baseParseUrl = "https://api.parse.com/1/classes/";
    baseWorkflowUrl = "http://private-66f5cc-bloomappmaker.apiary-mock.com/workflow";

    constructor(private http: Http) {}
    
    getAppsByUserId(userId: string) {
        return this.http.get(this.baseParseUrl + 'appSpecification?where={"owner": {"__type":"Pointer","className":"_User","objectId":"'+userId+'"}}',{ headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    getAppsIdByRelation(id) {
        return this.http.get(this.baseParseUrl + 'appDetailsInLanguage?where={"$relatedTo":{"object":{"__type":"Pointer","className":"appSpecification","objectId":"'+id+'"},"key":"details"}}', { headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }
    
    //not currently used
    getLastModifiedApp(userId) {
        return this.http.get(this.baseParseUrl + '_User/'+userId, { headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    //not currently used
    pushLastModifiedApp(userId, appId) {
        return this.http.put(this.baseParseUrl + '_User/'+userId,
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
        return this.http.get(this.baseParseUrl + 'books/'+id,{ headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    getBooksByLanguage(languageId: string) {
        return this.http.get(this.baseParseUrl + 'books?limit%3D9999&&where={"langPointers": {"__type":"Pointer","className":"language","objectId":"'+languageId+'"}}',{ headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    getAllLanguages() {
        return this.http.get(this.baseParseUrl + 'language',{ headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    postAppDetails(app) {
        return this.http.post(this.baseParseUrl + 'appDetailsInLanguage',
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
        return this.http.put(this.baseParseUrl + 'appDetailsInLanguage/'+app.appDetailsId,
            object,
            { headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    deleteAppDetails(id) {
        return this.http.delete(this.baseParseUrl + 'appDetailsInLanguage/'+id,
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
        return this.http.post(this.baseParseUrl + 'appSpecification',
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
            case "buildEngine":
                object = {"buildEngineJobId": app.workflowId};
                break;
        }
        return this.http.put(this.baseParseUrl + 'appSpecification/'+app.appSpecificId,
            object,
            { headers: AppProducerHeaders })
            .map((response: Response) => response.json());
    }

    deleteAppSpecific(id) {
        return this.http.delete(this.baseParseUrl + 'appSpecification/'+id,
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }

    createRelation(appDetailId, appSpecificId) {
        return this.http.put(this.baseParseUrl + 'appSpecification/'+appSpecificId,
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
        return this.http.post(this.baseParseUrl + 'booksInApp',
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
        return this.http.get(this.baseParseUrl + 'booksInApp?where={"app": {"__type":"Pointer","className":"appSpecification","objectId":"'+appSpecificId+'"}}',
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }
    
    deleteBookInApp(bookInAppId) {
        return this.http.delete(this.baseParseUrl + 'booksInApp/'+bookInAppId,
            { headers: AppProducerHeaders })

            .map((response: Response) => response.json());
    }
    
    getWorkflow(id) {
        return this.http.get(this.baseWorkflowUrl + '/' + id.toString()
            // , {headers: {Prefer: 201}}
        )
        
            .map((response: Response) => response.json());
    }

    postWorkflow() {
        return this.http.post(this.baseWorkflowUrl,
            {"service_id": 8})
    
            .map((response: Response) => response.json());
    }
    
    putWorkflow(app) {
        this.http.put(this.baseWorkflowUrl + '/' + app.appSpecificId + '/step/' + app.nextStepId.toString(),
            {
                "id": app.nextStepId,
                "data": {
                    "project_name": app.title,
                    "app_definition_id": app.appSpecificId
                }
            });
    }
}