import { Injectable, signal } from '@angular/core';
import { MCComponent, McComponentService } from '@mckit/core';

export const ID_TOPBAR_MC_COMPONENT = 'mc_topbar';

@Injectable({
  providedIn: 'root'
})
export class MCTopbarService {

  subtitle = signal<string>('');

  constructor(
    protected componentService: McComponentService
  ) { }

  public addComponentToLeft(component: MCComponent): void {
    this.componentService.addComponent(ID_TOPBAR_MC_COMPONENT + '_left', component);
  }

  public getComponentsInLeft(): Array<MCComponent> {
    return this.componentService.getComponents(ID_TOPBAR_MC_COMPONENT + '_left');
  }

  public setComponentsInLeft(components: Array<MCComponent>): void {
    this.componentService.setComponents(ID_TOPBAR_MC_COMPONENT + '_left', components);
  }

  public addComponentToRight(component: MCComponent): void {
    this.componentService.addComponent(ID_TOPBAR_MC_COMPONENT + '_right', component);
  }

  public getComponentsInRight(): Array<MCComponent> {
    return this.componentService.getComponents(ID_TOPBAR_MC_COMPONENT + '_right');
  }

  public setComponentsInRight(components: Array<MCComponent>): void {
    this.componentService.setComponents(ID_TOPBAR_MC_COMPONENT + '_right', components);
  }

  public addComponentToCenter(component: MCComponent): void {
    this.componentService.addComponent(ID_TOPBAR_MC_COMPONENT + '_center', component);
  }

  public getComponentsInCenter(): Array<MCComponent> {
    return this.componentService.getComponents(ID_TOPBAR_MC_COMPONENT + '_center');
  }

  public setComponentsInCenter(components: Array<MCComponent>): void {
    this.componentService.setComponents(ID_TOPBAR_MC_COMPONENT + '_center', components);
  }
}
