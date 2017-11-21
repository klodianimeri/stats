import { DatabaseLogger } from "./../log/index";
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
export class DatabaseInfo {

    constructor(...value: any[]) {
        DatabaseLogger.info(...value);
    }
}