export function environmentSuffix(hostname: string): string;
export function productionHostname(hostname: string): string;
export function publicHost(hostname: string, from?: string): string;
export function publicUrl(hostname: string, from?: string): string;
export function environmentUrl(value: string, from?: string): string;
export function environmentText(value: string, from?: string): string;
export function developmentHeaders(headers: Array<{key: string; value: string}>): Array<{key: string; value: string}>;
