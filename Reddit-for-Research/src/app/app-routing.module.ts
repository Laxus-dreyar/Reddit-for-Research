import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { LoginComponent } from './login/login.component'
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'categories', component:CategoriesComponent },
  { path: 'add-document', component: AddDocumentComponent },
  { path: 'documents-list', component: DocumentsListComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile/:username', component: ProfileComponent},
  { path: 'search/:query', component: SearchComponent},
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
