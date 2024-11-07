import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MCListResponse } from '../entities/mc-list-response';

export abstract class MCApiRestHttpService<T extends { id?: any }> {

  http = inject(HttpClient);
  /**
   * Assign path model to use in the service
   */
  pathModel: string = '';
  /**
   * Assign base url to use in the service
   */
  baseUrl: string = '';

  create(item: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${this.pathModel}`, item);
  }

  update(item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${this.pathModel}/${item.id}`, item);
  }

  list(queryParams?: string): Observable<MCListResponse<T>> {
    return this.http.get<MCListResponse<T>>(`${this.baseUrl}${this.pathModel}?${queryParams}`);
  }

  get(id: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${this.pathModel}/${id}`);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.pathModel}/${id}`);
  }
}
