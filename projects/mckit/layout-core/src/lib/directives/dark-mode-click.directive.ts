import { Directive, HostListener, input } from '@angular/core';

declare const document: any;

@Directive({
  selector: '[mcDarkModeClick]'
})
export class MCDarkModeClickDirective {

  darkClassName = input<string>('my-app-dark');

  constructor() { }

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    const element = document.querySelector('html');
    element.classList.toggle(this.darkClassName());
  }
}
