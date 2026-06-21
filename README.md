# tanstack-query-vue-practices

> для доклада

Используем Tanstack Query для:

- Уменьшения самописного boilerplate (обработка состояния запроса - `isLoading`, `isError` и тд, который обычно кладется в store)
- Дедупликации запросов (аналогично кладется в store или props drilling)

Используем Tanstack Query потому что:

- Популярный/устоявшийся API (стороннему програмисту не нужно изучать логику специфичную для конкретного проекта)
- Самостоятельно реализовывать управление кэшом для server state - дорого и больно (можно утонуть в corner cases)

Хочу рассказать о своих паттернах использования Tanstack Query и получить обратную связь по ним. Сначала поговорим о самих паттернах, а после о том, как я использую Tanstack Query.

## Практики

- Tanstack query как граница слоя api
- [Key factory](src/0-key-factory/README.md)
- Data freshness strategies
- Options factory
- Meta для частных сценариев
- Несколько `queryClient` (например в микрофронтах)
- Composable конвертации состония query в UI состоние
- Мутация кэша
