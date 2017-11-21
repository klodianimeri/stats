import { DatabaseLogger } from "./../log/index";
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
export class DatabaseError extends Error {
    constructor(...value: any[]) {
        super();
        this.message = value[0];
        DatabaseLogger.error(...value);
    }
}