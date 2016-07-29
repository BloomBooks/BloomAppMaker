import { Component, OnInit, ViewChild } from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {TYPEAHEAD_DIRECTIVES, MODAL_DIRECTIVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap';

import { AppInfo } from '../custom/appInfoClass';
import { BloomBook } from '../custom/bloomBookClass';
import { COLORTABLE } from '../custom/colorTable';
import { AppProducerService } from './appProducer.service';
declare var $:JQueryStatic;

@Component({
    selector: 'app-producer',
    templateUrl: './app-producer.tpl.html',
    styleUrls: ['./app-producer.tpl.css'],
    directives: [TYPEAHEAD_DIRECTIVES, MODAL_DIRECTIVES, CORE_DIRECTIVES],
    viewProviders: [BS_VIEW_PROVIDERS],
    providers: [AppProducerService]
})

export class AppProducer implements OnInit{
    currentUser;
    currentStage: string;
    appName: string;
    appDetailId: string;
    appSpecificId: string;

    hasValue: boolean = false;
    hasError: boolean = false;
    titleError: string;
    shortDError: string;
    fullDError: string;
    iconError: string;
    featureError: string;
    noBookError: string;
    noBookInLanguageAlert: string;
    requestFailedError: string;

    detailsClass: string;
    booksClass: string = "active";
    processClass: string;

    userApps: AppInfo[];
    result: string[];
    data: AppInfo;
    bloomBooks: BloomBook[];
    serverResponse = [{}];
    colorTable;
    appOnStore: boolean;
    modalContent: string;

    // saveResponse = "";

    bookPerPage: number = 15;
    Books;
    allLanguages;
    languageArray: string[];
    inputLanguage: string = "";
    totalPages: number[];
    currentPage: number;

    constructor(private appProducerService: AppProducerService) {}

    // user app info
    getUserAppInfo() {
        this.appProducerService.getAppsByUserId(this.currentUser.id)
            .subscribe(
                (response) => {
                    this.userApps = [];
                    for (var i=0;i<response.results.length;i++){
                        var a = new AppInfo();
                        this.userApps.push(a);
                        var result = response.results[i];
                        this.userApps[i].appSpecificationId = result.objectId;
                        this.userApps[i].language = result.defaultStoreLanguageIso;
                        this.userApps[i].color = [];
                        this.userApps[i].color[0] = result.colorScheme;
                        this.userApps[i].color[1] = this.colorTable[result.colorScheme];
                        this.userApps[i].icon = result.icon1024x1024;
                        this.userApps[i].feature = result.featureGraphic1024x500;
                        this.getAppDetailInfo(i);
                        this.getBooksInApp(result.objectId, i);
                    }
                },
                error => console.log(error)
            )
    }

    getAppDetailInfo(idx: number) {
        this.appProducerService.getAppsIdByRelation(this.userApps[idx].appSpecificationId)
            .subscribe(
                (response) => {
                    this.userApps[idx].appDetailsId = response.results[0].objectId;
                    this.userApps[idx].title = response.results[0].title;
                    this.userApps[idx].shortDescription = response.results[0].shortDescription;
                    this.userApps[idx].fullDescription = response.results[0].fullDescription;
                }
            )
    }

    getBooksInApp(id: string, idx:number) {
        this.appProducerService.getBooksIdInApp(id)
            .subscribe(
                (response) => {
                    this.userApps[idx].books = [];
                    for(var i=0;i<response.results.length;i++) {
                        this.userApps[idx].books.push(response.results[i].book.objectId);
                    }
                },
                error => console.log(error)
            )
    }

    onAppNameChange(name: string) {
        if (name == "Create New App") {
            this.onInit();
        } else {
            for (var app of this.userApps) {
                if (app.title == name) {
                    this.data = app;
                    this.data.title = name;
                    this.setLanguageSelect();
                    this.getBooksById();
                }
            }
        }
    }

    setLanguageSelect() {
        var a = document.getElementById("languageSelect").children;
        if (this.data.language) {
            for(var i=0;i<a.length;i++) {
                if (a[i]["value"] == this.data.language) {
                    a[i]["selected"] = true;
                } else {
                    a[i]["selected"] = false;
                }
            }
        } else {
            var lan = navigator.language;
            var idx = lan.indexOf("-");
            if (idx>-1) {
                lan = lan.substring(0,idx);
            }
            var success = false;
            for(var i=0;i<a.length;i++) {
                if (a[i]["value"].includes(lan)) {
                    a[i]["selected"] = true;
                    success = true;
                    this.data.language = a[i]["value"];
                } else {
                    a[i]["selected"] = false;
                }
            }
            if (success == false) {
                this.data.language = "en-GB";
                this.setLanguageSelect();
            }
        }
    }

    @ViewChild('childModal') childModal;

    setDeleteMessage() {
        if (this.appOnStore) {
            this.modalContent = "Sorry, we can't remove this app specification because the app is currently available on the Bloom Store. For further help, please write to issues@bloomlibrary.org.";
        } else {
            this.modalContent = "You are about to remove this app specification from BloomLibrary.org.";
        }
    }

    showModal() {
        this.childModal.show();
    }

    hideModal() {
        this.childModal.hide();
    }

    deleteApp() {
        this.appProducerService.getBooksIdInApp(this.appSpecificId)
            .subscribe(
                (response) => {
                    for (var j=0;j<response.results.length;j++) {
                        this.appProducerService.deleteBookInApp(response.results[j].objectId)
                            .subscribe(
                                error => console.log(error)
                            );
                    }
                    this.appProducerService.deleteApp(this.appDetailId)
                        .subscribe(
                            () => {
                                this.appProducerService.deleteAppSpecific(this.appSpecificId)
                                    .subscribe(
                                        () => this.onInit()
                                    )
                            }
                        );
                },
                error => console.log(error)
            );
        this.childModal.hide();
    }

    // detail page
    onNavSelect(item: string) {
        switch(item) {
            case "detail":
                this.detailsClass = "active";
                this.booksClass = "";
                this.processClass = "";
                break;
            case "book":
                this.detailsClass = "";
                this.booksClass = "active";
                this.processClass = "";
                break;
            case "process":
                this.detailsClass = "";
                this.booksClass = "";
                this.processClass = "active";
        }
    }
    onLanguageSelect(language: string) {
        if (language) {
            this.data.language = language;
            this.putApp("language");
        }
    }
    onColorSelect(name: string) {
        if (name) {
            this.data.color[0] = name;
            this.data.color[1] = this.colorTable.name;
            this.putApp("color");
        }
    }
    selectFromDefault (src: string, name: string) {
        if (name == 'icon') {
            this.data.icon = src;
            this.putApp("icon");
        } else if (name == 'feature') {
            this.data.feature = src;
            this.putApp("feature");
        }
    }
    onFileSelect (file, name: string) {
        if (file.files && file.files[0]) {
            this.iconError = "";
            if (name == 'icon' && file.files[0].size > 1048576) {
                this.iconError = "icon file size has to be smaller than 1MB";
            } else {
                var reader = new FileReader();
                if (name == "icon") {
                    reader.addEventListener("load", () => {
                        var img = new Image();
                        img.src = reader.result;
                        if (img.width != 512 && img.height != 512) {
                            this.iconError = "icon has to be 512px x 512px, this image is "+img.height+"px x "+img.width+"px";
                        } else {
                            this.data.icon = reader.result;
                            this.putApp("icon");
                        }
                    });
                    reader.readAsDataURL(file.files[0]);
                } else if (name == "feature") {
                    reader.addEventListener("load", () => {
                        this.featureError = "";
                        var img = new Image();
                        img.src = reader.result;
                        if (img.width != 1024 && img.height != 500) {
                            this.featureError = "feature graphic has to be 500px x 1024px, this image is "+img.height+"px x "+img.width+"px";
                        } else {
                            this.data.feature = reader.result;
                            this.putApp("feature");
                        }
                    });
                    reader.readAsDataURL(file.files[0]);
                }
            }
        }
    }

    // BooksPage
    getAllLanguages() {
        this.appProducerService.getAllLanguages()
            .subscribe(
                (languages) => {
                    this.allLanguages = languages.results;
                    for(var i=0;i<languages.results.length;i++) {
                        this.languageArray.push(languages.results[i].name);
                    }
                },
                error => console.log(error)
            );
    }
    getBooksById() {
        this.bloomBooks = [];
        if (this.data.books.length > 0) {
            for (var i=0;i<this.data.books.length;i++) {
                var trash:BloomBook = new BloomBook();
                this.bloomBooks.push(trash);
                this.pushBook(i);
            }
        }
    }
    pushBook(idx) {
        this.appProducerService.getBookById(this.data.books[idx])
            .subscribe(
                (response) => {
                    var a:BloomBook = new BloomBook();
                    a.id = response.objectId;
                    a.title = response.title;
                    a.copyright = response.copyright;
                    a.note = response.librarianNote;
                    a["state"] = true;
                    this.bloomBooks[idx] = a;
                },
                error => console.log(error)
            );
    }
    getBooks(language: string) {
        this.bloomBooks = [];
        if (language == "") {
            this.noBookInLanguageAlert = "Please insert a language.";
        } else {
            this.noBookInLanguageAlert = "Sorry, the Bloom library does not have any '" + language + "' books.";
            for (var i=0;i<this.allLanguages.length;i++) {
                if (this.allLanguages[i].name.toLowerCase() == language.toLowerCase()) {
                    this.noBookInLanguageAlert = "";
                    this.appProducerService.getBooksByLanguage(this.allLanguages[i].objectId)
                        .subscribe((bloomBooks) => this.Books = bloomBooks.results,
                            error => console.log(error),
                            () => {
                                for (var i=0;i<this.Books.length;i++) {
                                    var a:BloomBook = new BloomBook();
                                    a.id = this.Books[i].objectId;
                                    a.title = this.Books[i].title;
                                    a.copyright = this.Books[i].copyright;
                                    a.note = this.Books[i].librarianNote;
                                    if (this.bloomBooks.indexOf(a) < 0) {
                                        a["state"] = false;
                                        this.bloomBooks.push(a);
                                    }
                                }
                                this.totalPages = Array.from(new Array(Math.floor(this.bloomBooks.length/this.bookPerPage)+1), (x,i) => i+1);
                            }
                        );
                }
            }
        }
    }
    move($event) {
        var button = $event.target;
        var row = $(button).closest('tr');
        if ($(button).hasClass('glyphicon-arrow-up') || $(button).children().hasClass('glyphicon-arrow-up')) {
            if (!row.prev().hasClass('tableHead')) {
                row.prev().before(row);
            }
        } else {
            row.next().after(row);
        }
    }
    readTable() {
        var row = <HTMLElement[]><any>document.getElementsByClassName("tableContent");
        for(var i=0;i<row.length;i++) {
            var idx = this.result.indexOf(row[i].id);
            if (row[i].getElementsByClassName("checkbox")[0]["checked"] && idx<0) {
                this.data.books.push(row[i].id);
            }
        }
    }
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
        }
    }
    nextPage() {
        if (this.currentPage < this.totalPages.length) {
            this.currentPage += 1;
        }
    }
    toPage(page:number) {
        this.currentPage = page;
    }
    displayPage(book) {
        return Math.floor(this.bloomBooks.indexOf(book)/this.bookPerPage+1) != this.currentPage;
    }
    displayNumber(page:number) {
        if (page == 1 || page == 2 ||  page == this.totalPages.length-1 || page == this.totalPages.length) {
            return true
        } else if (page-this.currentPage >= -2 && page-this.currentPage <= 2) {
            return true
        }
        return false
    }
    showDot(page:number) {
        if (this.currentPage <= 5 && page==this.currentPage+2) {
            return true
        } else if (this.currentPage > 5) {
            if (page==2) {
                return true
            } else if (this.currentPage < this.totalPages.length-4 && page==this.currentPage+2) {
                return true
            }
        }
        return false
    }
    checkTable() {
        for (var i=0;i<this.bloomBooks.length;i++) {
            if (this.bloomBooks[i]["state"] === true) {
                return true
            }
        }
        return false
    }

    // process page
    checkField() {
        this.hasError = false;
        this.hasValue = false;
        this.titleError = "";
        this.shortDError = "";
        this.fullDError = "";
        this.noBookError = "";

        if (!this.data.title) {
            this.titleError = "Required title field.";
            this.hasError = true;
        } else if (this.data.title.length > 30) {
            this.titleError = "title field cannot exceed 30 characters.";
            this.hasError = true;
        }
        if (!this.data.shortDescription) {
            this.shortDError = "Required short description field.";
            this.hasError = true;
        } else if (this.data.shortDescription.length > 80) {
            this.shortDError = "short description field cannot exceed 80 characters.";
            this.hasError = true;
        }
        if (!this.data.fullDescription) {
            this.fullDError = "Required full description field.";
            this.hasError = true;
        } else if (this.data.fullDescription.length > 4000) {
            this.fullDError = "full description field cannot exceed 4000 characters.";
            this.hasError = true;
        }
        this.readTable();
        if (this.data.books.length == 0) {
            this.noBookError = "Please select at least one book.";
            this.hasError = true;
        }
        if (!this.hasError) {
            this.hasValue = true;
            console.log(this.data);
            this.onBuild(this.data);
        } else {
            // tecnically, this should be called client side response
            this.setServerResponse(1,"fail");
        }
    }
    onBuild(data: AppInfo) {
        this.setServerResponse(1,"success");
    }

    setServerResponse(id: number, response: string) {
        this.serverResponse[0]["requestId"] = id;
        this.serverResponse[0]["response"] = response;
        this.requestFailedError = "";
        if (id==0) {
            this.currentStage = "Setting Up";
            this.booksClass = "active";
            this.detailsClass = "";
            this.processClass = "";
        } else {
            this.booksClass = "";
            this.detailsClass = "";
            this.processClass = "active";
            if (id==1) {
                if (response == "fail") {
                    this.currentStage = "Setting Up";
                    this.requestFailedError = "Please check the 'Books' and 'Details' tabs for information that we need before we can make your app.";
                } else {
                    this.currentStage = "Making App";
                }
            } else if (id==2) {
                if (response == "fail") {
                    this.currentStage = "Making App";
                    this.requestFailedError = "Our server is currently unable to build the app, please try again later";
                } else {
                    this.currentStage = "Submitting to Play Store";
                }
            } else if (id==3) {
                if (response == "fail") {
                    this.currentStage = "Submitting to Play Store";
                    this.requestFailedError = "We failed to update the app, please try again later";
                } else {
                    this.currentStage = "Private on Play Store";
                }
            } else if (id==4) {
                if (response == "fail") {
                    this.requestFailedError = "We failed to change the app from private to public, please try again later";
                    this.currentStage = "Private on Play Store";
                } else {
                    this.currentStage = "Public on Play Store";
                }
            } else if (id==5) {
                if (response == "fail") {
                    this.requestFailedError = "We failed to change the app from public to private, please try again later";
                    this.currentStage = "Public on Play Store";
                } else {
                    this.currentStage = "Private on Play Store";
                }
            }
        }
    }
    
    postEmptyApp() {
        this.appProducerService.postApp(this.data)
            .subscribe(
                (response1) => {
                    this.appDetailId = response1.objectId;
                    this.appProducerService.postAppSpecific(this.data, this.currentUser.id)
                        .subscribe(
                            (response2) => {
                                this.appSpecificId = response2.objectId;
                                this.appProducerService.createRelation(this.appDetailId, this.appSpecificId)
                                    .subscribe(
                                        (response3) => {
                                            // console.log(response3);
                                        },
                                        error => console.log(error)
                                    );
                            },
                            error => console.log(error)
                        )
                },
                error => console.log(error)
            );
    }
    
    putApp(field) {
        switch (field) {
            case "books":
                this.appProducerService.getBooksIdInApp(this.appSpecificId)
                    .subscribe(
                        (response) => {
                            for (var j=0;j<response.results.length;j++) {
                                this.appProducerService.deleteBookInApp(response.results[j].objectId)
                                    .subscribe(
                                        (response123) => console.log(response),
                                        error => console.log(error)
                                    );
                            }
                            this.data.books = [];
                            this.readTable();
                            for (var i = 0; i < this.data.books.length; i++) {
                                this.appProducerService.addBookInApp(this.data.books[i], this.appSpecificId, i)
                                    .subscribe(
                                        (response) => console.log(response),
                                        error => console.log(error)
                                    );
                            }
                        },
                        error => console.log(error)
                    );
                break;
            case "language":
                this.appProducerService.putApp(this.data, field, this.appDetailId)
                    .subscribe(
                        (response) => console.log(response),
                        error => console.log(error)
                );
                this.appProducerService.putAppSpecific(this.data, field, this.appSpecificId)
                    .subscribe(
                        (response) => console.log(response),
                        error => console.log(error)
                    );
                break;
            case "title":
                this.appProducerService.putApp(this.data, field, this.appDetailId)
                    .subscribe(
                        (response) => console.log(response),
                        error => console.log(error)
                    );
                break;
            case "short":
                this.appProducerService.putApp(this.data, field, this.appDetailId)
                    .subscribe(
                        (response) => console.log(response),
                        error => console.log(error)
                    );
                break;
            case "full":
                this.appProducerService.putApp(this.data, field, this.appDetailId)
                    .subscribe(
                        (response) => console.log(response),
                        error => console.log(error)
                    );
                break;
            case "color":
                this.appProducerService.putAppSpecific(this.data, field, this.appSpecificId)
                    .subscribe(
                        (response) => console.log(response),
                        error => console.log(error)
                    );
                break;
            case "icon":
                this.appProducerService.putAppSpecific(this.data, field, this.appSpecificId)
                    .subscribe(
                        (response) => console.log(response),
                        error => console.log(error)
                    );
                break;
            case "feature":
                this.appProducerService.putAppSpecific(this.data, field, this.appSpecificId)
                    .subscribe(
                        (response) => console.log(response),
                        error => console.log(error)
                    );
                break;
        }
    }
    
    // on start
    ngOnInit() {
        this.languageArray = [];
        this.getAllLanguages();
        this.currentUser = {};
        this.currentUser["name"] = "Jacob";
        this.currentUser["id"] = "vUGQP4mbby";
        this.colorTable = COLORTABLE;
        this.onInit();
    }

    // on new app
    onInit() {
        this.getUserAppInfo();
        this.setServerResponse(0,"");
        this.result = [];
        this.bloomBooks = [];
        this.data = new AppInfo();
        this.data.title = "Untitled"
        this.data.color = [];
        this.data.color[0] = "Dark Green";
        this.data.color[1] = "#083F0E";
        this.data.icon = "../../assets/ab-001-black.png";
        this.data.feature = "../../assets/bloom-feature-graphic.png";
        this.data.books=[];
        this.setLanguageSelect();

        this.currentStage = "Setting Up";
        this.totalPages = [1];
        this.currentPage = 1;
        // this.postEmptyApp();
        this.appOnStore = false;
        this.setDeleteMessage();
    }

    
}