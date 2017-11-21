import { DatabaseLogger } from "./../../index";
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
export class DatabaseWarn {

    constructor(...value: any[]) {
        DatabaseLogger.warn(...value);
    }
}