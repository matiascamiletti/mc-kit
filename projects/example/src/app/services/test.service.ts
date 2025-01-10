import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MCChatbotMessage, MCChatbotMessageType } from '../../../../mckit/chatbot/src/lib/entities/chatbot-message';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  http = inject(HttpClient);

  sendMessage(message: string): Observable<MCChatbotMessage> {
    return this.http.post('https://myback-execute-dot-my-back-401316.uc.r.appspot.com/11-my-first-project-1736547661446/test', { message })
    .pipe(map((response: any) => {
      let obj = new MCChatbotMessage();
      obj.sender = 'IA';
      obj.message = response.data[0].message.content;
      obj.type = MCChatbotMessageType.BOT;
      return obj;
    }));
  }
}
