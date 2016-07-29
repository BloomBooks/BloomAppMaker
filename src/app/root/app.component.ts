import { Component, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import { NavBar } from '../navBar/nav.component';

@Component({
    selector: 'root',
    templateUrl: 'app.tpl.html',
    directives: [ROUTER_DIRECTIVES, NavBar],
    providers: [HTTP_PROVIDERS]
})

export class RootComponent {
    viewContainerRef;

    public constructor(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}