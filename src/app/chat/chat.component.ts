import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Chat } from '../models/chat';
import { User } from '../models/user';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

	messages: Chat[] = [];
	loading: boolean;
	chat: Chat = new Chat();
	user: User = this.authService.getCurrentUser();
	socketSubscriber;

	constructor(
		public chatService: ChatService,
		public authService: AuthService,
		public socketService: SocketService
	) {
		this.socketSubscriber = this.socketService.listenMessage().subscribe(
			data => {
				this.messages.push(data);
			}
		)
	}

	ngOnDestroy() {
		this.socketSubscriber.unsubscribe();
	}

	ngOnInit() {
		this.getChatHistory();
	}

	getChatHistory() {
		this.loading = true;
		this.chatService.getChatHistory().subscribe(
			data => {
				if (data && data.length) {
					this.messages = data;
				}
				this.loading = false;
			}
		)
	}

	sendMessage(messageForm: NgForm) {
		this.chatService.sendMessage(this.chat).subscribe(
			data => {
				if (data) {
					this.chat.user = this.user;
					this.chat.isReceived = false;
					this.messages.push(this.chat);
					this.chat = new Chat();
					messageForm.resetForm();
				}
			}
		)
	}
}
