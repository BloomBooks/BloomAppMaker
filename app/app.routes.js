"use strict";
var router_1 = require('@angular/router');
var appProducer_component_1 = require("./appProducer/appProducer.component");
exports.routes = [
    { path: 'app-producer', component: appProducer_component_1.AppProducer }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map