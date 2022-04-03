function manipulateTypeMain() {
  // generic
  function identity<T>(arg: T): T {
    return arg;
  }
  const id = identity<string>('abc');
  console.log(id);
  function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key];
  }
  const obj = { a: 1, b: 2, c: 3 };
  console.log(getProperty(obj, 'a'));
}

manipulateTypeMain();
