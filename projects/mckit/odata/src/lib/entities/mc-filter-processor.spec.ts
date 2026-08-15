import { MCFilterProcessor } from './mc-filter-processor';
import { TableFilterEvent } from 'primeng/table';

describe('MCFilterProcessor', () => {
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

    it('should normalize dot notation in basic fields', () => {
      processor.addEqualFilter('category.name', 'Tech');
      expect(processor.toString()).toBe("category/name eq 'Tech'");
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

    it('should convert explicit lambda key (categories/any(c: c/name))', () => {
      const event: TableFilterEvent = {
        filters: {
          'categories/any(c: c/name)': [
            { value: 'Tech', matchMode: 'contains', operator: 'and' }
          ]
        } as any
      };
      const odata = processor.convertTableFilterToOData(event);
      expect(odata).toBe("categories/any(c: contains(c/name, 'Tech'))");
    });

    it('should convert single navigation relation key (category.name)', () => {
      const event: TableFilterEvent = {
        filters: {
          'category.name': [
            { value: 'Tech', matchMode: 'equals', operator: 'and' }
          ]
        } as any
      };
      const odata = processor.convertTableFilterToOData(event);
      expect(odata).toBe("category/name eq 'Tech'");
    });

    it('should convert primitive collection lambda key (tags.any)', () => {
      const event: TableFilterEvent = {
        filters: {
          'tags.any': [
            { value: 'Tech', matchMode: 'contains', operator: 'and' }
          ]
        } as any
      };
      const odata = processor.convertTableFilterToOData(event);
      expect(odata).toBe("tags/any(x: contains(x, 'Tech'))");
    });
  });

});
