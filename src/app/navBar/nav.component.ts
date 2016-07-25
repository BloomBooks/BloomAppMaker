import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav.tpl.html'
})

export class NavBar {
    title: string;

    constructor(public router: Router) {
        this.router.events.subscribe((val) => {
            if (val.url === "/") {
                this.title = "App Maker";
            } else if (val.url === "/about") {
                this.title = "About Bloom App Maker";
            }
        });
    }
}