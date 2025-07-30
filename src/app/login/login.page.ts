import { Component, OnInit } from '@angular/core';
import { AuthService } from '@common/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password)
      .catch(error => alert(error.message));
  }

}
