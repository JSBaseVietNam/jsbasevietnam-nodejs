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
console.log('JSBASEVIETNAM');
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

#### ESLint

```bash
yarn add -D @typescript-eslint/eslint-plugin@latest eslint-config-google@latest eslint @typescript-eslint/parser@latest
touch .eslintrc.json
touch .eslintignore
```

**.eslintrc**

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["google", "prettier"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {}
}
```

**.eslintignore**

```env
node_modules
dist
```

**package.json**

```json
"lint": "eslint -c .eslintrc.json --ext .ts src"
```

#### Husky

```bash
yarn dlx husky-init --yarn2 && yarn
```

# References

- [ESLint](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)
- [Google Style Guide](https://google.github.io/styleguide/jsguide.html)
