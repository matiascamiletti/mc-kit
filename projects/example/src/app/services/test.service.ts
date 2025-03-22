import { Injectable } from '@angular/core';
import { MCApiRestHttpService } from '@mckit/core';

@Injectable({
  providedIn: 'root'
})
export class TestService extends MCApiRestHttpService<any> {

  override baseUrl: string = 'https://tots.agency/';
}
