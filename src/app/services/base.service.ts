import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class BaseService {
	url: string = environment.baseUrl;

	constructor() { }

	getOptions() {
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
	handleError<T>(operation = 'operation', result?: T) {
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
