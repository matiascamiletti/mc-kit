import { inject, Injectable, signal } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MCUser } from '../entities/mc-user';
import { map, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MC_AUTH_CONFIG } from '../entities/mc-auth-config';

export const MC_AUTH_KEY_STORAGE_TOKEN = 'mc.auth.storage';

@Injectable({
  providedIn: 'root'
})
export class MCAuthenticationService {

  http = inject(HttpClient);

  config = inject(MC_AUTH_CONFIG);

  isLogged = signal<boolean>(false);

  constructor(
    private storage: StorageMap
  ) {
    this.initialize();
  }

  saveUser(user: MCUser): Observable<undefined> {
    return this.storage.set(MC_AUTH_KEY_STORAGE_TOKEN, JSON.stringify(user), { type: 'string' })
    .pipe(tap(res => this.isLogged.update(res => true)));
  }

  getUser(): Observable<MCUser|undefined> {
    return this.storage.get(MC_AUTH_KEY_STORAGE_TOKEN, { type: 'string' })
    .pipe(map(data => {
      if(data == undefined||data == ''){
        return;
      }
      return JSON.parse(data);
    }));
  }

  removeUser(): Observable<any> {
    return this.storage.delete(MC_AUTH_KEY_STORAGE_TOKEN);
  }

  initialize() {
    this.getUser()
    .subscribe(user => {
      if(user == undefined){
        return;
      }

      this.isLogged.update(res => true);
    });
  }

  signIn(data: any): Observable<MCUser> {
    return this.http.post<MCUser>(`${this.config.baseUrl}oauth/token`, data)
    .pipe(
      switchMap(user => this.saveUser(user).pipe(map(res => user)))
    );
  }

  register(data: any): Observable<MCUser> {
    return this.http.post<MCUser>(`${this.config.baseUrl}users`, data)
    .pipe(
      switchMap(() => this.signIn(data)),
      switchMap(user => this.saveUser(user).pipe(map(res => user)))
    );
  }
}
