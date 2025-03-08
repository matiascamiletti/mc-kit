import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MCNavigationService {

  isMain = signal<boolean>(true);

}
