import { MCFilter } from "./filter";

export enum MCConditionResult {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_THAN_OR_EQUALS = 'GREATER_THAN_OR_EQUALS',
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUALS = 'LESS_THAN_OR_EQUALS',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  BETWEEN = 'BETWEEN',
  IS_NULL = 'IS_NULL',
  IS_NOT_NULL = 'IS_NOT_NULL'
}

export class MCResultFilter {
  operator: 'and' | 'or' = 'and';

  filter?: MCFilter;
  condition?: MCConditionResult = MCConditionResult.EQUALS;
  value?: any;

  childrens?: Array<MCResultFilter>;

  static isValid(result: MCResultFilter): boolean {
    if(result.filter != undefined && result.value != undefined && result.value != ''){
      return true;
    }

    if(result.childrens != undefined){
      return result.childrens.every(r => MCResultFilter.isValid(r));
    }

    return false;
  }

  static getOperators(): Array<{ label: string, value: string }> {
    return [
      { label: 'and', value: 'and' },
      { label: 'or', value: 'or' }
    ];
  }

  static getConditions(): Array<{ label: string, value: MCConditionResult }> {
    return [
      { label: '=', value: MCConditionResult.EQUALS },
      { label: 'Contains', value: MCConditionResult.CONTAINS },
      /*{ label: 'Not Equals', value: MCConditionResult.NOT_EQUALS },
      { label: 'Greater Than', value: MCConditionResult.GREATER_THAN },
      { label: 'Greater Than Or Equals', value: MCConditionResult.GREATER_THAN_OR_EQUALS },
      { label: 'Less Than', value: MCConditionResult.LESS_THAN },
      { label: 'Less Than Or Equals', value: MCConditionResult.LESS_THAN_OR_EQUALS },

      { label: 'Not Contains', value: MCConditionResult.NOT_CONTAINS },
      { label: 'Starts With', value: MCConditionResult.STARTS_WITH },
      { label: 'Ends With', value: MCConditionResult.ENDS_WITH },
      { label: 'In', value: MCConditionResult.IN },
      { label: 'Not In', value: MCConditionResult.NOT_IN },
      { label: 'Between', value: MCConditionResult.BETWEEN },
      { label: 'Is Null', value: MCConditionResult.IS_NULL },
      { label: 'Is Not Null', value: MCConditionResult.IS_NOT_NULL }*/
    ];
  }
}
