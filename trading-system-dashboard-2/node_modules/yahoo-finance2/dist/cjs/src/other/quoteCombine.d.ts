import type { ModuleOptionsWithValidateTrue, ModuleOptionsWithValidateFalse, ModuleThis } from "../lib/moduleCommon.js";
import type { QuoteOptions, Quote } from "../modules/quote.js";
export default function quoteCombine(this: ModuleThis, query: string, queryOptionsOverrides?: QuoteOptions, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<Quote>;
export default function quoteCombine(this: ModuleThis, query: string, queryOptionsOverrides?: QuoteOptions, moduleOptions?: ModuleOptionsWithValidateFalse): Promise<any>;
