// decorator is an expression which returns a function and can take a target, name and property descriptor as arguments

function first() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);
    console.log('first(): called');
  };
}
interface ControllerOptions {
  route: string;
}
const handlers: { [key: string]: any } = {};
const controller = (options: ControllerOptions) => {
  return (constructor: Function) => {
    handlers[options.route] = constructor;
  };
};

@controller({ route: '/example' })
class Example {
  constructor() {
    console.log('main constructor');
  }
  @first()
  execute() {
    console.log('example route execute run');
  }
}
interface Class<T> {
  new (...args: any[]): T;
}
function createInstance<T>(AnyClass: Class<T>, ...args: any[]): T {
  return new AnyClass(...args);
}
const controllers = [Example];
function mainDecorator() {
  console.error(controllers);
  const requestRoute = '/example';
  Object.keys(handlers).map((k) => {
    console.log(k, handlers[k]);
    if (requestRoute === k) {
      const instance = createInstance<any>(handlers[k] as any);
      instance.execute();
    }
  });
}

mainDecorator();
