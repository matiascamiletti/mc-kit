import { Injectable, signal } from '@angular/core';
import { MCComponent, McComponentService } from '@mckit/core';

export const ID_SIDEBAR_MC_COMPONENT = 'mc_sidebar';

@Injectable({
  providedIn: 'root'
})
export class MCSidebarService {

  isOpen = signal<boolean>(true);

  constructor(
    protected componentService: McComponentService
  ) { }

  public addComponent(component: MCComponent): void {
    this.componentService.addComponent(ID_SIDEBAR_MC_COMPONENT, component);
  }

  public getComponents(): Array<MCComponent> {
    return this.componentService.getComponents(ID_SIDEBAR_MC_COMPONENT);
  }

  public setComponents(components: Array<MCComponent>): void {
    this.componentService.setComponents(ID_SIDEBAR_MC_COMPONENT, components);
  }
}
