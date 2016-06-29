import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AppProducer} from '../appProducer/appProducer.component';

@Component({
    selector: 'my-page',
    templateUrl: './app/aPage/aPage.tpl.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AppAPage {}