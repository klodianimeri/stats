import { DatabaseLogger } from "./../log/index";
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
export class StatsTrace {

    constructor(...value: any[]) {
        DatabaseLogger.trace(...value);
    }
}