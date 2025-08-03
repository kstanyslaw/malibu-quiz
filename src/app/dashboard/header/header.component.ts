import { Component, inject, Input, OnInit } from '@angular/core';
import { AuthService } from '@common/services';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule],
})
export class HeaderComponent  implements OnInit {
  @Input() headerTitle!: string;

  authService = inject(AuthService);

  constructor() { }

  ngOnInit() {}

  logout() {
    this.authService.signOut();
  }

}
