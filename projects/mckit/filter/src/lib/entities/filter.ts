import { MCItemFilter } from "./item-filter";

export enum MCTypeFilter {
  TEXT
}

export class MCFilter {

  title: string = '';
  type: MCTypeFilter = MCTypeFilter.TEXT;
  key: string = '';
  data: any;

  options: Array<MCItemFilter> = [];

  isQuickFilter: boolean = false;

  static text(title: string, key: string): MCFilter {
    let filter = new MCFilter();
    filter.title = title;
    filter.key = key;
    return filter;
  }

  static textQuickFilter(title: string, key: string, options: Array<MCItemFilter>): MCFilter {
    let filter = new MCFilter();
    filter.title = title;
    filter.key = key;
    filter.options = options;
    filter.isQuickFilter = true;
    return filter;
  }
}
