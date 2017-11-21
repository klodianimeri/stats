import { DatabaseLogger } from "./../../index";
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
export class DatabaseTrace {

    constructor(...value: any[]) {
        DatabaseLogger.trace(...value);
    }
}