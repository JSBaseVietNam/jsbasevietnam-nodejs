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

## Literal Type

```ts
const position: 'left' = 'left';
const deleteStatus: 0 = 0;
const isRemember: true | false = true;
```

> In this case 'left' is a literal type, and there is only one available value "left".
> Is this useless? No take a look at this composition

```ts
type position = 'left' | 'right' | 'top' | 'bottom';
element.position = position;
type status = 0 | 1 | 2;
// Now you see me !
```

> An of course we can also combine non-literal types

```ts
interface Options {
  width: number;
}

const configure = (opt: Options | 'auto') => {
  console.info(opt);
};

configure('auto');
configure({ width: 123 });
```

## Literal Inference

> In this example, typescript can infer type of counter. So if you try to assign counter with a string, an error will be raised ! Now you see !

```ts
const stats = { counter: 1 };
stats.counter = 'a';
```

> Take a look at another example

```ts
const handleRequest = (url: string, method: 'GET' | 'POST') => {
  console.info(`Execute: /${method} ${url}`);
};
const req = {
  url: 'https://api.jsbasevietnam.com/v1/posts',
  method: 'GET',
};
// what's happened and how to fix
handleRequest(req.url, req.method);
```

```ts
const req = {
  url: 'https://api.jsbasevietnam.com/v1/posts',
  method: 'GET' as 'GET',
};
// or
const req = {
  url: 'https://api.jsbasevietnam.com/v1/posts',
  method: 'GET',
} as const;
```

## null and undefined

> With strictNullChecks on, when a value is null or undefined, you will need to test for those values before using methods or properties on that value. Just like checking for undefined before using an optional property, we can use narrowing to check for values that might be null

**Non-null Assertion Operator (Postfix!)**

```ts
// this example will thrown error
const divide = (n?: number | null) => {
  return 1 / n;
};
// but if you can make sure n never be null or undefined, you can use this syntax
// to removing null and undefined from a type without doing any explicit checking
const divide = (n?: number | null) => {
  return 1 / n!;
};
```

## Enum

```ts
enum TransportationMode {
  Walking = 'Walking',
  Car = 'Car',
  Bus = 'Bus',
  Unknown = 'Unknown',
}
```

## Less Common Primitives
