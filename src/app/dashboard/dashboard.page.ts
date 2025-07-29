import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  constructor(
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }
}
