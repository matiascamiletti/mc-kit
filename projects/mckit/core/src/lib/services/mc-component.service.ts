import { Injectable } from '@angular/core';
import { MCComponent } from '../entities/mc-component';

@Injectable({
  providedIn: 'root'
})
export class McComponentService {

  private inMemory: any = {};

  constructor() { }

  public getComponents(id: string): any {
    return this.inMemory[id];
  }

  public addComponent(id: string, component: MCComponent): void {
    // verify if exist id
    if (!this.inMemory[id]) {
      this.inMemory[id] = [];
    }
    this.inMemory[id].push(component);
  }

  public setComponents(id: string, components: Array<MCComponent>): void {
    this.inMemory[id] = components;
  }

  public deleteComponents(id: string): void {
    delete this.inMemory[id];
  }

  public clear(): void {
    this.inMemory = {};
  }

  public getIds(): string[] {
    return Object.keys(this.inMemory);
  }
}
