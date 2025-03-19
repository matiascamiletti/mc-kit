import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MCBaseAuthPageConfig } from '../../entities/mc-base-auth-page-config';
import { MCAuthModel } from '../../entities/mc-auth-model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'mc-auth-half',
    imports: [CommonModule],
    templateUrl: './auth-half.component.html',
    styleUrl: './auth-half.component.scss'
})
export class MCAuthHalfComponent {
  @Input() config!: MCAuthHalfConfig;
  @Output() submit = new EventEmitter<MCAuthModel>();


}

export class MCAuthHalfConfig extends MCBaseAuthPageConfig {
  image?: string;
}
