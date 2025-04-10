import { MCFilter } from "./filter";
import { MCResultFilter } from "./result";

export class MCConfigFilter {
  filters: Array<MCFilter> = [];
  initialFilters?: Array<MCResultFilter>;
}
