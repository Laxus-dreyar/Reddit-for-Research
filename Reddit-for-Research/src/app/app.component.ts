import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/authentication.service';
// import 'bootstrap/dist/js/bootstrap.css';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    title = 'Reddit-for-Research';
    currentUser: String = "";

    async ngOnInit() {
        this.currentUser = null
        var result = await (this.authenticationService.checkAuthentication());
        if (result !== false)
            this.currentUser = result["name"]
    }

    submit(value: String) {
        this.router.navigate(['/search/' + value])
            .then(() => {
                window.location.reload();
            });
    }

    logout() {
        localStorage.clear();
        window.location.reload();
    }
}
