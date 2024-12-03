import { Injectable, signal } from '@angular/core';
import { MCComponent, McComponentService } from '@mckit/core';

export const ID_FOOTER_MC_COMPONENT = 'mc_footer';

@Injectable({
  providedIn: 'root'
})
export class MCFooterService {

  constructor(
    protected componentService: McComponentService
  ) { }

  public addComponent(component: MCComponent): void {
    this.componentService.addComponent(ID_FOOTER_MC_COMPONENT, component);
  }

  public getComponents(): Array<MCComponent> {
    return this.componentService.getComponents(ID_FOOTER_MC_COMPONENT);
  }

  public setComponents(components: Array<MCComponent>): void {
    this.componentService.setComponents(ID_FOOTER_MC_COMPONENT, components);
  }
}
