import { StaticDecode, type TSchema } from "@sinclair/typebox";
import { ValidationOptions } from "./options";
export declare const validateAndCoerceTypebox: <T extends TSchema>({ type, data, schema, options, }: {
    type?: "result" | "options";
    data: unknown;
    schema: T;
    options: ValidationOptions;
}) => StaticDecode<T>;
export default validateAndCoerceTypebox;
