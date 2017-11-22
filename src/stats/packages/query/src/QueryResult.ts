import {
  StatsInfo,
  StatsError,
  IQueryResult,
  IStatsLog
} from './../../core/index';

export class QueryResult implements IQueryResult {
  public Success: boolean;
  public Message: string;
  public Result: any;
  public Error: IStatsLog;

  constructor(success: boolean, message?: string, table?: any, error?: IStatsLog) {
    this.Success = success;
    this.Message = message;
    this.Result = table;
    this.Error = error;

    if (this.Success) {
      new StatsInfo(`QUERY RESULT: Query executed succesfully!`);
    } else {
      new StatsError(`QUERY RESULT: Query failed! Message: ${this.Message}.`)
    }

  }

  public AsArray(): Array<Object> {
    let dataArray: Array<Object> = new Array<Object>();

    this.Result.Data.entries().next((row: any) => { dataArray.push(row); });

    return dataArray;
  }
}
