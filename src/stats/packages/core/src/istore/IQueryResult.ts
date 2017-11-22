import { IStatsLog } from './../errors/IStatsLog';

export class IQueryResult {
  public Success: boolean;
  public Message: string;
  public Result: any;
  public Error: IStatsLog;
}
