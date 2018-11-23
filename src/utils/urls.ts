// assumes an internal url has exactly one slash to start
export const isInternal = (url: string): boolean => /^\/(?!\/)/.test(url);
