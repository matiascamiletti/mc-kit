import { Component, OnInit } from '@angular/core';
import { MCAuthHalfComponent, MCAuthHalfConfig } from '../../../../../mckit/auth/src/lib/pages/auth-half/auth-half.component';

@Component({
    selector: 'app-auth-half',
    imports: [MCAuthHalfComponent],
    templateUrl: './auth-half.component.html',
    styleUrl: './auth-half.component.scss'
})
export class AuthHalfComponent implements OnInit {

  config!: MCAuthHalfConfig;

  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig() {
    this.config = new MCAuthHalfConfig();
    this.config.title = 'Inicio de sesión';
    this.config.image = 'https://my-back-401316.web.app/assets/images/image_splash4.jpg';;
  }

}
