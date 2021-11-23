import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
     baseURL = "http://localhost:4000/search/field";

  constructor(private route: ActivatedRoute,
  private http: HttpClient,
  private domSanitizer: DomSanitizer,
  private router: Router) { }
  results: any = [];
  body: {};
  retrievedFlag = false;
  query: string;
  flags: boolean[] = [];
   private routeSub: Subscription;

  ngOnInit() {
       this.routeSub = this.route.params.subscribe(params => {
        this.retrievedFlag = false;
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
    alert(this.query)
    this.search();
  }
  async search() {
    this.body = { "search": this.query }
    const data = await this.http.post<any>(this.baseURL, this.body).toPromise();
    this.results = data;
    for (var i = 0; i < this.results.length; i++)
      this.flags[i] = false;
    this.retrievedFlag = true;
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  goToUrl(url: string) {
    window.open(url, "_blank");
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  returnCategories(){
       this.retrievedFlag=false;
       this.query=null;
       // location.reload();
 }

}
