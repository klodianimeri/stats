import { StatsError } from "./../errors/index";
/**
 * BooleanOperator
 */
export enum BooleanOperator {
  And,
  Or,
  Not
}

/**
* ComparisonOperator
*/
export enum ComparisonOperator {
  Equal,
  NotEqual,
  Grater,
  GreaterThanEqual,
  Less,
  LessThanEqual,
  Like,
  In,
  NotIn,
  Between
}


/**
* WhereExpression
*/
export class WhereExpression {
  private _BooleanOperator: BooleanOperator;
  private _propertyColumn: string;
  private _comparisonOperator: ComparisonOperator;
  private _value: any;

  constructor(BooleanOperator: BooleanOperator, propertyColumn: string, comparisonOperator: ComparisonOperator, value: any) {
    this._BooleanOperator = BooleanOperator;
    this._propertyColumn = propertyColumn;
    this._comparisonOperator = comparisonOperator;
    this._value = value;
  }


  public get BooleanOperator(): BooleanOperator {
    return this._BooleanOperator;
  }


  public get PropertyColumn(): string {
    return this._propertyColumn;
  }


  public get ComparisonOperator(): ComparisonOperator {
    return this._comparisonOperator;
  }


  protected Compare(value: any): boolean {

    let result: boolean = false;

    switch (this.ComparisonOperator) {
      case ComparisonOperator.Equal:
        result = this._value === value;
        break;
      case ComparisonOperator.NotEqual:
        result = this._value != value;
        break;
      case ComparisonOperator.Grater:
        result = this._value < value;
        break;
      case ComparisonOperator.GreaterThanEqual:
        result = this._value <= value;
        break;
      case ComparisonOperator.Less:
        result = this._value > value;
        break;
      case ComparisonOperator.LessThanEqual:
        result = this._value >= value;
        break;
      case ComparisonOperator.Like:
        let pattern = new RegExp(this._value);
        result = pattern.test(value);
        break;
      case ComparisonOperator.In:
        if (((<Array<any>>this._value).length == 0)) {
          throw new StatsError("WHERE: Value provided for In is not an array with values!");
        }
        result = (<Array<any>>this._value).indexOf(value) == -1 ? false : true;
        break;
      case ComparisonOperator.NotIn:
        if (((<Array<any>>this._value).length == 0)) {
          throw new StatsError("WHERE: Value provided for Not In is not an array with values!");
        }
        result = (<Array<any>>this._value).indexOf(value) == -1 ? true : false;
        break;
      case ComparisonOperator.Between:
        if (!((<Array<any>>this._value).length == 2)) {
          throw new StatsError("WHERE: Value provided for Between is not an array with two values!");
        }
        result = ((value >= (<Array<any>>this._value)[0]) && (value <= (<Array<any>>this._value)[1]));
        break;
      default:
        result = false;
        break;
    }

    return result;
  }

  public CompareBooleanOperator(a: Object, result: boolean): boolean {
    switch (this.BooleanOperator) {
      case BooleanOperator.And:
        return this.Compare(a[this._propertyColumn]) && result;
      case BooleanOperator.Or:
        return this.Compare(a[this._propertyColumn]) || result;
      case BooleanOperator.Not:
        return !(this.Compare(a[this.PropertyColumn])) && result;
      default:
        return false;
    }
  }
}
