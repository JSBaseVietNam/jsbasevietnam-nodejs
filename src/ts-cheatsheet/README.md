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

## Decorator

> Decorator is an expression which returns a function and can take a target, name and property descriptor as arguments

## Guidelines for Writing Good Generic Functions

> Rule: When possible, use the type parameter itself rather than constraining it

```ts
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);
```

> Rule: Always use as few type parameters as possible

```ts
// good : only depend on one field type
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

// bad: its create two few types
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func,
): Type[] {
  return arr.filter(func);
}
```

> Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it

```ts
// good
function greet(s: string) {
  console.log('Hello, ' + s);
}

// not necessary
function greet<Str extends string>(s: Str) {
  console.log('Hello, ' + s);
}

greet('world');
```

## Function Overload

> The signature of the implementation is not visible from the outside. When writing an overloaded function, you should always have two or more signatures above the implementation of the function

## References

- https://www.javascripttutorial.net/es-next/
- https://www.logicbig.com/tutorials/misc/typescript/class-decorators.html
- https://exploringjs.com/tackling-ts/ch_classes-as-values.html
- https://exploringjs.com/tackling-ts/toc.html
- https://www.npmjs.com/package/reflect-metadata
- https://www.javascripture.com/PropertyDescriptor
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty?retiredLocale=vi#try_it
- Immutable vs Immer : https://blog.joshsoftware.com/2021/05/03/native-vs-immutablejs-vs-immer-are-libraries-the-way-to-go-for-immutability-in-react/
- https://basarat.gitbook.io/typescript/main-1/typeinstantiation
- https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/
