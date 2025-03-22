import { Injectable } from '@angular/core';
import { MCApiRestHttpService, MCListResponse } from '@mckit/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService extends MCApiRestHttpService<any> {

  override baseUrl: string = 'https://tots.agency/';

  override list(queryParams?: string): Observable<MCListResponse<any>> {
    return of(
      { data: [
        { name: 'John Doe', game_number: 1, status: 'Active', field: 'Field 1' },
        { name: 'Jane Doe', game_number: 2, status: 'Inactive', field: 'Field 2' },
        { name: 'John Smith', game_number: 3, status: 'Active', field: 'Field 3' },
        { name: 'Jane Smith', game_number: 4, status: 'Inactive', field: 'Field 4' },
        { name: 'John Doe', game_number: 5, status: 'Active', field: 'Field 5' },
        { name: 'Jane Doe', game_number: 6, status: 'Inactive', field: 'Field 6' },
        { name: 'John Smith', game_number: 7, status: 'Active', field: 'Field 7' },
        { name: 'Jane Smith', game_number: 8, status: 'Inactive', field: 'Field 8' },
        { name: 'John Doe', game_number: 9, status: 'Active', field: 'Field 9' },
        { name: 'Jane Doe', game_number: 10, status: 'Inactive', field: 'Field 10' }
      ] }
    );
  }
}
