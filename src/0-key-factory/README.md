# Key factory

[На главную](../../README.md)

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

// Причем `payload` делаем потенциально реактивными
export type ProductListPayload = MaybeRefOrGetter<TProductListPayload>

export type ProductDetailsPayload = MaybeRefOrGetter<TProductDetailsPayload>
```

Когда требуются менее конкретный ключ:

- Вариант 1. Добавить вспомогательные утилитный ключь в `productQueryKeys` и использовать его.
- Вариант 2. Сделать поля `payload` необязательными.

```ts
export type ProductDetailsPayload = MaybeRefOrGetter<Partial<TProductDetailsPayload>>
```

> При дальнейшем использовании `productQueryKeys` в коде, вывод типов TypeScript из плагина VS Code на Go может баговаться, рекомендую отключить его, пока не станет стабильным. (TODO перепроверить, мб пофиксили)

---

[На главную](../../README.md)
