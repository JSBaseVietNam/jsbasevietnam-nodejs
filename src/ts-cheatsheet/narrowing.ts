const narrowingMain = () => {
  class NarrowExample {
    #id: number = 0;
    #name: string = '';
    constructor(name: string) {
      this.#id = Date.now();
      this.#name = name;
    }
    get name() {
      return this.#name;
    }
    set name(value: string) {
      this.#name = value;
    }
    toJSON() {
      return {
        id: this.#id,
        name: this.#name,
      };
    }
  }
  const aString: string = 'a string';
  const aNumber: number = 1.2;
  const aBigint: BigInt = 1000n;
  const aBoolean: boolean = false;
  const aSymbol1 = Symbol('a');
  const aSymbol2 = Symbol('a');
  const anUndefined: any = undefined;
  const object: any = {};
  const narrowExample = new NarrowExample('example');
  console.log(`typeof ${aString} is ${typeof aString}`);
  console.log(`typeof ${aNumber} is ${typeof aNumber}`);
  console.log(`typeof ${aBigint} is ${typeof aBigint}`);
  console.log(`typeof ${aBoolean} is ${typeof aBoolean}`);
  console.log(`typeof ${anUndefined} is ${typeof anUndefined}`);
  console.log(`typeof ${aSymbol1.toString()} is ${typeof aSymbol1}`);
  console.log(`typeof ${object} is ${typeof object}`);
  console.log(`typeof ${narrowExample} is ${typeof narrowExample}`);
  console.log(
    `typeof ${narrowExample.toJSON} is ${typeof narrowExample.toJSON}`,
  );
  console.log(`typeof ${narrowExample.name} is ${typeof narrowExample.name}`);
  console.log(
    `narrowExample instanceof NarrowExample : ${
      narrowExample instanceof NarrowExample
    }`,
  );

  object[aSymbol1] = '1';
  object[aSymbol2] = '2';
  console.log(object[aSymbol1], object[aSymbol2]);

  // Falsy
  console.log(
    Boolean(''),
    Boolean(NaN),
    Boolean(undefined),
    Boolean(false),
    Boolean(0),
    Boolean(null),
  );
  // in
  type Fish = { swim: () => void };
  type Bird = { fly: () => void };
  type Human = { swim?: () => void; fly?: () => void };
  const things = [];
  const fish: Fish = {
    swim: () => {
      console.log('Fish can swim');
    },
  };
  const bird: Bird = {
    fly: () => {
      console.log('Bird can fly');
    },
  };
  const human: Human = {
    swim: () => {
      console.log('Human can swim');
    },
  };
  function move(animal: Fish | Bird | Human) {
    if ('swim' in animal) {
      return animal.swim && animal.swim();
    }
    return animal.fly && animal.fly();
  }
  things.push(fish);
  things.push(bird);
  things.push(human);
  things.forEach((obj) => {
    move(obj);
  });
  function isString(s: any): s is String {
    return typeof s === 'string';
  }
  function toUpperCase(x: unknown): any {
    if (isString(x)) {
      return x.toUpperCase();
    }
    return x;
  }
  console.log(toUpperCase('s'));
  console.log(toUpperCase(123));

  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }
  function getSmallPet(): Fish | Bird {
    if (Math.floor(Math.random() * 10) % 2 === 0) {
      return fish;
    }
    return bird;
  }
  const pet = getSmallPet();
  if (isFish(pet)) {
    // (pet as Fish).swim();
    pet.swim();
  } else {
    // (pet as Bird).fly();
    pet.fly();
  }
};

narrowingMain();
