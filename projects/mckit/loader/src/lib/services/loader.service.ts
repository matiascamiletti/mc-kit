import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MCLoaderService {

  isLoading = signal<boolean>(true);

  constructor() { }

  show(): void {
    this.isLoading.update(res => true);
  }

  hide(): void {
    this.isLoading.update(res => false);
  }
}
