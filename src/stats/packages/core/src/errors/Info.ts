import { DatabaseLogger } from "./../log/index";
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
export class StatsInfo {

    constructor(...value: any[]) {
        DatabaseLogger.info(...value);
    }
}