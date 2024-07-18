import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MCSidebarService } from '../../../mckit/layout/src/public-api';
import { MCSubtitle } from '@mckit/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'example';

  constructor(
    protected sidebarService: MCSidebarService
  ){}

  ngOnInit(): void {
    this.loadSidebar();
  }

  loadSidebar() {
    /**
     * Add component in sidebar one to one
     */
    //this.sidebarService.addComponent(new MCSubtitle('MENU'));

    /**
     * Add components in sidebar all at once
     */
    this.sidebarService.setComponents([
      new MCSubtitle('MENU'),
      new MCSubtitle('Inicio'),
      new MCSubtitle('Acerca de '),
      new MCSubtitle('Contacto')
    ]);
  }
}
