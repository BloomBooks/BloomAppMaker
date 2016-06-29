import {provideRouter, RouterConfig } from '@angular/router';
import {AppProducer} from "./appProducer/appProducer.component";
import {Home} from "./home/home.component";

export const routes: RouterConfig = [
    { path: 'app-producer', component: AppProducer }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];