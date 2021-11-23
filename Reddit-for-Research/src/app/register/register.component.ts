import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    focus;
    focus1;
    focus2;
    focus3;
    focus4;

    form: FormGroup;

    constructor(
        public fb: FormBuilder,
        public router: Router,
        public authenticationService: AuthenticationService
    ) {
        // Reactive Form
        this.form = this.fb.group({
            name: [''],
            dateofbirth: [''],
            email: [''],
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
        this.authenticationService.register(
            this.form.value.name,
            this.form.value.dateofbirth,
            this.form.value.email,
            this.form.value.username,
            this.form.value.password
        ).subscribe(() => {
            window.alert("Registered successfully")
            this.authenticationService.login(
                this.form.value.username,
                this.form.value.password
            ).subscribe(response => {
                window.alert("Login successful")
                window.location.reload();
            })
        },
            err => {
                if (err.status == 409)
                    window.alert("Username exists!")
            });
    }
}

