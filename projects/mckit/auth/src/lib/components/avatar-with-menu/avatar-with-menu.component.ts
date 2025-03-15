import { afterNextRender, Component, inject, signal } from '@angular/core';
import { MCComponent, MCCoreComponent } from '@mckit/core';
import { MenuItem } from 'primeng/api';
import { MCAuthenticationService } from '../../services/authentication.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { InitialNamePipe } from '../../pipes/initial-name.pipe';
import { MCUser } from '../../entities/mc-user';

@Component({
  selector: 'mc-avatar-with-menu',
  imports: [CommonModule, ButtonModule, MenuModule, AvatarModule, InitialNamePipe],
  templateUrl: './avatar-with-menu.component.html',
  styleUrl: './avatar-with-menu.component.scss'
})
export class AvatarWithMenuComponent extends MCCoreComponent {

  authService = inject(MCAuthenticationService);

  user = signal<MCUser|undefined>(undefined);
  items = signal<Array<MenuItem>>([]);

  constructor() {
    super();
    afterNextRender(() => {
      this.loadUser();
    });
  }

  loadMenu() {
    let items = this.component.config.items ?? [];
    if(items.length == 0){
      return;
    }

    items[0].label = `Hi ${this.user()?.firstname}`;
    this.items.set(items);
  }

  loadUser() {
    this.authService.getUser()
    .pipe(tap(user => this.user.set(user)))
    .subscribe(user => this.loadMenu());
  }
}

export class MCAvatarWithMenu extends MCComponent {
  constructor(
    items: Array<MenuItem>
  ) {
    super(AvatarWithMenuComponent);

    this.config = {
      items: items
    };
  }
}
