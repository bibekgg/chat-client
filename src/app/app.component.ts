import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	user: User;

	constructor(
		public authService: AuthService,
		public router: Router
	) {
		// listen for user data change after login
		this.authService.userDataChanged$
			.subscribe(data => {
				if (data) {
					this.user = this.authService.getCurrentUser();
				}
			})
	}

	ngOnInit() {
		if (this.authService.isLoggedIn()) {
			this.user = this.authService.getCurrentUser();
		}
	}

	logout() {
		localStorage.clear();
		this.router.navigate(['/login']);
	}
}
