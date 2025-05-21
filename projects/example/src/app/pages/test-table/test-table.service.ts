import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MCApiRestHttpService } from '@mckit/core';
import { Observable, of, delay } from 'rxjs';
import { MOCK_PRODUCTS } from './mock-data';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TestTableService implements MCApiRestHttpService<Product> {
  private mockData: Product[] = MOCK_PRODUCTS;

  http: HttpClient = inject(HttpClient);
  baseUrl = 'http://localhost:3000';
  pathModel = 'products';

  private applyODataFilters(data: Product[], odataQuery: string): { data: Product[], total: number } {
    let filteredData = [...data];
    const queryParams = new URLSearchParams(odataQuery);

    // Apply $filter
    const filter = queryParams.get('$filter');
    if (filter) {
      filteredData = this.applyFilter(filteredData, filter);
    }

    // Apply $orderby
    const orderby = queryParams.get('$orderby');
    if (orderby) {
      filteredData = this.applyOrderBy(filteredData, orderby);
    }

    // Get total count before pagination
    const total = filteredData.length;

    // Apply $skip and $top for pagination
    const skip = parseInt(queryParams.get('$skip') || '0');
    const top = parseInt(queryParams.get('$top') || '10');
    filteredData = filteredData.slice(skip, skip + top);

    return { data: filteredData, total };
  }

  private applyFilter(data: Product[], filter: string): Product[] {
    // Simple filter implementation for common operators
    return data.filter(item => {
      // Handle basic equality filters (e.g., category eq 'Electronics')
      const eqMatch = filter.match(/(\w+)\s+eq\s+'([^']+)'/);
      if (eqMatch) {
        const [_, field, value] = eqMatch;
        return item[field as keyof Product]?.toString() === value;
      }

      // Handle contains filters (e.g., contains(name, 'iPhone'))
      const containsMatch = filter.match(/contains\((\w+),\s*'([^']+)'\)/);
      if (containsMatch) {
        const [_, field, value] = containsMatch;
        return item[field as keyof Product]?.toString().toLowerCase().includes(value.toLowerCase());
      }

      // Handle multiselect filters (e.g., category in ('Electronics', 'Clothing'))
      const inMatch = filter.match(/(\w+)\s+in\s+\(([^)]+)\)/);
      if (inMatch) {
        const [_, field, values] = inMatch;
        const valueList = values.split(',').map(v => v.trim().replace(/'/g, ''));
        return valueList.includes(item[field as keyof Product]?.toString());
      }

      // Handle greater than filters (e.g., price gt 100)
      const gtMatch = filter.match(/(\w+)\s+gt\s+(\d+)/);
      if (gtMatch) {
        const [_, field, value] = gtMatch;
        return Number(item[field as keyof Product]) > Number(value);
      }

      // Handle less than filters (e.g., price lt 100)
      const ltMatch = filter.match(/(\w+)\s+lt\s+(\d+)/);
      if (ltMatch) {
        const [_, field, value] = ltMatch;
        return Number(item[field as keyof Product]) < Number(value);
      }

      return true;
    });
  }

  private applyOrderBy(data: Product[], orderby: string): Product[] {
    const [field, direction] = orderby.split(' ');
    return [...data].sort((a, b) => {
      const aValue = a[field as keyof Product];
      const bValue = b[field as keyof Product];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'desc' 
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'desc' 
          ? bValue - aValue
          : aValue - bValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return direction === 'desc'
          ? bValue.getTime() - aValue.getTime()
          : aValue.getTime() - bValue.getTime();
      }

      return 0;
    });
  }

  list(odata?: string): Observable<{ data: Product[], total: number }> {
    const result = this.applyODataFilters(this.mockData, odata || '');
    return of(result).pipe(delay(1000));
  }

  create(item: Product): Observable<Product> {
    const newProduct = {
      ...item,
      id: this.mockData.length + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockData.push(newProduct);
    return of(newProduct).pipe(delay(500));
  }

  update(item: Product): Observable<Product> {
    const index = this.mockData.findIndex(p => p.id === item.id);
    if (index !== -1) {
      this.mockData[index] = {
        ...item,
        updatedAt: new Date()
      };
    }
    return of(this.mockData[index]).pipe(delay(500));
  }

  get(id: any): Observable<Product> {
    const product = this.mockData.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return of(product).pipe(delay(500));
  }

  delete(id: any): Observable<void> {
    const index = this.mockData.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockData.splice(index, 1);
    }
    return of(undefined).pipe(delay(500));
  }

  getCategories(query: string): Observable<Array<{ label: string, value: string }>> {
    const uniqueCategories = [...new Set(this.mockData.map(p => p.category))];
    const filteredCategories = uniqueCategories
      .filter(category => category.toLowerCase().includes(query.toLowerCase()))
      .map(category => ({ label: category, value: category }));
    return of(filteredCategories).pipe(delay(500));
  }
} 