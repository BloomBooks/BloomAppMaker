"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var appProducer_service_1 = require('./appProducer.service');
var AppProducer = (function () {
    function AppProducer(appProducerService) {
        this.appProducerService = appProducerService;
        this.hasValue = false;
        this.hasError = false;
        this.noTitleError = "";
        this.noShortDError = "";
        this.noFullDError = "";
        this.noColorError = "";
        this.noBookError = "";
        this.noBookInLanguageAlert = "";
        this.result = [];
        this.data = {};
        this.detailsClass = "active";
        this.booksClass = "";
        this.processClass = "";
        this.colorSelection = "select a color";
        this.colorStyle = "#FFFFFF";
    }
    //detail page
    AppProducer.prototype.onNavSelect = function (item) {
        switch (item) {
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
    };
    AppProducer.prototype.onColorSelect = function (content, style) {
        if (content) {
            this.colorSelection = content;
            this.colorStyle = style;
        }
    };
    //BooksPage
    AppProducer.prototype.getBooks = function (language) {
        var _this = this;
        this.appProducerService.getBooks().then(function (bloomBooks) {
            // this.doTable();
            // var searchResult = this.result.slice();
            // if (searchResult.length != 0 ) {
            //     for (var i = 0; i < searchResult.length; i++) {
            //         var findBook = $.grep(bloomBooks, function(a) { return a.id == searchResult[i]});
            //         this.bloomBooks.push(findBook[0]);
            //     }
            // }
            _this.bloomBooks = [];
            for (var i = 0; i < bloomBooks.length; i++) {
                if (bloomBooks[i].language.indexOf(language.toLowerCase()) > -1) {
                    _this.bloomBooks.push(bloomBooks[i]);
                }
            }
            _this.noBookInLanguageAlert = "";
            if (_this.bloomBooks.length == 0) {
                _this.noBookInLanguageAlert = "There is no book available in <" + language.toLowerCase() + ">. <br>Check your spelling may help";
            }
        });
    };
    AppProducer.prototype.move = function ($event) {
        var button = $event.path[0];
        var row = $(button).closest('tr');
        if ($(button).hasClass('up')) {
            if (!row.prev().hasClass('tableHead')) {
                row.prev().before(row);
            }
        }
        else {
            row.next().after(row);
        }
    };
    AppProducer.prototype.doTable = function () {
        var row = document.getElementsByClassName("tableContent");
        this.result = [];
        for (var i = 0; i < row.length; i++) {
            if (row[i].getElementsByClassName("checkbox")[0]["checked"]) {
                this.result.push(row[i].id);
            }
        }
    };
    //process page
    AppProducer.prototype.checkField = function (title, shortD, fullD, color) {
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
    };
    AppProducer.prototype.onBuild = function (title, shortD, fullD, color, result) {
        this.data["title"] = title;
        this.data["shortDescription"] = shortD;
        this.data["fullDescription"] = fullD;
        this.data["color"] = color;
        this.data["books"] = result;
        this.hasValue = true;
    };
    //on start
    AppProducer.prototype.ngOnInit = function () {
        this.getBooks("English");
    };
    AppProducer = __decorate([
        core_1.Component({
            selector: 'app-producer',
            templateUrl: 'app/appProducer/app-producer.tpl.html',
            styleUrls: ['app/appProducer/app-producer.tpl.css'],
            providers: [appProducer_service_1.AppProducerService]
        }), 
        __metadata('design:paramtypes', [appProducer_service_1.AppProducerService])
    ], AppProducer);
    return AppProducer;
}());
exports.AppProducer = AppProducer;
//# sourceMappingURL=appProducer.component.js.map