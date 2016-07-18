import { Component, OnInit } from '@angular/core';

import { AppInfo } from './appInfo';
import { BloomBook } from './bloomBook';
import { AppProducerService } from './appProducer.service';
declare var $:JQueryStatic;

@Component({
    selector: 'app-producer',
    templateUrl: './app-producer.tpl.html',
    styleUrls: ['./app-producer.tpl.css'],
    providers: [AppProducerService]
})

export class AppProducer implements OnInit{
    currentUser: string;
    currentStage: string;
    appName: string;

    hasValue: boolean = false;
    hasError: boolean = false;
    titleError: string;
    shortDError: string;
    fullDError: string;
    noColorError: string;
    iconError: string;
    featureError: string;
    noBookError: string;
    noBookInLanguageAlert: string;
    AllBookSelectedAlert: string;
    requestFailedError: string;

    detailsClass: string;
    booksClass: string = "active";
    processClass: string;

    userApps: AppInfo[];
    result: number[];
    resultBookTitle: string[];
    data: AppInfo;
    bloomBooks: BloomBook[];
    serverResponse = [{}];

    saveResponse = "";

    constructor(private appProducerService: AppProducerService) {}
    
    // user app info
    getUserAppInfo(username: string) {
        this.appProducerService.getAppsByUsername(username).then( (appInfos) => {
            this.userApps = JSON.parse(JSON.stringify(appInfos));
        });
    }
    onAppNameChange(name: string) {
        this.appName = name;
        if (name == "new app") {
            this.ngOnInit();
        } else {
            for (var app of this.userApps) {
                if (app.name == name) {
                    this.data = app;
                    this.getBooks("english", "load");
                    this.writeTable();
                    if (this.data.phase[1]==0) {
                        this.setServerResponse(this.data.phase[0],"fail");
                    } else {
                        this.setServerResponse(this.data.phase[0],"success");
                    }

                }
            }
        }
    }
    onSave() {
        this.readTable();
        this.save(this.appName, this.result);
        this.getUserAppInfo(this.currentUser);
    }
    save(name: string, result: number[]) {
        this.data.name=name;
        this.data.books=result;
        this.data.phase=[0,1];
        this.hasValue = true;
        console.log(this.data);
        this.appProducerService.saveApp(this.data, this.currentUser).then( (response) => {
            if (response == "201" || response == "202") {
                this.saveResponse = response + " saved";
                console.log(this.saveResponse);
            } else {
                this.saveResponse = response + " save failed";
                console.log(this.saveResponse);
            }
        });
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
    onColorSelect(style: string) {
        if (style) {
            this.data.color = style;
        }
    }
    selectFromDefault (src: string, name: string) {
        if (name == 'icon') {
            this.data.icon = src;
        } else if (name == 'feature') {
            this.data.feature = src;
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
                            // $("#iconDisplay").attr('src', reader.result);
                            this.data.icon = reader.result;
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
                            // $("#featureDisplay").attr('src', reader.result);
                            this.data.feature = reader.result;
                        }
                    });
                    reader.readAsDataURL(file.files[0]);
                }
            }
        }
    }

    // BooksPage
    searchBooks(language: string) {
        this.readTable();
        this.getBooks(language, "search");
    }
    getBooks(language: string, from: string) {
        this.appProducerService.getBooks().then( (bloomBooks) => {
            this.bloomBooks = [];
            var noLanguageAlert: boolean = true;
            var noOtherBookAlert: boolean = true;
            var searchResult;
            if (from == "load") {
                searchResult = this.data.books.slice();
            } else if (from == "search") {
                searchResult = this.result.slice();
            } else if (from == "research") {
                searchResult = this.result.slice();
            }
            if (searchResult.length != 0 ) {
                for (var i = 0; i < searchResult.length; i++) {
                    var findBook = $.grep(bloomBooks, function(a) { return a.id == searchResult[i]});
                    this.bloomBooks.push(findBook[0]);
                }
            }

            for (var i=0;i<bloomBooks.length;i++) {
                if (language == "") {
                    language = "english";
                }
                if (bloomBooks[i].language.indexOf(language.toLowerCase()) > -1 ) {
                    if (this.bloomBooks.indexOf(bloomBooks[i]) < 0) {
                        this.bloomBooks.push(bloomBooks[i]);
                        noOtherBookAlert = false;
                    }
                    noLanguageAlert = false;
                }
            }

            if (from != "research") {
                this.AllBookSelectedAlert = "";
                this.noBookInLanguageAlert = "";
            }
            if (noLanguageAlert) {
                this.getBooks("english","research");
                this.noBookInLanguageAlert = "There is no book available in '" + language.toLowerCase() + "'<br>Check your spelling may help<br>Result shows English books";
            } else if (noOtherBookAlert) {
                this.AllBookSelectedAlert = "You already selected all books in this language";
            }
        });
    }
    move($event) {
        var button = $event.target;
        var row = $(button).closest('tr');
        if ($(button).hasClass('glyphicon-arrow-up')) {
            if (!row.prev().hasClass('tableHead')) {
                row.prev().before(row);
            }
        } else {
            row.next().after(row);
        }
    }
    readTable() {
        var row = <HTMLElement[]><any>document.getElementsByClassName("tableContent");
        this.result = [];
        this.resultBookTitle = [];
        for(var i=0;i<row.length;i++) {
            if (row[i].getElementsByClassName("checkbox")[0]["checked"]) {
                this.result.push(parseInt(row[i].id));
                this.resultBookTitle.push(row[i].getElementsByTagName("td")[1].innerHTML);
            }
        }
    }
    writeTable() {
        var row = <HTMLElement[]><any>document.getElementsByClassName("tableContent");
        for(var i=0;i<row.length;i++) {
            if (this.data.books.indexOf(parseInt(row[i].id)) > -1) {
                row[i].getElementsByClassName("checkbox")[0]["checked"]=true;
            } else {
                row[i].getElementsByClassName("checkbox")[0]["checked"]=false;
            }
        }
    }

    // process page
    checkField() {
        this.hasError = false;
        this.hasValue = false;
        this.titleError = "";
        this.shortDError = "";
        this.fullDError = "";
        this.noColorError = "";
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
        if (this.data.color == "#FFFFFF") {
            this.noColorError = "Required color field.";
            this.hasError = true;
        }
        this.readTable();
        if (this.result.length == 0) {
            this.noBookError = "Please select at least one book.";
            this.hasError = true;
        }
        if (!this.hasError) {
            // this.save(this.appName, title, shortD, fullD, color, icon, feature, this.result);
            this.save(this.appName, this.result);
            this.onBuild(this.data);
            // this.onBuild(title, shortD, fullD, color, icon, feature, this.resultBookTitle);
        } else {
            // tecnically, this should be called client side response
            this.setServerResponse(1,"fail");
        }
    }
    onBuild(data: AppInfo) {
        this.setServerResponse(1,"success");
        console.log("built");
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
    
    // on start
    ngOnInit() {
        this.currentUser = "Jacob";
        this.appName = "untitled";
        this.getUserAppInfo(this.currentUser);
        this.setServerResponse(0,"");
        this.result = [];
        this.data = new AppInfo();
        this.data.color = "#FFFFFF";
        this.data.icon = "../../assets/ab-001-black.png";
        this.data.feature = "../../assets/bloom-feature-graphic.png";
        this.data.books=[];
        this.currentStage = "Setting Up";
        this.getBooks("English", "search");
        this.writeTable();
    }
}