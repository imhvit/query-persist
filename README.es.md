# query-persist

Controla cómo se preservan los parámetros de query entre URLs.

---

## 🚀 Instalación

```bash
npm install query-persist
```

---

## ⚡ Uso

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

## 🧠 Concepto

```text
fallback → completa parámetros faltantes
pick     → mantiene solo los especificados
omit     → elimina los especificados
```

Orden de ejecución:

```text
fallback → pick → omit
```

---

## 🔧 Opciones

```ts
persistQuery({
  fallback?: string[]; // completa desde current si falta
  pick?: string[];     // lista blanca (whitelist)
  omit?: string[];     // lista negra (blacklist)
});
```

---

## 🔀 Ejemplo

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

## ⚠️ Notas

- `fallback` NO sobrescribe valores de `next`
- `pick` solo filtra, no crea parámetros
- `currentUrl` es obligatorio si usas `fallback`
