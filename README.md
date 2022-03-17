# JSBaseVietNam NodeJS Document

## Topics

- [ ] Setup Dev Environment
- [ ] Typescript
- [ ] OOP : SOLID Principles
- [ ] Common Design Pattern
- [ ] NodeJS Main Concept
- [ ] I/O : File, Stream, Buffer
- [ ] Light Framework: ExpressJS

### Setup Dev Environment

```bash
yarn add typescript
yarn add --dev @tsconfig/node16 @types/node ts-node
```

**main.ts**

```ts
console.log("JSBASEVIETNAM");
```

- [TSConfig Base](https://www.npmjs.com/package/@tsconfig/node16)

#### Debug

```bash
# build
tsc
# start server
node --inspect dist/main.js
```

### Typescript

#### Debug with typescript

```bash
yarn add -D ts-node-dev
```

**package.json**

```json
"dev:debug": "ts-node-dev --transpile-only --respawn --inspect=4321 --project tsconfig.dev.json src/main.ts",
"dev": "ts-node-dev --transpile-only --respawn --project tsconfig.dev.json src/main.ts",
```

#### Test

```bash
yarn add jest @types/jest @babel/preset-typescript @babel/preset-env -D
yarn jest --init
yarn test
```
