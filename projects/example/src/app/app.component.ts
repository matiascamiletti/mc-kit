import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MCSidebarService } from '../../../mckit/layout/src/public-api';
import { MCSubtitle } from '../../../mckit/core/src/public-api';
import { MCImage } from '../../../mckit/core/src/lib/components/image/image.component';
import { MCMenu } from '../../../mckit/core/src/lib/components/menu/menu.component';
import { ItemCustomMenuComponent } from './components/item-custom-menu/item-custom-menu.component';

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
      new MCImage('https://tots.agency/assets/img/logos/logo-horiz-black-color.svg', 150),
      new MCSubtitle('MENU'),
      { component: ItemCustomMenuComponent, config: { }},
      new MCSubtitle('Inicio'),
      new MCSubtitle('Acerca de '),
      new MCSubtitle('Contacto'),
      new MCMenu([
        { label: 'Item 1', link: '/basic' },
        { label: 'Item 2', children: [
          { label: 'Sub Item 1', link: '/basic' },
          { label: 'Sub Item 2', link: '/basic' },
          { label: 'Sub Item 3', link: '/basic' },
        ] }
      ])
    ]);
  }
}
