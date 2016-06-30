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
    noTitleError = "";
    noShortDError = "";
    noFullDError = "";
    noColorError = "";
    noBookError = "";
    noBookInLanguageAlert = "";
    AllBookSelectedAlert = "";
    requestFailedError = "";

    detailsClass = "active";
    booksClass = "";
    processClass = "";
    
    colorSelection = "select a color";
    colorStyle = "#FFFFFF";

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
        this.noTitleError = "";
        this.noShortDError = "";
        this.noFullDError = "";
        this.noColorError = "";
        this.noBookError = "";

        if (!title) {
            this.noTitleError = "missing title field";
            this.hasError = true;
        }
        if (!shortD) {
            this.noShortDError = "missing short description field";
            this.hasError = true;
        }
        if (!fullD) {
            this.noFullDError = "missing full description field";
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
            this.onBuild(title, shortD, fullD, color, this.result);
        }
    }
    onBuild(title: string, shortD: string, fullD: string, color: string, result) {
        this.data["title"]=title;
        this.data["shortDescription"]=shortD;
        this.data["fullDescription"]=fullD;
        this.data["color"]=color;
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
    }
}