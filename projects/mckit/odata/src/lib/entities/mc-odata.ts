import { TablePageEvent } from "primeng/table";
import { MCFilterProcessor } from "./mc-filter-processor";

/**
 * Represents the MCOdata class.
 */
export class MCOdata {
  /**
   * Limit the number of items returned.
   */
  top?: number = 50;
  /**
   * Skip the number of items returned.
   */
  skip?: number = 0;
  /**
   * Order the items by the specified field.
   */
  orderBy?: string;
  /**
   * Filter the items by the specified field.
   */
  filters = new MCFilterProcessor();
  /**
   * Expand the items by the specified field.
   */
  expands?: string;

  setPage(page: number, pageSize: number): void {
    this.top = pageSize;
    this.skip = (page - 1) * pageSize;
  }

  setPageByPrimeNg(event: TablePageEvent): void {
    this.top = event.rows;
    this.skip = event.first;
  }

  toString(): string {
    let odata = '';
    if (this.top || this.top === 0) {
      odata += `$top=${this.top}`;
    }
    if (this.skip) {
      odata += `${odata ? '&' : ''}$skip=${this.skip}`;
    }
    if (this.orderBy) {
      odata += `${odata ? '&' : ''}$orderby=${this.orderBy}`;
    }
    if (this.expands) {
      odata += `${odata ? '&' : ''}$expand=${this.expands}`;
    }
    odata += `${odata ? '&' : ''}$filter=${this.filters.toString()}`;

    return odata;
  }

  static fromOnlyTop(top: number): MCOdata {
    const odata = new MCOdata();
    odata.top = top;
    return odata;
  }
}
