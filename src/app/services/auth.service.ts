import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private authUrl = environment.baseUrl + 'auth';

	// Observable string sources
    private userDataChanged = new Subject<boolean>();
    //Observable string streams
    userDataChanged$ = this.userDataChanged.asObservable();
	
	constructor(
		private http: HttpClient,
	) { }

	login(data: User): Observable<any> {
		return this.http.post(this.authUrl + '/login', data, this.getOptions())
			.pipe(
				catchError(this.handleError('Login'))
			)
	}

	signup(user: User): Observable<string> {
        return this.http.post<string>(this.authUrl + '/signup', user, this.getOptions())
            .pipe(
                catchError(this.handleError<string>('Sign up'))
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
	
	protected getOptions() {
        const token = localStorage.getItem('token');
        if (token) {
            return { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) }
        } else {
            return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        }
    }
	/**
	* Handle Http operation that failed.
	* Let the app continue.
	* @param operation - name of the operation that failed
	* @param result - optional value to return as the observable result
	*/
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	/** Log a ShowsService message */
	private log(message: string) {
		console.log(`ShowsService: ${message}`);
	}
}
