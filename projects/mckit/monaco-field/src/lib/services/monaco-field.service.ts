import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonacoFieldService {

  completionProviders = new Array<any>();

  addCompletionProvider(ref: any): void {
    this.completionProviders.push(ref);
  }

  cleanCompletionProviders(): void {
    this.completionProviders.forEach((provider) => {
      provider.dispose();
    });
    this.completionProviders = [];
  }
}
