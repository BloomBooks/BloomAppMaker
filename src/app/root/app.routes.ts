import { provideRouter, RouterConfig } from '@angular/router';

import { AppProducerRoutes } from '../appProducer/appProducer.routes';
import { AboutRoutes } from '../about/about.routes';

const routes: RouterConfig = [
    ...AppProducerRoutes,
    ...AboutRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
];
