import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {
    currentUser: any = {};

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    async ngOnInit() {
        var result = await (this.authenticationService.checkAuthentication());
        this.currentUser = null //to prevent displaying divs assuming null before OnInit completes
        if (result !== false)
            this.currentUser = result
    }
}
