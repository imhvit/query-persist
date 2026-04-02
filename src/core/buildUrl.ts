import { BuildUrlParams, QueryPersistConfig } from "../types";

export function persistQuery(config?: QueryPersistConfig) {
  function build({ currentUrl, nextUrl }: BuildUrlParams): string {
    if (config?.fallback?.length && !currentUrl) {
      throw new Error("currentUrl is required when using fallback");
    }

    const baseUrl = nextUrl.split("?")[0];

    const current = new URLSearchParams(currentUrl?.split("?")[1] || "");
    const next = new URLSearchParams(nextUrl.split("?")[1] || "");
    const final = new URLSearchParams(next.toString());

    if (config?.fallback?.length) {
      for (const key of config.fallback) {
        if (!final.has(key) && current.has(key)) {
          const value = current.get(key);
          if (value !== null) final.set(key, value);
        }
      }
    }

    if (config?.pick?.length) {
      for (const key of Array.from(final.keys())) {
        if (!config.pick.includes(key)) {
          final.delete(key);
        }
      }
    }

    if (config?.omit?.length) {
      for (const key of config.omit) {
        final.delete(key);
      }
    }

    const query = final.toString();
    return query ? `${baseUrl}?${query}` : baseUrl;
  }

  return { build };
}
