import { Injectable } from '@angular/core';
import { MCConditionResult, MCResultFilter } from '../entities/result';

@Injectable({
  providedIn: 'root'
})
export class MCFilterOdataConverterService {

  convert(filters: Array<MCResultFilter>): string {
    let result = this.filtersToOdata(filters);
    return result;
  }

  filtersToOdata(filters: Array<MCResultFilter>): string {
    let result = '';
    for (let i = 0; i < filters.length; i++) {
      const element = filters[i];
      result += this.filterToOdata(element, i == 0);
    }
    return result;
  }

  filterToOdata(filter: MCResultFilter, isFirst: boolean): string {
    let result = '';
    if(filter.childrens != undefined){
      result += !isFirst ? ' ' + filter.operator + ' (' : '(';
      result += this.filtersToOdata(filter.childrens);
      result += ')';
    } else {
      result += !isFirst ? ' ' + filter.operator + ' ' : '';
      result += this.mapFilterToOData(filter);
    }
    return result;
  }

  mapFilterToOData(filter: MCResultFilter): string {
    if(filter.condition == undefined){
      return '';
    }

    switch(filter.condition){
      case MCConditionResult.EQUALS:
        return `${filter.filter!.key} eq '${filter.value}'`;
      case MCConditionResult.CONTAINS:
        return `substringof(${filter.filter!.key}, '${filter.value}')`;
    }

    return '';
  }
}
