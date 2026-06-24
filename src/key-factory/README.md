# Key factory

- [Пример кода](./products.key.ts)
- [На главную](../../README.md)

---

```ts
// для центролизованного управления ключами
export const productQueryKeys = {
  // общие и утилитные ключи
  all: () => [...pimBaseQueryKeys, 'products'] as const,
  allProductInfinityLists: () => [...productQueryKeys.all(), 'list', 'infinite'] as const,
  allDetails: () => [...productQueryKeys.all(), 'details'] as const,

  // ключи конкретных запросов
  productListInfinite: (payload: ProductListInfinitePayload) =>
    [...productQueryKeys.allProductInfinityLists(), payload] as const,
  productDetails: (payload: ProductDetailsPayload) =>
    [...productQueryKeys.allDetails(), payload] as const,
}

// Причем `payload` делаем потенциально реактивным
export type ProductListPayload = MaybeRefOrGetter<TProductListPayload>

export type ProductDetailsPayload = MaybeRefOrGetter<TProductDetailsPayload>
```

Когда требуются менее конкретный ключ, например для инвалидации кэша:

- Вариант 1. Добавить вспомогательные утилитный ключь в `productQueryKeys` и использовать его.
- Вариант 2. Сделать поля `payload` необязательными.

```ts
export type ProductDetailsPayload = MaybeRefOrGetter<Partial<TProductDetailsPayload>>
```

> При дальнейшем использовании `productQueryKeys` в коде, вывод типов TypeScript из плагина VS Code на Go может баговать и выводить ошибку, которой не будет при typecheck. Рекомендую отключить его, пока не станет стабильным. (TODO перепроверить, мб пофиксили)

---

- [Пример кода](./products.key.ts)
- [На главную](../../README.md)
