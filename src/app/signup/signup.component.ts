import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	public user: User;
	public saving: boolean = false;

	constructor(
		public authService: AuthService,
		public router: Router,
	) { }

	ngOnInit() {
		this.user = new User();
	}

	signup(signupForm: NgForm) {
		if (this.user.password != this.user.confirmPassword) {
			signupForm.controls.confirmPassword.setErrors({ "notSame": true })
		} else if (signupForm.form.valid) {
			this.saving = true;
			this.authService.signup(this.user)
				.subscribe(data => {
					if (data) {
						this.saving = false;
						this.router.navigate(['login'])
					}
				},
					error => {
						this.saving = false;
					});
		}
	}

}
