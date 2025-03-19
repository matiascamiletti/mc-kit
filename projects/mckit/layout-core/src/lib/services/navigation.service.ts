import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MCNavigationService {

  isMain = signal<boolean>(true);

  onBack = new Subject<void>();

}
