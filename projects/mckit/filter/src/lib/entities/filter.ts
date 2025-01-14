import { Observable } from "rxjs";
import { MCItemFilter } from "./item-filter";

export enum MCTypeFilter {
  TEXT,
  SELECT,
  AUTOCOMPLETE
}

export class MCFilter {

  title: string = '';
  type: MCTypeFilter = MCTypeFilter.TEXT;
  key: string = '';
  data: any;

  options: Array<MCItemFilter> = [];

  isQuickFilter: boolean = false;
  isShowConditions: boolean = true;

  static text(data: { title: string, key: string }): MCFilter {
    let filter = new MCFilter();
    filter.type = MCTypeFilter.TEXT;
    filter.title = data.title;
    filter.key = data.key;
    return filter;
  }

  static select(data: { title: string, key: string, options: Array<MCItemFilter>, placeholder?: string }): MCFilter {
    let filter = new MCFilter();
    filter.type = MCTypeFilter.SELECT;
    filter.title = data.title;
    filter.key = data.key;
    filter.options = data.options;
    filter.data = { placeholder: data.placeholder };
    return filter;
  }

  static autocomplete(data: { title: string, key: string, placeholder?: string, filter: (query: string) => Observable<Array<MCItemFilter>> }): MCFilter {
    let filter = new MCFilter();
    filter.type = MCTypeFilter.AUTOCOMPLETE;
    filter.title = data.title;
    filter.key = data.key;
    filter.data = { filter: data.filter };
    return filter;
  }

  static textQuickFilter(data: { title: string, key: string, options: Array<MCItemFilter>, placeholder?: string }): MCFilter {
    let filter = this.text(data);
    filter.options = data.options;
    filter.isQuickFilter = true;
    return filter;
  }

  static selectQuickFilter(data: { title: string, key: string, options: Array<MCItemFilter>, placeholder?: string }): MCFilter {
    let filter = this.select(data);
    filter.isQuickFilter = true;
    return filter;
  }

  static autocompleteQuickFilter(data: { title: string, key: string, placeholder?: string, filter: (query: string) => Observable<Array<MCItemFilter>> }): MCFilter {
    let filter = this.autocomplete(data);
    filter.isQuickFilter = true;
    return filter;
  }
}
