# Typescript Cheatsheet

> Last update: 2022

## Primitive types

- string
- number
- boolean

## Interface vs Types

> Interface can be merged after creation

```ts
interface CustomerBehavior {
  order(): void;
}

interface CustomerBehavior {
  pay(): void;
}

interface CustomerBehavior {
  return(): void;
}
```

> Type can not be modified after creation

```ts
type Member = {
  login: string;
  password: string;
};

type Admin = Member & {
  permissions: Array<string>;
};
```

> Should use _interface_ until you need to use features from _type_
