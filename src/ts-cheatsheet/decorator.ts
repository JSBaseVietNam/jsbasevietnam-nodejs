/* eslint-disable new-cap */
// decorator is an expression which returns a function and can take a target, name and property descriptor as arguments

import 'reflect-metadata';
const context = Symbol('context');
function SetMetaData(key: string, value: any) {
  return Reflect.metadata(context, { [key]: value });
}
function GetMetaData(target: any, propertyKey: any) {
  return Reflect.getMetadata(context, target, propertyKey);
}

function Guard() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);
    console.log('Guard(): called');
    const ctx = GetMetaData(target, propertyKey);
    console.log('ctx', ctx);
  };
}
interface ControllerOptions {
  route: string;
}
const handlers: { [key: string]: any } = {};
const controller = (options: ControllerOptions) => {
  return (constructor: Function) => {
    handlers[options.route] = {
      class: constructor,
      actions: [],
    };
  };
};

const Get = (route: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    return {
      get() {
        const wrapperFn = (...args: any[]) => {
          console.log('function will handle route matched: ', route);
          descriptor.value.apply(this, args);
        };
        Object.defineProperty(this, propertyKey, {
          value: wrapperFn,
          configurable: true,
          writable: true,
        });
        return wrapperFn;
      },
    };
  };
};

@controller({ route: '/example' })
class Example {
  constructor() {
    console.log('main constructor');
  }
  @Guard()
  @SetMetaData('roles', ['admin'])
  @Get('/execute')
  execute(message: string = '') {
    console.log('example route execute run', message);
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
      const instance = createInstance<any>(handlers[k].class as any);
      instance.execute();
    }
  });
}

mainDecorator();
