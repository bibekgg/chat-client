import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { Chat } from '../models/chat';

@Injectable({
	providedIn: 'root'
})
export class SocketService {

	private url = environment.baseUrl;
	private socket = io(this.url);

	// Observable string sources
	public socketReconnected = new Subject<any>();
	//Observable string streams
	socketReconnected$ = this.socketReconnected.asObservable();

	constructor(
		private authService: AuthService,
	) {
		this.socket.on('connect', () => {
			console.log('Socket connected');
		})
		this.socket.on('reconnect', (attemptNumber) => {
			this.socketReconnected.next(true);
			if (this.authService.isLoggedIn()) {
				this.reconnect(this.authService.getCurrentUser());
			}
		});
	}

	listenMessage() {
		let observable = new Observable<Chat>(observer => {
			this.socket.on('new-message', (data) => {
				observer.next(data);
			});
			return () => {
				this.socket.removeListener('new-message')
			};
		})
		return observable;
	}

	logout(user: User) {
		let obj = { _id: user._id, name: user.name };
		this.socket.emit('logout', obj);
	}

	login(user: User) {
		let obj = { _id: user._id, name: user.name };
		this.socket.emit('login', obj);
	}

	reconnect(user: User) {
		let obj = { _id: user._id, name: user.name };
		this.socket.emit("user-reconnect", obj);
	}

}
