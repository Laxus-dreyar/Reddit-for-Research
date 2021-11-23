import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    focus;
    focus1;
    form: FormGroup;

    constructor(public fb: FormBuilder,
        public router: Router, private authenticationService: AuthenticationService) {
        // Reactive Form
        this.form = this.fb.group({
            username: [''],
            password: [''],
        })
    }

    async ngOnInit() {
        var result = await (this.authenticationService.checkAuthentication());
        if (result !== false)
            this.router.navigate([''])
    }

    submitForm() {
        this.authenticationService.login(
            this.form.value.username,
            this.form.value.password
        ).subscribe(() => {
            window.alert("Login successful");
            window.location.reload();
        },
            err => {
                if (err.status == 401)
                    window.alert("Incorrect username or password!");
            });
    }

}
