import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MCSplitPageComponent } from '../../../../../mckit/layout-fuse/src/public-api';

@Component({
  selector: 'app-register-split-page',
  imports: [CommonModule, MCSplitPageComponent],
  templateUrl: './register-split-page.component.html',
  styleUrl: './register-split-page.component.scss'
})
export class RegisterSplitPageComponent {

}
