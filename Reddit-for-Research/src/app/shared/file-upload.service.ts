import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class FileUploadService {

    baseURL = "http://localhost:4000/document";
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    getDocuments() {
        return this.http.get(this.baseURL)
    }

    addDocument(name: string, author: string, publish: number, field: string, profileImage: File, username: string): Observable<any> {
        var formData: any = new FormData();
        formData.append("name", name);
        formData.append("author", author);
        formData.append("yearofpublish", publish);
        formData.append("field", field);
        formData.append("link", profileImage);
        formData.append("uploadedby", username);
        return this.http.post<any>(`${this.baseURL}/add-document`, formData, {
            observe: 'events'
        })
    }

    // Error handling
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}
