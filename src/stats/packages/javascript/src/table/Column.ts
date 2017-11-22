import {
  StatsError,
  StatsInfo
} from './../../../core/index';

import {
  DataType,
  RepresentingType,
  TypeUtilities,
} from './DataType';

import { Row } from './Row';


export class Column {
  private _name: string;
  private _type: DataType;
  private _representingType: RepresentingType;
  private _primaryKey: boolean = false;
  private _foreignKey: boolean = false;
  private _length: number;
  private _check: Array<any>;
  private _defaultValue: any;
  private _allowNull: boolean = true;
  private _comments: string;
  private _mimeType: MimeType;

  constructor(name?: string,
    dataType?: DataType,
    primaryKey?: boolean,
    foreignKey?: boolean,
    length?: number,
    check?: Array<any>,
    defaultValue?: any,
    allowNull?: boolean,
    comments?: string,
    mimeType?: MimeType
  ) {
    this._name = name;
    this._type = dataType;
    this._primaryKey = primaryKey;
    this._foreignKey = foreignKey;
    this._length = length;
    this._check = check;
    this._defaultValue = defaultValue;
    this._allowNull = allowNull;
    this._comments = comments;
    this._mimeType = mimeType;

    if (dataType) {
      this._representingType = TypeUtilities.DataToRepresentingType(dataType);
    }
  }

  set Name(value: string) {
    this._name = value;
  }

  get Name(): string {
    return this._name;
  }

  get IsPrimaryKey(): boolean {
    return this._primaryKey;
  }

  get IsForeignKey(): boolean {
    return this._foreignKey;
  }

  MakePrimaryKey() {
    this._primaryKey = true;
  }

  MakeForeignKey() {
    this._foreignKey = true;
  }

  get RepresentingType(): RepresentingType {
    return this._representingType;
  }

  public ProcessRowForInsert(row: Row): boolean {

    let value = row.Row[this._name];

    if (this._primaryKey && ((typeof value == undefined) || value == null)) {
      new StatsError(`ROW PROCESS: Column ${this._name} primary key constraint violation!`)
      return false;
    }

    if (this._defaultValue && ((typeof value == undefined) || value == null)) {
      value = row.Row[this._name] = this._defaultValue;
    }

    if (!this._allowNull && ((typeof value == undefined) || value == null)) {
      new StatsError(`ROW PROCESS: Column ${this._name} not null constraint violation!`)
      return false;
    }

    if (this._length && (value.length >= this._length)) {
      new StatsError(`ROW PROCESS: Column ${this._name} length constraint violation!`)
      return false;
    }

    if (this._check && this._check.indexOf(value) == -1) {
      new StatsError(`ROW PROCESS: Column ${this._name} check constraint violation!`)
      return false;
    }

    return true;
  }
}
