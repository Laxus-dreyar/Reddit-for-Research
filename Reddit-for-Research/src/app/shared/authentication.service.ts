import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    baseURL = "http://localhost:4000/";
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    register(name: string, dateofbirth: Date, email: string, username: string, password: string) {
        console.log(dateofbirth)
        return this.http.post<any>(this.baseURL + 'register', { name, dateofbirth, email, username, password }, { observe: 'response' })
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.baseURL + 'login/', { username, password }, { observe: 'response' })
            .pipe(map(res => {
                localStorage.setItem('token', res.body["token"]);
            }));
    }

    logout() {
        localStorage.removeItem("token");
    }

    async checkAuthentication() {
        const token = localStorage.getItem("token");
        if (token === null)
            return false;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        })
        const user = await this.http.get<any>(this.baseURL + 'login/check', { headers: headers }).toPromise();
        return user;
    }

    retrieveUsers() {
        return this.http.get(this.baseURL + 'register/');
    }

    getUserDetails(username: string) {
        return this.http.post<any>(this.baseURL + 'register/userDetails', {username});
    }
}
