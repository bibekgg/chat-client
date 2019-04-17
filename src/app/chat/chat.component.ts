import { Component, OnInit } from '@angular/core';
import { Chat } from '../models/chat';
import { ChatService } from '../services/chat.service';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	messages: Chat[] = [];
	loading: boolean;
	chat: Chat = new Chat();
	user: User = this.authService.getCurrentUser();

	constructor(
		public chatService: ChatService,
		public authService: AuthService
	) { }

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
