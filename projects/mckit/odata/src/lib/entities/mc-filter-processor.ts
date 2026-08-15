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
    if (!event || !event.filters) {
      return odataFilter;
    }
    for (const field in event.filters) {
      const filterItem: any = event.filters[field];
      if (!filterItem) continue;
      const filters: FilterMetadata[] = Array.isArray(filterItem) ? filterItem : [filterItem];
      const filtersOdata = this.convertFilterToOData(field, filters);
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
      if (filter.value !== undefined && filter.value !== null && filter.value !== '') {
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
    // 1. Explicit lambda expression: e.g. 'categories/any(c: contains(c/name, ...))', 'categories/any(c: c/name)', 'categories/any(name)'
    const explicitLambdaMatch = key.match(/^([a-zA-Z0-9_/.]+)\/(any|all)\((?:([a-zA-Z0-9_]+)\s*:\s*)?([^)]*)\)$/);
    if (explicitLambdaMatch) {
      const navigationPath = explicitLambdaMatch[1].replace(/\./g, '/');
      const lambdaOp = explicitLambdaMatch[2] as 'any' | 'all';
      const lambdaVar = explicitLambdaMatch[3] || 'c';
      const innerTarget = (explicitLambdaMatch[4] || '').trim();

      if (!innerTarget) {
        return `${navigationPath}/${lambdaOp}()`;
      }

      if (innerTarget.includes('{value}') || innerTarget.includes('{v}')) {
        const val = filter.value;
        const formattedVal = Array.isArray(val)
          ? `(${val.map((v: any) => `'${v}'`).join(',')})`
          : `'${val}'`;
        const condition = innerTarget
          .replace(/\{value\}/g, formattedVal)
          .replace(/\{v\}/g, formattedVal);
        return `${navigationPath}/${lambdaOp}(${lambdaVar}: ${condition})`;
      }

      const prop = this.formatLambdaProperty(lambdaVar, innerTarget);
      const condition = this.mapCondition(prop, filter);
      return `${navigationPath}/${lambdaOp}(${lambdaVar}: ${condition})`;
    }

    // 2. Shorthand lambda notation: e.g. 'categories.any.name' or 'categories/any/name'
    const shorthandLambdaMatch = key.match(/^([a-zA-Z0-9_/]+)[./](any|all)[./]([a-zA-Z0-9_/.]+)$/);
    if (shorthandLambdaMatch) {
      const navigationPath = shorthandLambdaMatch[1].replace(/\./g, '/');
      const lambdaOp = shorthandLambdaMatch[2] as 'any' | 'all';
      const field = shorthandLambdaMatch[3];
      const lambdaVar = 'c';
      const prop = this.formatLambdaProperty(lambdaVar, field);
      const condition = this.mapCondition(prop, filter);
      return `${navigationPath}/${lambdaOp}(${lambdaVar}: ${condition})`;
    }

    // 3. Primitive collection lambda: e.g. 'tags.any' or 'tags/any'
    /*const primitiveLambdaMatch = key.match(/^([a-zA-Z0-9_/]+)[./](any|all)$/);
    if (primitiveLambdaMatch) {
      const navigationPath = primitiveLambdaMatch[1].replace(/\./g, '/');
      const lambdaOp = primitiveLambdaMatch[2] as 'any' | 'all';
      const lambdaVar = 'x';
      const condition = this.mapCondition(lambdaVar, filter);
      return `${navigationPath}/${lambdaOp}(${lambdaVar}: ${condition})`;
    }*/

    // 4. Single-valued navigation properties or standard field (e.g. 'category.name' -> 'category/name')
    //const normalizedKey = key.includes('.') ? key.replace(/\./g, '/') : key;
    return this.mapCondition(key, filter);
  }

  mapCondition(key: string, filter: FilterMetadata): string {
    let odataOperator;
    let odataFunction = false;
    let odataArray = false;

    switch (filter.matchMode) {
      case 'equals':
      case 'eq':
        odataOperator = `eq`;
        break;
      case 'notEquals':
      case 'ne':
        odataOperator = `ne`;
        break;
      case 'gt':
      case 'greaterThan':
        odataOperator = `gt`;
        break;
      case 'lt':
      case 'lessThan':
        odataOperator = `lt`;
        break;
      case 'ge':
      case 'gte':
      case 'greaterThanOrEqual':
        odataOperator = `ge`;
        break;
      case 'le':
      case 'lte':
      case 'lessThanOrEqual':
        odataOperator = `le`;
        break;
      case 'startsWith':
      case 'startswith':
        odataOperator = `startswith`;
        odataFunction = true;
        break;
      case 'contains':
      case 'substringof':
        odataOperator = `substringof`;
        odataFunction = true;
        break;
      case 'endsWith':
      case 'endswith':
        odataOperator = `endswith`;
        odataFunction = true;
        break;
      case 'in':
        odataOperator = `in`;
        odataArray = true;
        break;
      case 'between':
        if (Array.isArray(filter.value) && filter.value.length === 2) {
          return `${key} ge '${filter.value[0]}' and ${key} le '${filter.value[1]}'`;
        }
        throw new Error(`Filter matchMode 'between' requires an array of 2 values`);
      default:
        throw new Error(`Operator ${filter.matchMode} not supported`);
    }

    if (odataArray) {
      const values = Array.isArray(filter.value) ? filter.value : [filter.value];
      return `${key} ${odataOperator} (${values.map((v: any) => `'${v}'`).join(',')})`;
    }

    if (odataFunction) {
      return `${odataOperator}(${key}, '${filter.value}')`;
    }

    return `${key} ${odataOperator} '${filter.value}'`;
  }

  // ==========================================
  // Standard Filter Methods
  // ==========================================

  addEqualFilter(key: string, value: any): void {
    this.addODataFilter(`${key} eq '${value}'`);
  }

  addNotEqualFilter(key: string, value: any): void {
    this.addODataFilter(`${key} ne '${value}'`);
  }

  addGreaterThanFilter(key: string, value: any): void {
    this.addODataFilter(`${key} gt '${value}'`);
  }

  addLessThanFilter(key: string, value: any): void {
    this.addODataFilter(`${key} lt '${value}'`);
  }

  addGreaterThanOrEqualFilter(key: string, value: any): void {
    this.addODataFilter(`${key} ge '${value}'`);
  }

  addLessThanOrEqualFilter(key: string, value: any): void {
    this.addODataFilter(`${key} le '${value}'`);
  }

  addStartsWithFilter(key: string, value: string): void {
    this.addODataFilter(`startswith(${key}, '${value}')`);
  }

  addContainsFilter(key: string, value: string): void {
    this.addODataFilter(`substringof(${key}, '${value}')`);
  }

  addEndsWithFilter(key: string, value: string): void {
    this.addODataFilter(`endswith(${key}, '${value}')`);
  }

  addInFilter(key: string, values: any[]): void {
    this.addODataFilter(`${key} in (${values.map(v => `'${v}'`).join(',')})`);
  }

  addBetweenFilter(key: string, from: any, to: any): void {
    this.addODataFilter(`${key} ge '${from}' and ${key} le '${to}'`);
  }

  // ==========================================
  // Lambda / Relationship Filter Methods (any/all)
  // ==========================================

  /**
   * Helper to format a property path inside a lambda expression.
   * e.g. formatLambdaProperty('c', 'name') => 'c/name'
   * e.g. formatLambdaProperty('c', 'c/name') => 'c/name'
   * e.g. formatLambdaProperty('c', '') => 'c'
   */
  formatLambdaProperty(lambdaVar: string, field?: string): string {
    if (!field || field.trim() === '' || field === lambdaVar) {
      return lambdaVar;
    }
    const cleanField = field.trim().replace(/^\/+/, '').replace(/\./g, '/');
    if (cleanField === lambdaVar || cleanField.startsWith(`${lambdaVar}/`)) {
      return cleanField;
    }
    return `${lambdaVar}/${cleanField}`;
  }

  /**
   * Helper to build a lambda filter expression string.
   * e.g. buildLambdaFilter('categories', 'any', "contains(c/name, 'Tech')", 'c')
   * => "categories/any(c: contains(c/name, 'Tech'))"
   */
  buildLambdaFilter(navigationPath: string, lambdaOp: 'any' | 'all' = 'any', condition?: string, lambdaVar: string = 'c'): string {
    const cleanPath = navigationPath.replace(/\./g, '/').replace(/\/+$/, '');
    if (!condition || condition.trim() === '') {
      return `${cleanPath}/${lambdaOp}()`;
    }
    return `${cleanPath}/${lambdaOp}(${lambdaVar}: ${condition.trim()})`;
  }

  // --- Any Filter Methods ---

  /**
   * Adds an OData lambda 'any' filter on a collection navigation property.
   * 
   * Examples:
   * - addAnyFilter('categories', "contains(c/name, 'Tech')", 'c') => categories/any(c: contains(c/name, 'Tech'))
   * - addAnyFilter('categories', "c/id eq '123'", 'c') => categories/any(c: c/id eq '123')
   * - addAnyFilter('categories') => categories/any()
   */
  addAnyFilter(navigationPath: string, condition?: string, lambdaVar: string = 'c'): void {
    this.addODataFilter(this.buildLambdaFilter(navigationPath, 'any', condition, lambdaVar));
  }

  /**
   * Adds an OData lambda 'any' filter with OR operator.
   */
  addOrAnyFilter(navigationPath: string, condition?: string, lambdaVar: string = 'c'): void {
    this.addOrODataFilter(this.buildLambdaFilter(navigationPath, 'any', condition, lambdaVar));
  }

  /**
   * Adds an 'any' filter with sub-filter callback for chaining multiple conditions.
   * 
   * Example:
   * addAnyWithSubFilter('categories', (sub, c) => {
   *   sub.addContainsFilter(`${c}/name`, 'Tech');
   *   sub.addEqualFilter(`${c}/active`, true);
   * })
   * => categories/any(c: contains(c/name, 'Tech') and c/active eq 'true')
   */
  addAnyWithSubFilter(navigationPath: string, callback: (subProcessor: MCFilterProcessor, lambdaVar: string) => void, lambdaVar: string = 'c'): void {
    const sub = new MCFilterProcessor();
    callback(sub, lambdaVar);
    const condition = sub.toString();
    this.addAnyFilter(navigationPath, condition, lambdaVar);
  }

  /**
   * Adds an 'any' filter with contains condition.
   * Example: addAnyContainsFilter('categories', 'name', 'Tech') => categories/any(c: contains(c/name, 'Tech'))
   */
  addAnyContainsFilter(navigationPath: string, field: string, value: string, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAnyFilter(navigationPath, `contains(${prop}, '${value}')`, lambdaVar);
  }

  /**
   * Adds an 'any' filter with equality condition.
   * Example: addAnyEqualFilter('categories', 'id', '123') => categories/any(c: c/id eq '123')
   */
  addAnyEqualFilter(navigationPath: string, field: string, value: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAnyFilter(navigationPath, `${prop} eq '${value}'`, lambdaVar);
  }

  /**
   * Adds an 'any' filter with not-equal condition.
   * Example: addAnyNotEqualFilter('categories', 'id', '123') => categories/any(c: c/id ne '123')
   */
  addAnyNotEqualFilter(navigationPath: string, field: string, value: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAnyFilter(navigationPath, `${prop} ne '${value}'`, lambdaVar);
  }

  /**
   * Adds an 'any' filter with startsWith condition.
   * Example: addAnyStartsWithFilter('categories', 'name', 'Tech') => categories/any(c: startswith(c/name, 'Tech'))
   */
  addAnyStartsWithFilter(navigationPath: string, field: string, value: string, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAnyFilter(navigationPath, `startswith(${prop}, '${value}')`, lambdaVar);
  }

  /**
   * Adds an 'any' filter with endsWith condition.
   * Example: addAnyEndsWithFilter('categories', 'name', 'Tech') => categories/any(c: endswith(c/name, 'Tech'))
   */
  addAnyEndsWithFilter(navigationPath: string, field: string, value: string, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAnyFilter(navigationPath, `endswith(${prop}, '${value}')`, lambdaVar);
  }

  /**
   * Adds an 'any' filter with 'in' condition.
   * Example: addAnyInFilter('categories', 'id', ['1', '2']) => categories/any(c: c/id in ('1','2'))
   */
  addAnyInFilter(navigationPath: string, field: string, values: any[], lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAnyFilter(navigationPath, `${prop} in (${values.map(v => `'${v}'`).join(',')})`, lambdaVar);
  }

  /**
   * Adds an 'any' filter with greaterThan condition.
   */
  addAnyGreaterThanFilter(navigationPath: string, field: string, value: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAnyFilter(navigationPath, `${prop} gt '${value}'`, lambdaVar);
  }

  /**
   * Adds an 'any' filter with lessThan condition.
   */
  addAnyLessThanFilter(navigationPath: string, field: string, value: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAnyFilter(navigationPath, `${prop} lt '${value}'`, lambdaVar);
  }

  /**
   * Adds an 'any' filter with greaterThanOrEqual condition.
   */
  addAnyGreaterThanOrEqualFilter(navigationPath: string, field: string, value: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAnyFilter(navigationPath, `${prop} ge '${value}'`, lambdaVar);
  }

  /**
   * Adds an 'any' filter with lessThanOrEqual condition.
   */
  addAnyLessThanOrEqualFilter(navigationPath: string, field: string, value: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAnyFilter(navigationPath, `${prop} le '${value}'`, lambdaVar);
  }

  /**
   * Adds an 'any' filter with between condition.
   */
  addAnyBetweenFilter(navigationPath: string, field: string, from: any, to: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAnyFilter(navigationPath, `${prop} ge '${from}' and ${prop} le '${to}'`, lambdaVar);
  }

  // --- All Filter Methods ---

  /**
   * Adds an OData lambda 'all' filter on a collection navigation property.
   * 
   * Examples:
   * - addAllFilter('categories', "c/active eq true", 'c') => categories/all(c: c/active eq true)
   * - addAllFilter('categories') => categories/all()
   */
  addAllFilter(navigationPath: string, condition?: string, lambdaVar: string = 'c'): void {
    this.addODataFilter(this.buildLambdaFilter(navigationPath, 'all', condition, lambdaVar));
  }

  /**
   * Adds an OData lambda 'all' filter with OR operator.
   */
  addOrAllFilter(navigationPath: string, condition?: string, lambdaVar: string = 'c'): void {
    this.addOrODataFilter(this.buildLambdaFilter(navigationPath, 'all', condition, lambdaVar));
  }

  /**
   * Adds an 'all' filter with sub-filter callback.
   */
  addAllWithSubFilter(navigationPath: string, callback: (subProcessor: MCFilterProcessor, lambdaVar: string) => void, lambdaVar: string = 'c'): void {
    const sub = new MCFilterProcessor();
    callback(sub, lambdaVar);
    const condition = sub.toString();
    this.addAllFilter(navigationPath, condition, lambdaVar);
  }

  /**
   * Adds an 'all' filter with contains condition.
   * Example: addAllContainsFilter('categories', 'name', 'Tech') => categories/all(c: contains(c/name, 'Tech'))
   */
  addAllContainsFilter(navigationPath: string, field: string, value: string, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAllFilter(navigationPath, `contains(${prop}, '${value}')`, lambdaVar);
  }

  /**
   * Adds an 'all' filter with equality condition.
   * Example: addAllEqualFilter('categories', 'active', true) => categories/all(c: c/active eq 'true')
   */
  addAllEqualFilter(navigationPath: string, field: string, value: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAllFilter(navigationPath, `${prop} eq '${value}'`, lambdaVar);
  }

  /**
   * Adds an 'all' filter with not-equal condition.
   */
  addAllNotEqualFilter(navigationPath: string, field: string, value: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAllFilter(navigationPath, `${prop} ne '${value}'`, lambdaVar);
  }

  /**
   * Adds an 'all' filter with startsWith condition.
   */
  addAllStartsWithFilter(navigationPath: string, field: string, value: string, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAllFilter(navigationPath, `startswith(${prop}, '${value}')`, lambdaVar);
  }

  /**
   * Adds an 'all' filter with endsWith condition.
   */
  addAllEndsWithFilter(navigationPath: string, field: string, value: string, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAllFilter(navigationPath, `endswith(${prop}, '${value}')`, lambdaVar);
  }

  /**
   * Adds an 'all' filter with 'in' condition.
   */
  addAllInFilter(navigationPath: string, field: string, values: any[], lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAllFilter(navigationPath, `${prop} in (${values.map(v => `'${v}'`).join(',')})`, lambdaVar);
  }

  /**
   * Adds an 'all' filter with greaterThan condition.
   */
  addAllGreaterThanFilter(navigationPath: string, field: string, value: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAllFilter(navigationPath, `${prop} gt '${value}'`, lambdaVar);
  }

  /**
   * Adds an 'all' filter with lessThan condition.
   */
  addAllLessThanFilter(navigationPath: string, field: string, value: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAllFilter(navigationPath, `${prop} lt '${value}'`, lambdaVar);
  }

  /**
   * Adds an 'all' filter with greaterThanOrEqual condition.
   */
  addAllGreaterThanOrEqualFilter(navigationPath: string, field: string, value: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAllFilter(navigationPath, `${prop} ge '${value}'`, lambdaVar);
  }

  /**
   * Adds an 'all' filter with lessThanOrEqual condition.
   */
  addAllLessThanOrEqualFilter(navigationPath: string, field: string, value: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAllFilter(navigationPath, `${prop} le '${value}'`, lambdaVar);
  }

  /**
   * Adds an 'all' filter with between condition.
   */
  addAllBetweenFilter(navigationPath: string, field: string, from: any, to: any, lambdaVar: string = 'c'): void {
    const prop = this.formatLambdaProperty(lambdaVar, field);
    this.addAllFilter(navigationPath, `${prop} ge '${from}' and ${prop} le '${to}'`, lambdaVar);
  }

  // --- Single navigation property (1:1 / N:1 relation) helpers ---

  /**
   * Adds an equality filter on a single navigation property relation (e.g. category/name eq 'Tech').
   */
  addRelationEqualFilter(navigationPath: string, field: string, value: any): void {
    const path = `${navigationPath.replace(/\./g, '/')}/${field.replace(/\./g, '/')}`;
    this.addEqualFilter(path, value);
  }

  /**
   * Adds a contains filter on a single navigation property relation (e.g. contains(category/name, 'Tech')).
   */
  addRelationContainsFilter(navigationPath: string, field: string, value: string): void {
    const path = `${navigationPath.replace(/\./g, '/')}/${field.replace(/\./g, '/')}`;
    this.addContainsFilter(path, value);
  }

  // ==========================================
  // General Management Methods
  // ==========================================

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

  cleanOdata(): void {
    this.odata = undefined;
  }

  setOdata(odata: string): void {
    this.odata = odata;
  }

  // ==========================================
  // Prepend Methods
  // ==========================================

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

  setPrependGreaterThan(key: string, value: any) {
    this.prepend = `${key} gt '${value}'`;
  }

  setPrependLessThan(key: string, value: any) {
    this.prepend = `${key} lt '${value}'`;
  }

  setPrependGreaterThanOrEqual(key: string, value: any) {
    this.prepend = `${key} ge '${value}'`;
  }

  setPrependLessThanOrEqual(key: string, value: any) {
    this.prepend = `${key} le '${value}'`;
  }

  setPrependStartsWith(key: string, value: any) {
    this.prepend = `startswith(${key}, '${value}')`;
  }

  setPrependContains(key: string, value: any) {
    this.prepend = `substringof(${key}, '${value}')`;
  }

  cleanPrepend(): void {
    this.prepend = undefined;
  }

  // ==========================================
  // Postpend Methods
  // ==========================================

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

  setPostpendGreaterThan(key: string, value: any) {
    this.postpend = `${key} gt '${value}'`;
  }

  setPostpendLessThan(key: string, value: any) {
    this.postpend = `${key} lt '${value}'`;
  }

  setPostpendGreaterThanOrEqual(key: string, value: any) {
    this.postpend = `${key} ge '${value}'`;
  }

  setPostpendLessThanOrEqual(key: string, value: any) {
    this.postpend = `${key} le '${value}'`;
  }

  setPostpendStartsWith(key: string, value: any) {
    this.postpend = `startswith(${key}, '${value}')`;
  }

  setPostpendContains(key: string, value: any) {
    this.postpend = `substringof(${key}, '${value}')`;
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

  clone(): MCFilterProcessor {
    let filter = new MCFilterProcessor();
    filter.odata = this.odata;
    filter.prepend = this.prepend;
    filter.postpend = this.postpend;
    return filter;
  }
}
