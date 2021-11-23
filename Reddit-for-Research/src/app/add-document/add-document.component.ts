import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FileUploadService } from "../shared/file-upload.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
    selector: 'app-add-document',
    templateUrl: './add-document.component.html',
    styleUrls: ['./add-document.component.css']
})

export class AddDocumentComponent implements OnInit {
    form: FormGroup;
    users = [];


    constructor(
        private fb: FormBuilder,
        private router: Router,
        private fileUploadService: FileUploadService,
        private authenticationService: AuthenticationService
    ) {
        // Reactive Form
        this.form = this.fb.group({
            name: [''],
            author: [''],
            publish: [''],
            field: [''],
            link: [null]
        })
    }

    currentUser: any = {};

    async ngOnInit() {
        var result = await (this.authenticationService.checkAuthentication());
        this.currentUser = null //to prevent displaying divs assuming null before OnInit completes
        if (result !== false)
            this.currentUser = result
    }

    uploadFile(event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({
            link: file
        });
        this.form.get('link').updateValueAndValidity()
    }

    submitForm() {
        console.log(this.currentUser["username"])
        this.fileUploadService.addDocument(
            this.form.value.name,
            this.form.value.author,
            this.form.value.publish,
            this.form.value.field,
            this.form.value.link,
            this.currentUser["username"]
        ).subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
                case HttpEventType.Sent:
                    console.log('Request has been made!');
                    break;
                case HttpEventType.ResponseHeader:
                    console.log('Response header has been received!');
                    break;
                case HttpEventType.Response:
                    console.log('Document successfully uploaded!', event.body);
                    this.router.navigate(['documents-list'])
            }
        })
    }
}