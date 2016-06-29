angular.module('templates-app', ['modules/app/aPage.tpl.html', 'modules/appProducer/app-producer.tpl.html', 'modules/browse/browse.tpl.html', 'modules/common/errorMessage.tpl.html', 'modules/common/pagecontrol.tpl.html', 'modules/datagrid/confirmRelateDialog.tpl.html', 'modules/datagrid/datagrid.tpl.html', 'modules/detail/ccdialog.tpl.html', 'modules/detail/deleteDialog.tpl.html', 'modules/detail/detail.tpl.html', 'modules/download/hereItComes.tpl.html', 'modules/download/preflight.tpl.html', 'modules/inProgress/inProgress.tpl.html', 'modules/installers/installers.tpl.html', 'modules/installers/linux.tpl.html', 'modules/installers/oldInstallers.tpl.html', 'modules/login/login.tpl.html', 'modules/login/mustAgree.tpl.html', 'modules/login/pleaseLogIn.tpl.html', 'modules/prefs/prefs.tpl.html', 'modules/signup/signup.tpl.html', 'modules/static/about.tpl.html', 'modules/static/artofreading.tpl.html', 'modules/static/features.tpl.html', 'modules/static/home.tpl.html', 'modules/static/landing/landing.tpl.html', 'modules/static/opensource.tpl.html', 'modules/static/support.tpl.html', 'modules/suggestions/suggestions.tpl.html', 'modules/terms/infringement.tpl.html', 'modules/terms/privacy.tpl.html', 'modules/terms/terms.tpl.html']);

angular.module("modules/app/aPage.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/app/aPage.tpl.html",
    "<!--<a [routerLink]=\"['AppProducer']\">Go To App Producer</a>-->\n" +
    "<h1>something</h1>\n" +
    "<router-outlet></router-outlet>");
}]);

angular.module("modules/appProducer/app-producer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/appProducer/app-producer.tpl.html",
    "<div>\n" +
    "    <h1>this is something</h1>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/browse/browse.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/browse/browse.tpl.html",
    "<div class=\"container not-centered\">\n" +
    "    <app-producer></app-producer>\n" +
    "    <div class=\"row row-offcanvas\">\n" +
    "        <div ng-show=\"wantLeftBar\" ng-controller=\"LeftSidebar\" class=\"filterBar col-md-3 sidebar-offcanvas\" id=\"sideBar\">\n" +
    "            <p class=\"pull-right visible-xs sidebarToggle\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-xs\" data-toggle=\"offcanvas\">&nbsp;<i class=\"icon-caret-left\"></i>&nbsp;&nbsp;</button>\n" +
    "            </p>\n" +
    "            <div class=\"bookshelves\">\n" +
    "                <h4>Bookshelves</h4>\n" +
    "                <div><a class=\"bookshelfItem\" href=\"\" ng-click=\"filterShelf('')\">All Books</a></div>\n" +
    "                <div><div ng-class=\"{activeFilter: currentShelf == 'Featured'}\"><a class=\"bookshelfItem\" href=\"\" ng-click=\"filterShelf('Featured')\">Featured</a></div></div>\n" +
    "                <div><div ng-class=\"{activeFilter: currentShelf == '$recent'}\"><a class=\"bookshelfItem\" href=\"\" ng-click=\"filterShelf('$recent')\">New Arrivals</a></div></div>\n" +
    "                <div><div ng-class=\"{activeFilter: currentShelf == '$myUploads'}\">\n" +
    "                    <a class=\"bookshelfItem\" href=\"\" ng-click=\"filterMyUploads()\" ng-class=\"{disabled:!isLoggedIn}\" tooltip=\"Log in to enable\" tooltip-placement=\"right\" tooltip-trigger=\"{{{false: 'mouseenter', true: 'never'}[isLoggedIn]}}\">My Uploads</a></div></div>\n" +
    "            </div>\n" +
    "            <div class=\"narrowSearch\">\n" +
    "                <h4>Narrow Search</h4>\n" +
    "                <h5>Languages</h5>\n" +
    "                <div ng-repeat=\"lang in topLanguages\"><div ng-class=\"{activeFilter: currentLang == lang.isoCode}\"><a class=\"languageItem\" href=\"\" ng-click=\"filterLanguage(lang.isoCode,lang.name)\" tooltip=\"{{lang.englishName != lang.name ? lang.englishName : ''}}\" tooltip-placement=\"right\" tooltip-trigger=\"{{'mouseenter'}}\">{{lang.name}}</a><a class=\"clear right\" href=\"\" ng-click=\"filterLanguage('','')\">Clear</a></div></div>\n" +
    "                <div ng-show=\"otherLanguages.length\">\n" +
    "                    <a href=\"\" ng-click=\"toggleVisibilityOfOtherLanguages($event)\">{{localizeMore(otherLanguages.length,otherLanguagesHidden)}}</a>\n" +
    "                    <div style=\"display:none\">\n" +
    "                        <div ng-repeat=\"lang in otherLanguages\"><div ng-class=\"{activeFilter: currentLang == lang.isoCode}\"><a class=\"languageItem\" href=\"\" ng-click=\"filterLanguage(lang.isoCode,lang.name)\" tooltip=\"{{lang.englishName != lang.name ? lang.englishName : ''}}\" tooltip-placement=\"right\" tooltip-trigger=\"{{'mouseenter'}}\">{{lang.name}}</a><a class=\"clear right\" href=\"\" ng-click=\"filterLanguage('','')\">Clear</a></div></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div ng-repeat=\"category in tagCategories\">\n" +
    "                    <div ng-show=\"tags[category.id].top.length\">\n" +
    "                        <h5>{{category.displayName}}</h5>\n" +
    "                        <div ng-repeat=\"tag in tags[category.id].top\"><div ng-class=\"{activeFilter: currentTag == tag.id}\"><a class=\"tagItem\" href=\"\" ng-click=\"filterTag(tag.id)\">{{tag.displayName}}</a><a class=\"clear right\" href=\"\" ng-click=\"filterTag('')\">Clear</a></div></div>\n" +
    "                        <div ng-show=\"tags[category.id].other.length\">\n" +
    "                            <a href=\"\" ng-click=\"toggleVisibilityOfOtherTopics($event)\">{{localizeMore(tags[category.id].other.length,otherTopicsHidden)}}</a>\n" +
    "                            <div style=\"display:none\">\n" +
    "                                <div ng-repeat=\"tag in tags[category.id].other\"><div ng-class=\"{activeFilter: currentTag == tag.id}\"><a class=\"tagItem\" href=\"\" ng-click=\"filterTag(tag.id)\">{{tag.displayName}}</a><a class=\"clear right\" href=\"\" ng-click=\"filterTag('')\">Clear</a></div></div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"rightContainer col-sm-8 col-md-9\">\n" +
    "            <p class=\"pull-left visible-xs sidebarToggle\" id=\"sidebarToggleClosed\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-xs\" data-toggle=\"offcanvas\">Filters <i class=\"icon-caret-right\"></i></button>\n" +
    "            </p>\n" +
    "            <div class=\"mainContent\">\n" +
    "                <div class=\"container-fluid\">\n" +
    "                    <div class=\"searchRow row\">\n" +
    "                        <div class=\"col-md-6\" style=\"padding-bottom:10px\">\n" +
    "                            <div ng-show=\"initialized\">\n" +
    "                                <div>{{bookMessage}}</div>\n" +
    "                                <div ng-show=\"numHiddenBooks || bookCount!=0\">\n" +
    "                                    <div class=\"space-after-book-message\"></div>\n" +
    "				    <div ng-show=\"numHiddenBooks\">{{hiddenBooksMessage}}  <a href=\"\" ng-click=\"toggleAllLicenses()\">{{hiddenBooksToggleMessage}}</a></div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div ng-show=\"!initialized\">Searching...</div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-6\" style=\"padding-bottom:10px\">\n" +
    "                            <form ng-submit=\"SearchNow()\">\n" +
    "                                <div class=\"input-group\">\n" +
    "                                    <input type=\"text\" ng-keypress=\"x()\" class=\"form-control border-inverse\" placeholder=\"Search title or tag\" ng-model=\"searchTextRaw\" />\n" +
    "                                    <span class=\"input-group-btn\">\n" +
    "                                        <button class=\"btn btn-inverse\" type=\"button\" ng-click=\"SearchNow()\"><i class=\"icon-search\"></i></button>\n" +
    "                                    </span>\n" +
    "                                </div>\n" +
    "                            </form>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div ng-hide=\"bookCount==0\">\n" +
    "                        <ul listview class=\"books row\" hide-if-empty=\"true\" item-count=\"bookCount\" page-items-function=\"getBookRange(first, itemsPerPage)\" page-count-tag=\"browseView\">\n" +
    "                            <!--<li class=\"col-xs-12 col-sm-4 col-md-2\" id=\"Li2\"-->\n" +
    "                            <li class=\"book col-md-6\" ng-repeat=\"book in visibleBooks\">\n" +
    "                                <!-- Was: ng-repeat=\"book in filteredBooks = (books | filter:matchingBooks) |  startFrom:(currentPage-1)*numPerPage  | limitTo:numPerPage\" -->\n" +
    "                                <!--                ng-click=\"viewBook(book)\"    >-->\n" +
    "                                <a ui-sref=\"browse.detail({bookId: book.objectId})\">\n" +
    "                                    <div class=\"imageContainer\">\n" +
    "                                        <img ng-src=\"{{book.baseUrl | makeThumbnailUrl}}\" />\n" +
    "                                    </div>\n" +
    "                                    <div class=\"bookInfo\">\n" +
    "                                        <!-- <a ui-sref=\"browse.detail({bookId: book.objectId})\">-->\n" +
    "                                        <h3 class=\"bookTitle notranslate\">{{book.title}}</h3>\n" +
    "                                        <!--</a>-->\n" +
    "                                        <!--<div class=\"secondRowAboutBook\">\n" +
    "                                        <div class=\"pages\">{{book.pageCount}} pages</div>\n" +
    "                                        </div>-->\n" +
    "                                        <div class=\"languages\" ng-show=\"book.langPointers.length\">\n" +
    "                                            <!--Languages:--> <span ng-repeat=\"lang in book.langPointers\">\n" +
    "                                                <!--<a class=\"languageName\" ng-href=\"http://www.ethnologue.com/language/{{lang.ethnologueCode}}\" target=\"_blank\">{{lang.name}}</a>-->\n" +
    "                                                {{lang.name}}<span ng-hide=\"$last\">, </span>\n" +
    "                                            </span>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"tags\" ng-show=\"book.tags.length\">\n" +
    "                                            <span class=\"tag\" ng-repeat=\"tag in book.tags\">{{tag | getDisplayName}}<span ng-hide=\"$last\">, </span></span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"unfloat\"></div>\n" +
    "                                </a>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/common/errorMessage.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/common/errorMessage.tpl.html",
    "<div class=\"errorMessage\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        An Error Occurred\n" +
    "        <div class=\"close\" ng-click=\"close()\">x</div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <p>Oops.  We're sorry, but it looks like the Bloom site is having a problem.</p>\n" +
    "        <p>This is probably a temporary connection issue.  Please try again in 1 or 2 minutes.</p>\n" +
    "        <div class=\"actions right\">\n" +
    "            <button type=\"button\" class=\"btn btn-primary\" ng-click=\"close()\">Close</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/common/pagecontrol.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/common/pagecontrol.tpl.html",
    "<div> <!--template must have one top-level element.-->\n" +
    "    <div ng-transclude></div> <!-- pulls in the body of what we are wrapping the list function around, from the caller -->\n" +
    "    <div class=\"unfloat\"></div>\n" +
    "    <div class=\"pagination\" ng-hide=\"noOfPages==1\"> <!-- The page index is a list inside a div (entirely hidden if only one page) -->\n" +
    "        <ul>\n" +
    "            <li class=\"previous\" ng-class=\"{disabled: currentPage == 1}\"><a href ng-click=\"prevPage()\">Prev</a></li> <!-- the previous page button -->\n" +
    "            <li class=\"page-number\" ng-repeat=\"n in pageButtons\" ng-class=\"{'active': n == currentPage, 'first': n == 1}\" ng-click=\"setPage()\"> <!-- repeat this for all page buttons -->\n" +
    "                <span ng-hide=\"n!= 0\">...</span> <!-- ellipsis is shown for 0 in pageButtons array, inserted where there is a gap -->\n" +
    "                <a href ng-hide=\"n==0\" ng-bind=\"n\">1</a> <!-- regular buttons appear when n is not zero. I dont know how the 1 becomes n. -->\n" +
    "            </li> <!-- end of the repeating li for items in pageButtons -->\n" +
    "            <li class=\"next\" ng-class=\"{disabled: currentPage == noOfPages}\"><a href ng-click=\"nextPage()\">Next</a></li> <!-- Next page button -->\n" +
    "        </ul>\n" +
    "    </div> <!-- ends page index -->\n" +
    "    <div class=\"single-page-spacer\" ng-hide=\"noOfPages>1\"></div>\n" +
    "    <div class=\"itemsPerPage\">Items per page:\n" +
    "        <select class=\"notranslate\" ng-model=\"itemsPerPage\"> <!-- items-per-page control -->\n" +
    "            <option selected value=\"10\">10</option>\n" +
    "            <option value=\"24\">24</option>\n" +
    "            <option value=\"50\">50</option>\n" +
    "            <option value=\"100\">100</option>\n" +
    "        </select>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/datagrid/confirmRelateDialog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/datagrid/confirmRelateDialog.tpl.html",
    "<div class=\"confirmRelateDialog\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <b><i>{{mainBook.title}}</i></b> Is Already Related To Other Books!\n" +
    "        <!--<a href=\"#\" class=\"close\" ng-click=\"close()>x</a>-->\n" +
    "        <div class=\"close\" ng-click=\"close()\">x</div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <div>A relationship already exists between <b><i>{{mainBook.title}}</i></b> and these other books:</div>\n" +
    "        <div class=\"notranslate\" ng-repeat=\"book in books\"><b><i>{{book.title}}</i></b> by {{book.uploader}}</div>\n" +
    "        <br>\n" +
    "        <div>If you want to incorporate all of these books into the current relationship, click \"Continue.\"</div>\n" +
    "        <div class=\"actions right\">\n" +
    "            <button type=\"button\" class=\"btn btn-primary\" ng-click=\"relateBooks()\">Continue</button>\n" +
    "            <button type=\"button\" class=\"btn\" ng-click=\"close()\">Cancel</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/datagrid/datagrid.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/datagrid/datagrid.tpl.html",
    "<div class=\"mainContent\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div ng-hide=\"isUserAdministrator\">This screen is intended for those managing groups of books.</div>\n" +
    "        <div class=\"gridStyle notranslate\" ui-grid=\"gridOptions\" ui-grid-pagination ui-grid-resize-columns ui-grid-edit ui-grid-cellNav ui-grid-auto-resize></div>\n" +
    "    </div>\n" +
    "    <script type=\"text/ng-template\" id=\"related-books-template\">\n" +
    "        <div class=\"notranslate\">\n" +
    "            <tags-input ng-model=\"row.entity.relBooks\" ng-focus=\"grid.appScope.popOut($event)\" ng-blur=\"grid.appScope.popIn($event)\"\n" +
    "                        placeholder=\"Add Related Book\"\n" +
    "                        template=\"book-info-tag-template\"\n" +
    "                        on-tag-added=\"grid.appScope.onRelatedBookAdded($tag, row.entity)\"\n" +
    "                        on-tag-removed=\"grid.appScope.saveBookRowRelationship(row.entity)\"\n" +
    "                        replace-spaces-with-dashes=\"false\"\n" +
    "                        add-from-autocomplete-only=\"true\">\n" +
    "                <auto-complete source=\"grid.appScope.autoCompleteBook($query, row.entity)\"\n" +
    "                               min-length=\"0\"\n" +
    "                               load-on-focus=\"true\"\n" +
    "                               load-on-empty=\"true\"\n" +
    "                               max-results-to-show=\"100\" style=\"z-index: 2000\"\n" +
    "                               select-first-match=\"true\" template=\"book-info-autocomplete-template\"></auto-complete>\n" +
    "            </tags-input>\n" +
    "        </div>\n" +
    "    </script>\n" +
    "    <script type=\"text/ng-template\" id=\"book-info-tag-template\">\n" +
    "        <span tooltip-html=\"true\"\n" +
    "              tooltip-placement=\"bottom\"\n" +
    "              tooltip-html-unsafe=\"Uploader: {{data.uploader}}<br>Languages: {{data.languages}}<br>{{data.copyright}}\">{{data.title}}</span>\n" +
    "        <a class=\"remove-button\" ng-click=\"$removeTag()\">&#10006;</a>\n" +
    "    </script>\n" +
    "    <script type=\"text/ng-template\" id=\"book-info-autocomplete-template\">\n" +
    "        <img ng-src=\"{{data.imgUrl}}\" height=\"70\" width=\"49\" style=\"float:left; width:49px; height:70px; padding-right:5px;\"/>\n" +
    "        <span style=\"word-wrap: break-word;\"><b><i>{{data.title}}</i></b></span>\n" +
    "        <br>\n" +
    "        <span>Uploader: {{data.uploader}}</span>\n" +
    "        <br>\n" +
    "        <span>Languages: {{data.languages}}</span>\n" +
    "        <br>\n" +
    "        <span>{{data.copyright}}</span>\n" +
    "    </script>\n" +
    "</div>");
}]);

angular.module("modules/detail/ccdialog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/detail/ccdialog.tpl.html",
    "<div class=\"ccdialog\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <div class=\"close\" ng-click=\"close()\">x</div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <div class=\"title\">{{book.license}}</div>\n" +
    "        <div class=\"license\">{{book.license | interpretCC}}</div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/detail/deleteDialog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/detail/deleteDialog.tpl.html",
    "<div class=\"deleteDialog\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        Are you sure?\n" +
    "        <!--<a href=\"#\" class=\"close\" ng-click=\"close()>x</a>-->\n" +
    "        <div class=\"close\" ng-click=\"close()\">x</div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <div class=\"delete-body\">If you continue, this version of the book <span class=\"bookName\">{{book.title}}</span> will be removed from BloomLibrary.org.\n" +
    "            There is no way to undo this except by uploading it again.</div>\n" +
    "        <div class=\"actions right delete-actions\">\n" +
    "            <button type=\"button\" class=\"btn\" ng-click=\"deleteBook()\">Permanently delete this book</button>\n" +
    "            <button type=\"button\" class=\"btn btn-primary\" ng-click=\"close()\">Cancel</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/detail/detail.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/detail/detail.tpl.html",
    "<div class=\"modal-dialog\"> \n" +
    "<!-- \"modal-___\" are bootstrap classes used to create the modal look -->\n" +
    "<!-- We explicitly use these classes for all the pages which look like modals but aren't -->\n" +
    "<!-- such as Log In, Sign Up, Here It Comes, and the download preflight -->\n" +
    "<div class=\"modal-content\">\n" +
    "<div class=\"detail\">\n" +
    "    <div class=\"modal-header\"></div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <img ng-src=\"{{book.baseUrl | makeDetailSizedThumbnailUrl}}\" />\n" +
    "        <div class=\"detailCol2\">\n" +
    "            <div class=\"title notranslate\">{{book.title}}</div>\n" +
    "            <div class=\"summary\" ng-hide=\"!book.summary\"><span class=\"fori18n\">Summary:</span> <span class=\"notranslate\">{{book.summary}}</span></div>\n" +
    "            <div class=\"detailPages\"><span class=\"fori18n\">Pages:</span> <span class=\"notranslate\">{{book.pageCount}}</span></div>\n" +
    "            <div class=\"languages\" ng-show=\"book.langPointers.length\">\n" +
    "                <span class=\"fori18n\">Languages:</span> <span ng-repeat=\"lang in book.langPointers\"><a ng-href=\"http://www.ethnologue.com/language/{{lang.ethnologueCode}}\" target=\"_blank\">{{lang.name}}</a><span ng-hide=\"$last\">, </span></span>\n" +
    "            </div>\n" +
    "            <div class=\"copyright\">{{book.copyright}}</div>\n" +
    "            <div class=\"license\">\n" +
    "                <span class=\"fori18n\">License:</span> <span class=\"notranslate\"> <a href=\"javascript:void(null);\" ng-click=\"showLicense()\">{{book.license}}</a><span ng-hide=\"!book.licenseNotes\">. (</span>{{book.licenseNotes}}<span ng-hide=\"!book.licenseNotes\">)</span></span>\n" +
    "            </div>\n" +
    "            <!--div class=\"credits\">{{book.credits  }}</div-->\n" +
    "            <div class=\"status\">\n" +
    "                <!-- Don't use updatedAt here because it is changed by things other than uploading, for example, when the librarian adds a tag (BL-2737). -->\n" +
    "                <span class=\"fori18n\">Uploaded:</span> <span class=\"notranslate\">{{book.createdAt | cleanDate}}</span> <span class=\"fori18n\">by</span>\n" +
    "                <span class=\"notranslate\">\n" +
    "                    <a ng-show=\"canReportViolation\" href=\"mailto:{{book.uploader.email}}?subject=A%20request%20about%20a%20book%20you%20contributed%20to%20bloomlibrary.org:%20{{book.title}}%20({{book.objectId}})&body=This%20book%20may%20be%20found%20at%20{{location}}.\">{{book.uploader.email | obfuscate}}</a>\n" +
    "                    <a ng-hide=\"canReportViolation\" href=\"\" ng-click=\"showPleaseLogIn()\">{{book.uploader.email | obfuscate}}</a>\n" +
    "                 </span>\n" +
    "            </div>\n" +
    "            <div class=\"tags\" ng-show=\"book.tags.length\">\n" +
    "                <span class=\"fori18n\">Tags:</span> <span ng-repeat=\"tag in book.tags\"><i class=\"icon-tag\" tx-content=\"exclude\"></i><span tx-content=\"include\">{{tag | getDisplayName}}</span> </span>\n" +
    "            </div>\n" +
    "            <div class=\"relatedBooks\" ng-show=\"book.relatedBooks\">\n" +
    "                <span class=\"fori18n\">Related Books:</span> <span class=\"notranslate\" ng-repeat=\"relBook in book.relatedBooks\"><a ui-sref=\"browse.detail({bookId: relBook.objectId})\">{{relBook.title}}</a><span ng-hide=\"$last\">, </span></span>\n" +
    "            </div>\n" +
    "            <div class=\"unfloat\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"actions\">\n" +
    "            <a ng-hide=\"canReportViolation\" href=\"\" ng-click=\"showPleaseLogIn()\"><i tooltip=\"Report violation of this site's terms of use\" tooltip-placement=\"right\" class=\"abuseIcon\"></i></a>\n" +
    "            <a ng-show=\"canReportViolation\" href=\"mailto:abuse@bloomlibrary.org?subject=Reporting%20a%20violation%20of%20bloomlibrary.org%20terms%20of%20use%20for%20the%20book:%20{{book.title}}%20({{book.objectId}})&body=Please%20edit%20this%20message%20and%20explain%20clearly%20how%20this%20book%20violates%20the%20bloomlibrary.org%20terms%20of%20use.%0D%0AFor%20example:%0D%0A\n" +
    "%20%20-%20the%20content%20of%20this%20book%20could%20harm%20people%0D%0A%20%20-%20this%20book%20was%20posted%20without%20the%20copyright%20holder's%20permission.%0D%0AThis%20book%20may%20be%20found%20at%20{{location}}.\"><i tooltip=\"Report violation of this site's terms of use\" tooltip-placement=\"right\" class=\"abuseIcon\"></i></a>\n" +
    "            <a href=\"\" ng-click=\"showDeleteDialog()\"><i tooltip=\"Delete this book\" tooltip-placement=\"right\" ng-class=\"{'icon-trash': true, 'icon-hidden':!canDeleteBook}\"></i></a>\n" +
    "            <a href=\"\" ng-click=\"chooseBookshelves()\"><i tooltip=\"Add/Remove book from bookshelf\" tooltip-placement=\"right\" ng-class=\"{'icon-folder-open': true, 'icon-hidden':!canSetBookshelf, inBookshelf: isBookFeatured}\"></i></a>\n" +
    "            <div class=\"pull-right\">\n" +
    "            <!-- I have no idea why, but without ng-click (even though it is empty), the setting of preview=true in the url in the pdfoverlay directive (in app.js) doesn't work -->\n" +
    "            <a ng-href=\"{{book.baseUrl | makePreviewUrl}}\" overlayTitle=\"{{book | previewLangInfo}}\" ng-click=\"\" pdfoverlay analytics-on analytics-event=\"Preview\" analytics-book=\"{{book.objectId}}\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\"><i class=\"notranslate\" class=\"icon-eye-open\"></i> Preview</button></a>\n" +
    "            <!--<a ng-href=\"downloadBook{{book.bookOrder}}\" tooltip=\"No-Preflight Download to the Bloom software on your computer, so that you can use it as a shell book.\" ng-hide=\"!skipDownloadPreflight\">-->\n" +
    "                <!--<button type=\"button\" class=\"btn btn-default\" ng-click=\"close()\"><i class=\"icon-download\"></i> Open in Bloom</button></a>-->\n" +
    "            <a ui-sref=\"browse.detail.downloadBook.preflight\" tooltip=\"Download to the Bloom software on your computer, so that you can use it as a shell book.\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\"><i class=\"notranslate\" class=\"icon-download\"></i> Open in Bloom</button>\n" +
    "            </a>\n" +
    "            <a ui-sref=\"browse\">\n" +
    "                <button id=\"OK\" type=\"button\" class=\"btn btn-primary\">Return to the Library</button>\n" +
    "            </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "     </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>");
}]);

angular.module("modules/download/hereItComes.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/download/hereItComes.tpl.html",
    "\n" +
    "<div class=\"modal-dialog\">\n" +
    "  <div class=\"modal-content\">\n" +
    "    <div class=\"modal-body\">\n" +
    "      <h1>Here it comes!</h1>\n" +
    "      <P>Bloom should run, download the book, and allow you to add it to your collection.</P>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\"><a ui-sref=\"browse.detail.downloadBook.preflight\" class=\"pull-left\">Try downloading it again</a><a ui-sref=\"browse\" class=\"pull-right\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary\">Return to the Library</button></a></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/download/preflight.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/download/preflight.tpl.html",
    "\n" +
    "<div class=\"modal-dialog\">\n" +
    "  <div class=\"modal-content\">\n" +
    "    <div class=\"modal-body\">\n" +
    "      <div>\n" +
    "        <h1>Almost there...</h1>\n" +
    "        <P>You are about to download <span class=\"downloadTitle\">{{book.title}}</span> into the Bloom Desktop Application. You need to have&nbsp;<a href=\"/installers\">Bloom version 2 or higher</a> already installed on your computer.\n" +
    "        </P>\n" +
    "        <input type=\"checkbox\" ng-model=\"skipDownloadPreflight\"/>\n" +
    "        <!--fixme: clicking this doesn't update the checkbox:  a(ng-model='skipDownloadPreflight') I get it. Don't show me this again.-->I get it. Don't show me this again.\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\"><a ng-click=\"cancel()\" class=\"cancelBookDownload\">Cancel</a>\n" +
    "        <!--This comment forces some whitespace between anchors which prevents strange line on hover--><a ui-sref=\"browse.detail.downloadBook.hereItComes\">\n" +
    "          <button id=\"Continue\" type=\"button\" class=\"btn btn-primary\">Download Book</button></a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/inProgress/inProgress.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/inProgress/inProgress.tpl.html",
    "<div class=\"inProgress\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        Not implemented yet\n" +
    "        <!--<a href=\"#\" class=\"close\" ng-click=\"close()>x</a>-->\n" +
    "        <div class=\"close\" ng-click=\"close()\">x</div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <div class=\"\">Sorry, most links in the \"Bookshelves\" and \"Narrow Search By\" features don't actually work yet, they are just there to show you what's coming.\n" +
    "            The 'Featured' link works, and you can also enter key words into the search box to match words in titles and tags.</div>\n" +
    "        <div class=\"actions right\">\n" +
    "            <button type=\"button\" class=\"btn  btn-primary\" ng-click=\"close()\">Close</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/installers/installers.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/installers/installers.tpl.html",
    "\n" +
    "<div class=\"staticPage\">\n" +
    "  <html>\n" +
    "    <head>\n" +
    "      <title>Bloom installation instructions</title>\n" +
    "      <meta content=\"text/html; charset=UTF-8\" http-equiv=\"content-type\"/>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "      <h2>Bloom Installers</h2>\n" +
    "      <iframe src=\"http://bloomlibrary.org/channels/DownloadPointers_Release.htm\" frameborder=\"0\" scrolling=\"no\" class=\"download-version-frame\"></iframe>\n" +
    "      <div class=\"versionNotes\">Requires Windows Vista SP1, 7 SP1, 8, 8.1, or 10 and&nbsp;<a href=\"http://www.microsoft.com/en-us/download/details.aspx?id=40779\">.NET 4.5</a>&nbsp;(part of Windows, so you probably already have it). NOT usable on Windows XP (but you can still use 3.0, see below.) Uninstall Version 1, 2, or 3.0 of Bloom before installing this. Older Windows Versions are&nbsp;<a href=\"/installers/old\">here.</a>&nbsp;Administrators can install into Program Files via --allUsers argument (also supports --silent).\n" +
    "      </div>\n" +
    "      <p></p>\n" +
    "      <iframe src=\"http://bloomlibrary.org/channels/DownloadPointers_Beta.htm\" frameborder=\"0\" scrolling=\"no\" class=\"download-version-frame\"></iframe>\n" +
    "      <div class=\"versionNotes\">Requires Windows Vista SP1, 7 SP1, 8, 8.1, or 10 and&nbsp;<a href=\"http://www.microsoft.com/en-us/download/details.aspx?id=40779\">.NET 4.5</a>&nbsp;(part of Windows, so you probably already have it). NOT usable on Windows XP (but you can still use 3.0, see below.) Uninstall Version 1, 2, or 3.0 of Bloom before installing this. Older Windows Versions are&nbsp;<a href=\"/installers/old\">here.</a>&nbsp;Administrators can install into Program Files via --allUsers argument (also supports --silent).\n" +
    "        <p>Can be installed alongside the Release version, for testing purposes.</p>\n" +
    "      </div>\n" +
    "      <iframe src=\"http://bloomlibrary.org/channels/DownloadPointers_XP.htm\" frameborder=\"0\" scrolling=\"no\" class=\"download-version-frame\"></iframe>\n" +
    "      <div class=\"versionNotes\">This older version can still be used on Windows XP SP3 with&nbsp;<a href=\"http://www.microsoft.com/en-us/download/details.aspx?id=17718&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNF8zPaQaiipP4wEHEmHtf24xnaVCA\">.NET 4.0</a>&nbsp;(part of Windows, so you probably already have it). Uninstall Version 1 or 2 before installing this.\n" +
    "      </div>\n" +
    "      <div class=\"linux\">\n" +
    "        <div class=\"label\">Linux</div>\n" +
    "        <div class=\"versionNotes\">Installation Instructions&nbsp;<a href=\"/installers/linux\">here.</a>&nbsp;\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <p></p>\n" +
    "      <h2>The Art of Reading</h2>\n" +
    "      <p>We also recommend that you download and install the&nbsp;<a href=\"/artofreading\">Art Of Reading</a>&nbsp;illustration collection. This free collection contains more than 10,000 line drawings suitable for use in reading materials. Bloom is designed to enable you to search and select illustrations from this collection once you have installed it.\n" +
    "      </p>\n" +
    "      <h2>Fonts</h2>\n" +
    "      <p>Bloom installs SIL&rsquo;s&nbsp;<a href=\"http://software.sil.org/andika/\">Andika New Basic</a>&nbsp;font which was designed specifically for easier reading in roman scripts.</p>\n" +
    "      <p>You can also use a font you already have installed on your computer, but it needs to be a Unicode font. Note that some fonts don't have built-in italics or bold faces. These will look fine on screen, but will not show bold or italics in print or in PDFs.</p>\n" +
    "      <p>SIL offers free Unicode fonts for a variety of needs:</p>\n" +
    "      <ul>\n" +
    "        <li><a href=\"http://software.sil.org/andika/\">Andika</a>, designed for literacy materials, especially for beginning readers.&nbsp;<a href=\"http://scripts.sil.org/Andika_New_Basic#AvsANB\">Andika covers a wide range of characters</a>&nbsp;that Andika New Basic does not, but it will not show bold or italics in print or PDF.\n" +
    "        </li>\n" +
    "        <li><a href=\"http://software.sil.org/annapurna/\">Annapurna</a>, for languages that use Devanagari script</li>\n" +
    "        <li><a href=\"http://scripts.sil.org/cms/scripts/page.php?item_id=Scheherazade\">Scheherezade</a>, an extended Arabic script font</li>\n" +
    "        <li><a href=\"http://software.sil.org/abyssinica/\">Abyssinica</a>, an Ethiopic script font (also sometimes called &ldquo;fidel&rdquo;\n" +
    "          script)\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <p>If you're having trouble finding a font for your language, check out&nbsp;<a href=\"http://scriptsource.org/\">ScriptSource.</a>&nbsp;\n" +
    "      </p>\n" +
    "      <h2>Typing</h2>\n" +
    "      <p>Bloom assumes that you already have a way to type your language on your computer. If you need a way to type your language and lack one, check out&nbsp;<a href=\"http://scriptsource.org\">ScriptSource</a>&nbsp;. On Windows you might consider&nbsp;<a href=\"http://keyman.com/desktop/download.php\">Keyman</a>, available in a free edition.\n" +
    "      </p>\n" +
    "      <h2><a></a>Help getting started and learning Bloom</h2>\n" +
    "      <p>Bloom is easy to use, but you may find it helpful to watch the&nbsp;<a href=\"http://tiny.cc/bloomVimeo\">Bloom training videos</a>. Start with&nbsp;<a href=\"https://vimeo.com/channels/bloomlibrary\">Bloom: who is it for?</a></p>\n" +
    "      <p>\n" +
    "        You can download all the Bloom training videos to your computer so that you can share them with people who don't have good or inexpensive internet connections.\n" +
    "        &nbsp;<a href=\"http://tiny.cc/bloomHDVideos\">High-resolution videos</a>&nbsp;or&nbsp;<a href=\"http://tiny.cc/bloomSDVideos\">Low-resolution videos (smaller files)</a>\n" +
    "      </p>\n" +
    "    </body>\n" +
    "  </html>\n" +
    "</div>");
}]);

angular.module("modules/installers/linux.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/installers/linux.tpl.html",
    "<div class=\"staticPage\"><H2>Getting Bloom On Linux</H2><P>A<strong> beta release</strong> of Bloom 3.1 is currently available for Ubuntu Precise and Trusty.  It can also be installed on Wasta12 or Wasta14. You are welcome to try other versions but we cannot promise to support them.</P><H3>Step 1: Add the SIL experimental repository to your system</H3><H4>(for precise or wasta12):</H4><pre>sudo echo have sudo</pre><pre>wget -qO - http://packages.sil.org/sil.gpg | sudo apt-key add -</pre><pre>sudo add-apt-repository \"deb http://packages.sil.org/ubuntu precise main\"</pre><pre>sudo add-apt-repository \"deb http://packages.sil.org/ubuntu precise-experimental main\"</pre><pre>sudo apt-get update</pre><pre>sudo apt-get dist-upgrade</pre><H4>(for trusty or wasta14):</H4><pre>sudo echo have sudo</pre><pre>wget -qO - http://packages.sil.org/sil.gpg | sudo apt-key add -</pre><pre>sudo add-apt-repository \"deb http://packages.sil.org/ubuntu trusty main\"</pre><pre>sudo add-apt-repository \"deb http://packages.sil.org/ubuntu trusty-experimental main\"</pre><pre>sudo apt-get update</pre><pre>sudo apt-get dist-upgrade</pre><H3>Step 2: Add Bloom Desktop Unstable (the Beta)</H3><pre>sudo apt-get install bloom-desktop-unstable</pre><H3>Step 3: Launch the Application from the Application Dashboard or from a Terminal window.</H3><pre>bloom</pre></div>");
}]);

angular.module("modules/installers/oldInstallers.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/installers/oldInstallers.tpl.html",
    "\n" +
    "<div ng-controller=\"InstallersCtrl\" class=\"staticPage\">\n" +
    "  <h3>All Bloom Installers</h3>\n" +
    "  <div ng-repeat=\"file in files\" class=\"row\">\n" +
    "    <div class=\"col-md-3\"><a ng-href=\"{{file.url}}\" analytics-on=\"analytics-on\" analytics-event=\"Download Installer\" analytics-installer=\"{{file.name}}\">{{file.name}}</a></div>\n" +
    "    <div class=\"col-md-3\">{{file.date | date:'dd/MMM/yyyy'}}</div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/login/login.tpl.html",
    "<div class=\"loginRoot\"> <!-- uses many classes from signup.less for consistency-->\n" +
    "    <form ng-submit=\"login()\" name=\"loginform\">\n" +
    "        <div class=\"modal-dialog\">\n" +
    "            <div class=\"modal-content\">\n" +
    "                <div class=\"modal-body\">\n" +
    "                    <h2>Log In</h2>\n" +
    "                    <div class=\"input-wrapper\">\n" +
    "                        <label for=\"usernm\">Email Address</label>\n" +
    "                        <input class=\"userNameInput\" id=\"usernm\" spellcheck=\"false\" required type=\"email\" name=\"usernm\" ng-model=\"username\" placeholder=\"Enter your email address\" focus-on-load />\n" +
    "                    </div>\n" +
    "                    <div class=\"input-wrapper\">\n" +
    "                        <div class=\"password\">\n" +
    "                            <div><label class=\"passwordLabel\">Password</label></div>\n" +
    "                            <div>\n" +
    "                                <input class=\"passwordInput\" spellcheck=\"false\" required type=\"text\" name=\"shown password\" ng-model=\"password\" placeholder=\"Enter your password\" ng-show=\"showPassword\" />\n" +
    "                                <input class=\"passwordInput\" required type=\"password\" name=\"password\" ng-model=\"password\" placeholder=\"Enter your password\" ng-show=\"!showPassword\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"showPassword\"><div class=\"showPassInput\"><input type=\"checkbox\" ng-model=\"showPassword\">Show password</input></div></div>\n" +
    "                    </div>\n" +
    "                    <div id=\"forgot\">\n" +
    "                        <a class=\"resetPw\" ng-click=\"resetPassword()\">Forgot password?</a>\n" +
    "                    </div>\n" +
    "                    <div class=\"loginButton\"><button class=\"btn btn-primary signupBtn\" type=\"submit\">Log In</button></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("modules/login/mustAgree.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/login/mustAgree.tpl.html",
    "<div class=\"mustAgree\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        Please agree to terms of use\n" +
    "        <div class=\"close\" ng-click=\"close()\">x</div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <div>In order to sign up for a BloomLibrary.org account, you must check the box indicating that you agree to the BloomLibrary Terms of Use.</div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <div class=\"actions right\">\n" +
    "            <button type=\"button\" class=\"btn btn-primary\" ng-click=\"close()\">Close</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/login/pleaseLogIn.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/login/pleaseLogIn.tpl.html",
    "<div class=\"pleaseLogIn\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        Please Log In\n" +
    "        <!--<a href=\"#\" class=\"close\" ng-click=\"close()>x</a>-->\n" +
    "        <div class=\"close\" ng-click=\"close()\">x</div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <div>To use this function, please <a href=\"/login\">Log In to BloomLibrary.org</a>.</div>\n" +
    "        <div>Bloom Library requires you to log in for several reasons:</div>\n" +
    "        <ul>\n" +
    "            <li>To search for books you uploaded, so we know whose books to search for.</li>\n" +
    "            <li>For actions that send an email, to make things harder for spammers.</li>\n" +
    "            <li>For uploading books, because we need to know who is responsible for putting the book on our site.</li>\n" +
    "            <li>For deleting books, because you can only delete the ones you contributed.</li>\n" +
    "        </ul>\n" +
    "        <div class=\"actions right delete-actions\">\n" +
    "            <button type=\"button\" class=\"btn  btn-primary\" ng-click=\"close()\">Close</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/prefs/prefs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/prefs/prefs.tpl.html",
    "\n" +
    "<div class=\"staticPage\">\n" +
    "  <form ng-submit=\"savePrefs(record)\" role=\"form\"><br/>\n" +
    "    <div class=\"checkbox\">\n" +
    "      <label>\n" +
    "        <input type=\"checkbox\" ng-model=\"record.trackLiveAnalytics\" ng-checked=\"isTrackLiveAnalytics\"/>&nbsp;Track normal analytics on the live web site (bloomlibrary.org) -- Do not divert to the \"development\" (sandbox) analytics project\n" +
    "      </label>\n" +
    "    </div><br/>\n" +
    "    <button type=\"submit\" ng-disabled=\"submitting || !record\" class=\"btn btn-primary\">Submit</button>\n" +
    "  </form>\n" +
    "</div>");
}]);

angular.module("modules/signup/signup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/signup/signup.tpl.html",
    "<div ng-app=\"signup\" ng-cloak>\n" +
    "    <div ng-controller=\"SignupCtrl\" class=\"signup\">\n" +
    "        <form ng-disabled=\"userRegistered\" ng-submit=\"createUser(record)\" id=\"userForm\">\n" +
    "            <div class=\"modal-dialog\">\n" +
    "                <div class=\"modal-content\">\n" +
    "                    <div class=\"modal-body\">\n" +
    "                        <h2>Sign Up</h2>\n" +
    "                            <div class=\"input-wrapper\">\n" +
    "                                <div>\n" +
    "                                    <label>Email Address</label>\n" +
    "                                    <input required type=\"email\" class=\"userNameInput\"\n" +
    "                                           placeholder=\"Enter your email address\" ng-model=\"record.email\"\n" +
    "                                           name=\"email\" id=\"email\" ng-blur=\"checkUserAccount()\" focus-on-load />\n" +
    "                                    <span ng-show=\"userNameLoading\"><img id=\"userNameLoading\" src=\"assets/loading-small.gif\" class=\"input-icon\" /></span>\n" +
    "                                    <span ng-show=\"userNameOk\"><img id=\"userNameOk\" src=\"assets/tick.png\" class=\"input-icon\" title=\"User name is available!\" /></span>\n" +
    "                                    <span ng-show=\"userNameExists\"><img id=\"userNameExists\" src=\"assets/exclamation.png\" class=\"input-icon\" title=\"User name already exists!\" /></span>\n" +
    "                                </div>\n" +
    "                                <div ng-show=\"userNameExists\" style=\"color:red\">We already have an account with this address.  Would you like to <a href=\"/login\">login</a>?</div>\n" +
    "                            </div>\n" +
    "                            <div class=\"mandatoryfields input-wrapper\">\n" +
    "                                If you can see this, do not fill in the following text field\n" +
    "                                <input type=\"text\" name=\"name\" ng-model=\"record.mandatoryfields\" />\n" +
    "                            </div>\n" +
    "                            <div class=\"input-wrapper\">\n" +
    "                                <div class=\"password\">\n" +
    "                                    <label>Password</label>\n" +
    "                                    <input class=\"passwordInput\" placeholder=\"Choose your password\" required type=\"text\"\n" +
    "                                           ng-model=\"record.password\" name=\"shown password\" ng-show=\"showPassword\" />\n" +
    "                                    <input class=\"passwordInput\" placeholder=\"Choose your password\" required type=\"password\"\n" +
    "                                           ng-model=\"record.password\" name=\"password\" ng-show=\"!showPassword\" />\n" +
    "                                </div>\n" +
    "                                <div class=\"showPassword\"><div class=\"showPassInput\"><input type=\"checkbox\" ng-model=\"showPassword\"><span>Show password</span></div></div>\n" +
    "                            </div>\n" +
    "                            <div class=\"agreeTerms\"><input type=\"checkbox\" name=\"agree\" ng-model=\"agreeToTerms\"><span>I agree to the Bloom Library's <a href=\"/terms\" target=\"_blank\">Terms of Use</a>.</span></div>\n" +
    "                            <div id=\"hpot\">\n" +
    "                                <label for=\"notHuman\">Leave this field blank</label>\n" +
    "                                <input type=\"text\" name=\"notHuman\" id=\"notHuman\" ng-model=\"record.notHuman\">\n" +
    "                            </div>\n" +
    "                            <div></div>\n" +
    "                            <div class=\"signupButton\">\n" +
    "                                <button id=\"submit\" class=\"btn btn-primary signupBtn\" type=\"submit\"\n" +
    "                                        ng-disabled=\"submitting || userNameLoading || userNameExists || userForm.$invalid\">\n" +
    "                                    Sign Up <i style=\"margin-left: 5px\" class=\"icon-thumbs-up\"></i>\n" +
    "                                </button>\n" +
    "                            </div>\n" +
    "                     </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/static/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/static/about.tpl.html",
    "<div class=\"staticPage\"><h3>Team</h3>Our team is constantly changing, with each version created by a slightly different group. Here are all the people that have ever worked on Bloom:<p>Eberhard Beilharz&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Linux Programming</p><p>John Hatton&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Program Manager, UX Design, Programming</p><p>Phil Hopper&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Programming</p><p>Marlon Hovland&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Documentation</p><p>Susanna Imrie&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Training Videos</p><p>Gordon Martin&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Programming</p><p>Steve McConnel&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Linux Programming</p><p>David Moore&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Linux Programming</p><p>Sue Newland&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Testing</p><p>Marvin Nichols&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Testing</p><p>Andrew Polk&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Programming</p><p>John Thomson&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Dev Lead, Programming</p><p>Len Wallstrom&nbsp;(<a href=\"http://sil.org\">SIL International</a>) :&nbsp;Testing</p><p>Bruce Cox & Jeremy Brown have contributed javascript code.</p><h3>Bloom relies on the following open source works of others:</h3><ul><li><a href=\"http://code.google.com/p/autofac/\">Autofac</a></li><li>Gecko embedded browser: Mozilla</li><li><a href=\"https://bitbucket.org/geckofx/geckofx\">GeckoFX</a> .NET wrapper around Gecko: Skybound Software, Tom Hindle (SIL International), and other contributors</li><li><a href=\"http://dotnetzip.codeplex.com/\">Iconic DotNetZip</a></li><li>JSON.net</li><li>LibTidy</li><li>ManagedTidy</li><li>NUnit</li><li><a href=\"http://ckeditor.com/\">CKEditor</a></li><li>Palaso Library: SIL International and&nbsp;<a href=\"http://palaso.org\">Payap Language Software</a>, Eric Albright (formerly of SIL)</li><li><a href=\"http://pdfsharp.com/PDFsharp/\">PdfSharp</a>: empira Software GmbH</li><li><a href=\"http://call.canil.ca\">SynPhony</a>: Norbert Rennert (SIL International)</li><li><a href=\"http://code.google.com/p/wkhtmltopdf\">wkhtmltoimage</a>: Jan Habermann, Christian Sciberras and Jakob Truelsen</li><li><a href=\"http://webfx.eae.net/\">WebFX</a></li><li><a href=\"https://github.com/KevinSheedy/jquery.alphanum\">jquery.alphanum</a></li><li><a href=\"https://github.com/quentint/long-press\">longpress</a>: Quentint</li><li><a href=\"https://github.com/squirrel/squirrel.windows\">squirrel</a></li><li><a href=\"https://github.com/readium/readium-js\">Readium</a></li><li><a href=\"https://github.com/CodeSeven/toastr\">toastr</a></li></ul><h3>Thanks</h3><p>To our colleagues who invested time in giving feedback and encouragement <em>before</em> Bloom became famous :-) Michael Cochran, Jon Coombs, David Coward, Paul Frank(<a href=\"http://www.sil-lead.org/\">SIL LEAD</a>), Suzanne Hatton, Hannes Hirzel, Cambell Prince, Glenys Waters</p><a href=\"http://BrowserStack.com\">BrowserStack</a>, for a free open-source subscription to their <strong>amazing</strong> multi-browser, multi-platform testing service.<p></p><p>JetBrains for free open-source license for&nbsp;<a href=\"http://www.jetbrains.com/resharper/\">Resharper</a>, which keeps our c# code clean and agile,&nbsp;<a href=\"http://build.palaso.org\">TeamCity</a>, which we use for continuous integration/builds, and&nbsp;<a href=\"http://www.jetbrains.com/webstorm/\">WebStorm</a>, for editing html and javascript, and&nbsp;<a href=\"https://www.jetbrains.com/youtrack/\">YouTrack</a>, where we keep bug reports.</p><p>Rally/Flowdock, for a free open-source license for&nbsp;<a href=\"https://www.flowdock.com\">FlowDock</a>, where we keep in touch all day even though we are distributed all over.</p></div>");
}]);

angular.module("modules/static/artofreading.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/static/artofreading.tpl.html",
    "<div class=\"staticPage\">\n" +
    "\n" +
    "    <h3>Art of Reading</h3>\n" +
    "\n" +
    "    <img class=\"left\" src=\"assets/chicken.png\" alt=\"\" width=\"164\" height=\"150\" />\n" +
    "\n" +
    "    <div><strong><em>The Art Of Reading Free Edition</em></strong> is an optional addition to <a href=\"http://wesay.palaso.org/\">WeSay</a> and <a href=\"/landing\">Bloom</a> that gives you easy access to over 10,000 black &amp; white illustrations from around the world.</div>\n" +
    "\n" +
    "    <br />\n" +
    "\n" +
    "    <div><a href=\"http://downloads.palaso.org/ArtOfReading/ArtOfReading3.1FreeSetup.exe\">Download Art Of Reading version 3.1 Installer</a> (302 Megabytes, for Microsoft Windows)</div>\n" +
    "\n" +
    "    <br />\n" +
    "    <div>For Linux, assuming you have followed the <a href=\"/installers/linux\">instructions for installing bloom on Linux</a>, you just need one more command:\n" +
    "    <pre>sudo apt-get install art-of-reading</pre></div>\n" +
    "\n" +
    "    <br />\n" +
    "\n" +
    "    <h5>Metadata</h5>\n" +
    "\n" +
    "    <div>A special feature of this package is that we have embedded, in the image files themselves, information on where they came from, what their license is, etc. This will allow programs to help you make sure you are using the images legally.</div>\n" +
    "\n" +
    "    <br />\n" +
    "\n" +
    "    <h5>Note</h5>\n" +
    "\n" +
    "    <div>This is not the full \"<a href=\"http://www.ethnologue.com/show_product.asp?isbn=9781556712418\">International Illustrations: The Art Of Reading</a>\". That product, which comes as a DVD, includes 3rd-party commercial software for finding the image you want. In contrast, the package offered here contains only the images themselves, and is only useful when used from a program that can help you find images (namely WeSay and Bloom).<div>\n" +
    "\n" +
    "</div><!-- /.container -->");
}]);

angular.module("modules/static/features.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/static/features.tpl.html",
    "<div class=\"staticPage\">\n" +
    "    <div class=\"container-fluid centeritems\">\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-6 col-md-4\">\n" +
    "                <img src=\"assets/shellbooks.png\" alt=\"Shell Books\">\n" +
    "                <h3>Shell Books</h3>\n" +
    "                <p>A growing collection of Creative Commons-licensed shell books help you grow your library quickly.  Just add a book to your vernacular library, then type in translations.</p>\n" +
    "            </div><!-- /.col-sm-6 col-md-4 -->\n" +
    "            <div class=\"col-sm-6 col-md-4\">\n" +
    "                <img src=\"assets/templatebooks.png\" alt=\"Template Books\">\n" +
    "                <h3>Template Books</h3>\n" +
    "                <p>Bloom isn't just for <em>shell</em> books. To create a brand new book, we use what Bloom calls a <em>template</em>. For most books, the \"Basic Book\" template is enough. It contains templates pages with the most frequently used layouts. There is also a Picture Dictionary template and Wall Calendar template.</p>\n" +
    "            </div><!-- /.col-sm-6 col-md-4 -->\n" +
    "            <div class=\"col-sm-6 col-md-4\">\n" +
    "                <img src=\"assets/pdfbooklets.png\" alt=\"Effortless PDF Booklets\">\n" +
    "                <h3>Effortless PDF Booklets</h3>\n" +
    "                <p>Click on Bloom's Publish tab, and voil&agrave;! You have a PDF file laid out as a booklet, ready for saving or printing.</p>\n" +
    "            </div><!-- /.col-sm-6 col-md-4 -->\n" +
    "            \n" +
    "            <div class=\"clearfix visible-md visible-lg\"></div>\n" +
    "            \n" +
    "            <div class=\"col-sm-6 col-md-4\">\n" +
    "                <img src=\"assets/multilingual.png\" alt=\"Multilingual Books\">\n" +
    "                <h3>Multilingual Books</h3>\n" +
    "                <p>For each box of text, Bloom stores text in any a number of languages.  You can then tell it to show one, two, or three of those languages to make monolingual, bilingual, or trilingual versions of the publication.</p>            \n" +
    "            </div><!-- /.col-sm-6 col-md-4 -->\n" +
    "            <div class=\"col-sm-6 col-md-4\">\n" +
    "                <img src=\"assets/allbooks.png\" alt=\"All your Books, a Click Away\">\n" +
    "                <h3>All your Books,<br>a Click Away</h3>\n" +
    "                <p>Bloom never asks you to find thing in the computer's file system. It just shows your library and books that you can add to it when you're ready.</p>\n" +
    "            </div><!-- /.col-sm-6 col-md-4 -->\n" +
    "            <div class=\"col-sm-6 col-md-4\">\n" +
    "                <img src=\"assets/artofreading.png\" alt=\"Pictures from the Art of Reading Collection\">\n" +
    "                <h3>Pictures from the<br>Art of Reading Collection</h3>\n" +
    "                <p>After you install our free Art Of Reading Collection, it's easy to find hand-drawn illustrations from around the world.</p>\n" +
    "            </div><!-- /.col-sm-6 col-md-4 -->\n" +
    "        </div><!-- /.row -->\n" +
    "\n" +
    "    </div><!-- /.container -->\n" +
    "</div><!-- /.staticPage -->");
}]);

angular.module("modules/static/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/static/home.tpl.html",
    "<div class=\"staticPage\">\n" +
    "	<!-- Carousel - text and images set in app.js -->\n" +
    "    <div ng-controller=\"CarouselCtrl\">\n" +
    "        <div>\n" +
    "            <carousel interval=\"myInterval\">\n" +
    "                <slide ng-repeat=\"slide in slides\" active=\"slide.active\">\n" +
    "                    <img ng-src=\"{{slide.image}}\" style=\"margin:auto;\">\n" +
    "                    <div class=\"carousel-caption\">\n" +
    "                        <p>{{slide.text}}</p>\n" +
    "                    </div>\n" +
    "                </slide>\n" +
    "            </carousel>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "	<!-- /Carousel -->\n" +
    "    \n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-6\"><iframe width=\"400\" height=\"300\" src=\"http://www.youtube.com/embed/TTQHODxqf4w?vq=hd720\" frameborder=\"0\" allowfullscreen></iframe></div>\n" +
    "            <div class=\"col-md-6\"><iframe class=\"right\" src=\"http://prezi.com/embed/benmszxl212z/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=no&amp;autohide_ctrls=0\" width=\"400\" height=\"300\" frameBorder=\"0\"></iframe></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"container-fluid mini-features\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <img src=\"assets/shellbookmini.png\"/>\n" +
    "                <h4>Shell Books</h4>\n" +
    "                <div>Bloom uses collections of \"shell books\" that come with multiple source languages. Read the ones you understand, type in a translation in your language, and you're done!</div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <img src=\"assets/templatemini.png\"/>\n" +
    "                <h4>Templates</h4>\n" +
    "                <div>Bloom comes with templates for Picture Dictionaries, Wall Calendars, and a \"Basic Book\" with template pages for the most common simple books.</div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <img src=\"assets/creative_commons.png\"/>\n" +
    "                <h4>Clear Intellectual Property Rights</h4>\n" +
    "                <div>Bloom helps authors and illustrators record copyright and select a license.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <h4>Multilingual Books</h4>\n" +
    "                <div>Toggle between monolingual, bilingual, and trilingual layouts.</div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <img src=\"assets/HTML5_Logo_32.png\"/>\n" +
    "                <h4>Open, Standard Format</h4>\n" +
    "                <div>Bloom books are based on the same formats as the Web and EPub Ebooks: HTML, Cascading Style Sheets, and Java Script.</div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <img src=\"assets/pdf.gif\"/>\n" +
    "                <h4>PDF Booklets</h4>\n" +
    "                <div>Click on Bloom's Publish tab, and voil&agrave;! You have a PDF file laid out as a booklet, ready for saving or printing.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>    \n" +
    "</div>");
}]);

angular.module("modules/static/landing/landing.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/static/landing/landing.tpl.html",
    "\n" +
    "<html>\n" +
    "  <head></head>\n" +
    "  <body>\n" +
    "    <div class=\"jumbotron\">\n" +
    "      <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"col-sm-6\">\n" +
    "            <div class=\"verticalCenter\">\n" +
    "              <h1>Let's Grow a Library</h1>\n" +
    "              <h3>Bloom makes it easy to create simple books and  translate them into multiple languages.</h3>\n" +
    "              <!--h3 Bloom is open source software that makes it easy for language groups to quickly produce their own library of books.-->\n" +
    "              <!--.pull-left-->\n" +
    "              <!--	a(href=\"/installers\")-->\n" +
    "              <!--		button.btn.download-btn.btn-large Visit Book Library-->\n" +
    "              <!--.pull-right-->\n" +
    "              <!--	a(href=\"/installers\")-->\n" +
    "              <!--		button.btn.download-btn.btn-large Download Bloom-->\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"col-sm-6\"><img src=\"assets/huyagirls.jpg\"/></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"landing\">\n" +
    "      <div class=\"section\">\n" +
    "        <div class=\"container\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-md-6\">\n" +
    "              <H1>Goal: 10x More Books</H1>\n" +
    "              <P>Here's the problem Bloom addresses: when working in local-language literacy projects, we end up settling for what is practical, instead of what is actually needed. The hope is often that a primer and a handful of books will be enough to open up the joy and power of reading in minority language communities. But realistically, we know that it takes <i>stacks</i> of titles to make reading worthwhile and give the practice needed to develop true literacy. The problem has been who will make all those books? How will we find the time? Where will we get the content? So we settle for the possible and hope for the best.</P>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-3 pull-right\"><a href=\"/browse\">\n" +
    "                <button class=\"btn download-btn btn-large\">Visit Book Library</button></a><a href=\"/installers\">\n" +
    "                <button class=\"btn download-btn btn-large\">Download Bloom</button></a></div>\n" +
    "            <!--	img(src=\"assets/laptop.png\").videoInvitation-->\n" +
    "            <!--	a.iconfont-playvideo.play-desktop(data-height=\"500\" data-width=\"900\" data-url=\"http://www.youtube.com/watch?v=TTQHODxqf4w?rel=0&amp;autoplay=1&amp;controls=1&amp;showinfo=0&amp;color=white\" href=\"http://youtu.be/UpPRxtVsZKI\" target=\"_blank\")-->\n" +
    "            <!--	//img(src=\"assets/editing.png\")-->\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"section\">\n" +
    "        <div class=\"container\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-md-6 pull-left\">\n" +
    "              <H1>Build Local Capacity</H1>\n" +
    "              <P>Bloom dramatically lowers the bar, so that many more people can get involved in building a large collection of local language books. Bloom was designed with new computer users in mind, and it has special features to guide them in simple book making, so people need far less training than alternatives such as Word, Publisher, or In Design.</P>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4 pull-right customerQuote\">\n" +
    "              <P>This week a new typist joined our workshop, and I spent half an hour showing him Bloom and then left him to it. When I checked on him later in the day, he was doing just fine. I thought, What other program could I have put in front of him such that he would be able to use it with just half an hour's orientation?!</P>\n" +
    "              <div class=\"personName\">Prossy Nannyombi\n" +
    "                <P>Uganda School Health and Reading Program</P>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"section\">\n" +
    "        <div class=\"container\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-md-6 pull-left\">\n" +
    "              <H1>Online Shell Books Source</H1>\n" +
    "              <P>Bloom's&nbsp;<a href=\"/browse\">Book Library</a>&nbsp;offers books from around the world for you to translate into a local language. With a single click, shell books are downloaded to your computer, ready to use even when you're offline.</P>\n" +
    "              <P>Got a book you'd like to share? Just add a major language translation (e.g. English, French, Thai) and then tell Bloom to upload it to the online library.</P>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-3 pull-right\"><a href=\"/browse\"><img src=\"assets/bookLibrarySmallScreenshot.png\"/></a></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"section\">\n" +
    "        <div class=\"container centeritems\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-md-12\">\n" +
    "              <iframe width=\"420\" height=\"315\" src=\"https://player.vimeo.com/video/141561934\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\"></iframe>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-md-12\">\n" +
    "              <p>To learn more, check out Bloom's&nbsp;<a href=\"https://vimeo.com/channels/bloomlibrary\">instructional videos</a>.</p>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"section\">\n" +
    "        <div class=\"container\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\n" +
    "              <H1>Power Where You Need It</H1>\n" +
    "              <P>Bloom users find that it is not only easier to get started, but easy to do things that are difficult or impossible in the alternative tools. Things like:</P>\n" +
    "              <ul>\n" +
    "                <li>PDF Booklet Creation</li>\n" +
    "                <li>Bilingual and trilingual books in a single click</li>\n" +
    "                <li>Individual reader to Big Book in a single click</li>\n" +
    "                <li>Calendars</li>\n" +
    "                <li>Picture Dictionaries</li>\n" +
    "                <li>Primers and Teacher's Guides</li>\n" +
    "                <li>Complex Non-roman Script Support</li>\n" +
    "                <li>Decodable Reader Tool</li>\n" +
    "                <li>Leveled Reader Tool</li>\n" +
    "                <li>EBooks</li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"container-fluid centeritems\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-sm-6 col-md-4\"><img src=\"assets/shellbooks.png\" alt=\"Shell Books\"/>\n" +
    "              <h3>Shell Books</h3>\n" +
    "              <p>A growing collection of Creative Commons-licensed shell books help you grow your library quickly.  Just add a book to your vernacular library, then type in translations.</p>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6 col-md-4\"><img src=\"assets/templatebooks.png\" alt=\"Template Books\"/>\n" +
    "              <h3>Template Books</h3>\n" +
    "              <p>Bloom isn't just for<em> shell</em> books. To create a brand new book, we use what Bloom calls a<em> template</em>. For most books, the \"Basic Book\" template is enough. It contains templates pages with the most frequently used layouts. There is also a Picture Dictionary template and Wall Calendar template.</p>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6 col-md-4\"><img src=\"assets/pdfbooklets.png\" alt=\"Effortless PDF Booklets\"/>\n" +
    "              <h3>Effortless PDF Booklets</h3>\n" +
    "              <p>Click on Bloom's Publish tab, and voil&agrave;! You have a PDF file laid out as a booklet, ready for saving or printing.</p>\n" +
    "            </div>\n" +
    "            <div class=\"clearfix visible-md visible-lg\"></div>\n" +
    "            <div class=\"col-sm-6 col-md-4\"><img src=\"assets/multilingual.png\" alt=\"Multilingual Books\"/>\n" +
    "              <h3>Multilingual Books</h3>\n" +
    "              <p>For each box of text, Bloom stores text in any a number of languages.  You can then tell it to show one, two, or three of those languages to make monolingual, bilingual, or trilingual versions of the publication.</p>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6 col-md-4\"><img src=\"assets/allbooks.png\" alt=\"All your Books, a Click Away\"/>\n" +
    "              <h3>All your Books,<br/>a Click Away</h3>\n" +
    "              <p>Bloom never asks you to find things in the computer's file system. It just shows your library and books that you can add to it when you're ready.</p>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6 col-md-4\"><img src=\"assets/artofreading.png\" alt=\"Pictures from the Art of Reading Collection\"/>\n" +
    "              <h3>Pictures from the<br/>Art of Reading Collection</h3>\n" +
    "              <p>After you install our free Art Of Reading Collection, it's easy to find hand-drawn illustrations from around the world.</p>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"section\">\n" +
    "        <div class=\"container\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\n" +
    "              <H1>Limitations</H1>\n" +
    "              <P>Bloom is not a general-purpose page layout program. It isn't as flexible as InDesign or Publisher. Instead, it offers just what you most often need to produce simple books for literacy purposes.</P>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"section\">\n" +
    "        <div class=\"container\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-md-6 col-md-offset-3\">\n" +
    "              <H1>Getting Started</H1>\n" +
    "              <P>To get started making new books in Bloom, install Bloom on a computer, chose a template, and start adding pages.</P>\n" +
    "              <P>If you just want to get started using shellbooks, install Bloom on your computer, and then head to the&nbsp;<a href=\"/browse\">Book Library</a>&nbsp;for some shellbooks you can translate.</P>\n" +
    "              <P>Have some existing books you'd like to get into Bloom? To do that, just copy the text and pictures from whatever program they are in now and paste into pages in Bloom. We expect you'll have questions during this process about templates, copyright, licenses, etc.</P><a href=\"/support\">We'd love to talk with you!</a>\n" +
    "              <!--  li Use page templates or shell books. No fussing around with computers, just quality content.\n" +
    "              <li>Intuitively add new illustrations from scanner, camera or existing illustrations from file</li>\n" +
    "              -->\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </body>\n" +
    "</html>");
}]);

angular.module("modules/static/opensource.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/static/opensource.tpl.html",
    "\n" +
    "<div class=\"staticPage\">\n" +
    "  <h3>Open Source</h3>\n" +
    "  <P>Bloom is Licensed under the&nbsp;<a href=\"http://sil.mit-license.org/\">MIT License</a>.</P>\n" +
    "  <P>The <a href=\"https://github.com/BloomBooks/BloomLibrary\">source for this web site</a> and the <a href=\"https://github.com/BloomBooks/BloomDesktop\">source for the Bloom Desktop</a> are both on github.\n" +
    "  </P>\n" +
    "</div>");
}]);

angular.module("modules/static/support.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/static/support.tpl.html",
    "\n" +
    "<div class=\"staticPage\">\n" +
    "  <h3>Have you seen Bloom's&nbsp;<a href=\"https://vimeo.com/channels/bloomlibrary/videos/sort:alphabetical/format:detail\">instructional videos</a>?</h3>\n" +
    "  <p>They're really helpful! And you can download them to your computer so that you can share them with people who don't have cheap internet. The trick to seeing the download button is to click on the link in the lower-left-hand corner, the one that starts with \"# vimeo.com\".</p>\n" +
    "  <h3>Have a question, kudos, or announcement?</h3>\n" +
    "  <p>Please join the&nbsp;<a href=\"https://groups.google.com/d/forum/bloom-user\">Bloom Google Group</a>.</p>\n" +
    "  <h3>Want some help converting existing books into Bloom format?</h3>\n" +
    "  <P>If you're building new shellbooks or just converting existing ones, please drop the Bloom Librarian a note about your goals by writing to librarian (at) bloom library (dot) org.</P>\n" +
    "  <h3>Have a suggestion?</h3>\n" +
    "  <P>Head over to&nbsp;<a title=\"Suggestions\" href=\"/suggestions\">the suggestions page</a>&nbsp;and then make a new suggestion or vote on other people's.</P>\n" +
    "  <h3>Think you've found a bug?</h3>\n" +
    "  <P>You can submit bug reports either by choosing Help:Report a Problem or &nbsp;<a href=\"mailto:issues@bloomlibrary.org\">an email</a>&nbsp;which goes into our bug tracking system. Please do not submit anything that you would like to keep private, as anyone can make an account and then read what you sent.</P>\n" +
    "  <h3>Miscellaneous</h3>\n" +
    "  <P>Did you turn on Settings Protection (<em>mot de passe usine</em>) and then forget Bloom's <em>factory password</em>? It is <em>b7loom</em>. Yes we've intentionally made it easy to find for anyone who can google in English or French.\n" +
    "  </P>\n" +
    "</div>");
}]);

angular.module("modules/suggestions/suggestions.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/suggestions/suggestions.tpl.html",
    "<div class=\"staticPage\">\n" +
    "\n" +
    "    <h3>Suggestions</h3>\n" +
    "\n" +
    "    <!-- The Classic Widget will be embedded wherever this div is placed -->\n" +
    "    <div data-uv-inline=\"classic_widget\" data-uv-mode=\"feedback\" data-uv-primary-color=\"#d65749\" data-uv-link-color=\"#0c8497\" data-uv-forum-id=\"153625\" data-uv-width=\"100%\" data-uv-height=\"550px\"></div>\n" +
    "\n" +
    "</div><!-- /.staticPage -->");
}]);

angular.module("modules/terms/infringement.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/terms/infringement.tpl.html",
    "<div>\n" +
    "    <div class=\"staticPage\">\n" +
    "        <h1>Digital Millennium Copyright Act Policy</h1>\n" +
    "        <div class=\"termsSub\">Notice and Takedown Procedure</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            It is our policy to expeditiously respond to clear notices of alleged copyright infringement that comply with the\n" +
    "            United States Digital Millennium Copyright Act (DMCA).\n" +
    "            This page describes the information that should be present in these notices.\n" +
    "            It is designed to make submitting notices of alleged infringement to the Bloom Library as straightforward\n" +
    "            as possible while reducing the number of notices that we receive that are fraudulent or difficult to understand or verify.\n" +
    "            The form of notice specified below is consistent with the form suggested by the DMCA (the text of which\n" +
    "            can be found at the U.S. Copyright Office Web Site, http://www.copyright.gov),\n" +
    "            but we will respond to notices of this form from other jurisdictions as well.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            It is expected that all users of any part of the Bloom Library site will comply with applicable copyright laws.\n" +
    "            However, if the Bloom Library receives proper notification of claimed copyright infringement, our response\n" +
    "            to these notices will include removing or disabling access to material claimed to be the subject of infringing\n" +
    "            activity and/or terminating subscribers, regardless of whether we may be liable for such infringement under\n" +
    "            United States law or the laws of another jurisdiction.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            If we remove or disable access in response to such a notice, we will make a good-faith attempt to contact the\n" +
    "            owner or administrator of the affected site or content so that they may make a counter notification pursuant\n" +
    "            to Sections 512(g)(2) and (3) of the DMCA. We may also document notices of alleged infringement on which we act.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Designated Agent</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            The Bloom Library's Designated Agent to receive notification of alleged infringement under the DMCA is:\n" +
    "        </div>\n" +
    "        <blockquote>\n" +
    "            John Hatton<br />\n" +
    "            <a href=\"mailto:John_Hatton@sil.org\">Email</a>: John_Hatton (at) sil.org<br />\n" +
    "            Physical Mail:  LsDev, 7500 W. Camp Wisdom Rd, Dallas, TX 75236<br />\n" +
    "        </blockquote>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Upon receipt of proper notification of claimed infringement, the Bloom Library will follow the procedures outlined herein and in the DMCA.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Infringement Notification</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            If you believe that your work has been copied in a way that constitutes copyright infringement,\n" +
    "            or your intellectual property rights have been otherwise violated, please provide the Bloom Library's Registered Agent\n" +
    "            (listed above) the following information in a written communication (preferably via email):\n" +
    "        </div>\n" +
    "        <ol>\n" +
    "            <li>\n" +
    "                Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works\n" +
    "                at a single online site are covered by a single notification, a representative list of such works at that site;</li>\n" +
    "            <li>Identification of the material that is claimed to be infringing or to be the subject of infringing\n" +
    "                activity and that is to be removed or access to which is to be disabled, and information reasonably\n" +
    "                sufficient to permit the Bloom Library to locate the material;</li>\n" +
    "            <li>Information reasonably sufficient to permit the Bloom Library to contact the complaining party,\n" +
    "                such as an address, telephone number, and, if available, an email address at which the complaining party may be contacted;</li>\n" +
    "            <li>\n" +
    "                The following statement: &quot;I have a good faith belief that use of the material in the manner\n" +
    "                complained of is not authorized by the copyright owner, its agent, or the law&quot;;</li>\n" +
    "            <li>The following statement: &quot;I swear, under penalty of perjury, that the information in the notification\n" +
    "                is accurate, and that I am the copyright owner or am authorized to act on behalf of the owner of an\n" +
    "                exclusive right that is allegedly infringed&quot;; and</li>\n" +
    "            <li>A physical or electronic signature of the owner or a person\n" +
    "                authorized to act on behalf of the owner of an exclusive right that is\n" +
    "                allegedly infringed.</li>\n" +
    "        </ol>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Please note that you may be liable for damages (including costs and attorneys' fees) if you materially\n" +
    "            misrepresent that material is infringing your copyrights.  Accordingly, if you are not sure whether material\n" +
    "            available online infringes your copyright, we suggest that you first contact an attorney.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Counter Notification</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            A provider of content subject to a claim of infringment may make a counter notification pursuant to sections\n" +
    "            512(g)(2) and (3) of the DMCA.  To file a counter notification with us, please provide the Bloom Library's\n" +
    "            Registered Agent (listed above) the following information in a written communication (preferably via email):\n" +
    "        </div>\n" +
    "        <ol>\n" +
    "            <li>Identification of the material that has been removed or to which access has been disabled and the\n" +
    "                location at which the material appeared before it was removed or access to it was disabled;</li>\n" +
    "            <li>\n" +
    "                Your name, address, and telephone number;</li>\n" +
    "            <li>\n" +
    "                The following statement: &quot;I consent to the jurisdiction of Federal District Court for the\n" +
    "                [insert the federal judicial district in which your address is located]&quot;; </li>\n" +
    "            <li>\n" +
    "                The following statement:  &quot;I will accept service of process from [insert the name of the\n" +
    "                person who submitted the infringement notification] or his/her agent&quot;;</li>\n" +
    "            <li>\n" +
    "                The following statement: &quot;I swear, under penalty of perjury, that I have a good faith belief that\n" +
    "                the affected material was removed or disabled as a result of a mistake or misidentification of the\n" +
    "                material to be removed or disabled&quot;; and</li>\n" +
    "            <li>Your signature, in physical or electronic form.</li>\n" +
    "        </ol>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Upon receipt of such counter notification, the Bloom Library will promptly provide the person who provided\n" +
    "            the original infringement notification with a copy of the counter notification, and inform that person that\n" +
    "            the Bloom Library will replace the removed material or cease disabling access to it in 10 business days.\n" +
    "            Bloom Library will replace the removed material and cease disabling access to it not less than 10, nor\n" +
    "            more than 14, business days following receipt of the counter notice, unless our Designated Agent first\n" +
    "            receives notice from the person who submitted the original infringement notification that such person has\n" +
    "            filed an action seeking a court order to restrain the subscriber from engaging in infringing activity\n" +
    "            relating to the material on our system or network.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Repeat Infringers</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            In accordance with Section 512(i)(1)(a) of the DMCA, the Bloom Library will, in appropriate circumstances, disable\n" +
    "            and/or terminate the accounts of users who are repeat infringers.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Accommodation of Standard Technical Measures</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            It is the Bloom Library's policy to accommodate and not interfere with standard technical measures used by copyright\n" +
    "            owners to identify or protect copyrighted works that the Bloom Library determines are reasonable under the circumstances.<br />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/terms/privacy.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/terms/privacy.tpl.html",
    "<div>\n" +
    "    <div class=\"staticPage\">\n" +
    "        <h1>Privacy Notice</h1>\n" +
    "        <div class=\"termsItem\">\n" +
    "            The following discloses the information gathering and dissemination practices for the Bloom Library website (the &quot;Site&quot;).\n" +
    "            We reserve the right to modify the information contained herein at anytime without prior notice. If we do make changes to our privacy policies, we will modify this page accordingly. Check this page periodically for amendments. This site and all information and materials on it are provided to you &quot;AS IS&quot; without warranty of any kind.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            YOUR USE OF THE SITE, OR YOUR PROVISION TO US OF ANY PERSONAL INFORMATION CONSTITUTES YOUR AGREEMENT TO THESE TERMS AND ANY SUBSEQUENT CHANGES TO THESE TERMS; DO NOT USE THE SITE OR PROVIDE INFORMATION IF YOU DO NOT AGREE WITH ALL OF THE TERMS.<br />\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Summary</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            We try to keep your email secret from spammers, but we can't promise. Pretty much everything you contribute\n" +
    "            is visible to the public, including enough of your email so that it's probably possible to identify\n" +
    "            who you are if you contribute a book.\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"termsSub\">Normal Browsing</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            As with many websites, we collect certain information, even when you are not logged in.\n" +
    "            When you browse, read, or download information from the Site, data is collected by the Bloom Library, including but\n" +
    "            not limited to your IP address, URL request, browser type, and date and time of your request.\n" +
    "            We use this information to improve the usefulness of the site to our visitors.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Information You Provide</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            The Bloom Library requests personally identifiable information when you register for an account.\n" +
    "            Information may be used or requested to perform research, improve usability of the site,\n" +
    "            administer mailing lists or online communities, or other activities related to the Bloom Library services.\n" +
    "            This information includes e-mail addresses and the contents of books you contribute.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Disclosure of Information</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Available log records, account information, and all data stored on our servers may be accessed by our system administrators.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Most contributions to this site are available to other visitors. Please to not contribute books containing\n" +
    "            information that is in any way sensitive or private.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            In particular the information provided about each book includes part of the email address you gave us when you signed up.\n" +
    "            We try to hide enough of the address so that it cannot be easily used by spammers, but it may well include\n" +
    "            enough personal information to allow someone to determine the identity of the person who contributed a particular\n" +
    "            book. Please do not contribute books if you do not wish others to discover that you did so.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            We may be required by law (including a court order) to disclose the information you submit.\n" +
    "            At this time we cannot promise either to object to such disclosure ourselves, or to notify you so that you can object yourself.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            The developers of this site are attempting to take reasonable precautions to make it difficult for malicious users to obtain your full email address,\n" +
    "            but we cannot promise that we will be successful; and if you upload a book we provide a deliberate mechanism for users to contact you,\n" +
    "            which will give them access to the email address you gave us. You should assume that with sufficient determination\n" +
    "            someone can probably get access to anything you contribute to this site.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Cookies</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Cookies are small text files that the Site can send to your browser for storage on your computer's hard drive.\n" +
    "            They make your use of the Site easier by saving your status and preferences and may be refreshed every time you visit.\n" +
    "            We may use session cookies when you visit our website while your browser is open, or while you are logged into the Site.\n" +
    "            To facilitate our registration and login functions, we may use cookies to recognize when you return to the Site.\n" +
    "            If you do not logout of your account, these cookies may allow us to keep track of your username and password\n" +
    "            so that you do not have to resubmit the information to log into your account.\n" +
    "            If others will be using your computer, you should log out of your account so that your logon information is cleared.\n" +
    "            Most browser are initially set to accept cookies, but you may be able to change the settings to refuse cookies\n" +
    "            or to be alerted when cookies are being sent.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Children's Privacy</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            The parts of this site that require personal information (that is, logging in to upload books and edit information about them)\n" +
    "            are intended for use by adults (though many of the books may be intended for and browsed by children).\n" +
    "            We will not knowingly collect personal information from children under 13 years of age.\n" +
    "            If you are a parent or legal guardian of a child under age 13 who you believe has submitted personal information to the Site, please contact us immediately.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Posting</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Posting or updating content on the Site is a public action, and all content may be publicly visible.\n" +
    "            Identification of all contributed content includes partial display of your account name.\n" +
    "            All content may be retained for restorative, archival, or research purposes by the Bloom Library.\n" +
    "            Editing or deleting content may alter the displayed state of the content, but will not necessarily permanently delete the content from the Site.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Security</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            The Site has security measures in place to protect the loss, misuse and alteration of the information under our control.\n" +
    "            However, your confidential use of the Site cannot be guaranteed by the Bloom Library.\n" +
    "            The Bloom Library shall not be responsible for any harm that you or any person may suffer as a result of a breach\n" +
    "            of confidentiality in respect to your use of this Site or any information you transmitted to the Site.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Other Websites</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Material on this website may link to independently run websites outside of the www.bloomlibrary.org domain.\n" +
    "            The Bloom Library is not responsible for the privacy practices or content of such websites.\n" +
    "            We encourage you to read the privacy policies of any websites you visit from this website.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            <i>Effective Date of the Agreement is February 14, 2014.</i>\n" +
    "        </div>\n" +
    "        <div class=\"termsAttribution\">\n" +
    "            These terms are adapted from <a href=\"http://www.dmlp.org/privacy-notice\" target=\"_blank\">The Digital Media Law Project privacy notice</a> and may be used under a <a href=\"http://creativecommons.org/licenses/by-nc-sa/3.0/us/\" target=\"_blank\">Creative Commons Attribution-Noncommercial-Share-Alike 3.0 License</a>.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/terms/terms.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/terms/terms.tpl.html",
    "<div>\n" +
    "    <div class=\"staticPage\">\n" +
    "        <h1>Terms of use</h1>\n" +
    "        <div class=\"termsHeader\">\n" +
    "            <h3>General Description </h3>\n" +
    "        </div>\n" +
    "        Welcome to the Bloom Library.\n" +
    "        To provide you with Services, we have to set out some ground rules for using the Site in this document (the &quot;Terms&quot;). By accessing, using, or contributing to the Services or the Site, and in consideration for the Services we provide to you, you agree to abide by the Terms.\n" +
    "        <div class=\"termsItem\">\n" +
    "            Bloom Library may change the Terms from time to time, at the Bloom Library's sole discretion. Your continued use of the Site following the posting of such changes will constitute your assent to all such changes. Please periodically visit this section of the Site to review the current version of the Terms.\n" +
    "        </div>\n" +
    "        <div class=\"termsHeader\">\n" +
    "            <h3>Summary</h3>\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            We know you don't like reading these things, so here is an entirely unofficial and non-binding summary:\n" +
    "        </div>\n" +
    "        <ul>\n" +
    "            <li>We don't promise anything about how well this site works or will keep working.</li>\n" +
    "            <li>You promise not to try to harm us or anyone else by using this site or to do anything illegal with it.</li>\n" +
    "            <li>You assure us that all of the content you put up on the site you have either created or have the rights to post to this site (e.g. pictures, text, etc.)</li>\n" +
    "            <li>You agree to abide by the licenses of any books you download, including refraining from using them if you don't qualify according to the book's licensing terms.</li>\n" +
    "            <li>You give us permission to use any contributions you make as needed to operate the site, and to share them with others according to the permissions you give.</li>\n" +
    "            <li>You understand the typical privacy risks of using a web site, and in particular,\n" +
    "                that the authors of this site are not security experts and may not be able to keep anything you contribute private.</li>\n" +
    "            <li>We may remove any contributions or delay publishing them at our discretion\n" +
    "                (for example, to have health information checked by a professional, or if we believe the material is inconsistent with the ends of SIL International).</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <div class=\"termsHeader\">\n" +
    "            <h3>DISCLAIMER OF WARRANTY and LIMITATION OF LIABILITIES</h3>\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "                THE SITE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,\n" +
    "                INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR OTHERWISE.\n" +
    "                WITHOUT LIMITATION, WE DISCLAIM ANY AND ALL WARRANTIES REGARDING THE SECURITY, RELIABILITY, TIMELINESS, AND PERFORMANCE OF ALL SERVICES ASSOCIATED WITH USE OF THE SITE.\n" +
    "                WE MAKE NO WARRANTY, EXPRESS OR IMPLIED, THAT YOUR USE OF THE SITE WILL BE UNINTERRUPTED, TIMELY, OR ERROR-FREE.\n" +
    "                SOME JURISDICTIONS DO NOT ALLOW THE DISCLAIMER OF CERTAIN WARRANTIES, SO PORTIONS OF THE ABOVE DISCLAIMER MAY NOT APPLY TO YOU.\n" +
    "        </div>\n" +
    "         <div class=\"termsItem\">\n" +
    "            TO THE EXTENT NOT PROHIBITED BY APPLICABLE LAW, THE BLOOM LIBRARY WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF OR INABILITY TO USE THE SITE.\n" +
    "            YOU EXPRESSLY AGREE THAT YOUR USE OF THE SITE IS SOLELY AT YOUR OWN RISK.\n" +
    "            UNDER NO CIRCUMSTANCES SHALL THE BLOOM LIBRARY BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, OR CONSEQUENTIAL DAMAGES,\n" +
    "            INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, INCOME, OR BUSINESS OPPORTUNITIES, REGARDLESS OF THE NATURE OF THE CLAIM OR THE FORM OF ACTION,\n" +
    "            ARISING OUT OF OR CONNECTED WITH THE SITE (INCLUDING BUT NOT LIMITED TO ITS OPERATION, ITS CONTENTS, OR THE INFORMATION OR MATERIALS CONTAINED THEREIN,\n" +
    "            OR THE USE OR INABILITY TO USE ANY OTHER SITE LINKED TO THE SITE, OR ANY CONTENT CONTAINED IN ANY SUCH SITE,\n" +
    "            OR THESE TERMS, OR THE PRIVACY POLICY APPLICABLE TO THE SITE) EVEN IF THE BLOOM LIBRARY, ITS SUPPLIERS, OR LICENSORS HAVE BEEN NOTIFIED OF THE POSSIBILITY OF ANY DAMAGES.\n" +
    "        </div>\n" +
    "        <div class=\"termsHeader\">\n" +
    "            <h3>Account</h3>\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">\n" +
    "                <b>Registration</b>\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "                To utilize the Site and Services, or certain portions thereof, you may be required to complete a registration process and establish an account with Bloom Library.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Password and Security</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            As a registered user of the Site and Services, you will establish a password.\n" +
    "            You are solely responsible for maintaining the confidentiality and security of your password and Bloom Library Account.\n" +
    "            You understand and agree that you are fully responsible for all actions and postings made from your Bloom Library Account.\n" +
    "            You agree to notify Bloom Library immediately if you become aware of any unauthorized use of your Bloom Library Account.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Privacy</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Bloom Library respects the privacy of our users. The <a href=\"/privacy\">Privacy Notice</a> is expressly incorporated herein by reference and made a part of these Terms.<br />\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Termination</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Bloom Library reserves the right to terminate your Bloom Library Account or restrict access to your Bloom Library Account,\n" +
    "            or to delete any content posted through your Bloom Library Account(s), with or without notice, for any or for no reason, and without any liability to you.\n" +
    "        </div>\n" +
    "        <div class=\"termsHeader\">\n" +
    "            <h3>Community Participation</h3>\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Browsing</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "                You understand that material made available by the Bloom Library is a product of a community effort and does not necessarily represent the views of the Bloom Library.\n" +
    "                The Bloom Library assumes no responsibility for the accuracy, suitability, or completeness of any content provided.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Linking</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            You understand that the Bloom Library does not and cannot review all material made available through websites linked or linking to any part of the Site.\n" +
    "            You also understand that no such linking implies in any way that the Bloom Library endorses or is affiliated with any third-party website.\n" +
    "            You agree that the Bloom Library bears no responsibility or liability for any content accessed or harm caused from any third-party website.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Acts Against the Site/Services</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "        You shall not attempt or engage in potentially harmful acts that are directed against the Site or Services including, without limitation, the following:\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            (a) Using the Site or Services in contravention of any other agreement to which you are a party,\n" +
    "            including without limitation any employment agreement to which you may be a party;\n" +
    "            (b) logging onto a server or BloomLibrary Account(s) that you are not authorized to access;\n" +
    "            (c) forging user names, manipulating identifiers, or otherwise impersonating any other person or misrepresenting your identity or affiliation with any person or entity;\n" +
    "            (d) emulating or faking usage of the Site or Services;\n" +
    "            (e) violating or attempting to violate any security features of the Site;\n" +
    "            (f) using manual or automated software, devices, scripts, robots, or other means or processes to access, &quot;scrape,&quot; &quot;crawl,&quot; or &quot;spider&quot; any pages contained in the Site;\n" +
    "            (g) introducing viruses, worms, software, Trojan horses, or other similar harmful code into the Site or Services;\n" +
    "            (h) interfering or attempting to interfere with the use of the Site by any other user, host, or network,\n" +
    "            including without limitation by means of submitting a virus, overloading, &quot;flooding,&quot; &quot;spamming,&quot;\n" +
    "            &quot;mail bombing,&quot; &quot;pinging,&quot; or &quot;crashing&quot; the Site;\n" +
    "            (i) causing, allowing or assisting machines, bots, or automated services to access or use the Site or Services without the express written permission of the Bloom Library;\n" +
    "            (j) tampering with the operation, functionality, or the security of the Site or Services;\n" +
    "            (k) attempting to probe, scan, or test the vulnerability of the Site, or any associated system or network, or breach any security or authentication measures;\n" +
    "            (l) misusing, tricking, disrupting, or otherwise interfering with the functioning of the Site or Services;\n" +
    "            (m) harvesting or collecting email addresses or other contact information of other users or clients from the Site by electronic or other means;\n" +
    "            (n) reverse engineering, decompiling, disassembling, deciphering, or otherwise attempting to derive the source code\n" +
    "            for any underlying intellectual property used to provide the Site or Services;\n" +
    "            (o) engaging in &quot;framing,&quot; &quot;mirroring,&quot; or otherwise simulating the appearance or function of the Site; and\n" +
    "            (p) forging any TCP/IP packet header or any part of the header information in any e-mail or newsgroup posting.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Violations of system or network security may result in civil or criminal liability.\n" +
    "            You agree that it is your responsibility to install anti-virus software and related protections against viruses,\n" +
    "            Trojan horses, worms, time bombs, cancelbots, or other computer programming routines or engines that are intended\n" +
    "            to damage, destroy, disrupt, or otherwise impair a computer's functionality or operation.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Parental Notice</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Pursuant to 47 U.S.C. Section 230(d) as amended, Bloom Library hereby notifies you that parental control protections\n" +
    "            (such as computer hardware, software, or filter services) are commercially available that may assist you in limiting\n" +
    "            access to material that is harmful to minors. Information identifying current providers of such protection\n" +
    "            is available on the Internet\n" +
    "            (e.g., <a href=\"http://en.wikipedia.org/wiki/List_of_content-control_software\" target=\"_blank\"> http://en.wikipedia.org/wiki/List_of_content-control_software</a>).\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Content</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Content may not be illegal, obscene, defamatory, threatening, infringing of intellectual property rights, invasive of privacy or otherwise injurious or objectionable.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Bloom Library does not guarantee to pre-screen or regularly review any contributed content, particularly any materials identified as 'for review,' but the Bloom Library has the right\n" +
    "            (though not the obligation) to remove, without notice, any content posted which the Bloom Library considers,\n" +
    "            for any reason, to violate these Terms or to be inappropriate.\n" +
    "            The Bloom Library may terminate any Bloom Library Account, with or without notice, for posting such content.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Even where materials are identified as reviewed, BloomLibrary.org takes no responsibility for their accuracy or for any consequences\n" +
    "            of acting on any advice posted by users of this site.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Licenses Applicable to Contributed Content</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            (a)	License to Other Users of the Site and Services: Attribution-Noncommercial License.\n" +
    "            Except where otherwise noted, any and all content contributed by you to the Services or the Site is submitted under a\n" +
    "            <a href=\"http://creativecommons.org/licenses/by-nc/3.0/us/\" target=\"_blank\">Creative Commons Attribution-Noncommercial 3.0 License</a>.\n" +
    "            Books that you upload and illustrations contained in them will normally carry their own license; thus,\n" +
    "            the above mainly applies to the information (such as thumbnail, title, and summary) which is visible on the web site without downloading a book.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            (b)	License to the Bloom Library. By posting or contributing content to the Site using these Services,\n" +
    "            you are granting the Bloom Library a non-exclusive, royalty-free, perpetual, and worldwide license to use\n" +
    "            your content in connection with the operation of the Site and Services, and/or for educational or other\n" +
    "            non-commercial purposes, including, without limitation,\n" +
    "            (1) the license rights to copy, distribute, transmit, publicly display, publicly perform, reproduce, edit, translate and reformat your content,\n" +
    "            and/or to incorporate it into a collective work, and (2) the right to sublicense any or all of Bloom Library's license rights to others.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">User Representations and Warranties</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            By posting any content, you represent and warrant that\n" +
    "            (a) you have the right to post such content and to grant the rights indicated above,\n" +
    "            including but not limited to any consent, authorization, release, clearance or license from any third party\n" +
    "            (such as, but not limited to, any release related to rights of privacy or publicity)\n" +
    "            necessary for you to provide, post, upload, input or submit the content, or\n" +
    "            (b) that such content is in the public domain or that your use of such content constitutes fair use.\n" +
    "            You further represent and warrant that posting such content does not violate or constitute the infringement\n" +
    "            of any patent, copyright, trademark, trade secret, right of privacy, right of publicity, moral rights,\n" +
    "            or other intellectual property right recognized by any applicable jurisdiction of any person or entity,\n" +
    "            or otherwise constitute the breach of any agreement with any other person or entity.\n" +
    "            You further represent and warrant  and that all information contained in the posted content is your own work or work you are authorized to submit,\n" +
    "            and that the posted content does not contain any threatening, harassing, libelous, false, defamatory, offensive,\n" +
    "            obscene, or pornographic, material, or other material that would violate any other applicable law or regulation.\n" +
    "            You agree that you will not knowingly and with intent to defraud provide material and misleading information.\n" +
    "            You represent and warrant that the content you supply does not violate the Terms.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Copyright Complaints</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            If you are a copyright owner and you believe that your copyrighted materials have been used in a way that\n" +
    "            constitutes copyright infringement, please see our <a href=\"/infringement\">SIL Notice Policy</a>.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Indemnities</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            You acknowledge and agree to indemnify and hold the Bloom Library and SIL International, their affiliates,\n" +
    "            officers, employees and agents, harmless, including costs and attorneys' fees, from any claim or demand\n" +
    "            made by any third party due to or arising out of your use of the Site or Services, your violation of these Terms,\n" +
    "            or the infringement by you or made under your Bloom Library Account, of any intellectual property or other right of any person or entity.\n" +
    "        </div>\n" +
    "        <div class=\"termsHeader\">\n" +
    "        <h3>Other Terms</h3>\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Modifications</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "        The Bloom Library reserves the right to change, at any time, at our sole discretion, the Terms under which these Services are offered.\n" +
    "        You are responsible for regularly reviewing the Terms. Your continued use of the Site and Services constitutes your agreement to all such Terms.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Termination of Service</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            The Bloom Library disclaims all responsibility and liability for the availability, timeliness, security or reliability\n" +
    "            of the Services or Site, or any software provided through the Site.\n" +
    "            The Bloom Library reserves the right to modify, suspend, or discontinue the Services or access to the Site\n" +
    "            without any notice at any time and without any liability to you.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Scope of Terms</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            The Terms apply to use of and contribution to the Site and any account provided therefore.\n" +
    "            The Bloom Library and SIL International may operate additional projects or services which require separate or additional terms.\n" +
    "            Such different terms are made available through the individual project or service and are not addressed further herein.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">No Waiver of Terms</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            Failure of the Bloom Library to exercise or enforce any right or provision of these Terms shall not be deemed\n" +
    "            a waiver of such right or provision in that or any other instance.\n" +
    "        </div>\n" +
    "        <div class=\"termsSub\">Governing Law and Entire Agreement</div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            These Terms are governed by the laws of the State of Texas, without regard to the rules of conflict of law\n" +
    "            that may cause the laws of another jurisdiction to apply.\n" +
    "            You agree to the sole and exclusive jurisdiction and venue of the federal or state courts serving Dallas County\n" +
    "            in the State of Texas in the event of any dispute of any kind arising from or relating to the Site or Services,\n" +
    "            or your use or review of it.\n" +
    "            The Terms constitute the entire agreement between the parties with respect to the subject matter hereof\n" +
    "            and supersedes and replaces all prior or contemporaneous understandings or agreements, written or oral,\n" +
    "            regarding such subject matter.\n" +
    "            If for any reason a court of competent jurisdiction finds any provision or portion of these Terms to be unenforceable,\n" +
    "            the remainder of the Terms will continue in full force and effect.\n" +
    "        </div>\n" +
    "        <div class=\"termsItem\">\n" +
    "            <i>Effective Date of the Agreement is February 14, 2014.</i>\n" +
    "        </div>\n" +
    "        <div class=\"termsAttribution\">\n" +
    "            These terms are adapted from <a href=\"http://www.dmlp.org/website-terms-use\" target=\"_blank\">The Digital Media Law Project terms of service</a> and may be used under a <a href=\"http://creativecommons.org/licenses/by-nc-sa/3.0/us/\" target=\"_blank\">Creative Commons Attribution-Noncommercial-Share-Alike 3.0 License</a>.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
