import { MCFilterProcessor } from './mc-filter-processor';
import { MCOdata } from './mc-odata';
import { TableFilterEvent } from 'primeng/table';

describe('MCFilterProcessor & MCOdata', () => {
  let processor: MCFilterProcessor;

  beforeEach(() => {
    processor = new MCFilterProcessor();
  });

  describe('Basic filters', () => {
    it('should generate equality filter', () => {
      processor.addEqualFilter('name', 'John');
      expect(processor.toString()).toBe("name eq 'John'");
    });

    it('should generate contains filter', () => {
      processor.addContainsFilter('name', 'John');
      expect(processor.toString()).toBe("contains(name, 'John')");
    });

    it('should keep field name as-is in addEqualFilter and normalize via addRelationEqualFilter', () => {
      processor.addEqualFilter('category.name', 'Tech');
      expect(processor.toString()).toBe("category.name eq 'Tech'");

      processor.cleanOdata();
      processor.addRelationEqualFilter('category', 'name', 'Tech');
      expect(processor.toString()).toBe("category/name eq 'Tech'");
    });

    it('should support all standard comparison and string filters', () => {
      processor.addNotEqualFilter('status', 'deleted');
      processor.addGreaterThanFilter('age', 18);
      processor.addLessThanFilter('age', 65);
      processor.addGreaterThanOrEqualFilter('score', 10);
      processor.addLessThanOrEqualFilter('score', 100);
      processor.addStartsWithFilter('code', 'PRE');
      processor.addEndsWithFilter('code', 'SUF');
      processor.addInFilter('role', ['admin', 'user']);
      processor.addBetweenFilter('created', '2020-01-01', '2025-01-01');

      expect(processor.toString()).toContain("status ne 'deleted'");
      expect(processor.toString()).toContain("age gt '18'");
      expect(processor.toString()).toContain("age lt '65'");
      expect(processor.toString()).toContain("score ge '10'");
      expect(processor.toString()).toContain("score le '100'");
      expect(processor.toString()).toContain("startswith(code, 'PRE')");
      expect(processor.toString()).toContain("endswith(code, 'SUF')");
      expect(processor.toString()).toContain("role in ('admin','user')");
      expect(processor.toString()).toContain("created ge '2020-01-01' and created le '2025-01-01'");
    });
  });

  describe('Relationship and Lambda filters (any/all)', () => {
    it('should add explicit lambda condition using addAnyFilter', () => {
      processor.addAnyFilter('categories', "contains(c/name, 'Tech')", 'c');
      expect(processor.toString()).toBe("categories/any(c: contains(c/name, 'Tech'))");
    });

    it('should add empty any filter if no condition provided', () => {
      processor.addAnyFilter('categories');
      expect(processor.toString()).toBe('categories/any()');
    });

    it('should add any filter with contains using addAnyContainsFilter', () => {
      processor.addAnyContainsFilter('categories', 'name', 'Tech');
      expect(processor.toString()).toBe("categories/any(c: contains(c/name, 'Tech'))");
    });

    it('should add any filter with equality using addAnyEqualFilter', () => {
      processor.addAnyEqualFilter('categories', 'id', '123');
      expect(processor.toString()).toBe("categories/any(c: c/id eq '123')");
    });

    it('should add any filter with not-equal using addAnyNotEqualFilter', () => {
      processor.addAnyNotEqualFilter('categories', 'status', 'inactive');
      expect(processor.toString()).toBe("categories/any(c: c/status ne 'inactive')");
    });

    it('should add any filter with in operator using addAnyInFilter', () => {
      processor.addAnyInFilter('categories', 'id', ['1', '2']);
      expect(processor.toString()).toBe("categories/any(c: c/id in ('1','2'))");
    });

    it('should add any filter with startsWith using addAnyStartsWithFilter', () => {
      processor.addAnyStartsWithFilter('categories', 'code', 'CAT');
      expect(processor.toString()).toBe("categories/any(c: startswith(c/code, 'CAT'))");
    });

    it('should add any filter with between using addAnyBetweenFilter', () => {
      processor.addAnyBetweenFilter('products', 'price', 10, 50, 'p');
      expect(processor.toString()).toBe("products/any(p: p/price ge '10' and p/price le '50')");
    });

    it('should support remaining any and all filter helpers', () => {
      processor.addAnyEndsWithFilter('categories', 'name', 'End');
      processor.addAnyGreaterThanFilter('categories', 'count', 5);
      processor.addAnyLessThanFilter('categories', 'count', 10);
      processor.addAnyGreaterThanOrEqualFilter('categories', 'count', 1);
      processor.addAnyLessThanOrEqualFilter('categories', 'count', 20);
      processor.addOrAnyFilter('categories', "c/id eq '1'");

      expect(processor.toString()).toContain("categories/any(c: endswith(c/name, 'End'))");
      expect(processor.toString()).toContain("categories/any(c: c/count gt '5')");
      expect(processor.toString()).toContain("categories/any(c: c/count lt '10')");
      expect(processor.toString()).toContain("categories/any(c: c/count ge '1')");
      expect(processor.toString()).toContain("categories/any(c: c/count le '20')");
      expect(processor.toString()).toContain("or categories/any(c: c/id eq '1')");

      processor.cleanOdata();
      processor.addAllEqualFilter('categories', 'active', true);
      processor.addAllNotEqualFilter('categories', 'status', 'archived');
      processor.addAllStartsWithFilter('categories', 'code', 'A');
      processor.addAllEndsWithFilter('categories', 'code', 'Z');
      processor.addAllInFilter('categories', 'type', [1, 2]);
      processor.addAllGreaterThanFilter('categories', 'rank', 0);
      processor.addAllLessThanFilter('categories', 'rank', 100);
      processor.addAllGreaterThanOrEqualFilter('categories', 'rank', 1);
      processor.addAllLessThanOrEqualFilter('categories', 'rank', 99);
      processor.addAllBetweenFilter('categories', 'rank', 10, 20);
      processor.addOrAllFilter('categories', "c/valid eq 'true'");
      processor.addAllWithSubFilter('tags', (sub, t) => {
        sub.addEqualFilter(`${t}/enabled`, true);
      }, 't');

      expect(processor.toString()).toContain("categories/all(c: c/active eq 'true')");
      expect(processor.toString()).toContain("tags/all(t: t/enabled eq 'true')");
    });

    it('should add all filter using addAllFilter and addAllContainsFilter', () => {
      processor.addAllContainsFilter('categories', 'name', 'Tech');
      expect(processor.toString()).toBe("categories/all(c: contains(c/name, 'Tech'))");
    });

    it('should support sub-processor chaining via addAnyWithSubFilter', () => {
      processor.addAnyWithSubFilter('categories', (sub, c) => {
        sub.addContainsFilter(`${c}/name`, 'Tech');
        sub.addEqualFilter(`${c}/active`, true);
      });
      expect(processor.toString()).toBe("categories/any(c: contains(c/name, 'Tech') and c/active eq 'true')");
    });
  });

  describe('Single navigation property relationship helpers', () => {
    it('should add relation equal filter', () => {
      processor.addRelationEqualFilter('category', 'name', 'Tech');
      expect(processor.toString()).toBe("category/name eq 'Tech'");
    });

    it('should add relation contains filter', () => {
      processor.addRelationContainsFilter('category', 'name', 'Tech');
      expect(processor.toString()).toBe("contains(category/name, 'Tech')");
    });
  });

  describe('TableFilterEvent conversion with relationships', () => {
    it('should convert shorthand dotted lambda filter (categories.any.name)', () => {
      const event: TableFilterEvent = {
        filters: {
          'categories.any.name': [
            { value: 'Tech', matchMode: 'contains', operator: 'and' }
          ]
        } as any
      };
      const odata = processor.convertTableFilterToOData(event);
      expect(odata).toBe("categories/any(c: contains(c/name, 'Tech'))");
    });

    it('should convert explicit lambda key (categories/any(c: c/name)) and {value} placeholder', () => {
      const event: TableFilterEvent = {
        filters: {
          'categories/any(c: c/name)': [
            { value: 'Tech', matchMode: 'contains', operator: 'and' }
          ]
        } as any
      };
      expect(processor.convertTableFilterToOData(event)).toBe("categories/any(c: contains(c/name, 'Tech'))");

      const placeholderEvent: TableFilterEvent = {
        filters: {
          'tags/any(x: x eq {value})': [
            { value: 'Tech', matchMode: 'equals', operator: 'and' }
          ]
        } as any
      };
      expect(processor.convertTableFilterToOData(placeholderEvent)).toBe("tags/any(x: x eq 'Tech')");
    });

    it('should convert standard key (category.name) using mapCondition', () => {
      const event: TableFilterEvent = {
        filters: {
          'category.name': [
            { value: 'Tech', matchMode: 'equals', operator: 'and' }
          ]
        } as any
      };
      const odata = processor.convertTableFilterToOData(event);
      expect(odata).toBe("category.name eq 'Tech'");
    });

    it('should convert key (tags.any) using mapCondition', () => {
      const event: TableFilterEvent = {
        filters: {
          'tags.any': [
            { value: 'Tech', matchMode: 'contains', operator: 'and' }
          ]
        } as any
      };
      const odata = processor.convertTableFilterToOData(event);
      expect(odata).toBe("contains(tags.any, 'Tech')");
    });

    it('should support setTableFilters, addTableFilters, and all matchModes in mapCondition', () => {
      const event: TableFilterEvent = {
        filters: {
          price: [
            { value: [10, 20], matchMode: 'between', operator: 'and' }
          ],
          status: { value: ['open', 'pending'], matchMode: 'in', operator: 'and' }
        } as any
      };
      processor.setTableFilters(event);
      expect(processor.toString()).toBe("price ge '10' and price le '20' and (status in ('open','pending'))");

      processor.addTableFilters({
        filters: {
          age: { value: 30, matchMode: 'gte' } as any
        }
      });
      expect(processor.toString()).toContain("and age ge '30'");

      expect(() => processor.mapCondition('price', { value: [1], matchMode: 'between' })).toThrowError();
      expect(() => processor.mapCondition('price', { value: 1, matchMode: 'unknownOp' })).toThrowError();
    });
  });

  describe('Prepend, Postpend, Clone & MCOdata', () => {
    it('should combine prepend, odata, and postpend and clone processor', () => {
      processor.setPrependEquals('tenantId', 1);
      processor.addEqualFilter('active', true);
      processor.setPostpendContains('name', 'test');

      expect(processor.toString()).toBe("tenantId eq '1' and active eq 'true' and contains(name, 'test')");

      const cloned = processor.clone();
      expect(cloned.toString()).toBe(processor.toString());

      processor.setPrependNotEquals('a', 1);
      processor.setPrependGreaterThan('a', 1);
      processor.setPrependLessThan('a', 1);
      processor.setPrependGreaterThanOrEqual('a', 1);
      processor.setPrependLessThanOrEqual('a', 1);
      processor.setPrependStartsWith('a', 'x');
      processor.setPrependFilter('a', { value: '1', matchMode: 'eq' });
      processor.cleanPrepend();
      expect(processor.prepend).toBeUndefined();

      processor.setPostpendNotEquals('b', 2);
      processor.setPostpendGreaterThan('b', 2);
      processor.setPostpendLessThan('b', 2);
      processor.setPostpendGreaterThanOrEqual('b', 2);
      processor.setPostpendLessThanOrEqual('b', 2);
      processor.setPostpendStartsWith('b', 'y');
      processor.setPostpendFilter('b', { value: '2', matchMode: 'eq' });
      processor.cleanPostpend();
      expect(processor.postpend).toBeUndefined();
    });

    it('should format MCOdata query parameters and clone properly', () => {
      const odata = MCOdata.fromOnlyTop(25);
      odata.setPage(2, 25);
      odata.orderBy = 'created_at desc';
      odata.expands = 'category,tags';
      odata.extraParams = 'custom=1';
      odata.filters.addEqualFilter('status', 'active');

      const str = odata.toString();
      expect(str).toBe("$top=25&$skip=25&$orderby=created_at desc&$expand=category,tags&$filter=status eq 'active'&custom=1");

      const cloned = odata.clone();
      expect(cloned.top).toBe(25);
      expect(cloned.skip).toBe(25);
      expect(cloned.orderBy).toBe('created_at desc');
      expect(cloned.expands).toBe('category,tags');

      odata.setPageByPrimeNg({ first: 10, rows: 10 });
      expect(odata.skip).toBe(10);
      expect(odata.top).toBe(10);

      odata.cleanPage();
      expect(odata.skip).toBe(0);
    });
  });
});
