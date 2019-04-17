import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Chat } from '../models/chat';
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root'
})
export class ChatService {
	private chatUrl = this.baseService.url + 'chat';

	constructor(
		private http: HttpClient,
		private baseService: BaseService
	) { }

	getChatHistory(): Observable<Chat[]> {
		return this.http.get<Chat[]>(this.chatUrl, this.baseService.getOptions())
		.pipe(
			catchError(this.baseService.handleError<Chat[]>('Get Chat history', []))
		)
	}

	sendMessage(data: Chat): Observable<string> {
		return this.http.post<string>(this.chatUrl, data, this.baseService.getOptions())
		.pipe(
			catchError(this.baseService.handleError<string>('Send Message'))
		)
	}
}
