import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
@NgModule({
    declarations: [
        AppComponent,
        AddDocumentComponent,
        DocumentsListComponent,
        PageNotFoundComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent,
        SearchComponent, 
        ProfileComponent,
        CategoriesComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgxDocViewerModule,
        NgbModule,
        FormsModule
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
