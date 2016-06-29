"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
//import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
var home_component_1 = require('./home/home.component');
var app_routes_1 = require('./app.routes');
platform_browser_dynamic_1.bootstrap(home_component_1.Home, [app_routes_1.APP_ROUTER_PROVIDERS]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map