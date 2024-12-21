import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MCMessage } from '../entities/mc-message';

@Injectable({
  providedIn: 'root'
})
export class MCMessagesService {

  messages = new Subject<MCMessage[]>();

  add(message: MCMessage) {
    this.messages.next([message]);
  }

  addAll(messages: MCMessage[]) {
    this.messages.next(messages);
  }

  clear() {
    this.messages.next([]);
  }

  observe(): Observable<MCMessage[]> {
    return this.messages.asObservable();
  }
}
