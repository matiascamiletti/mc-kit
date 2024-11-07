import { FilterMetadata } from "primeng/api";
import { TableFilterEvent } from "primeng/table";

export class MCFilterProcessor {

  odata?: string;
  prepend?: string;
  postpend?: string;

  addTableFilters(event: TableFilterEvent): void {
    const odataFilter = this.convertTableFilterToOData(event);
    if (odataFilter) {
      this.addODataFilter(odataFilter);
    }
  }

  setTableFilters(event: TableFilterEvent): void {
    this.odata = this.convertTableFilterToOData(event);
  }

  convertTableFilterToOData(event: TableFilterEvent): string {
    let odataFilter = '';
    for (const field in event.filters) {
      let filters: any = event.filters[field];
      let filtersOdata = this.convertFilterToOData(field, filters);
      if (filtersOdata) {
        if (odataFilter) {
          odataFilter += ` and (${filtersOdata})`;
        } else {
          odataFilter = filtersOdata;
        }
      }
    }
    return odataFilter;
  }

  convertFilterToOData(fieldKey: string, filters: FilterMetadata[]): string {
    let odataFilter = '';
    for (const filter of filters) {
      if (filter.value) {
        const odataCondition = this.mapFilterToOData(fieldKey, filter);
        if (odataFilter) {
          odataFilter += ` ${filter.operator == 'or' ? 'or' : 'and'} ${odataCondition}`;
        } else {
          odataFilter = odataCondition;
        }
      }
    }
    return odataFilter;
  }

  mapFilterToOData(key: string, filter: FilterMetadata): string {
    let odataOperator;
    let odataFunction = false;

    switch (filter.matchMode) {
      case 'equals':
        odataOperator = `eq`;
        break;
      case 'notEquals':
        odataOperator = `ne`;
        break;
      case 'startsWith':
        odataOperator = `startswith`;
        odataFunction = true;
        break;
      case 'contains':
        odataOperator = `substringof`;
        odataFunction = true;
        break;
      case 'endsWith':
        odataOperator = `endswith`;
        odataFunction = true;
        break;
      default:
        throw new Error(`Operator ${filter.matchMode} not supported`);
    }

    if(odataFunction){
      return `${odataOperator}('${filter.value}', ${key})`;
    }

    return `${key} ${odataOperator} '${filter.value}'`;
  }

  addODataFilter(filter: string): void {
    if (this.odata) {
      this.odata += ` and ${filter}`;
    } else {
      this.odata = filter;
    }
  }

  addOrODataFilter(filter: string): void {
    if (this.odata) {
      this.odata += ` or ${filter}`;
    } else {
      this.odata = filter;
    }
  }

  setPrepend(prepend: string): void {
    this.prepend = prepend;
  }

  setPrependFilter(key: string, filter: FilterMetadata) {
    this.prepend = this.mapFilterToOData(key, filter);
  }

  setPrependEquals(key: string, value: any) {
    this.prepend = `${key} eq '${value}'`;
  }

  setPrependNotEquals(key: string, value: any) {
    this.prepend = `${key} ne '${value}'`;
  }

  setPrependStartsWith(key: string, value: any) {
    this.prepend = `startswith(${key}, '${value}')`;
  }

  setPrependContains(key: string, value: any) {
    this.prepend = `substringof('${value}', ${key})`;
  }

  cleanPrepend(): void {
    this.prepend = undefined;
  }

  setPostpend(postpend: string): void {
    this.postpend = postpend;
  }

  setPostpendFilter(key: string, filter: FilterMetadata) {
    this.postpend = this.mapFilterToOData(key, filter);
  }

  setPostpendEquals(key: string, value: any) {
    this.postpend = `${key} eq '${value}'`;
  }

  setPostpendNotEquals(key: string, value: any) {
    this.postpend = `${key} ne '${value}'`;
  }

  setPostpendStartsWith(key: string, value: any) {
    this.postpend = `startswith(${key}, '${value}')`;
  }

  setPostpendContains(key: string, value: any) {
    this.postpend = `substringof('${value}', ${key})`;
  }

  cleanPostpend(): void {
    this.postpend = undefined;
  }

  toString(): string {
    let data = '';
    if (this.prepend) {
      data += this.prepend;
    }
    if (this.odata) {
      data += `${data ? ' and ' : ''}${this.odata}`;
    }
    if (this.postpend) {
      data += `${data ? ' and ' : ''}${this.postpend}`;
    }

    return data;
  }
}