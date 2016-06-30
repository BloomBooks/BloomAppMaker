import { Component, OnInit } from '@angular/core';

import { BloomBook } from './bloomBook';
import { AppProducerService } from './appProducer.service';
declare var $:JQueryStatic;

@Component({
    selector: 'app-producer',
    templateUrl: 'app/appProducer/app-producer.tpl.html',
    styleUrls: ['app/appProducer/app-producer.tpl.css'],
    providers: [AppProducerService]
})

export class AppProducer implements OnInit{
    hasValue = false;
    hasError = false;
    titleError = "";
    shortDError = "";
    fullDError = "";
    noColorError = "";
    iconError = "";
    featureError = "";
    noBookError = "";
    noBookInLanguageAlert = "";
    AllBookSelectedAlert = "";
    requestFailedError = "";

    detailsClass = "active";
    booksClass = "";
    processClass = "";
    
    colorSelection = "select a color";
    colorStyle = "#FFFFFF";
    iconSrc = "";
    featureSrc = "";

    result = [];
    data = {};
    bloomBooks: BloomBook[];
    serverResponse = [{}];

    constructor(private appProducerService: AppProducerService) {}

    //detail page
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
    onColorSelect(content: string, style: string) {
        if (content) {
            this.colorSelection = content;
            this.colorStyle = style;
        }
    }
    selectFromDefault (src: string, name: string) {
        if (name == 'icon') {
            $("#iconDisplay").attr('src', src);
            this.iconError = "";
            this.iconSrc = src;
        } else if (name == 'feature') {
            $("#featureDisplay").attr('src', src);
            this.featureError = "";
            this.featureSrc = src;
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
                            $("#iconDisplay").attr('src', reader.result);
                            this.iconSrc = reader.result;
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
                            $("#featureDisplay").attr('src', reader.result);
                            this.featureSrc = reader.result;
                        }
                    });
                    reader.readAsDataURL(file.files[0]);
                }
            }
        }
    }

    //BooksPage
    getBooks(language: string) {
        this.appProducerService.getBooks().then( (bloomBooks) => {
            this.doTable();
            this.bloomBooks = [];
            var noLanguageAlert = true;
            var noOtherBookAlert = true;
            var searchResult = this.result.slice();
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

            this.AllBookSelectedAlert = "";
            this.noBookInLanguageAlert = "";
            if (noLanguageAlert) {
                this.noBookInLanguageAlert = "There is no book available in '" + language.toLowerCase() + "'. <br>Check your spelling may help";
            } else if (noOtherBookAlert) {
                this.AllBookSelectedAlert = "You already selected all books in this language";
            }
        });
    }
    move($event) {
        var button = $event.path[0];
        var row = $(button).closest('tr');
        if ($(button).hasClass('up')) {
            if (!row.prev().hasClass('tableHead')) {
                row.prev().before(row);
            }
        } else {
            row.next().after(row);
        }
    }
    doTable() {
        var row = <HTMLElement[]><any>document.getElementsByClassName("tableContent");
        this.result = [];
        for(var i=0;i<row.length;i++) {
            if (row[i].getElementsByClassName("checkbox")[0]["checked"]) {
                this.result.push(row[i].id);
            }
        }
    }

    //process page
    checkField(title: string, shortD: string, fullD: string, color: string) {
        this.hasError = false;
        this.hasValue = false;
        this.titleError = "";
        this.shortDError = "";
        this.fullDError = "";
        this.noColorError = "";
        this.noBookError = "";

        if (!title) {
            this.titleError = "missing title field";
            this.hasError = true;
        } else if (title.length > 30) {
            this.titleError = "title field cannot exceed 30 characters";
            this.hasError = true;
        }
        if (!shortD) {
            this.shortDError = "missing short description field";
            this.hasError = true;
        } else if (shortD.length > 80) {
            this.shortDError = "short description field cannot exceed 80 characters";
            this.hasError = true;
        }
        if (!fullD) {
            this.fullDError = "missing full description field";
            this.hasError = true;
        } else if (fullD.length > 4000) {
            this.fullDError = "full description field cannot exceed 4000 characters";
            this.hasError = true;
        }
        if (color == "select a color") {
            this.noColorError = "missing color field";
            this.hasError = true;
        }
        this.doTable();
        if (this.result.length == 0) {
            this.noBookError = "missing book selection";
            this.hasError = true;
        }
        if (!this.hasError) {
            var icon = this.iconSrc;
            var feature = this.featureSrc;
            this.onBuild(title, shortD, fullD, color, icon, feature, this.result);
        }
    }
    onBuild(title: string, shortD: string, fullD: string, color: string, icon: string, feature: string, result) {
        this.data["title"]=title;
        this.data["shortDescription"]=shortD;
        this.data["fullDescription"]=fullD;
        this.data["color"]=color;
        this.data["icon"]=icon;
        this.data["feature"]=feature;
        this.data["books"]=result;
        this.hasValue = true;
    }
    setServerResponse(id: number, response: string) {
        this.serverResponse[0]["requestId"] = id;
        this.serverResponse[0]["response"] = response;
        this.requestFailedError = "";
        if (response == "fail") {
            this.requestFailedError = "For some mysterious reasons, this process failed. Please try again. Good luck!";
        }
    }
    //on start
    ngOnInit() {
        this.getBooks("English");
        this.iconSrc = "../../assets/ab-001-black.png";
        this.featureSrc = "../../assets/bloom-feature-graphic.png";
    }
}