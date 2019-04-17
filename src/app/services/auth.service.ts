import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private authUrl = this.baseService.url + 'auth';

	// Observable string sources
    private userDataChanged = new Subject<boolean>();
    //Observable string streams
    userDataChanged$ = this.userDataChanged.asObservable();
	
	constructor(
		private http: HttpClient,
		private baseService: BaseService
	) { }

	login(data: User): Observable<any> {
		return this.http.post(this.authUrl + '/login', data, this.baseService.getOptions())
			.pipe(
				catchError(this.baseService.handleError('Login'))
			)
	}

	signup(user: User): Observable<string> {
        return this.http.post<string>(this.authUrl + '/signup', user, this.baseService.getOptions())
            .pipe(
                catchError(this.baseService.handleError<string>('Sign up'))
            );
    }

	isLoggedIn() {
        return localStorage.getItem('token') !== null;
	}
	
	setToken(token) {
        localStorage.setItem('token', token);
    }

    setUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
	}
	
	getCurrentUser(): User {
        let currentUser = localStorage.getItem('user');
        return JSON.parse(currentUser);
    }

	publishUserDataChange() {
        this.userDataChanged.next(true);
	}
}
