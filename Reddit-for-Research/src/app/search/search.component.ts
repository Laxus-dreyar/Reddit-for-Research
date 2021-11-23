import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    baseURL = "http://localhost:4000/search";

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private domSanitizer: DomSanitizer,
    ) { }

    private routeSub: Subscription;
    query: string;
    startYear = 1900;
    endYear = 2020;
    multiFlag = false;
    yearFlag = false;
    authorFlag = false;
    fieldFlag = false;
    results: any = [];
    body: {};
    retrievedFlag = false;
    showOptions = false;
    flags: boolean[] = [];

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.retrievedFlag = false;
            this.showOptions = false;
            this.query = params['query']
        });

        this.search();
    }

    retrieveQuery(value: string) {
        // this.router.navigate(['/search/' + value])
        //   .then(() => {
        //     window.location.reload();
        //   });
        this.retrievedFlag = false;
        this.query = value;
        this.search();
    }

    showoptions() {
        this.showOptions = !this.showOptions
        if (this.showOptions == false) {
            this.multiFlag = false;
            this.authorFlag = false;
            this.fieldFlag = false;
            this.yearFlag = false;
            this.startYear = 1900;
            this.endYear = 2020;
        }
    }
    MultipleFields() {
        this.multiFlag = !this.multiFlag;
        if (this.multiFlag == false) {
            this.authorFlag = false;
            this.fieldFlag = false;
        }
    }
    SearchYear() {
        this.yearFlag = !this.yearFlag;
        if (this.yearFlag == false) {
            this.startYear = 1900;
            this.endYear = 2020;
        }
    }
    AuthorFlag() {
        this.authorFlag = !this.authorFlag;
    }
    FieldFlag() {
        this.fieldFlag = !this.fieldFlag;
    }

    async search() {
        if (document.getElementById("minyear") != null) {
            this.startYear = +(<HTMLInputElement>document.getElementById("minyear")).value;
        }
        if (document.getElementById("maxyear") != null) {
            this.endYear = +(<HTMLInputElement>document.getElementById("maxyear")).value;
        }

        this.body = { "search": this.query, "multi": this.multiFlag, "author": this.authorFlag, "field": this.fieldFlag, "from": this.startYear, "to": this.endYear }
        const data = await this.http.post<any>(this.baseURL, this.body).toPromise();
        this.results = data;
        for (var i = 0; i < this.results.length; i++)
            this.flags[i] = false;
        console.log(this.results)
        this.retrievedFlag = true;
    }

    sanitize(url: string) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
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

    // to prevent memory leaks
    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
