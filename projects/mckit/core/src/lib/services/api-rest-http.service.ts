import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { MCListResponse } from '../entities/mc-list-response';

export abstract class MCApiRestHttpService<T extends { id?: any }> {

  http = inject(HttpClient);
  /**
   * Assign path model to use in the service
   */
  abstract pathModel: string;
  /**
   * Assign base url to use in the service
   */
  abstract baseUrl: string;

  get endpoint(): string {
    return `${this.baseUrl}${this.pathModel}`;
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.endpoint, item);
  }

  createInBulk(items: T[]): Observable<T> {
    return merge(...items.map(item => this.create(item)));
  }

  update(item: T): Observable<T> {
    return this.http.put<T>(`${this.endpoint}/${item.id}`, item);
  }

  list(queryParams?: string): Observable<MCListResponse<T>> {
    const queries = queryParams ? `?${queryParams}` : '';
    return this.http.get<MCListResponse<T>>(`${this.endpoint}${queries}`);
  }

  get(id: any): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
