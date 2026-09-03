export declare const isYear: (value: string) => boolean;
/**
 * `[ajv-formats]` ISO8601 Date component
 * @example `2020-12-12`
 */
export declare const isDate: (value: string) => boolean;
/**
 * `[ajv-formats]` ISO8601 Time component
 * @example `20:20:39+00:00`
 */
export declare const isTime: (value: string, strictTimeZone?: boolean) => boolean;
/**
 * `[ajv-formats]` ISO8601 DateTime
 * @example `2020-12-12T20:20:40+00:00`
 */
export declare const isDateTime: (value: string, strictTimeZone?: boolean) => boolean;
