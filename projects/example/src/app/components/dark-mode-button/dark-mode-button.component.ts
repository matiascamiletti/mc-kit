import { afterNextRender, Component, signal } from '@angular/core';
import { MCDarkModeClickDirective } from '../../../../../mckit/layout-core/src/public-api';
import { ButtonModule } from 'primeng/button';
import { MCComponent, MCCoreComponent } from '../../../../../mckit/core/src/public-api';

declare const document: any;

@Component({
  selector: 'app-dark-mode-button',
  imports: [MCDarkModeClickDirective, ButtonModule],
  templateUrl: './dark-mode-button.component.html',
  styleUrl: './dark-mode-button.component.scss'
})
export class DarkModeButtonComponent extends MCCoreComponent {
  isDarkModeActive = signal<boolean>(false);

  darkModeClass = 'dark';

  constructor() {
    super();
    afterNextRender(() => this.verifyIsDarkModeActive());
  }

  verifyIsDarkModeActive() {

    setTimeout(() => {
      const element = document.querySelector('html');
      this.isDarkModeActive.set(element.classList.contains(this.darkModeClass));
    }, 300);
  }
}

export class DarkModeButton extends MCComponent {
  constructor() {
    super(DarkModeButtonComponent);
  }
}
