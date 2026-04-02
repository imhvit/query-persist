# query-persist

Control how query parameters are preserved between URLs.

---

## 🚀 Install

```bash
npm install query-persist
```

---

## ⚡ Usage

```ts
import { persistQuery } from "query-persist";

const query = persistQuery({
  fallback: ["query"],
});

query.build({
  currentUrl: "/users?page=1&query=search",
  nextUrl: "/users?page=2",
});

// → /users?page=2&query=search
```

---

## 🧠 Concept

```text
fallback → fills missing params
pick     → keeps only specified params
omit     → removes specified params
```

Execution order:

```text
fallback → pick → omit
```

---

## 🔧 Options

```ts
persistQuery({
  fallback?: string[]; // fill from current if missing
  pick?: string[];     // whitelist
  omit?: string[];     // blacklist
});
```

---

## 🔀 Example

```ts
persistQuery({
  fallback: ["query"],
  pick: ["page", "query"],
}).build({
  currentUrl: "?page=1&query=products",
  nextUrl: "?page=2",
});

// → ?page=2&query=products
```

---

## ⚠️ Notes

- `fallback` does NOT override values from `next`
- `pick` only filters, it does not create params
- `currentUrl` is required when using `fallback`

---
