import { DatabaseLogger } from "./../log/index";
import { IStatsLog } from './IStatsLog';

/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
export class StatsWarn implements IStatsLog {
    public messages: any[];
    constructor(...value: any[]) {
        this.messages = value;
        DatabaseLogger.warn(...value);
    }
}