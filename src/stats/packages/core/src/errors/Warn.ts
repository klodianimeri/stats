import { DatabaseLogger } from "./../log/index";
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
export class StatsWarn {

    constructor(...value: any[]) {
        DatabaseLogger.warn(...value);
    }
}