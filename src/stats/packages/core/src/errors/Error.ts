import { DatabaseLogger } from "./../log/index";
import { IStatsLog } from './IStatsLog';
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
export class StatsError extends Error implements IStatsLog {
    public messages: any[];

    constructor(...value: any[]) {
        super();
        this.message = value[0];
        this.messages = value;
        DatabaseLogger.error(...value);
    }
}