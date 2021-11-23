import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploadService } from "../shared/file-upload.service";
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

    constructor(public fileUploadService: FileUploadService,
        private domSanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService
    ) {
    }

    documents: any = [];
    username: string;
    profile: any = {};
    flags: boolean[] = [];
    retrievedFlag = false;
    currentUser: any = {}

    async ngOnInit() {
        this.route.params.subscribe(params => {
            this.retrievedFlag = false;
            this.username = params['username']
        });
        this.checkUsernameValidity();

        var result = await (this.authenticationService.checkAuthentication());
        if (result != false)
            this.currentUser = result
        else
        {
            this.currentUser = null;
            this.username = null;
        }
        
        this.getDocuments();
    }

    sanitize(url: string) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }

    async getDocuments() {
        const data = (await this.fileUploadService.getDocuments().toPromise())['documents'];
        for (var i = 0; i < data.length; i++) {
            if (data[i]["uploadedby"] == this.username)
                this.documents.push(data[i])
        }

        for (var i = 0; i < this.documents.length; i++)
            this.flags[i] = false;
        this.retrievedFlag = true;
    }

    // TODO: write an API to take username and check if it exists, as opposed to retrieving all users and checking on frontend
    async checkUsernameValidity() {
        const users = <[]>(await this.authenticationService.retrieveUsers().toPromise());
        for (var i = 0; i < users.length; i++)
            if (users[i]["username"] == this.username)
            {
                // getting user details based on username
                this.profile = (await this.authenticationService.getUserDetails(this.username).toPromise());
                this.profile["dateofbirth"] = this.profile["dateofbirth"].split("T")[0];
                return;
            }

        this.username = null;
    }

    changeFlag(id: number) {
        for (var i = 0; i < this.flags.length; i++)
            if (this.flags[i] == true)
                this.flags[i] = false;

        this.flags[id] = true;
    }

    goToUrl(url: string) {
        window.open(url, "_blank");
    }
}
