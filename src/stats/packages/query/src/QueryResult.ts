import {
  DatabaseInfo,
  DatabaseError,
  IQueryResult
} from './../../core/index';

export class QueryResult implements IQueryResult {
  public Success: boolean;
  public Message: string;
  public Result: any;

  constructor(success: boolean, message?: string, table?: any) {
    this.Success = success;
    this.Message = message;
    this.Result = table;

    if (this.Success) {
      new DatabaseInfo(`QUERY RESULT: Query executed succesfully!`);
    } else {
      new DatabaseError(`QUERY RESULT: Query failed! Message: ${this.Message}.`)
    }

  }

  public AsArray(): Array<Object> {
    let dataArray: Array<Object> = new Array<Object>();

    this.Result.Data.entries().next((row: any) => { dataArray.push(row); });

    return dataArray;
  }
}
