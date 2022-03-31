const WALK_SPEED = 5;
const BUS_SPEED = 40;
type TransportStrategy = (distance: number) => number;
const walkStrategy: TransportStrategy = (distance: number): number => {
  return distance / WALK_SPEED;
};
const busStrategy: TransportStrategy = (distance: number): number => {
  return distance / BUS_SPEED;
};

const transportStrategy = (fn: TransportStrategy, distance: number) => {
  // function as type
  return fn(distance);
};

const functionsMain = () => {
  const distance = 100; // km
  console.log(
    `Walking ${distance} km take ${transportStrategy(
      walkStrategy,
      distance,
    )} hours!`,
  );
  console.log(
    `Going by bus ${distance} km take ${transportStrategy(
      busStrategy,
      distance,
    )} hours!`,
  );
  // Call Signatures
  type DescribableFunction = {
    description?: string;
    (someArg: number): boolean;
  };
  function doSomething(fn: DescribableFunction) {
    console.log(fn.description + ' returned ' + fn(6));
  }
  const isEven: DescribableFunction = (n: number): boolean => n % 2 == 0;
  isEven.description = '[TEST FUNCTION]';

  doSomething(isEven);
  class Example {
    #id: number;
    #title: string;
    constructor(title: string) {
      this.#id = Math.random();
      this.#title = title;
    }
    toJSON() {
      return {
        id: this.#id,
        title: this.#title,
      };
    }
    toString() {
      return `Example ${this.#id} - ${this.#title}`;
    }
  }
  // Construct Signatures
  type ExampleConstructor = {
    new (s: string): Example;
  };
  function createNewExample(Ctor: ExampleConstructor) {
    return new Ctor('title');
  }
  const example = createNewExample(Example);
  console.log(Example);
  console.log(example.toJSON());

  // Generic functions and Inference and Constraints
  const firstElement = <Type extends { toJSON: Function }>(
    arr: Type[],
  ): Type | undefined => {
    return arr[0].toJSON();
  };
  // const s = firstElement(['a', 'b', 'c']); // can not passed constraint
  // console.log(s);
  const e = firstElement([new Example('title2'), new Example('title 3')]);
  console.log('first Ele', e);

  function map<Input, Output>(
    arr: Input[],
    func: (arg: Input) => Output,
  ): Output[] {
    return arr.map(func);
  }
  const parsed = map([new Example('title2'), new Example('title 3')], (e) =>
    e.toJSON(),
  );
  console.log(parsed);

  // Specifying Type Arguments
  function combine<Type>(arr1: Type[], arr2: Type[], arr3: Type[]): Type[] {
    return arr1.concat(arr2).concat(arr3);
  }
  const arr = combine<number | string | Example>(
    [1, 2, 3],
    ['hello'],
    [new Example('title1')],
  );
  console.log(arr.map((e) => e.toString()));

  // Optional Parameters
  function toFixed(n?: number) {
    if (n) {
      console.log(n.toFixed()); // 0 arguments
    }
  }
  toFixed(5);
  toFixed();
  // Funtion Overload
  enum singer {
    HuongLy = 'Huong Ly',
    ThaoPham = 'Thao Pham',
    KieuTho = 'Kieu Tho',
  }
  const songs = [
    { id: 1, name: 'Là ai từ bỏ, là ai vô tình', single: singer.HuongLy },
    { id: 1, name: 'Yêu là cưới', single: singer.ThaoPham },
    { id: 1, name: 'Là ai từ bỏ, là ai vô tình', single: singer.KieuTho },
  ];
  console.log(songs);
};

functionsMain();
