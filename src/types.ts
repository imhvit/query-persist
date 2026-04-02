export type QueryPersistConfig = {
  omit?: string[];
  pick?: string[];
  fallback?: string[];
};

export type BuildUrlParams = {
  currentUrl?: string;
  nextUrl: string;
};
