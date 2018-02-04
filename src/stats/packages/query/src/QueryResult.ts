import {
  StatsInfo,
  StatsWarn,
  IQueryResult,
  IStatsLog
} from './../../core/index';

export class QueryResult implements IQueryResult {
  public Success: boolean;
  public Message: string;
  public Result: any;
  public Error: IStatsLog;

  constructor(success: boolean, message?: string, data?: any, error?: IStatsLog) {
    this.Success = success;
    this.Message = message;
    this.Result = data;
    this.Error = error;

    if (this.Success) {
      new StatsInfo(`QUERY RESULT: Query executed succesfully!`);
    } else {
      new StatsWarn(`QUERY RESULT: Query failed! Message: ${this.Message}.`);
    }

  }
}
