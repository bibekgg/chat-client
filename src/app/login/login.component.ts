import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public saving: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  login(loginForm) {
    if (loginForm.form.valid) {
      this.saving = true;
      this.authService.login(this.user)
        .subscribe(data => {
          if (data) {
            this.saving = false;
            this.authService.setToken(data.token);
            this.authService.setUser(data.user);
            this.router.navigate(['chat']);
          }
        },
          error => {
            this.saving = false;
          });
    }
  }

}
