import { Component } from '@angular/core';

@Component({
    selector: 'about',
    templateUrl: './about.tpl.html',
    styleUrls: ['./about.tpl.css']
})

export class About {
    currentUser = {
        "name": "Jacob",
        "id": "vUGQP4mbby"
    }
}