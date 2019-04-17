import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	user: User;

	constructor(
		public authService: AuthService,
		public socketService: SocketService,
		public router: Router
	) {
		// listen for user data change after login
		this.authService.userDataChanged$
			.subscribe(data => {
				if (data) {
					this.user = this.authService.getCurrentUser();
					this.socketService.login(this.user);
				}
			})
	}

	ngOnInit() {
		if (this.authService.isLoggedIn()) {
			this.user = this.authService.getCurrentUser();
			this.socketService.login(this.user);
		}
	}

	logout() {
		this.socketService.logout(this.user);
		localStorage.clear();
		this.router.navigate(['/login']);
	}
}
