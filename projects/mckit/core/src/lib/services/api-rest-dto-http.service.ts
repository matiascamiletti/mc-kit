import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, merge, Observable } from 'rxjs';
import { MCListResponse } from '../entities/mc-list-response';

export abstract class MCApiRestDtoHttpService<DTO extends { id?: any }, ENTITY extends { id?: any }> {

  http = inject(HttpClient);
  /**
   * Assign path model to use in the service
   */
  abstract pathModel: string;
  /**
   * Assign base url to use in the service
   */
  abstract baseUrl: string;

  abstract mapDtoToEntity(dto: DTO): ENTITY;

  abstract mapEntityToDto(entity: ENTITY): DTO;

  get endpoint(): string {
    return `${this.baseUrl}${this.pathModel}`;
  }

  create(item: ENTITY): Observable<ENTITY> {
    return this.http.post<DTO>(this.endpoint, this.mapEntityToDto(item)).pipe(map(dto => this.mapDtoToEntity(dto)));
  }

  createInBulk(items: ENTITY[]): Observable<ENTITY> {
    return merge(...items.map(item => this.create(item)));
  }

  update(item: ENTITY): Observable<ENTITY> {
    return this.http.put<DTO>(`${this.endpoint}/${item.id}`, this.mapEntityToDto(item)).pipe(map(dto => this.mapDtoToEntity(dto)));
  }

  list(queryParams?: string): Observable<MCListResponse<ENTITY>> {
    const queries = queryParams ? `?${queryParams}` : '';
    return this.http.get<MCListResponse<DTO>>(`${this.endpoint}${queries}`).pipe(map(response => {
        return {
          ...response,
          data: response.data.map(this.mapDtoToEntity),
        };
    }));
  }

  get(id: any): Observable<ENTITY> {
    return this.http.get<DTO>(`${this.endpoint}/${id}`).pipe(map(dto => this.mapDtoToEntity(dto)));
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
