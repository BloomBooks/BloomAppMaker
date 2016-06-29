import { bootstrap }    from '@angular/platform-browser-dynamic';
//import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {Home} from './home/home.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';


bootstrap(Home,[APP_ROUTER_PROVIDERS]).catch(err => console.error(err));